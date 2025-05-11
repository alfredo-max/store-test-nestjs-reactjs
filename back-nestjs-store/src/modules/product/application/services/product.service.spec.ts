import { Test, TestingModule } from "@nestjs/testing";
import { GetAllProductsUseCase } from "../../domain/ports/inbound/get-all-products-use-case";
import { ProductService } from "./product.service";
import { Product } from "../../domain/model/product.model";

describe('ProductService', () => {
  let service: ProductService;
  let mockGetAllProductsUseCase: GetAllProductsUseCase;

  beforeEach(async () => {
    mockGetAllProductsUseCase = {
      execute: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: 'GetAllProductsUseCase',
          useValue: mockGetAllProductsUseCase,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all products', async () => {
    const mockProducts: Product[] = [
      new Product(
        1,
        'Electronics',
        'Smartphone',
        999,
        'Latest model smartphone',
        'https://example.com/image.jpg',
        50,
      ),
      new Product(
        2,
        'Books',
        'Clean Code',
        45,
        'Book about writing cleaner code',
        'https://example.com/book.jpg',
        120,
      ),
    ];

    (mockGetAllProductsUseCase.execute as jest.Mock).mockResolvedValue(mockProducts);

    const result = await service.getAllProducts();

    expect(result).toEqual(mockProducts);
    expect(mockGetAllProductsUseCase.execute).toHaveBeenCalled();
  });
});