import { useContext, useMemo } from "react";
import { ProductsContext } from "../../../components/product-provider";
import { Button, Card, List, Watermark } from "antd";
import { Product } from "../../../types/types";
import { useNavigate } from "react-router-dom";
import { handleModifyPrice } from "../../../utils/price";
import { wardsList } from "../../../const/wards";
import logo from "../../../assets/logowhite.png";

export const HotProductComponent = () => {
  const navigator = useNavigate();

  const { products } = useContext(ProductsContext);

  const newProducts = useMemo(() => {
    if (!products.length) return [];
    const list: Product[] = [];
    products.forEach((product, index) => {
      if (index < 3) {
        list.push(product);
      }
    });

    return list;
  }, [products]);
  return (
    <div className="w-full justify-center max-w-[1200px] mx-auto">
      <p className="font-bold text-[30px] pt-4">SẢN PHẨM TIÊU BIỂU</p>
      {products?.length > 0 && (
        <List
          grid={{
            gutter: 0,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 3,
            xl: 3,
            xxl: 3,
          }}
          className="!p-0 !m-0"
          dataSource={newProducts || []}
          renderItem={(product: Product) => (
            <List.Item key={product.id}>
              <div className="px-2">
                <Card
                  className="rounded-md justify-start text-start !p-0 !m-0"
                  hoverable
                  onClick={() => navigator("/products")}
                >
                  <Watermark
                    content="Tho Kim Land"
                    image={logo}
                    height={50}
                    width={120}
                    rotate={-20}
                    gap={[100, 140]}
                  >
                    <img
                      src={product.thumbnail}
                      className="h-[250px] w-full object-cover"
                    />
                  </Watermark>
                  <p className="font-bold text-[22px] text-red-600">
                    {handleModifyPrice(product.price)}
                  </p>
                  <p>
                    {wardsList?.find((item) => item.wardId === product.ward)
                      ?.ward || ""}
                  </p>
                  <p>
                    Diện tích: <strong>{product.square}</strong> m2 | Dài:
                    <strong> {product.length} </strong> m
                  </p>
                </Card>
              </div>
            </List.Item>
          )}
        />
      )}

      <Button
        onClick={() => navigator("/products")}
        type="primary"
        size="large"
      >
        Xem tất cả
      </Button>
    </div>
  );
};
