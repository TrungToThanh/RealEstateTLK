import { Dayjs } from "dayjs";

export type NotificationType = "success" | "info" | "warning" | "error";

export interface Product {
  id: number;
  productId: string;
  title: string;
  description?: string;
  square?: number;
  frontWidth?: number;
  backWidth?: number;
  length?: number;
  price: number;
  province?: string;
  district?: string;
  ward?: string;
  location?: string;
  status: number;
  createdBy?: number;
  createdAt: string;
  images: string[];
  thumbnail: string;
  executionPrice: number;
  transactionPrice: number;
}

export type Profile = {
  id?: string;
  email: string;
  name: string;
  password?: string;
  numberPhone: number;
};

export type Address = {
  label: string;
  value: string;
};

export type Employee = {
  id?: number;
  name: string;
  position: string;
  phone: string;
  birth: string | Dayjs;
  salary: number;
  password: string;
  email: string;
  role: string;
  gender: string;
  address: string;
};

export type ProductSearch = {
  province?: string;
  district?: string;
  ward?: string;
  priceFrom?: number;
  priceTo?: number;
  squareFrom?: number;
  squareTo?: number;
};
