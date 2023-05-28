import { Router } from 'express';
import productController from '../controllers/productController';

const productRouter = Router();

productRouter.get('/products', productController.getProducts);
productRouter.post('/products', productController.registerProduct);

export default productRouter;