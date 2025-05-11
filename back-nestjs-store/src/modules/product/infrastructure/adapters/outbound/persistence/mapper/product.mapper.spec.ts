import { Product } from "src/modules/product/domain/model/product.model";
import { ProductMapper } from "./product.mapper";
import { ProductEntity } from "../entities/product.entity";

describe('ProductMapper', () => {
  const mockEntity: ProductEntity = {
    id: 1,
    title: 'Product 1',
    price: 100,
    description: 'Description',
    category: 'Category',
    urlImage: 'http://image.url',
    stock: 10,
  };

  const mockDomain: Product = new Product(
    1,
    'Category',
    'Product 1',
    100,
    'Description',
    'http://image.url',
    10,
  );

  describe('toDomain', () => {
    it('should map ProductEntity to Product', () => {
      const result = ProductMapper.toDomain(mockEntity);
      expect(result).toEqual(mockDomain);
    });
  });

  describe('toEntity', () => {
    it('should map Product to ProductEntity', () => {
      const result = ProductMapper.toEntity(mockDomain);
      expect(result).toEqual(mockEntity);
    });
  });
});