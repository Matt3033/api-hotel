import { Router } from 'express';
import AuthControllers from '../controllers/auth.controllers';

const router = Router();
const authControllers: AuthControllers = new AuthControllers();

router.post('/login', authControllers.loginController);

export default router;