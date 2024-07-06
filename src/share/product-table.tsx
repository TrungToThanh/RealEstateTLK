import { Avatar, Button, Segmented, Space, Table } from "antd";
import { useContext, useMemo, useState } from "react";
import { Product } from "../types/types";
import { ProductsContext } from "../components/product-provider";
import dayjs from "dayjs";
import { ProductsDetail } from "./product-details";
import { NotificationOutlined, ProfileOutlined } from "@ant-design/icons";

export const ProductTableComponent = () => {
  const [showAll, setShowProduct] = useState(false); //true: show all, false: show new
  const [openModalProductDetail, setOpenModalProductDetail] = useState(false);
  const { employee, products } = useContext(ProductsContext);

  const newProducts = useMemo(() => {
    const list =
      products?.filter((product) => {
        return dayjs().diff(dayjs(product.createdAt), "days") < 1;
      }) || [];
    return list;
  }, [products]);

  const columns = [
    {
      title: "Mô tả",
      dataIndex: "title",
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, product: Product) => (
        <Space className="w-fit px-1 justify-between">
          <p className="flex items-center my-auto">
            <Avatar
              src="https://api.dicebear.com/7.x/miniavs/svg?seed=8"
              size="small"
              shape="circle"
              className="border-1 bg-slate-500"
            />
            <div className="px-2">
              <p className="text-xs">
                {employee?.find(
                  (x) => Number(x.id) === Number(product.createdBy)
                )?.name || ""}
              </p>
            </div>
            <p className="text-xs">
              {dayjs(product.createdAt).format("DD/MM/YYYY")}
            </p>
          </p>
        </Space>
      ),
    },
    {
      title: "Xem",
      dataIndex: "",
      key: "x",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, product: Product) => (
        <>
          <Button onClick={() => setOpenModalProductDetail(true)}>
            Chi tiết
          </Button>
          <ProductsDetail
            product={product}
            open={openModalProductDetail}
            onClose={() => setOpenModalProductDetail(false)}
            setOpenModalContact={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <Segmented
        options={[
          {
            label: "Tin mới",
            value: "new",
            icon: <NotificationOutlined />,
          },
          {
            label: "Tất cả",
            value: "all",
            icon: <ProfileOutlined />,
          },
        ]}
        onChange={(value) => {
          setShowProduct(value === "all");
        }}
      />
      <Table columns={columns} dataSource={showAll ? products : newProducts} />
    </>
  );
};
