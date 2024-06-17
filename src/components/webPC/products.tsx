import { List } from "antd";
import { CardProductComponent } from "../../share/card-products";

export const ProductComponent = () => {
  const data = [
    {
      title: "Title 1",
    },
    {
      title: "Title 2",
    },
    {
      title: "Title 3",
    },
    {
      title: "Title 4",
    },
  ];

  return (
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={data}
      renderItem={() => (
        <List.Item>
          <CardProductComponent />
        </List.Item>
      )}
    />
  );
};
