import ICliente from '../types/cliente';
import ClienteRepositories from '../repositories/clientes.repositories';
import bcrypt from 'bcrypt';

export default class IncluirClienteService {

    public async execute(data: Omit<ICliente, '_id'>): Promise<void> {
        
        const clienteRepo: ClienteRepositories = new ClienteRepositories();
        
        const usuarioExiste = await clienteRepo.buscarClientePorCampoRepository({ email: data.email });
        if (usuarioExiste) {
            throw new Error('Esse e-mail já está vinculado a uma conta');
        }

        const salt = await bcrypt.genSalt(10);
        const hashSenha = await bcrypt.hash(data.senha, salt);
        data.senha = hashSenha;

        await clienteRepo.incluirClienteRepository(data);
    }
}