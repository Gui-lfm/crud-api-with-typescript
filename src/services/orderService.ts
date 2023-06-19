import { ServiceResponse } from '../types/ServiceResponse';
import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { OrderList, ReceivedOrder } from '../types/Order';

function validateUser(userId : number): ServiceResponse<ReceivedOrder> | null {
  if (typeof userId !== 'number') {
    return { status: 'UNPROCESSABLE_ENTITY', data: { message: '"userId" must be a number' } };
  }
  return null;
}

function validateProducts(productIds: number[]): ServiceResponse<ReceivedOrder> | null {
  if (!productIds) return { status: 'INVALID_DATA', data: { message: '"productIds" is required' } };
  if (!Array.isArray(productIds)) {
    return { 
      status: 'UNPROCESSABLE_ENTITY', data: { message: '"productIds" must be an array' }, 
    };
  }
  if (productIds.length === 0) {
    return { 
      status: 'UNPROCESSABLE_ENTITY', data: { message: '"productIds" must include only numbers' } };
  }

  return null;
}

async function getOrders(): Promise<ServiceResponse<OrderList[]>> {
  const orders = await OrderModel.findAll({
    include: [
      {
        model: ProductModel,
        as: 'productIds',
        attributes: ['id'],
      },
    ],
  });

  const result = orders.map((order) => ({
    ...order.dataValues,
    productIds: Array.isArray(order.dataValues.productIds)
      ? order.dataValues.productIds.map((product) => product.id) : [],
  }));

  return { status: 'SUCCESSFUL', data: result };
}

async function createOrder(order: ReceivedOrder): Promise<ServiceResponse<ReceivedOrder>> {
  const { productIds, userId } = order;

  const productsError = validateProducts(productIds);
  if (productsError) return productsError;

  const userError = validateUser(userId);
  if (userError) return userError;

  const { dataValues } = await OrderModel.create({ userId });

  productIds.forEach((id) => {
    ProductModel.update({ orderId: dataValues.id }, { where: { id } });
  });
  
  return { status: 'SUCCESSFUL', data: { userId, productIds } };
}

export default {
  getOrders,
  createOrder,
};
