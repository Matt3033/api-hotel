import { Router } from 'express';
import ClienteControllers from '../controllers/cliente.controllers';
import ValidateBasicoMiddleware from '../middlewares/validate.basico.middleware';
import ValidateMiddleware from '../middlewares/validate.middleware';

const router = Router();
const clienteControllers = new ClienteControllers();
const validateMiddleware: ValidateMiddleware = new ValidateMiddleware();
const validateClienteMiddleware: ValidateBasicoMiddleware = new ValidateBasicoMiddleware();

router.post('/', validateClienteMiddleware.execute(), validateMiddleware.execute, clienteControllers.incluirClienteController);

export default router;