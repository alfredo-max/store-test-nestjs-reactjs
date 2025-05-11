import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getAllProducts } from '../productService';
import api from '../../../../shared/api/api';
import { Product } from '../../models/Product';
import { API_ENDPOINTS } from '../../../../shared/api/endpoints';

vi.mock('../../../../shared/api/api');

describe('productService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería retornar la lista de productos', async () => {
    const mockProducts: Product[] = [
      { id: 1, title: 'Producto 1', price: 100, category: 'Categoría 1', description: 'Descripción del producto 1', urlImage: 'https://example.com/img1.jpg', stock: 10 },
      { id: 2, title: 'Producto 2', price: 200, category: 'Categoría 2', description: 'Descripción del producto 2', urlImage: 'https://example.com/img2.jpg', stock: 5 }
    ];
    (api.get as any) = vi.fn().mockResolvedValue({ data: mockProducts });

    const result = await getAllProducts();
    expect(api.get).toHaveBeenCalledWith(API_ENDPOINTS.PRODUCTS);
    expect(result).toEqual(mockProducts);
  });

  it('debería manejar errores al obtener productos', async () => {
    (api.get as any) = vi.fn().mockRejectedValue(new Error('Error de API'));
    await expect(getAllProducts()).rejects.toThrow('Error de API');
  });
});
