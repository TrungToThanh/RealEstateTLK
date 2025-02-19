import { Empty, List } from "antd";
import { CardProductComponent } from "./card-products";
import { useContext, useMemo, useState } from "react";
import { ModalContact } from "./modal-contact";
import { Product } from "../types/types";
import { ProductsContext } from "../components/product-provider";
import dayjs from "dayjs";

type Props = {
  isShowTransferButton?: boolean;
};
export const ProductComponent = ({ isShowTransferButton = false }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showAll] = useState(true); //true: show all, false: show new
  const [openModalContact, setOpenModalContact] = useState(false);
  const [userId, setUserId] = useState<number>();
  const { products } = useContext(ProductsContext);

  const newProducts = useMemo(() => {
    if (!products.length) return [];
    const list =
      (products &&
        products?.filter((product) => {
          return dayjs().diff(dayjs(product.createdAt), "days") < 1;
        })) ||
      [];
    return list;
  }, [products]);

  return (
    <div>
      <div className="sticky top-0 z-50">
        {/* <Flex
          className={`w-full sticky top-0 z-50 items-center justify-between my-2 bg-[#1677ff] p-1 rounded-md`}
        >
          <Segmented
            options={[
              {
                label: "Tất cả",
                value: "all",
                icon: <ProfileOutlined />,
              },
              {
                label: "Tin mới",
                value: "new",
                icon: <NotificationOutlined />,
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
        </Flex> */}
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
                  isShowTransferButton={isShowTransferButton}
                  setOpenModalContact={(value) => setOpenModalContact(value)}
                  setUserId={(value) => setUserId(value)}
                  product={product}
                />
              </div>
            </List.Item>
          )}
        />
      )}
      <ModalContact
        open={openModalContact}
        userId={userId}
        onClose={() => setOpenModalContact(false)}
      />
    </div>
  );
};
