import OrderModel, { OrderSequelizeModel } from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
// import { Order } from '../types/Order';

async function getOrders(): Promise<OrderSequelizeModel[]> {
  const orders = await OrderModel.findAll({ include: [
    { model: ProductModel, 
      as: 'productIds',
      attributes: ['id'],
    }] });

  return orders;
}

export default {
  getOrders,
};
