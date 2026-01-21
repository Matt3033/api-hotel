import ICliente from '../types/cliente';

export default class IncluiClienteService {
    public async execute(data: Omit<ICliente, '_id'>) {
        // Verificar se o email existe
        // Fazer o hashing para a senha
        // Chamar o repository
    }
}