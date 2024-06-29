import { Product } from '../types/types';
import { axiosInstance } from './axios-config';

export const getProducts = async (): Promise<Product[]> => {
    const response = await axiosInstance.get<Product[]>('/Products/get-products');
    return response.data;
};

export const getImages = async (id: string): Promise<string[]> => {
    const response = await axiosInstance.get<string[]>(`/Products/list-files/${id}`);
    return response.data;
};

export const uploadImages = async (productId: string, formData:FormData): Promise<string[]> => {
    const response = await axiosInstance.post<string[]>(`/Products/upload?id=${productId}`,formData);
    return response.data;
};

export const getProductDetail = async (id: string): Promise<Product> => {
    const response = await axiosInstance.get<Product>(`/Products/get-product/${id}`);
    return response.data;
};

export const createProduct = async (product: Product): Promise<Product> => {
    const response = await axiosInstance.post<Product>('/Products/create-product', product);
    return response.data;
};

export const editProduct = async (id: number, product: Product): Promise<void> => {
    await axiosInstance.put(`/Products/update-product/${id}`, product);
};

export const deleteProduct = async (id: number): Promise<void> => {
    await axiosInstance.delete(`/Products/delete-product/${id}`);
};
