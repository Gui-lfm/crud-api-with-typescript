import { Router } from 'express';
import orderController from '../controllers/orderController';

const orderRouter = Router();

orderRouter.get('/orders', orderController.getOrders);

export default orderRouter;