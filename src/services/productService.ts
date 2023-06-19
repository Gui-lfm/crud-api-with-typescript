import ProductModel, {
  ProductInputtableTypes,
} from '../database/models/product.model';
import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';

function validateName({ name }: ProductInputtableTypes): ServiceResponse<Product> | null {
  // validando o campo name:
  if (!name) return { status: 'INVALID_DATA', data: { message: '"name" is required' } };

  if (typeof name !== 'string') {
    return { status: 'UNPROCESSABLE_ENTITY', data: { message: '"name" must be a string' } };
  }

  if (name.length < 3) {
    return {
      status: 'UNPROCESSABLE_ENTITY',
      data: { message: '"name" length must be at least 3 characters long' },
    };
  }

  return null;
}

function validatePrice({ price }: ProductInputtableTypes): ServiceResponse<Product> | null {
  if (!price) return { status: 'INVALID_DATA', data: { message: '"price" is required' } };

  if (typeof price !== 'string') {
    return { status: 'UNPROCESSABLE_ENTITY', data: { message: '"price" must be a string' } };
  }

  if (price.length < 3) {
    return {
      status: 'UNPROCESSABLE_ENTITY',
      data: { message: '"price" length must be at least 3 characters long' },
    };
  }

  return null;
}

async function registerProduct(product: ProductInputtableTypes): Promise<ServiceResponse<Product>> {
  const nameError = validateName(product);
  if (nameError) return nameError;

  const priceError = validatePrice(product);
  if (priceError) return priceError;

  const newProduct = await ProductModel.create(product);
  return { status: 'SUCCESSFUL', data: newProduct.dataValues };
}

async function getProducts(): Promise<ServiceResponse<Product[]>> {
  const products = await ProductModel.findAll();
  const productsValue = products.map((product) => product.dataValues);
  return { status: 'SUCCESSFUL', data: productsValue };
}

export default {
  registerProduct,
  getProducts,
};