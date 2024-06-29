import axios from 'axios';
import { apiUrl } from '../const/const';
import { Employee } from '../types/types';

const apiClient = axios.create({
    baseURL: `${apiUrl}/api/Employee/`, // Adjust base URL as needed
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getEmployees = async():Promise<Employee[]> => {
    const response = await apiClient.get('/get-employees');
    return response.data;
};

export const createEmployee = async (employee: Employee): Promise<Employee> => {
    const response = await apiClient.post<Employee>('/create-employee', employee);
    return response.data;
};

export const editEmployee = async (id: number, employee: Employee) => {
    const response = await apiClient.put(`/update-employee/${id}`, employee);
    return response.data;
};

export const deleteEmployee = async (id: number) => {
    const response = await apiClient.delete(`/delete-employee/${id}`);
    return response.data;
};
