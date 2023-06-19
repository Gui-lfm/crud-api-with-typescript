import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import orderService from '../services/orderService'; 

async function getOrders(_req: Request, res: Response) {
  const serviceResponse = await orderService.getOrders();

  return res.status(200).json(serviceResponse.data);
}

async function createOrder(req: Request, res: Response) {
  const order = req.body;

  const serviceResponse = await orderService.createOrder(order);

  if (serviceResponse.status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  return res.status(201).json(serviceResponse.data);
}

export default {
  getOrders,
  createOrder,
};