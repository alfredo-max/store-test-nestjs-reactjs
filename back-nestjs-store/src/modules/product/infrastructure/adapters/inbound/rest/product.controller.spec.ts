import { ProductService } from "src/modules/product/application/services/product.service";
import { ProductController } from "./product.controller";
import { Test, TestingModule } from "@nestjs/testing";
import { Product } from "src/modules/product/domain/model/product.model";

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  const mockProducts: Product[] = [
    new Product(1, 'Books', 'NestJS Guide', 29.99, 'A guide to NestJS', 'http://image.url', 100),
    new Product(2, 'Electronics', 'Keyboard', 59.99, 'Mechanical keyboard', 'http://image.url', 50),
  ];

  const mockProductService = {
    getAllProducts: jest.fn().mockResolvedValue(mockProducts),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: mockProductService,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of products', async () => {
      const result = await controller.getAll();
      expect(result).toEqual(mockProducts);
      expect(service.getAllProducts).toHaveBeenCalledTimes(1);
    });
  });
});