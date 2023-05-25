import { Router } from 'express';
import productController from '../controllers/productController';

const productRouter = Router();

productRouter.post('/products', productController.registerProduct);

export default productRouter;