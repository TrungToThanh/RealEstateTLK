import { PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  message,
} from "antd";
import Upload from "antd/es/upload/Upload";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { GetDistricts, GetProvinces, GetWards } from "../api/location";
import { Product } from "../types/types";
import { createProduct } from "../api/product";
import { v4 as uuidv4 } from "uuid";

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

  const onFinish = async (values: Product) => {
    const valuesSubmit = {
      id: 0,
      productId: uuidv4(),
      title: values.title,
      description: values.description || "",
      square: values.square?.toString() || "",
      frontwidth: values.frontWidth?.toString() || "",
      backwidth: values.backWidth?.toString() || "",
      length: values.length?.toString() || "",
      price: values.price || 0,
      province: values.province || "",
      district: values.district || "",
      ward: values.ward || "",
      location: values.location || "",
      status: 0,
      createdBy: values.createdAt || "",
      createdAt: dayjs().toISOString(),
      images: [""],
    };
    const res = await createProduct(valuesSubmit);
    if (res) {
      message.success("Thành công!");
      setTimeout(() => {
        onClose();
      }, 1000);
    } else {
      message.error("Thất bại!");
      setTimeout(() => {
        onClose();
      }, 1000);
    }
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
          form={form}
          name="control-hooks"
          onFinish={onFinish}
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
            name="title"
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
          <Space className="w-full justify-between m-0 p-0 gap-2">
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
                className="w-full max-w-32"
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
          </Space>
          <Space>
            <Form.Item
              label="Mặt trước"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền đầy đủ thông tin",
                },
              ]}
              hasFeedback
              validateTrigger={["onChange", "onBlur"]}
              name="frontwidth"
            >
              <InputNumber
                placeholder="Mặt trước"
                addonAfter="m"
                maxLength={5}
                className="w-full max-w-32"
              />
            </Form.Item>
            <Form.Item
              label="Mặt sau"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền đầy đủ thông tin",
                },
              ]}
              hasFeedback
              validateTrigger={["onChange", "onBlur"]}
              name="backwidth"
            >
              <InputNumber
                placeholder="Mặt sau"
                addonAfter="m"
                maxLength={5}
                className="w-full max-w-32"
              />
            </Form.Item>
            <Form.Item
              label="Chiều dài"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền đầy đủ thông tin",
                },
              ]}
              hasFeedback
              validateTrigger={["onChange", "onBlur"]}
              name="length"
            >
              <InputNumber
                placeholder="Chiều dài"
                addonAfter="m"
                maxLength={5}
                className="w-full max-w-32"
              />
            </Form.Item>
          </Space>
          <Divider orientation="left">Vị trí:</Divider>

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
            name="ward"
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
            name="location"
          >
            <Input placeholder="Link google map" />
          </Form.Item>

          <Divider orientation="left">Hình ảnh:</Divider>
          <Form.Item
            label="Ảnh (Tối đa 5 ảnh):"
            valuePropName="fileList"
            // rules={[{ required: true }]}
            name="images"
          >
            <Upload listType="picture-card" maxCount={5} onPreview={() => true}>
              <Button style={{ border: 0, background: "none" }}>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Tải ảnh</div>
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Space className="w-full justify-center">
              <Button
                type="primary"
                htmlType="submit"
                ghost
                icon={<PlusCircleOutlined />}
              >
                Tạo tin mới
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
