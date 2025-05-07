import { GetAllProductsUseCase } from '../../domain/ports/inbound/get-all-products-use-case';
import { ProductRepository } from '../../domain/ports/outbound/repositories/product.repository';
import { Product } from '../../domain/model/product.model';
import { Inject } from '@nestjs/common';

export class GetAllProductsUseCaseImpl implements GetAllProductsUseCase {

  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository
  ) {}

  async execute(): Promise<Product[]> {
    return this.productRepository.findAll();
  }
}