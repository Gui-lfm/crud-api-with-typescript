import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';
import { Product } from '../types/Product';

async function registerProduct(product: ProductInputtableTypes): Promise<Product> {
  const newProduct = await ProductModel.create(product);

  return newProduct.dataValues;
}

export default {
  registerProduct,
};