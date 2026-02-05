import { Schema, model } from 'mongoose';

const schema = new Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    fotoPerfil: { type: String },
    refreshToken: { type: { idRefreshToken: String, expiresIn: Number }, _id: false }
})

const Cliente = model('Clientes', schema);

export default Cliente;