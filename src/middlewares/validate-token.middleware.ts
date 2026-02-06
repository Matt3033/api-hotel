import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotev from 'dotenv';
import ITokenPayload from '../types/token-payload';

dotev.config();

class ValidateTokenMiddleware {
    
    public async execute(req: Request, res: Response, next: NextFunction) {
        
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).send({ body: 'Token ausente' });
        }

        try {            
            const secret = String(process.env.SECRET_JWT);
            const decoded = jwt.verify(token, secret) as ITokenPayload;
            
            res.locals.tipoUsuario = decoded.tipoUsuario;
            
            next();
        } catch {
            res.status(401).send({ body: 'Token inválido' });
        }

    }
}

export default ValidateTokenMiddleware;