import { Request, Response } from 'express';
import ClienteRepositories from '../repositories/clientes.repositories';
import IncluirClienteService from '../services/incluir.cliente.service';

export default class ClienteControllers {
    
    public async incluirClienteController(req: Request, res: Response): Promise<Response> {
        try {
            
            const data = req.body;
            const { nome, email, senha } = data;
            
            if (!nome || !senha || !email) {
                return res.status(422).send({ body: 'Preencha todos os campos corretamente' });
            }
            
            const incluirClienteService: IncluirClienteService = new IncluirClienteService();
            await incluirClienteService.execute(data);
            
            return res.status(200).send({ body: 'Usuário cadastrado com sucesso' });
        } catch (err: any) {
            return res.status(422).send({ body: err.message });
        }
    }
}