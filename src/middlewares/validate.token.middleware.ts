import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotev from 'dotenv';
import ITokenPayload from '../types/token.payload';

dotev.config();

export default class ValidateTokenMiddleware {
    
    public async execute(req: Request, res: Response, next: NextFunction) {
        
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).send({ body: 'Token ausente' });
        }

        const secret = String(process.env.SECRET_JWT);
        const decoded = jwt.verify(token, secret) as ITokenPayload;
        if (!decoded) {
            res.status(401).send({ body: 'Token inválido' });
        }

        res.locals.tipoUsuario = decoded.tipoUsuario;
        next();
    }
}