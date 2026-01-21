import { ObjectId } from 'mongoose';

export default interface ICliente {
    _id: ObjectId,
    nome: string,
    emai: string,
    senha: string,
    fotoPerfil: string
}