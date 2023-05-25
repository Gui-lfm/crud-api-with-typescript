import { Request, Response } from 'express';
import productService from '../services/productService'; 

async function registerProduct(req: Request, res: Response) {
  const { name, price, orderId } = req.body;
  const newProduct = await productService.registerProduct({ name, price, orderId });

  return res.status(201).json(newProduct);
}

export default {
  registerProduct,
};