import { ProductComponent } from "./products";
import { Content } from "antd/es/layout/layout";

export const ContentComponent = () => {
  return (
    <Content className="bg-white">
      <ProductComponent />
    </Content>
  );
};
