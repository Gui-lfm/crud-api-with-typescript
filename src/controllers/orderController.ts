import { Request, Response } from 'express';
import orderService from '../services/orderService'; 

async function getOrders(_req: Request, res: Response) {
  const orders = await orderService.getOrders();

  return res.status(200).json(orders);
}

export default {
  getOrders,
};