import React from "react";
import { Product } from "../models/Product";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center space-y-4">
      <img
        src={product.image}
        alt={product.title}
        className="w-40 h-40 object-contain rounded-lg"
      />
      <div className="text-sm text-gray-500">{product.category}</div>
      <div className="font-semibold text-center">{product.title}</div>
      <div className="text-lg font-bold">${product.price}</div>
      <p className="text-gray-600 text-sm text-center">
        {product.description}
      </p>
      <button className="bg-black text-white py-2 px-4 rounded-full mt-2 w-full">
         Pay with credit card
      </button>
    </div>
  );
};

export default ProductCard;
