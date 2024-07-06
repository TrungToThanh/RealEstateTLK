import {
  GatewayOutlined,
  PhoneOutlined,
  PictureOutlined,
  ShareAltOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  message,
  Row,
  Space,
  Tooltip,
  Watermark,
} from "antd";
import Meta from "antd/es/card/Meta";
import { Product } from "../types/types";
import { useContext, useState } from "react";
import { ProductsDetail } from "./product-details";
import { wardsList } from "../const/wards";
import dayjs from "dayjs";
import { ProductsContext } from "../components/product-provider";
import logo from "../assets/logowhite.png";
import styles from "./card-product.module.scss";
import { handleModifyPrice } from "../utils/price";
type CardProductComponentProps = {
  setOpenModalContact: (value: boolean) => void;
  product: Product;
  setUserId: (value: number) => void;
  isShowTransferButton?: boolean;
};

export const CardProductComponent = ({
  setOpenModalContact,
  product,
  setUserId,
  isShowTransferButton = false,
}: CardProductComponentProps) => {
  const [openModalProductDetail, setOpenModalProductDetail] = useState(false);
  const { employee } = useContext(ProductsContext);

  const wardName =
    wardsList?.find((item) => item.wardId === product.ward)?.ward || "";
  const districtName =
    wardsList?.find((item) => item.districtId === product.district)?.district ||
    "";
  const provinceName =
    wardsList?.find((item) => item.provinceId === product.province)?.province ||
    "";

  return (
    <>
      <Card
        className={styles.card}
        key={product.id}
        hoverable
        style={{ padding: 0, margin: 0 }}
        cover={
          <>
            <Watermark
              content="Tho Kim Land"
              image={logo}
              height={50}
              width={120}
              rotate={-20}
              gap={[100, 140]}
            >
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
                {isShowTransferButton ? (
                  <Button
                    type="primary"
                    onClick={() =>
                      message.info("Chức năng này sẽ triển khai ở giai đoạn 2")
                    }
                  >
                    Chuyển trạng thái
                  </Button>
                ) : (
                  <>
                    <Button
                      icon={<ShareAltOutlined />}
                      onClick={() => window.open(product.location)}
                    />
                    <Button
                      icon={<PhoneOutlined />}
                      onClick={() => {
                        setOpenModalContact(true);
                        setUserId(product.createdBy || 0);
                      }}
                    />
                  </>
                )}
              </Space>
            </Space>
          </div>,
        ]}
      >
        <Meta
          title={
            <Row onClick={() => setOpenModalProductDetail(true)}>
              <div className="text-wrap block text-md text-start pt-0">
                <p className="text-md px-4 text-blue-900 font-bold h-12">
                  {product.title}
                </p>
                <p className="bg-transparent px-4">
                  <TagsOutlined />
                  <span className="px-1 text-red-700">
                    {handleModifyPrice(product.price)}
                  </span>
                </p>
                <p className="px-4">
                  <ShareAltOutlined />
                  <Tooltip
                    destroyTooltipOnHide
                    title={`${provinceName}-${districtName}-${wardName}`}
                  >
                    <span className="w-full wrap text-xs px-1">{wardName}</span>
                  </Tooltip>
                </p>
                <p className="px-4 text-xs pb-2">
                  <GatewayOutlined />
                  <span className="px-1">
                    Diện tích: {product.square}m2 | Mặt tiền:{" "}
                    {product.frontWidth}m
                  </span>
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
