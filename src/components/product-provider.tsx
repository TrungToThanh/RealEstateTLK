import React, { createContext, useEffect, useState } from "react";
import { Product } from "../types/types";
import { getProducts } from "../api/product";

interface ContextInterface {
  products: Product[];
}

const getContext: () => ContextInterface = () => ({
  products: [],
});

const initialContext = getContext();

export const ProductsContext = createContext<ContextInterface>(initialContext);

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getInitial = async () => {
      const products = await getProducts();
      setProducts(products || []);
    };

    getInitial();
  }, []);
  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};
