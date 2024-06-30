export const apiUrl = import.meta.env.VITE_API_BASE_URL;

export enum ProductStatus {
  Public = "Public",
  Going = "Going",
  Done = "Done",
}

export const defaultSearch = {
  province: "",
  district: "",
  ward: "",
  priceFrom: 0,
  priceTo: 0,
  squareFrom: 0,
  squareTo: 0,
};
