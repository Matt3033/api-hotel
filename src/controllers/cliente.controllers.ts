import { Request, Response } from 'express';
import ClienteRepositories from '../repositories/clientes.repositories';

export default class ClienteControllers {
    
    public async incluirClienteController(req: Request, res: Response): Promise<Response> {
        try {
            
            const data = req.body;
            const { nome, email, senha } = data;
            
            if (!nome || !senha || !email) {
                return res.status(422).send({ body: 'Preencha todos os campos corretamente' });
            }

            const clienteRepo: ClienteRepositories = new ClienteRepositories();
            clienteRepo.incluirClienteRepository(data);
            
            return res.status(200).send({ body: 'Usuário cadastrado com sucesso' });
        } catch (err: any) {
            return res.status(422).send({ body: err.message });
        }
    }
}