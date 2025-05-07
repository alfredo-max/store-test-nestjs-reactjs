import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './infrastructure/adapters/inbound/rest/product.controller';
import { ProductService } from './application/services/product.service';
import { GetAllProductsUseCaseImpl } from './application/usecases/get-all-products-use-case-impl';
import { ProductRepositoryImpl } from './infrastructure/adapters/outbound/persistence/product.repository.impl';
import { ProductEntity } from './infrastructure/adapters/outbound/persistence/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: 'GetAllProductsUseCase',
      useClass: GetAllProductsUseCaseImpl,
    },
    {
      provide: 'ProductRepository',
      useClass: ProductRepositoryImpl,
    }
  ],
})
export class ProductoModule {}
