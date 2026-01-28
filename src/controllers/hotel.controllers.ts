import { Request, Response } from 'express';
import IncluirHotelService from '../services/incluir.hotel.service';

export default class HotelControllers {
    public async incluirHotelController(req: Request, res: Response): Promise<Response> {
        try {
            
            const incluirHotelService: IncluirHotelService = new IncluirHotelService();

            const data = req.body;
            const { nome, email, senha, endereco } = data;
            if (!nome || !email || !senha || !endereco) {
                return res.send({ body: 'Preencha todos os dados corretamente'});
            }

            await incluirHotelService.execute({ ...data, avaliacaoMedia: 0, fotoPerfil: '' });

            return res.status(200).send({ body: 'Usuário cadastrado' });
        } catch (err: any) {
            return res.status(422).send({ body: err.message });
        }
    }
}