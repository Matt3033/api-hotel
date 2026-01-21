import { Router } from 'express';
import ClienteControllers from '../controllers/cliente.controllers';
import ValidateClienteMiddleware from '../middlewares/validate.cliente.middleware';

const router = Router();
const clienteControllers = new ClienteControllers();
const validateClienteMiddleware: ValidateClienteMiddleware = new ValidateClienteMiddleware();

router.post('/', validateClienteMiddleware.validationRules, validateClienteMiddleware.execute, clienteControllers.incluirClienteController);

export default router;