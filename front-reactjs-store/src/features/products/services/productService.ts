import api from "../../../shared/api/api";
import { API_ENDPOINTS } from "../../../shared/api/endpoints";
import { Product } from "../models/Product";

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>(API_ENDPOINTS.PRODUCTS);
  return response.data;
};