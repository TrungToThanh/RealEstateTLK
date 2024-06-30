import React, { createContext, useEffect, useState } from "react";
import { Address, Employee, Product } from "../types/types";
import { wardsList } from "../const/wards";
import { getEmployees } from "../api/employee";

interface ContextInterface {
  products: Product[];
  wards: Address[];
  districts: Address[];
  provinces: Address[];
  employee: Employee[];
  setProductSearch: (products: Product[]) => void;
}

const getContext: () => ContextInterface = () => ({
  products: [],
  wards: [],
  districts: [],
  provinces: [],
  employee: [],
  setProductSearch: () => null,
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

  useEffect(() => {
    const getInitial = async () => {
      // const products = await searchProducts({
      //   province: undefined,
      //   district: undefined,
      //   ward: undefined,
      //   priceFrom: 0,
      //   priceTo: 0,
      //   squareFrom: 0,
      //   squareTo: 0,
      // });
      // setProducts(products || []);

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

  const handleSetProducts = (products: Product[]) => {
    setProducts(products);
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        provinces: uniqueProvinces,
        districts: uniqueDistricts,
        wards: uniqueWards,
        employee: employees,
        setProductSearch: handleSetProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
