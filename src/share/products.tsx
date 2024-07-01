import { Empty, Flex, List, Segmented } from "antd";
import { CardProductComponent } from "./card-products";
import { NotificationOutlined, ProfileOutlined } from "@ant-design/icons";
import { useContext, useMemo, useState } from "react";
import { ModalContact } from "./modal-contact";
import { Product } from "../types/types";
import { ProductsContext } from "../components/product-provider";
import dayjs from "dayjs";

export const ProductComponent = () => {
  const [showAll, setShowProduct] = useState(false); //true: show all, false: show new
  const [openModalContact, setOpenModalContact] = useState(false);

  const { products } = useContext(ProductsContext);

  const newProducts = useMemo(() => {
    if (!products.length) return [];
    const list =
      (products &&
        products?.filter((product) => {
          console.log(dayjs().diff(dayjs(product.createdAt), "days"));
          return dayjs().diff(dayjs(product.createdAt), "days") < 1;
        })) ||
      [];
    return list;
  }, [products]);

  return (
    <div>
      <div className="sticky top-0 z-50">
        <Flex
          className={`w-full sticky top-0 z-50 items-center justify-between my-2 bg-[#1677ff] p-1 rounded-md`}
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
          <p className="text-md font-bold px-2 text-white">
            Hiện có:{" "}
            {showAll ? products?.length || 0 : newProducts?.length || 0} tin
          </p>
        </Flex>
      </div>
      {!products?.length && !newProducts?.length && (
        <Empty
          description={<> Không có dữ liệu </>}
          className="pt-40 h-[100vh]"
        />
      )}
      {(products?.length > 0 || newProducts?.length > 0) && (
        <List
          className="mb-40"
          grid={{
            gutter: 0,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 3,
            xl: 3,
            xxl: 3,
          }}
          dataSource={showAll ? products || [] : newProducts || []}
          renderItem={(product: Product) => (
            <List.Item key={product.id}>
              <div className="px-2">
                <CardProductComponent
                  setOpenModalContact={(value) => setOpenModalContact(value)}
                  product={product}
                />
              </div>
            </List.Item>
          )}
        />
      )}
      <ModalContact
        open={openModalContact}
        onClose={() => setOpenModalContact(false)}
      />
    </div>
  );
};
