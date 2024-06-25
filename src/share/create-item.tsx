import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, InputNumber, Modal, Select } from "antd";
import Upload from "antd/es/upload/Upload";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { GetProvinces } from "../api/get-provinces";
import { GetDistricts } from "../api/get-districts";
import { GetWards } from "../api/get-wards";
import { useForm } from "antd/es/form/Form";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const CreateItemComponent = ({ open, onClose }: Props) => {
  const [provincesOptions, setProvincesOptions] = useState([]);
  const [districtsOptions, setDistrictsOptions] = useState([]);
  const [wardsOptions, setWardsOptions] = useState([]);
  const [form] = useForm();

  useEffect(() => {
    const getInfo = async () => {
      const provinces = await GetProvinces();
      setProvincesOptions(provinces);
      setDistrictsOptions([]);
      setWardsOptions([]);
    };
    getInfo();
  }, []);

  const handleGetDistricts = async (Id: string) => {
    form.setFieldsValue({ districts: "" });
    form.setFieldsValue({ wards: "" });

    const districts = await GetDistricts(Id);
    setDistrictsOptions(districts);
    setWardsOptions([]);
  };

  const handleGetWards = async (Id: string) => {
    const wards = await GetWards(Id);
    setWardsOptions(wards);
  };

  return (
    <>
      <Modal
        open={open}
        onCancel={onClose}
        title="Tạo tin mới"
        footer={<></>}
        className="w-full gap-0"
      >
        <Form
          layout="vertical"
          scrollToFirstError
          title="Đăng tin mới"
          initialValues={{
            square: 0,
            price: 0,
            createBy: "TOTRUNG",
            createAt: dayjs(),
            status: "Đang giao dịch",
          }}
          className="w-full justify-center gap-0"
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
              onChange={(Id) => handleGetDistricts(Id)}
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
      </Modal>
    </>
  );
};
