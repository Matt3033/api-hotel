import IHotel from '../types/hotel';
import HotelRepositories from '../repositories/hotel.repositories';
import bycript from 'bcrypt';

export default class IncluirHotelService{
    
    public async execute(data: Omit<IHotel, '_id'>) {
        
        const repoHotel: HotelRepositories = new HotelRepositories();

        const usuarioJaExiste = await repoHotel.buscarHotelPorCampoRepository({ email: data.email });
        if (usuarioJaExiste) {
            throw new Error('Esse e-mail já está vinculado a uma conta');
        }
        const salt = await bycript.genSalt(10);
        const hashSenha = await bycript.hash(data.senha, salt);
        data.senha = hashSenha;

        await repoHotel.incluirHotelRepository(data);
    }
}