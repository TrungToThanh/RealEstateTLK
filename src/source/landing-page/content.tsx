import { ProductComponent } from "../../share/products";
import { Content } from "antd/es/layout/layout";

export const ContentComponent = () => {
  return (
    <Content className="bg-white max-w-[1200px]">
      <ProductComponent />
    </Content>
  );
};
