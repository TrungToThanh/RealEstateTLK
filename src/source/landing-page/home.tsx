import { Button, Card, Col, Divider, Layout, List, Row } from "antd";
import { HeaderComponent } from "../../components/header";
import banner from "../../assets/desktop.webp";
import { useContext, useMemo } from "react";
import { ProductsContext } from "../../components/product-provider";
import dayjs from "dayjs";
import { CardProductComponent } from "../../share/card-products";
import { Product } from "../../types/types";
import Search from "antd/es/input/Search";
import { useNavigate } from "react-router-dom";
import { CardGoodUser } from "../../share/card-good-user";
import { AboutUs } from "../../components/landing-page/about-us";
export const HomePage = () => {
  const navigator = useNavigate();
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
    <Layout className="w-full h-full bg-[#f9f9f9]">
      <HeaderComponent />
      <div>
        <Layout.Content className="relative z-0 w-full h-fit max-h-96 justify-center mx-auto">
          <div>
            <img
              src={banner} // Replace with your image path
              alt="Background Image"
              className="object-cover w-full h-full max-h-96 absolute top-0 left-0 z-0"
            />
            <div className="max-w-7xl mx-auto px-4 py-24 text-center relative z-10">
              <h1 className="text-4xl font-bold text-white mb-8">
                Welcome to Our Website
              </h1>
              <p className="text-lg text-white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                convallis libero eu leo fermentum.
              </p>
              <Search
                size="large"
                placeholder="Search..."
                className=" max-w-[600px]"
              />
            </div>
          </div>
        </Layout.Content>
        <div className="pt-10 w-full justify-start">
          <Divider />
          <h1>Tin mới đăng:</h1>
          {(products?.length > 0 || newProducts?.length > 0) && (
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
              dataSource={newProducts || []}
              renderItem={(product: Product) => (
                <List.Item key={product.id}>
                  <div className="px-2">
                    <CardProductComponent
                      setOpenModalContact={(value: boolean) => undefined}
                      product={product}
                    />
                  </div>
                </List.Item>
              )}
            />
          )}

          <Button onClick={() => navigator("/products")}> Load more</Button>
        </div>
        <AboutUs />
        <div className="mt-8">
          <Row gutter={16}>
            <Col span={6}>
              <Card title="Card title" bordered={false}>
                Card content
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Card title" bordered={false}>
                Card content
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Card title" bordered={false}>
                Card content
              </Card>
            </Col>
            <Col span={6}>
              <CardGoodUser name="ABC" content="ABC" />
            </Col>
          </Row>
        </div>
      </div>
    </Layout>
  );
};
