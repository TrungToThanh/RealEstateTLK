import { axiosInstance } from "./axios-config";

export const login = (email: string, password: string) => {
    return axiosInstance.post(`/Auth/login`, { email, password });
};