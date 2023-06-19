import { Product } from './Product';

export type Order = {
  id: number;
  userId: number;
  productIds?: Array<Product>;
};

export type ReceivedOrder = {
  userId: number;
  productIds: number[];
};

export type OrderList = {
  id: number;
  userId: number;
  productIds: number[];
};