import ILogin from '../types/login';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import BuscarUsuariosEmailService from './buscar-usuarios-email.service';

dotenv.config();

export default class LoginService {
    public async execute(data: ILogin): Promise<string> {

        const buscarUsuariosEmailService: BuscarUsuariosEmailService = new BuscarUsuariosEmailService();
        const usuarioExiste = await buscarUsuariosEmailService.execute(data.email); 
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
                id: usuarioExiste._id,
                email: data.email,
                tipoUsuario: usuarioExiste.tipoUsuario
            },
            secret,
            { expiresIn: 300 }
        )

        return token;
    }
}