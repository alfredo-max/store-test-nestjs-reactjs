import { Inject, Injectable } from '@nestjs/common';
import { GetAllProductsUseCase } from '../../domain/ports/inbound/get-all-products-use-case';
import { Product } from '../../domain/model/product.model';

@Injectable()
export class ProductService {
  
  constructor(
    @Inject('GetAllProductsUseCase')
    private readonly getAllProductsUseCase: GetAllProductsUseCase,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    return this.getAllProductsUseCase.execute();
  }
}
