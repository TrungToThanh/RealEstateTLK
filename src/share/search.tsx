import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Select, Slider, SliderSingleProps, Space } from "antd";

export const SearchComponent = () => {
  const marks: SliderSingleProps["marks"] = {
    0: "10m2",
    100: {
      style: {
        color: "#f50",
      },
      label: <strong>1000m2</strong>,
    },
  };
  return (
    <Form
      name="basic"
      layout="vertical"
      labelAlign="left"
      autoComplete="off"
      className="w-full justify-between mx-auto p-2 border rounded-md bg-white mt-4"
    >
      <Space.Compact size="large">
        <Form.Item className="font-bold" label="Tỉnh/TP:" name="province">
          <Select
            defaultValue="Hà Nội"
            style={{ width: 180 }}
            options={[
              { value: "Hà Nội", label: "Hà Nội" },
              { value: "Hòa Bình", label: "Hòa Bình" },
            ]}
          />
        </Form.Item>

        <Form.Item className="font-bold" label="Huyện:" name="Town">
          <Select
            defaultValue="Chương Mỹ"
            style={{ width: 180 }}
            options={[
              { value: "Chương Mỹ", label: "Chương Mỹ" },
              { value: "Hà Đông", label: "Hà Đông" },
            ]}
          />
        </Form.Item>
        <Form.Item className="font-bold" label="Xã:" name="Melet">
          <Select
            defaultValue="Lam Điền"
            style={{ width: 180 }}
            options={[
              { value: "Lam Điền", label: "Lam Điền" },
              { value: "Thụy Hương", label: "Thụy Hương" },
            ]}
          />
        </Form.Item>
        <Form.Item className="font-bold" label="Diện tích:" name="Square">
          <Select
            defaultValue="100m2"
            style={{ width: 180 }}
            options={[{ value: "lucy", label: "Lucy" }]}
            dropdownRender={() => <Slider defaultValue={30} marks={marks} />}
          />
        </Form.Item>
        <Form.Item className="font-bold" label="Mức giá:" name="Price">
          <Select
            defaultValue="500 triệu tới 1 tỷ"
            style={{ width: 180 }}
            options={[
              { value: "Dưới 500 triệu", label: "Dưới 500 triệu" },
              { value: "500 triệu tới 1 tỷ", label: "500 triệu tới 1 tỷ" },
              { value: "1 tỷ tới 2 tỷ", label: "1 tỷ tới 2 tỷ" },
              { value: "> 2 tỷ", label: "> 2 tỷ" },
            ]}
          />
        </Form.Item>
        <Form.Item label=" " name=" ">
          <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
            Tìm Kiếm
          </Button>
        </Form.Item>
      </Space.Compact>
    </Form>
  );
};
