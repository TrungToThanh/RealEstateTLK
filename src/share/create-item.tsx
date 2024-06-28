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
  Tooltip,
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
import type { GetProp, UploadFile, UploadProps } from "antd";
import axios from "axios";
import { RcFile } from "antd/es/upload";
import { apiUrl } from "../const/const";

type Props = {
  open: boolean;
  onClose: () => void;
};
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export const CreateItemComponent = ({ open, onClose }: Props) => {
  const [provincesOptions, setProvincesOptions] = useState([]);
  const [districtsOptions, setDistrictsOptions] = useState([]);
  const [wardsOptions, setWardsOptions] = useState([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [base64, setBase64] = useState("");

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

  const handleUploadFiles = async (productId: string) => {
    if (fileList.length === 0) {
      return "";
    }

    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files", file.originFileObj as RcFile, file.name);
    });

    try {
      const response = await axios.post(
        `${apiUrl}/api/Products/upload?id=${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data.filePaths.join(", ");
    } catch (error) {
      return "";
    }
  };

  const onFinish = async (values: Product) => {
    const productId = uuidv4();
    const imagesList = await handleUploadFiles(productId);
    if (!imagesList || !imagesList.length) {
      message.error("Thất bại!");
      setTimeout(() => {
        onClose();
      }, 1000);
    }
    const valuesSubmit = {
      id: 0,
      productId: productId,
      title: values.title,
      description: values.description || "",
      square: values.square || 0,
      frontWidth: values.frontWidth || 0,
      backWidth: values.backWidth || 0,
      length: values.length || 0,
      price: values.price || 0,
      province: values.province || "",
      district: values.district || "",
      ward: values.ward || "",
      location: values.location || "",
      status: 0,
      createdBy: sessionStorage.getItem("TKL_login_user") || "",
      createdAt: dayjs().toISOString(),
      images: [imagesList],
      thumbnail: base64,
      executionPrice: values.executionPrice || 0,
      transactionPrice: 0,
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

  const beforeUpload = (file: FileType) => {
    const fileTypeList = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/gif",
      "image/svg",
    ];
    const isPermitExtension = fileTypeList?.includes(
      file?.type?.toLocaleLowerCase()
    );
    if (!isPermitExtension) {
      message.error("Hãy chọn ảnh có định dang JPG/PNG/GIF,SVG file!");
    }
    const isLt2M = file?.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      message.error("Chỉ được phép tải file < 2MB!");
    }
    if (isPermitExtension && isLt2M) {
      const handleBase64 = async () => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            setBase64(reader.result);
          }
        };
        reader.readAsDataURL(file);
      };
      handleBase64();
    } else {
      setBase64("");
    }

    return isPermitExtension && isLt2M;
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
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
          name="createItem"
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
                className="w-full"
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
                className="w-full"
              />
            </Form.Item>
          </Space>
          <Space className="w-full justify-between m-0 p-0 gap-2">
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
                className="w-full"
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
                className="w-full"
              />
            </Form.Item>
          </Space>
          <Space className="w-full justify-between m-0 p-0 gap-2">
            <Form.Item
              label="Giá khởi điểm"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền đầy đủ thông tin",
                },
              ]}
              hasFeedback
              validateTrigger={["onChange", "onBlur"]}
              name="executionPrice"
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
            <Form.Item
              label="Giá khớp lệnh"
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

          <Upload
            listType="picture-card"
            maxCount={5}
            onPreview={() => true}
            fileList={fileList}
            onChange={handleChange}
            beforeUpload={beforeUpload}
          >
            <Tooltip title="Đăng tối đa 5 ảnh, mỗi ảnh không quá 2Mb" showArrow>
              <PlusOutlined /> Tải ảnh
            </Tooltip>
          </Upload>

          <Form.Item>
            <Space className="w-full justify-center">
              <Button
                type="primary"
                htmlType="submit"
                ghost
                icon={<PlusCircleOutlined />}
                disabled={!fileList?.length}
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
