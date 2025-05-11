import { Repository } from "typeorm";
import { ProductEntity } from "./entities/product.entity";
import { ProductRepositoryImpl } from "./product.repository.impl";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Test, TestingModule } from "@nestjs/testing";
import { Product } from "src/modules/product/domain/model/product.model";

describe('ProductRepositoryImpl', () => {
  let repositoryImpl: ProductRepositoryImpl;
  let repo: Repository<ProductEntity>;

  const mockEntity: ProductEntity = {
    id: 1,
    category: 'Category',
    title: 'Product Title',
    price: 100,
    description: 'Description',
    urlImage: 'http://image.url',
    stock: 10,
  };

  const mockDomain = new Product(
    1,
    'Category',
    'Product Title',
    100,
    'Description',
    'http://image.url',
    10,
  );

  const mockRepo = {
    find: jest.fn().mockResolvedValue([mockEntity]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductRepositoryImpl,
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: mockRepo,
        },
      ],
    }).compile();

    repositoryImpl = module.get<ProductRepositoryImpl>(ProductRepositoryImpl);
    repo = module.get<Repository<ProductEntity>>(getRepositoryToken(ProductEntity));
  });

  it('should be defined', () => {
    expect(repositoryImpl).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of Product (domain)', async () => {
      const result = await repositoryImpl.findAll();
      expect(result).toEqual([mockDomain]);
      expect(repo.find).toHaveBeenCalledTimes(1);
    });
  });
});