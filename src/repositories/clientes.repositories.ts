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

    public async buscarClientePorCampoRepository(data: any): Promise<false | ICliente[]> {
        try {
            const clientes: ICliente[] = await Cliente.find(data, '_id nome email senha fotoPerfil');
            if (clientes.length === 0) {
                return false;
            }
            return clientes;
            
        } catch (err: any) {
            throw new Error(err.message);
        }

    }
}