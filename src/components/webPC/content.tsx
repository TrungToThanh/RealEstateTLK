import { Space } from "antd";
import { SearchComponent } from "../../share/search";
import { ProductComponent } from "./products";

export const ContentComponent = () => {
  return (
    <Space
      direction="vertical"
      className="bg-white justify-center w-full mx-auto"
    >
      <SearchComponent />
      <ProductComponent />
    </Space>
  );
};
