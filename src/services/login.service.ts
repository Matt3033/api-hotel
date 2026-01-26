import ILogin from '../types/login';
import ClienteRepositories from '../repositories/cliente.repositories';
import HotelRepositories from '../repositories/hotel.repositories';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default class LoginService {
    public async execute(data: ILogin): Promise<string> {

        let tipoUsuario: string = '';
        const clienteRepo: ClienteRepositories = new ClienteRepositories();
        const hotelRepo: HotelRepositories = new HotelRepositories();

        const usuarioClienteExiste = await clienteRepo.buscarClientePorCampoRepository({ email: data.email });
        const usuarioHotelExiste = await hotelRepo.buscarHotelPorCampoRepository({ email: data.email });
        const usuarioExiste =
            usuarioClienteExiste ?
                (tipoUsuario = 'cliente', usuarioClienteExiste)
                : (tipoUsuario = 'hotel', usuarioHotelExiste);

        if (!usuarioExiste) {
            throw new Error('Credenciais inválidas');
        }

        const senhaCorreta = await bcrypt.compare(data.senha, usuarioExiste.senha);
        if (!senhaCorreta) {
            throw new Error('Credenciais inválidas');
        }
        
        const secret = String(process.env.SECRET_JWT);
        const token = jwt.sign(
            {
                email: data.email,
                tipoUsuario: tipoUsuario
            },
            secret,
            { expiresIn: 10 }
        )

        return token;
    }
}