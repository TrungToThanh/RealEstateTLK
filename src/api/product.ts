import axios from 'axios';
import { Product } from '../types/types';
import { apiUrl } from '../const/const';

const apiClient = axios.create({
    baseURL: `${apiUrl}/api/Products/`, // Adjust base URL as needed
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getProducts = async (): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>('/get-products');
    return response.data;
};

export const getProductDetail = async (id: number): Promise<Product> => {
    const response = await apiClient.get<Product>(`/get-product/${id}`);
    return response.data;
};

export const createProduct = async (product: Product): Promise<Product> => {
    const response = await apiClient.post<Product>('/create-product', product);
    return response.data;
};

export const editProduct = async (id: number, product: Product): Promise<void> => {
    await apiClient.put(`/update-product/${id}`, product);
};

export const deleteProduct = async (id: number): Promise<void> => {
    await apiClient.delete(`/delete-product/${id}`);
};
