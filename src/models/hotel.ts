import { model, Schema } from 'mongoose';

const schema = new Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    endereco: { type: String, required: true },
    avaliacaoMedia: { type: Number, required: true },
    fotoPerfil: { type: String }
})

const Hotel = model('Hoteis', schema);

export default Hotel;