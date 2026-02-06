import { body } from 'express-validator';

class ValidateBasicoMiddleware {
    public execute() {
        return [
            body('email')
                .isEmail()
                .withMessage('O e-mail precisa ser válido'),
            body('senha')
                .isLength({ min: 8 })
                .withMessage('A senha precisa ter no mínimo 8 caracteres')
        ]
    }
}

export default ValidateBasicoMiddleware;