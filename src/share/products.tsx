import { Avatar, Button, Flex, List, Segmented, Space, Table } from "antd";
import { CardProductComponent } from "./card-products";
import {
  AppstoreOutlined,
  BarsOutlined,
  NotificationOutlined,
  PhoneOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { useContext, useMemo, useState } from "react";
import { ModalContact } from "./modal-contact";
import { Product } from "../types/types";
import { ProductsContext } from "../components/product-provider";
import dayjs from "dayjs";
import { useGetSizeDevices } from "../hooks/use-get-size-devices";
import { ProductsDetail } from "./product-details";

export const ProductComponent = () => {
  const { isIpad, isNormalPhone, isLaptop } = useGetSizeDevices();

  const [pageSizeValue, setPageSize] = useState(8);
  const [showAll, setShowProduct] = useState(false); //true: show all, false: show new
  const [showList, setShowList] = useState(true); //false: show table
  const [openModalContact, setOpenModalContact] = useState(false);
  const [openModalProductDetail, setOpenModalProductDetail] = useState(false);

  const { products } = useContext(ProductsContext);

  const newProducts = useMemo(() => {
    return (
      products?.filter(
        (product) => dayjs().diff(dayjs(product.createdAt), "date") < 2
      ) || []
    );
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
              <p className="text-xs">{product.createdBy}</p>
            </div>
            <p className="text-xs">
              {dayjs(product.createdAt).format("DD/MM/YYYY")}
            </p>
          </p>
          <Space>
            <Button
              icon={<PhoneOutlined />}
              onClick={() => setOpenModalContact(true)}
            />
          </Space>
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
          />
        </>
      ),
    },
  ];

  return (
    <>
      <Flex
        className={`w-full items-center justify-between my-4  ${
          isLaptop ? "mt-52" : isNormalPhone ? "mt-32" : "mt-40"
        }`}
        wrap
      >
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
        <p className="text-md font-bold px-2">
          Hiện có: {showAll ? products?.length || 0 : newProducts?.length || 0}{" "}
          tin
        </p>
        {isIpad && (
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
        )}
      </Flex>
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
          dataSource={showAll ? products : newProducts}
          renderItem={(product: Product) => (
            <List.Item>
              <div className="px-2">
                <CardProductComponent
                  setOpenModalContact={(value) => setOpenModalContact(value)}
                  product={product}
                />
              </div>
            </List.Item>
          )}
        />
      ) : (
        <Table
          columns={columns}
          dataSource={showAll ? products : newProducts}
        />
      )}
      <ModalContact
        open={openModalContact}
        onClose={() => setOpenModalContact(false)}
      />
    </>
  );
};
