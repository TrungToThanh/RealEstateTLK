import React, { createContext, useEffect, useState } from "react";
import { Address, Employee, Product } from "../types/types";
import { getProducts } from "../api/product";
import { wardsList } from "../const/wards";
import { getEmployees } from "../api/employee";

interface ContextInterface {
  products: Product[];
  wards: Address[];
  districts: Address[];
  provinces: Address[];
  employee: Employee[];
  userLogin: Employee | null;
  setProductSearch: (products: Product[]) => void;
  setUserLogin: (employee: Employee | null) => void;
  setResetProducts: () => void;
}

const getContext: () => ContextInterface = () => ({
  products: [],
  wards: [],
  districts: [],
  provinces: [],
  employee: [],
  userLogin: null,
  setProductSearch: () => null,
  setUserLogin: () => null,
  setResetProducts: () => null,
});

const initialContext = getContext();

export const ProductsContext = createContext<ContextInterface>(initialContext);

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [userLoginAccount, setUserLogin] = useState<Employee | null>(null);

  useEffect(() => {
    const getInitial = async () => {
      const products = await getProducts();
      setProducts(products || []);

      const employee = await getEmployees();
      setEmployees(employee);
    };

    getInitial();
  }, []);

  const uniqueWards =
    wardsList?.map((item) => {
      return {
        label: item.ward || "",
        value: item.wardId || "",
      };
    }) || [];

  const provinces = wardsList
    ?.reduce((accumulator, currentItem) => {
      // Create a unique key based on province and provinceId
      const key = `${currentItem.province}_${currentItem.provinceId}`;

      // Check if the key already exists in the Map
      if (!accumulator.has(key)) {
        // If it doesn't exist, add it to the Map
        accumulator.set(key, {
          label: currentItem.province,
          value: currentItem.provinceId,
        });
      }

      return accumulator;
    }, new Map())
    .values();

  // Use Set to remove duplicates based on province and provinceId
  const uniqueProvinces = Array.from(provinces);

  const districts = wardsList
    ?.reduce((accumulator, currentItem) => {
      // Create a unique key based on province and provinceId
      const key = `${currentItem.district}_${currentItem.districtId}`;

      // Check if the key already exists in the Map
      if (!accumulator.has(key)) {
        // If it doesn't exist, add it to the Map
        accumulator.set(key, {
          label: currentItem.district,
          value: currentItem.districtId,
        });
      }

      return accumulator;
    }, new Map())
    .values();

  // Use Set to remove duplicates based on province and provinceId
  const uniqueDistricts = Array.from(districts);

  const handleSetUserLogin = (employee: Employee | null) => {
    setUserLogin(employee);
  };

  const handleSetProducts = (products: Product[]) => {
    setProducts(products);
  };

  const handleResetProduct = async () => {
    const products = await getProducts();
    setProducts(products || []);
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        provinces: uniqueProvinces,
        districts: uniqueDistricts,
        wards: uniqueWards,
        employee: employees,
        userLogin: userLoginAccount,
        setUserLogin: handleSetUserLogin,
        setProductSearch: handleSetProducts,
        setResetProducts: handleResetProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
