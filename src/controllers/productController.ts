import { Request, Response } from 'express';
import productService from '../services/productService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function registerProduct(req: Request, res: Response) {
  const { name, price, orderId } = req.body;
  const serviceResponse = await productService.registerProduct({ name, price, orderId });

  if (serviceResponse.status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  return res.status(201).json(serviceResponse.data);
}

async function getProducts(_req: Request, res: Response) {
  const products = await productService.getProducts();

  return res.status(200).json(products);
}

export default {
  registerProduct,
  getProducts,
};