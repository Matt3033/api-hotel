import ICliente from '../types/cliente';
import Cliente from '../models/cliente';

export default class ClienteRepositories {

    public async incluirClienteRepository(data: Omit<ICliente, '_id'>) {
        try {
            const clienteData = new Cliente(data);
            clienteData.save();
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}