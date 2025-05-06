import { Product } from '../../model/product.model';

export interface GetAllProductsUseCase {
  execute(): Promise<Product[]>;
}