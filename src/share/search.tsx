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
      className="w-full justify-between mx-auto p-2  border rounded-md"
    >
      <Space.Compact size="large">
        <Form.Item className="font-bold" label="Tỉnh/TP:" name="province">
          <Select
            defaultValue="lucy"
            style={{ width: 180 }}
            options={[{ value: "lucy", label: "Lucy" }]}
          />
        </Form.Item>

        <Form.Item className="font-bold" label="Huyện:" name="Town">
          <Select
            defaultValue="lucy"
            style={{ width: 180 }}
            options={[{ value: "lucy", label: "Lucy" }]}
          />
        </Form.Item>
        <Form.Item className="font-bold" label="Xã:" name="Melet">
          <Select
            defaultValue="lucy"
            style={{ width: 180 }}
            options={[{ value: "lucy", label: "Lucy" }]}
          />
        </Form.Item>
        <Form.Item className="font-bold" label="Diện tích:" name="Square">
          <Select
            defaultValue="lucy"
            style={{ width: 180 }}
            options={[{ value: "lucy", label: "Lucy" }]}
            dropdownRender={() => <Slider defaultValue={30} marks={marks} />}
          />
        </Form.Item>
        <Form.Item className="font-bold" label="Mức giá:" name="Price">
          <Select
            defaultValue="lucy"
            style={{ width: 180 }}
            options={[{ value: "lucy", label: "Lucy" }]}
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
