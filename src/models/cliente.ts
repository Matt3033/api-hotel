import { Schema, model } from 'mongoose';

const schema = new Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    fotoPerfil: { type: String }
})

const Cliente = model('Clientes', schema);

export default Cliente;