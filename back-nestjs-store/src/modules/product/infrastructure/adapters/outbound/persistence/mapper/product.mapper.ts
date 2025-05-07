import { Product } from "../../../../../domain/model/product.model";
import { ProductEntity } from "../entities/product.entity";

export class ProductMapper {
  static toDomain(entity: ProductEntity): Product {
    return new Product(
        entity.id,
        entity.category,
        entity.title,
        entity.price,
        entity.description,
        entity.urlImage,
        entity.stock,
    );
  }

  static toEntity(domain: Product): ProductEntity {
    const entity = new ProductEntity();
    entity.id = domain.id;
    entity.title = domain.title;
    entity.price = domain.price;
    entity.description = domain.description;
    entity.category = domain.category;
    entity.urlImage = domain.urlImage;
    entity.stock = domain.stock;
    return entity;
  }
}