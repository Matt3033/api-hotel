import { ObjectId } from 'mongoose';

export default interface ICliente {
    _id: ObjectId,
    nome: string,
    email: string,
    senha: string,
    fotoPerfil: string,
    refreshToken: { idRefreshToken: string, expiresIn: number }
}