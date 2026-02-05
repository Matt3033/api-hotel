import ILogin from '../types/login';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import BuscarUsuariosEmailService from './buscar-usuarios-email.service';
import gerarTokenAcesso from '../helpers/gerar-token-acesso';
import ClienteRepositories from '../repositories/cliente.repositories';
import HotelRepositories from '../repositories/hotel.repositories';


dotenv.config();

interface ILoginServiceExecute {
    tokenAcesso: string,
    refreshToken: string
}

export default class LoginService {
    public async execute(data: ILogin): Promise<ILoginServiceExecute> {

        const clienteRepo: ClienteRepositories = new ClienteRepositories();
        const hotelRepo: HotelRepositories = new HotelRepositories();
        
        const buscarUsuariosEmailService: BuscarUsuariosEmailService = new BuscarUsuariosEmailService();
        const usuarioExiste = await buscarUsuariosEmailService.execute(data.email); 
        if (!usuarioExiste) {
            throw new Error('Credenciais inválidas');
        }
    
        const senhaCorreta: boolean = await bcrypt.compare(data.senha, usuarioExiste.senha);
        if (!senhaCorreta) {
            throw new Error('Credenciais inválidas');
        }

        const tokenAcesso: string = gerarTokenAcesso(usuarioExiste._id, data.email, usuarioExiste.tipoUsuario);
        const refreshToken = usuarioExiste.tipoUsuario === 'cliente' ? 
            await clienteRepo.incluirRefreshTokenRepository(usuarioExiste._id) : 
            await hotelRepo.incluirRefreshTokenRepository(usuarioExiste._id)

        if (!tokenAcesso || !refreshToken) {
            throw new Error('Erro ao gerar tokens');
        }

        return { tokenAcesso, refreshToken };
    }
}