import { SearchComponent } from "../../../share/search";
import { ProductComponent } from "./products";
import { Content } from "antd/es/layout/layout";

export const ContentComponent = () => {
  return (
    <Content className="bg-white">
      <SearchComponent />
      <ProductComponent />
    </Content>
  );
};
