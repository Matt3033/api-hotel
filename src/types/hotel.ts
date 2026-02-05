import { ObjectId } from 'mongoose';

export default interface IHotel {
    _id: ObjectId,
    nome: string,
    email: string,
    senha: string,
    endereco: string,
    avaliacaoMedia: number,
    fotoPerfil: string,
    refreshToken: { idRefreshToken: string, expiresIn: number }
}