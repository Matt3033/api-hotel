import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

class ValidateMiddleware {
    public execute(req: Request, res: Response, next: NextFunction) {
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            return res.status(422).send({ body: erros.array() });
        }
        next();
    }
}

export default ValidateMiddleware;