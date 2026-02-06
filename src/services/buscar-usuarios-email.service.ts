import { ObjectId } from 'mongoose';
import ClienteRepositories from '../repositories/cliente.repositories';
import HotelRepositories from '../repositories/hotel.repositories';


interface IBuscarUsuariosEmailServiceExecute {
    _id: ObjectId, 
    email: string,
    senha: string,
    tipoUsuario: string
}

class BuscarUsuariosEmailService {
    public async execute(email: string): Promise<IBuscarUsuariosEmailServiceExecute | false> {
        const clienteRepo: ClienteRepositories = new ClienteRepositories();
        const usuarioClienteJaExiste = await clienteRepo.buscarClientePorCampoRepository({ email: email });

        const repoHotel: HotelRepositories = new HotelRepositories();
        const usuarioHotelJaExiste = await repoHotel.buscarHotelPorCampoRepository({ email: email });

        let tipoUsuario: string = '';
        const usuarioExistente =
            usuarioClienteJaExiste ?
                (tipoUsuario = 'cliente', usuarioClienteJaExiste)
                : (tipoUsuario = 'hotel', usuarioHotelJaExiste);

        if (!usuarioExistente) {
            return false;
        }

        return {
            _id: usuarioExistente._id,
            email: usuarioExistente.email,
            senha: usuarioExistente.senha,
            tipoUsuario
        }

    }
}

export default BuscarUsuariosEmailService;