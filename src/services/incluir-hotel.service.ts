import IHotel from '../types/hotel';
import HotelRepositories from '../repositories/hotel.repositories';
import bycript from 'bcrypt';
import BuscarUsuariosEmailService from './buscar-usuarios-email.service';

class IncluirHotelService {

    public async execute(data: Omit<IHotel, '_id'>): Promise<void> {

        const repoHotel: HotelRepositories = new HotelRepositories();
        
        const buscarUsuariosEmailService: BuscarUsuariosEmailService = new BuscarUsuariosEmailService();
        const usuarioExiste = await buscarUsuariosEmailService.execute(data.email);
        if (usuarioExiste) {
            throw new Error('Esse e-mail já está vinculado a uma conta');
        }
        const salt = await bycript.genSalt(10);
        const hashSenha = await bycript.hash(data.senha, salt);
        data.senha = hashSenha;

        await repoHotel.incluirHotelRepository(data);
    }
}

export default IncluirHotelService;