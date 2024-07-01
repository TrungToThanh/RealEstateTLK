// src/axiosConfig.ts
import axios from "axios";
// import { message } from "antd";
import { apiUrl } from "../const/const";

// Create an Axios instance
export const axiosInstance = axios.create({
  baseURL: `${apiUrl}/api/`, // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add token here if needed
    const token = localStorage.getItem("TKL_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        // Show notification for 401 errors
        // message.error("Bạn chưa đăng nhập hoặc đăng nhập sai mật khẩu!");

        // Optionally, redirect to login page or handle logout
        // window.location.href = '/login'; // Uncomment if you want to redirect to the login page
      } else {
        // Handle other errors
        // message.error(
        //   "Đã có lỗi xảy ra, vui lòng kiểm tra lại hoặc liên hệ hỗ trợ!"
        // );
      }
    }
    return Promise.reject(error);
  }
);
