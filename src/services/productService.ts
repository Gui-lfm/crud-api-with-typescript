import ProductModel, { 
  ProductInputtableTypes, ProductSequelizeModel } from '../database/models/product.model';
import { Product } from '../types/Product';

async function registerProduct(product: ProductInputtableTypes): Promise<Product> {
  const newProduct = await ProductModel.create(product);

  return newProduct.dataValues;
}

async function getProducts(): Promise<ProductSequelizeModel[]> {
  const products = await ProductModel.findAll();

  return products;
}

export default {
  registerProduct,
  getProducts,
};