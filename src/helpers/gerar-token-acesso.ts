import { ObjectId } from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

export default function gerarTokenAcesso(idUsuario: ObjectId, email: string, tipoUsuario: string): string {
    dotenv.config();

    const secret = String(process.env.SECRET_JWT);
    const token = jwt.sign(
        { idUsuario, email, tipoUsuario },
        secret,
        { expiresIn: '300s' }
    )

    return token;

}