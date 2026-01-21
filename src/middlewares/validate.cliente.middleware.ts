import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validationResult } from 'express-validator';

export default class ValidateClienteMiddleware {

    public validationRules = [
        body('email')
            .isEmail()
            .withMessage('O e-mail precisa ser válido'),
        body('senha')
            .isLength({ min: 8 })
            .withMessage('A senha precisa ter no mínimo 8 caracteres')
    ]

    public execute(req: Request, res: Response, next: NextFunction) {
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            return res.status(422).send({ body: erros.array() });
        }
        next();
    }
}