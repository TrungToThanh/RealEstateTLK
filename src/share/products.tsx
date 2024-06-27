import { Avatar, Button, Flex, List, Segmented, Space, Table } from "antd";
import { CardProductComponent } from "./card-products";
import {
  AppstoreOutlined,
  BarsOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { ModalContact } from "./modal-contact";
import { getProducts } from "../api/product";
import { Product } from "../types/types";

export const ProductComponent = () => {
  const [pageSizeValue, setPageSize] = useState(8);
  const [showList, setShowList] = useState(true); //false: show table
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    const getProduct = async () => {
      const listProducts = await getProducts();
      console.log(listProducts);
      setProducts(listProducts);
    };
    getProduct();
  }, []);

  const columns = [
    {
      title: "Mô tả",
      dataIndex: "name",
    },
    {
      title: "Khu vực",
      dataIndex: "location",
    },
    {
      title: "Diện tích",
      dataIndex: "square",
    },
    {
      title: "Giá",
      dataIndex: "price",
    },
    {
      title: "Mô giới",
      dataIndex: "createBy",
      render: () => (
        <Space className="w-fit px-1 justify-between">
          <p className="flex items-center my-auto">
            <Avatar
              src="https://api.dicebear.com/7.x/miniavs/svg?seed=8"
              size="small"
              shape="circle"
              className="border-1 bg-slate-500"
            />
            <div className="px-2">
              <p className="text-xs"> N.V.Linh</p>
            </div>
            <p className="text-xs"> 12/06/2024 10h40</p>
          </p>
          <Space>
            <Button icon={<PhoneOutlined />} onClick={() => setOpen(true)} />
          </Space>
        </Space>
      ),
    },
    {
      title: "Xem",
      dataIndex: "",
      key: "x",
      render: () => <a>Chi tiết</a>,
    },
  ];

  return (
    <>
      <Flex className="w-full items-center justify-between my-4">
        <p className="text-md font-bold">
          Sản phẩm: {pageSizeValue}/{products?.length || 0}
        </p>
        <Segmented
          options={[
            {
              label: "Dạng lưới",
              value: "List",
              icon: <AppstoreOutlined />,
            },
            {
              label: "Danh sách",
              value: "Kana",
              icon: <BarsOutlined />,
            },
          ]}
          onChange={(value) => {
            setShowList(value === "List");
          }}
        />
      </Flex>
      <ModalContact open={open} onClose={() => setOpen(false)} />
      {showList ? (
        <List
          pagination={{
            position: "bottom",
            align: "center",
            pageSize: pageSizeValue,
            onChange(page, pageSize) {
              console.log(page);
              setPageSize(pageSize);
            },
          }}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 3,
            xl: 3,
            xxl: 4,
          }}
          className="mt-20"
          dataSource={products}
          renderItem={(product: Product) => (
            <List.Item>
              <div className="px-2">
                <CardProductComponent
                  setOpen={(value) => setOpen(value)}
                  product={product}
                />
              </div>
            </List.Item>
          )}
        />
      ) : (
        <Table columns={columns} dataSource={products} />
      )}
    </>
  );
};
