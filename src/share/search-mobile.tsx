import { ReadOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Form, InputNumber, Modal, Select, Space } from "antd";
import { useContext, useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { ProductsContext } from "../components/product-provider";
import { Address, ProductSearch } from "../types/types";
import { wardsList } from "../const/wards";
import { searchProducts } from "../api/product";
import { defaultSearch } from "../const/const";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const SearchMobileComponent = ({ open, onClose }: Props) => {
  const { provinces: provincesOption, setProductSearch } =
    useContext(ProductsContext);
  const [districtsOption, setDistrictsOptions] = useState<Address[]>([]);
  const [wardsOption, setWardsOptions] = useState<Address[]>([]);
  const [valueSquareSearch, setValueSquareSearch] = useState("");
  const [valuePriceSearch, setValuePriceSearch] = useState("");

  const [form] = useForm();

  const getDefaultProducts = async () => {
    const products = await searchProducts(defaultSearch);
    setProductSearch(products || []);
  };

  useEffect(() => {
    getDefaultProducts();
    form.resetFields();
    setValueSquareSearch("");
    setValuePriceSearch("");
  }, []);

  const handleGetDistricts = async (provinceId: string) => {
    form.setFieldsValue({ districts: "" });
    form.setFieldsValue({ wards: "" });

    const districtsSet = new Set();
    const districts: Address[] = [];

    wardsList
      .filter((item) => item.provinceId === provinceId)
      .forEach((item) => {
        const key = `${item.district}_${item.districtId}`;
        if (!districtsSet.has(key)) {
          districtsSet.add(key);
          districts.push({
            label: item.district,
            value: item.districtId,
          });
        }
      });

    setDistrictsOptions(districts);
    setWardsOptions([]);
  };

  const handleGetWards = async (districtId: string) => {
    const wardsSet = new Set();
    const wards: Address[] = [];

    wardsList
      .filter((item) => item.districtId === districtId)
      .forEach((item) => {
        const key = `${item.ward}_${item.wardId}`;
        if (!wardsSet.has(key)) {
          wardsSet.add(key);
          wards.push({
            label: item.ward || "",
            value: item.wardId || "",
          });
        }
      });

    setWardsOptions(wards);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (values: ProductSearch) => {
    const products = await searchProducts({
      province: values.province,
      district: values.district,
      ward: values.ward,
      priceFrom: values.priceFrom || 0,
      priceTo: values.priceTo || 0,
      squareFrom: values.squareFrom || 0,
      squareTo: values.squareTo || 0,
    });
    setProductSearch(products);
    onClose();
  };
  return (
    <Modal
      open={open}
      footer={<></>}
      onCancel={onClose}
      title="Tìm kiếm chi tiết"
      className="w-full"
      destroyOnClose={true}
    >
      <Form
        name="searchMobile"
        layout="vertical"
        labelAlign="left"
        autoComplete="off"
        className="w-full justify-between mx-auto p-2 border rounded-md bg-white"
        form={form}
        initialValues={{
          provinces: "",
          districts: "",
          wards: "",
          squareFrom: 0,
          squareTo: 0,
          priceFrom: 0,
          priceTo: 0,
        }}
        onFinish={onFinish}
        clearOnDestroy={true}
      >
        <Form.Item
          className="font-bold"
          label="Tỉnh/TP:"
          name="province"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Vui lòng điền đầy đủ thông tin",
            },
          ]}
        >
          <Select
            options={provincesOption}
            onChange={(Id) => handleGetDistricts(Id)}
            className="w-full"
          />
        </Form.Item>

        <Form.Item
          className="font-bold"
          label="Huyện:"
          name="district"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Vui lòng điền đầy đủ thông tin",
            },
          ]}
        >
          <Select
            options={districtsOption}
            onChange={(Id) => handleGetWards(Id)}
          />
        </Form.Item>
        <Form.Item
          className="font-bold"
          label="Xã:"
          name="ward"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Vui lòng điền đầy đủ thông tin",
            },
          ]}
        >
          <Select options={wardsOption} />
        </Form.Item>
        <Form.Item
          className="font-bold"
          label="Diện tích:"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Vui lòng điền đầy đủ thông tin",
            },
          ]}
        >
          <Select
            options={[]}
            value={valueSquareSearch}
            popupClassName="!w-[350px]"
            className="w-[350px]"
            dropdownRender={() => (
              <div>
                <Form.Item
                  className="font-bold"
                  label="Từ"
                  name="squareFrom"
                  labelCol={{ span: 3 }}
                  rootClassName="px-2 mt-2"
                >
                  <InputNumber
                    controls={false}
                    placeholder="Từ"
                    className="w-full"
                    suffix="m2"
                  />
                </Form.Item>
                <Form.Item
                  className="font-bold"
                  label="Đến"
                  name="squareTo"
                  labelCol={{ span: 3 }}
                  rootClassName="px-2"
                >
                  <InputNumber
                    controls={false}
                    placeholder="Đến"
                    className="w-full"
                    suffix="m2"
                  />
                </Form.Item>
                <Form.Item noStyle>
                  <div className="flex justify-end w-full px-2">
                    <Button
                      icon={<SearchOutlined />}
                      type="primary"
                      onClick={() => {
                        const values = form.getFieldsValue();
                        setValueSquareSearch(
                          `Từ ${values.squareFrom} tới ${values.squareTo}`
                        );
                      }}
                    >
                      Tìm kiếm
                    </Button>
                  </div>
                </Form.Item>
              </div>
            )}
          />
        </Form.Item>

        <Form.Item
          className="font-bold"
          label="Mức giá:"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Vui lòng điền đầy đủ thông tin",
            },
          ]}
        >
          <Select
            value={valuePriceSearch}
            options={[]}
            popupClassName="!w-[350px]"
            className="w-[350px]"
            dropdownRender={() => (
              <div>
                <Form.Item
                  className="font-bold"
                  label="Từ"
                  name="priceFrom"
                  labelCol={{ span: 3 }}
                  rootClassName="px-2 mt-2"
                >
                  <InputNumber
                    controls={false}
                    placeholder="Từ"
                    className="w-full"
                    suffix="VNĐ"
                  />
                </Form.Item>
                <Form.Item
                  className="font-bold"
                  label="Đến"
                  name="priceTo"
                  labelCol={{ span: 3 }}
                  rootClassName="px-2"
                >
                  <InputNumber
                    controls={false}
                    placeholder="Đến"
                    className="w-full"
                    suffix="VNĐ"
                  />
                </Form.Item>
                <Form.Item
                  labelCol={{ span: 3 }}
                  label={<div className="text-white">1</div>}
                  noStyle
                >
                  <div className="flex justify-end w-full px-2">
                    <Button
                      icon={<SearchOutlined />}
                      type="primary"
                      onClick={() => {
                        const values = form.getFieldsValue();
                        setValuePriceSearch(
                          `Từ ${values.priceFrom} tới ${values.priceTo}`
                        );
                      }}
                    >
                      Tìm kiếm
                    </Button>
                  </div>
                </Form.Item>
              </div>
            )}
          />
        </Form.Item>
        <Space className="w-full justify-end">
          <Button
            ghost
            danger
            onClick={() => {
              form.resetFields();
              getDefaultProducts();
              onClose();
            }}
            icon={<ReadOutlined />}
          >
            Hiển thị tất cả tin
          </Button>

          <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
            Tìm kiếm
          </Button>
        </Space>
      </Form>
    </Modal>
  );
};
