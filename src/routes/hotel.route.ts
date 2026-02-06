import { Router } from 'express';
import HotelControllers from '../controllers/hotel.controllers';
import ValidateBasicoMiddleware from '../middlewares/validate-basico.middleware';
import ValidateMiddleware from '../middlewares/validate.middleware';


const clienteControllers = new HotelControllers();
const validateMiddleware: ValidateMiddleware = new ValidateMiddleware();
const validateBasicoMiddleware: ValidateBasicoMiddleware = new ValidateBasicoMiddleware();

const router = Router();

router.post('/', validateBasicoMiddleware.execute(), validateMiddleware.execute, clienteControllers.incluirHotelController);

export default router;