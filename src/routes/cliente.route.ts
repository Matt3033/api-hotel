import { Router } from 'express';
import ClienteControllers from '../controllers/cliente.controllers';

const router = Router();
const clienteControllers = new ClienteControllers();

router.post('/', clienteControllers.incluirClienteController);

export default router;