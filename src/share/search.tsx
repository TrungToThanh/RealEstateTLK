import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, InputNumber, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { useContext } from "react";
import { ProductsContext } from "../components/product-provider";
import { wardsList } from "../const/wards";
import { Address, ProductSearch } from "../types/types";
import { searchProducts } from "../api/product";
import { defaultSearch } from "../const/const";

export const SearchComponent = () => {
  const { provinces: provincesOption, setProductSearch } =
    useContext(ProductsContext);
  const [districtsOption, setDistrictsOptions] = useState<Address[]>([]);
  const [wardsOption, setWardsOptions] = useState<Address[]>([]);
  const [valueSquareSearch, setValueSquareSearch] = useState("0 tới 1000 m2");
  const [valuePriceSearch, setValuePriceSearch] = useState("0 tới 1000 tỷ");
  const [showDelete, setShowDelete] = useState(false);

  const [form] = useForm();

  const getDefaultProducts = async () => {
    const products = await searchProducts(defaultSearch);
    setProductSearch(products || []);
  };

  useEffect(() => {
    getDefaultProducts();
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
    setShowDelete(true);
  };
  return (
    <Form
      name="search"
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
    >
      <Space.Compact size="large">
        <Form.Item className="font-bold" label="Tỉnh/TP:" name="province">
          <Select
            style={{ width: 180 }}
            options={provincesOption}
            onChange={(Id) => handleGetDistricts(Id)}
          />
        </Form.Item>

        <Form.Item className="font-bold" label="Huyện:" name="district">
          <Select
            style={{ width: 180 }}
            options={districtsOption}
            onChange={(Id) => handleGetWards(Id)}
          />
        </Form.Item>
        <Form.Item className="font-bold" label="Xã:" name="ward">
          <Select style={{ width: 180 }} options={wardsOption} />
        </Form.Item>
        <Form.Item className="font-bold" label="Diện tích:">
          <Select
            style={{ width: 180 }}
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

        <Form.Item className="font-bold" label="Mức giá:">
          <Select
            style={{ width: 180 }}
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
        <Form.Item label=" " name=" ">
          <Button.Group>
            <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
              Tìm Kiếm
            </Button>
            {showDelete && (
              <Button
                ghost
                danger
                onClick={() => {
                  form.resetFields();
                  setShowDelete(false);
                  getDefaultProducts();
                }}
              >
                Hiển thị tất cả
              </Button>
            )}
          </Button.Group>
        </Form.Item>
      </Space.Compact>
    </Form>
  );
};
