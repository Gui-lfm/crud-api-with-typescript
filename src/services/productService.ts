import ProductModel, { 
  ProductInputtableTypes, ProductSequelizeModel } from '../database/models/product.model';
import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';

async function registerProduct(product: ProductInputtableTypes): Promise<ServiceResponse<Product>> {
  if (!product.name) return { status: 'INVALID_DATA', data: { message: '"name" is required' } };
  if (!product.price) return { status: 'INVALID_DATA', data: { message: '"price" is required' } };

  const newProduct = await ProductModel.create(product);

  return { status: 'SUCCESSFUL', data: newProduct.dataValues };
}

async function getProducts(): Promise<ProductSequelizeModel[]> {
  const products = await ProductModel.findAll();

  return products;
}

export default {
  registerProduct,
  getProducts,
};