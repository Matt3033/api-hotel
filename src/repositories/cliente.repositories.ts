import ICliente from '../types/cliente';
import Cliente from '../models/cliente';

export default class ClienteRepositories {

    public async incluirClienteRepository(data: Omit<ICliente, '_id'>): Promise<void> {
        try {
            const clienteData = new Cliente(data);
            clienteData.save();
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    public async buscarClientePorCampoRepository(data: any): Promise<false | ICliente> {
        try {
            const cliente: ICliente | null = await Cliente.findOne(data, '_id email');
            if (!cliente) {
                return false;
            }
            return cliente;
            
        } catch (err: any) {
            throw new Error(err.message);
        }

    }
}