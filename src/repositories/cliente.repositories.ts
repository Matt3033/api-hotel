import ICliente from '../types/cliente';
import Cliente from '../models/cliente';
import { ObjectId } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

class ClienteRepositories {

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
            const cliente: ICliente | null = await Cliente.findOne(data, '_id email senha');
            if (!cliente) {
                return false;
            }
            return cliente;
            
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    public async incluirRefreshTokenRepository(idUsuario: ObjectId) {
        try {

            const refreshToken = await Cliente.findOneAndUpdate(
                { _id: idUsuario }, 
                { 
                    refreshToken: { idRefreshToken: uuidv4(), expiresIn: Date.now() + 30000 } 
                },
                { new: true }
            );
            
            return refreshToken?.refreshToken?.idRefreshToken;
        
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}

export default ClienteRepositories;