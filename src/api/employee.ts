import { Employee } from '../types/types';
import { axiosInstance } from './axios-config';

export const getEmployees = async():Promise<Employee[]> => {
    const response = await axiosInstance.get('/Employee/get-employees');
    return response.data;
};

export const createEmployee = async (employee: Employee): Promise<Employee> => {
    const response = await axiosInstance.post<Employee>('/Employee/create-employee', employee);
    return response.data;
};

export const editEmployee = async (id: number, employee: Employee) => {
    const response = await axiosInstance.put(`/Employee/update-employee/${id}`, employee);
    return response.data;
};

export const deleteEmployee = async (id: number) => {
    const response = await axiosInstance.delete(`/Employee/delete-employee/${id}`);
    return response.data;
};
