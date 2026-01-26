import { Request, Response } from 'express';
import LoginService from '../services/login.service';
import ILogin from '../types/login';

export default class AuthControllers {
    public async loginController(req: Request, res: Response): Promise<Response> {
        try {
            
            const data: ILogin = req.body;
            const { email, senha } = data;

            if (!email || !senha) {
                res.status(422).send({ body: 'Há dados faltando' });
            }

            const loginService: LoginService = new LoginService();
            const token = await loginService.execute(data);

            return res.status(200).send({ body: 'Login realizado', token: token });
        } catch (err: any) {
            return res.status(403).send({ body: err.message });
        }
    }
}