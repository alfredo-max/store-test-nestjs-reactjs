import * as React from 'react';
import { useEffect } from 'react';
import ProductCard from './ProductCard';
import { AppDispatch, RootState } from '../../../app/srore';
import { fetchProducts } from '../../redux/thunks/productsThunk';
import { useDispatch, useSelector } from 'react-redux';

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;
  
  return (
    <div className="min-h-screen bg-gray-100 p-4">
    <h1 className="text-2xl font-bold mb-4 text-center">New Collection</h1>
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </div>
  );
};

export default ProductList;
