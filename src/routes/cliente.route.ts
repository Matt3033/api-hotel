import { Router } from 'express';
import ClienteControllers from '../controllers/cliente.controllers';
import ValidateClienteMiddleware from '../middlewares/validate.cliente.middleware';
import ValidateMiddleware from '../middlewares/validate.middleware';

const router = Router();
const clienteControllers = new ClienteControllers();
const validateMiddleware: ValidateMiddleware = new ValidateMiddleware();
const validateClienteMiddleware: ValidateClienteMiddleware = new ValidateClienteMiddleware();

router.post('/', validateClienteMiddleware.execute(), validateMiddleware.execute, clienteControllers.incluirClienteController);

export default router;