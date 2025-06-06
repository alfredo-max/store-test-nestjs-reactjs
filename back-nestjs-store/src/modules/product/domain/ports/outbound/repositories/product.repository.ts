import { Product } from '../../../model/product.model';

export interface ProductRepository {
  findAll(): Promise<Product[]>;
}