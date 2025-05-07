import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductMapper } from './mapper/product.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from 'src/modules/product/domain/ports/outbound/repositories/product.repository';
import { Product } from 'src/modules/product/domain/model/product.model';

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>
  ) {}

  async findAll(): Promise<Product[]> {
    const entities = await this.repository.find();
    return entities.map(ProductMapper.toDomain);
  }
}