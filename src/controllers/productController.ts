import { Request, Response } from 'express';
import productService from '../services/productService'; 

async function registerProduct(req: Request, res: Response) {
  const { name, price, orderId } = req.body;
  const newProduct = await productService.registerProduct({ name, price, orderId });

  return res.status(201).json(newProduct);
}

async function getProducts(_req: Request, res: Response) {
  const products = await productService.getProducts();

  return res.status(200).json(products);
}

export default {
  registerProduct,
  getProducts,
};