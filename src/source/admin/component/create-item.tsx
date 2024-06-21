import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const CreateItemComponent = () => {
  const [provincesOptions, setProvincesOptions] = useState([]);
  const [districtsOptions, setDistrictsOptions] = useState([]);
  const [wardsOptions, setWardsOptions] = useState([]);

  useEffect(() => {
    getProvinces();
    handleProducts();
  }, []);

  const getProvinces = async () => {
    await axios
      .get("https://open.oapi.vn/location/provinces?page=0&size=100")
      .then((res) => {
        const list = res.data?.data;
        const options = list?.map((item: { id: string; name: string }) => {
          return {
            ...item,
            label: item?.name || "",
            value: item?.id || "",
          };
        });
        setProvincesOptions(options);
        setDistrictsOptions([]);
        setWardsOptions([]);
      });
  };

  const handleGetDistrict = async (Id: string) => {
    setDistrictsOptions([]);
    setWardsOptions([]);
    await axios
      .get(
        `https://open.oapi.vn/location/districts?page=0&size=100&&provinceId=${Id}`
      )
      .then((res) => {
        const list = res.data?.data;
        const options = list?.map((item: { id: string; name: string }) => {
          return {
            ...item,
            label: item?.name || "",
            value: item?.id || "",
          };
        });
        setDistrictsOptions(options);
      });
  };

  const handleGetWards = async (Id: string) => {
    setWardsOptions([]);
    await axios
      .get(
        `https://open.oapi.vn/location/wards?page=0&size=100&&districtId=${Id}`
      )
      .then((res) => {
        const list = res.data?.data;
        const options = list?.map((item: { id: string; name: string }) => {
          return {
            ...item,
            label: item?.name || "",
            value: item?.id || "",
          };
        });
        setWardsOptions(options);
      });
  };

  const handleProducts = async () => {
    setWardsOptions([]);
    await axios.get(`https://localhost:7187/WeatherForecast`).then((res) => {
      const list = res.data?.data;
      console.log(list);
    });
  };
  return (
    <Form
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 16 }}
      style={{
        maxWidth: 800,
      }}
      layout="horizontal"
      scrollToFirstError
      title="Đăng tin mới"
      initialValues={{
        square: 0,
        price: 0,
        createBy: "TOTRUNG",
        createAt: dayjs(),
        status: "Đang giao dịch",
      }}
      className="w-full justify-center "
    >
      <Form.Item label="Mã sản phẩm" name="id">
        <Input placeholder="001" readOnly />
      </Form.Item>

      <Form.Item
        label="Tiêu đề bài đăng"
        rules={[
          {
            required: true,
            whitespace: true,
            message: "Vui lòng điền đầy đủ thông tin",
          },
        ]}
        hasFeedback
        validateTrigger={["onChange", "onBlur"]}
        name="name"
      >
        <Input placeholder="Tiêu đề" showCount maxLength={50} />
      </Form.Item>
      <Form.Item
        label="Mô tả chung"
        rules={[
          {
            required: true,
            whitespace: true,
            message: "Vui lòng điền đầy đủ thông tin",
          },
        ]}
        hasFeedback
        validateTrigger={["onChange", "onBlur"]}
        name="description"
      >
        <Input.TextArea
          rows={3}
          placeholder="Mô tả chung"
          showCount
          maxLength={200}
        />
      </Form.Item>
      <Form.Item
        label="Diện tích:"
        rules={[
          {
            required: true,
            message: "Vui lòng điền đầy đủ thông tin",
          },
        ]}
        hasFeedback
        validateTrigger={["onChange", "onBlur"]}
        name="square"
      >
        <InputNumber
          placeholder="diện tích"
          addonAfter="m2"
          maxLength={5}
          className="w-full"
        />
      </Form.Item>
      <Form.Item
        label="Giá"
        rules={[
          {
            required: true,
            message: "Vui lòng điền đầy đủ thông tin",
          },
        ]}
        hasFeedback
        validateTrigger={["onChange", "onBlur"]}
        name="price"
      >
        <InputNumber<number>
          defaultValue={1000}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) =>
            value?.replace(/\$\s?|(,*)/g, "") as unknown as number
          }
          className="w-full"
          addonAfter="VNĐ"
        />
      </Form.Item>

      <Divider orientation="left">Vị trí</Divider>

      <Form.Item
        label="Tỉnh/Thành Phố"
        rules={[
          {
            required: true,
            whitespace: true,
            message: "Vui lòng điền đầy đủ thông tin",
          },
        ]}
        hasFeedback
        validateTrigger={["onChange", "onBlur"]}
        name="province"
      >
        <Select
          placeholder="Tỉnh/Thành Phố"
          options={provincesOptions || []}
          onChange={(Id) => handleGetDistrict(Id)}
          showSearch
        />
      </Form.Item>
      <Form.Item
        label="Huyện/Thị Trấn"
        rules={[
          {
            required: true,
            whitespace: true,
            message: "Vui lòng điền đầy đủ thông tin",
          },
        ]}
        name="district"
        hasFeedback
        validateTrigger={["onChange", "onBlur"]}
      >
        <Select
          placeholder="Huyện/Thị Trấn"
          options={districtsOptions || []}
          onChange={(Id) => handleGetWards(Id)}
        />
      </Form.Item>
      <Form.Item
        label="Xã/Phường"
        rules={[
          {
            required: true,
            whitespace: true,
            message: "Vui lòng điền đầy đủ thông tin",
          },
        ]}
        name="commune"
        hasFeedback
        validateTrigger={["onChange", "onBlur"]}
      >
        <Select placeholder="Xã/Phường" options={wardsOptions || []} />
      </Form.Item>

      <Form.Item
        label="Tọa độ google map"
        rules={[
          {
            required: true,
            whitespace: true,
            message: "Vui lòng điền đầy đủ thông tin",
          },
        ]}
        hasFeedback
        validateTrigger={["onChange", "onBlur"]}
        name="googleMap"
      >
        <Input placeholder="Link google map" />
      </Form.Item>

      <Divider orientation="left">Hình ảnh:</Divider>
      <Form.Item
        label="Ảnh (Tối đa 5 ảnh):"
        valuePropName="fileList"
        rules={[{ required: true }]}
      >
        <Upload listType="picture-card" maxCount={5} onPreview={() => true}>
          <button style={{ border: 0, background: "none" }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Tải ảnh</div>
          </button>
        </Upload>
      </Form.Item>

      <Divider />
      <div className="text-end">
        <Button type="primary" htmlType="submit">
          Đăng tin
        </Button>
      </div>
    </Form>
  );
};
export default CreateItemComponent;
