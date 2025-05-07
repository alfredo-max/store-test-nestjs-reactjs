import { Controller, Get } from '@nestjs/common';
import { Product } from '../../../../domain/model/product.model';
import { ProductService } from 'src/modules/product/application/services/product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productAppService: ProductService) {}

  @Get()
  async getAll(): Promise<Product[]> {
    return this.productAppService.getAllProducts();
  }
}