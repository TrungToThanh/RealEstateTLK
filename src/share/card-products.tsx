import {
  GatewayOutlined,
  PhoneOutlined,
  PictureOutlined,
  ShareAltOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, InputNumber, Row, Space, Watermark } from "antd";
import Meta from "antd/es/card/Meta";
import { Product } from "../types/types";
import { useContext, useState } from "react";
import { ProductsDetail } from "./product-details";
import { wardsList } from "../const/wards";
import dayjs from "dayjs";
import { ProductsContext } from "../components/product-provider";

import styles from "./card-product.module.scss";
type CardProductComponentProps = {
  setOpenModalContact: (value: boolean) => void;
  product: Product;
};

export const CardProductComponent = ({
  setOpenModalContact,
  product,
}: CardProductComponentProps) => {
  const [openModalProductDetail, setOpenModalProductDetail] = useState(false);
  const { employee } = useContext(ProductsContext);

  const wardName =
    wardsList?.find((item) => item.wardId === product.ward)?.ward || "";
  return (
    <>
      <Card
        className={styles.card}
        key={product.id}
        hoverable
        style={{ padding: 0, margin: 0 }}
        cover={
          <>
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
                  <p className="w-full flex text-start justify-between absolute mt-[110px] -mx-1 z-10">
                    <p></p>
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
          <div className="w-full justify-between flex text-start -my-2 px-4">
            <Space className="w-full px-1 justify-between">
              <p className="flex items-center my-auto">
                <Avatar
                  src="https://api.dicebear.com/7.x/miniavs/svg?seed=8"
                  size="small"
                  shape="circle"
                  className="border-1 bg-slate-500"
                />
                <p className="text-xs mx-2">
                  {employee?.find(
                    (x) => Number(x.id) === Number(product.createdBy)
                  )?.name || ""}
                </p>
                <p className="text-xs">
                  {dayjs(product.createdAt).format("DD/MM/YYYY")}
                </p>
              </p>
              <Space>
                <Button
                  icon={<ShareAltOutlined />}
                  onClick={() => window.open(product.location)}
                />
                <Button
                  icon={<PhoneOutlined />}
                  onClick={() => setOpenModalContact(true)}
                />
              </Space>
            </Space>
          </div>,
        ]}
      >
        <Meta
          title={
            <Row onClick={() => setOpenModalProductDetail(true)}>
              <div className="text-wrap block text-md text-start pt-0">
                <p className="text-xl px-4"> {product.title} </p>
                <p className="text-red-500 font-bold bg-transparent px-1">
                  <InputNumber
                    bordered={true}
                    className="text-red-700 w-fit border-0 bg-transparent"
                    value={product.price}
                    prefix={<TagsOutlined />}
                    formatter={(value) => {
                      if (!value) return "";

                      // Remove non-numeric characters
                      const numericValue = value
                        .toString()
                        ?.replace(/[^0-9]/g, "");

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
                        `${displayValue}`.replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          ","
                        ) +
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
                </p>
                <p className="px-4">
                  <ShareAltOutlined /> {wardName}
                </p>
                <p className="px-4">
                  <GatewayOutlined /> <span>{product.square}</span>
                </p>
              </div>
            </Row>
          }
        />
      </Card>
      {openModalProductDetail && (
        <ProductsDetail
          product={product}
          open={openModalProductDetail}
          onClose={() => setOpenModalProductDetail(false)}
          setOpenModalContact={() => setOpenModalContact(true)}
        />
      )}
    </>
  );
};
