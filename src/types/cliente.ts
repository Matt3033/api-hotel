import { ObjectId } from 'mongoose';

interface ICliente {
    _id: ObjectId,
    nome: string,
    email: string,
    senha: string,
    fotoPerfil: string,
    refreshToken: { idRefreshToken: string, expiresIn: number }
}

export default ICliente;