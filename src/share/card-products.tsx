import {
  EnvironmentOutlined,
  GatewayOutlined,
  PhoneOutlined,
  PictureOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, InputNumber, Row, Space, Watermark } from "antd";
import Meta from "antd/es/card/Meta";
import { Product } from "../types/types";
import { useState } from "react";
import { ProductsDetail } from "./product-details";
import { wardsList } from "../const/wards";

type CardProductComponentProps = {
  setOpenModalContact: (value: boolean) => void;
  product: Product;
};

export const CardProductComponent = ({
  setOpenModalContact,
  product,
}: CardProductComponentProps) => {
  const [openModalProductDetail, setOpenModalProductDetail] = useState(false);

  const wardName =
    wardsList?.find((item) => item.wardId === product.ward)?.ward || "";
  return (
    <>
      <Card
        key={product.id}
        hoverable
        className="w-full"
        cover={
          <>
            <div className="w-full justify-between flex text-start my-2">
              <Space className="w-full px-1 justify-between">
                <p className="flex items-center my-auto">
                  <Avatar
                    src="https://api.dicebear.com/7.x/miniavs/svg?seed=8"
                    size="small"
                    shape="circle"
                    className="border-1 bg-slate-500"
                  />
                  <div className="px-2">
                    <p className="text-xs"> N.V.Linh</p>
                    <p className="text-xs"> 12/06/2024</p>
                  </div>
                </p>
                <Space>
                  <Button
                    icon={<PhoneOutlined />}
                    onClick={() => setOpenModalContact(true)}
                  />
                </Space>
              </Space>
            </div>
            <Watermark content="Tho Kim Land">
              <img
                alt="example"
                src={product.thumbnail}
                className="p-1 rounded w-full h-60"
                onClick={() => setOpenModalProductDetail(true)}
              />
            </Watermark>
            <Space className="w-full flex justify-between px-2" size={4}>
              <div className="w-[96%] text-end absolute -mt-36 z-10">
                <p className="block">
                  <p className="w-full flex text-start justify-between absolute mt-[116px] -mx-1 z-10">
                    <Button icon={<EnvironmentOutlined />} size="small">
                      {wardName}
                    </Button>
                    <p>
                      {product.images.length || 1} <PictureOutlined />
                    </p>
                  </p>
                </p>
              </div>
            </Space>
          </>
        }
        actions={[
          <p>
            <GatewayOutlined /> <span>{product.square}</span>
          </p>,
          <p>
            <span className="text-red-500 font-bold">
              <InputNumber
                className="text-red-700 w-fit border-0"
                value={product.price}
                formatter={(value) => {
                  if (!value) return "";

                  // Remove non-numeric characters
                  const numericValue = value.toString()?.replace(/[^0-9]/g, "");

                  const isLogin =
                    sessionStorage.getItem("TKL_login") === "true";

                  if (isLogin) {
                    return `${numericValue}`.replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      ","
                    );
                  }

                  const displayValue =
                    numericValue.length > 9
                      ? Math.floor(Number(numericValue) / 1000000000)
                      : numericValue.length > 6
                      ? Math.floor(Number(numericValue) / 1000000)
                      : numericValue;

                  return (
                    `${displayValue}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                    `${
                      numericValue.length > 9
                        ? ",xxx tỷ"
                        : numericValue.length > 6
                        ? ",xxx triệu"
                        : " đồng"
                    }`
                  );
                }}
                parser={(value) =>
                  value?.replace(/\$\s?|(,*)/g, "") as unknown as number
                }
                readOnly
              />
            </span>
          </p>,
          <p>
            <Button
              type="link"
              icon={<ShareAltOutlined />}
              size="small"
              className="-mx-[6px]"
            >
              Chia sẽ
            </Button>
          </p>,
        ]}
      >
        <Meta
          title={
            <Row onClick={() => setOpenModalProductDetail(true)}>
              <span className="text-wrap flex text-md text-start pt-0">
                {product.title}
              </span>
            </Row>
          }
        />
      </Card>
      {openModalProductDetail && (
        <ProductsDetail
          product={product}
          open={openModalProductDetail}
          onClose={() => setOpenModalProductDetail(false)}
        />
      )}
    </>
  );
};
