import { Test, TestingModule } from "@nestjs/testing";
import { Product } from "../../domain/model/product.model";
import { GetAllProductsUseCaseImpl } from "./get-all-products-use-case-impl";
import { ProductRepository } from "../../domain/ports/outbound/repositories/product.repository";

describe('GetAllProductsUseCaseImpl', () => {
  let useCase: GetAllProductsUseCaseImpl;
  let mockProductRepository: ProductRepository;

  beforeEach(async () => {
    mockProductRepository = {
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllProductsUseCaseImpl,
        {
          provide: 'ProductRepository',
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    useCase = module.get<GetAllProductsUseCaseImpl>(GetAllProductsUseCaseImpl);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return all products from the repository', async () => {
    const mockProducts: Product[] = [
      new Product(
        1,
        'Electronics',
        'Smartphone',
        999,
        'Latest model smartphone',
        'https://example.com/image.jpg',
        50
      ),
      new Product(
        2,
        'Books',
        'Clean Code',
        45,
        'Book about writing cleaner code',
        'https://example.com/book.jpg',
        120
      ),
    ];

    (mockProductRepository.findAll as jest.Mock).mockResolvedValue(mockProducts);

    const result = await useCase.execute();

    expect(result).toEqual(mockProducts);
    expect(mockProductRepository.findAll).toHaveBeenCalled();
  });
});