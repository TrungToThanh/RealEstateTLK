import { Flex, List, Segmented } from "antd";
import { CardProductComponent } from "./card-products";
import { NotificationOutlined, ProfileOutlined } from "@ant-design/icons";
import { useContext, useMemo, useState } from "react";
import { ModalContact } from "./modal-contact";
import { Product } from "../types/types";
import { ProductsContext } from "../components/product-provider";
import dayjs from "dayjs";
import { useGetSizeDevices } from "../hooks/use-get-size-devices";

export const ProductComponent = () => {
  const { isNormalPhone, isLaptop } = useGetSizeDevices();

  const [pageSizeValue, setPageSize] = useState(8);
  const [showAll, setShowProduct] = useState(false); //true: show all, false: show new
  const [openModalContact, setOpenModalContact] = useState(false);

  const { products } = useContext(ProductsContext);

  const newProducts = useMemo(() => {
    const list =
      products?.filter((product) => {
        console.log(dayjs().diff(dayjs(product.createdAt), "days"));
        return dayjs().diff(dayjs(product.createdAt), "days") < 1;
      }) || [];
    return list;
  }, [products]);

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
      </Flex>

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
          gutter: 0,
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
      <ModalContact
        open={openModalContact}
        onClose={() => setOpenModalContact(false)}
      />
    </>
  );
};
