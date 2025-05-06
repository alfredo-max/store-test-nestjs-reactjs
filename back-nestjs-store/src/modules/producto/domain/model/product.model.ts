export class Product {
    constructor(
      public id: number,
      public category: string,
      public title: string,
      public price: number,
      public description: string,
      public urlImage: string,
      public stock: number,
    ) {}
  }