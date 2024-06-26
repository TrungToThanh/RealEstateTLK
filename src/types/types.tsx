export type NotificationType = "success" | "info" | "warning" | "error";

export interface Product {
  id: number;
  productId: string;
  title: string;
  description?: string; // Optional field
  square?: string; // Optional field
  frontWidth?: string; // Optional field
  backWidth?: string; // Optional field
  length?: string; // Optional field
  price: number;
  province?: string; // Optional field
  district?: string; // Optional field
  ward?: string; // Optional field
  location?: string; // Optional field
  status: number;
  createdBy?: string; // Optional field
  createdAt: string; // Can be string if using ISO date strings
  images: string[];
}

export type Profile = {
  id?: string;
  email: string;
  name: string;
  password?: string;
  numberPhone: number;
};
