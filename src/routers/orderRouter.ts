import { Router } from 'express';
import orderController from '../controllers/orderController';
import verifyToken from '../middlewares/verifyToken';
import userExists from '../middlewares/userExists';

const orderRouter = Router();

orderRouter.get('/orders', orderController.getOrders);
orderRouter.post('/orders', verifyToken, userExists, orderController.createOrder);

export default orderRouter;