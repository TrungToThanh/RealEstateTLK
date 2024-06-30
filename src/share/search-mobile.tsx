import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select } from "antd";
import { useContext, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { ProductsContext } from "../components/product-provider";
import { Address } from "../types/types";
import { wardsList } from "../const/wards";
import { searchProducts } from "../api/product";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const SearchMobileComponent = ({ open, onClose }: Props) => {
  const { provinces: provincesOption, setProductSearch } =
    useContext(ProductsContext);

  const [districtsOption, setDistrictsOptions] = useState<Address[]>([]);
  const [wardsOption, setWardsOptions] = useState<Address[]>([]);
  const [valueSquareSearch, setValueSquareSearch] = useState("0 tới 100 m2");
  const [valuePriceSearch, setValuePriceSearch] = useState("0 tới 1 tỷ");

  const [form] = useForm();

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
  const onFinish = async (values: any) => {
    const products = await searchProducts(
      values.province,
      values.district,
      values.ward
    );
    setProductSearch(products);
  };

  return (
    <Modal
      open={open}
      footer={<></>}
      onCancel={onClose}
      title="Tìm kiếm chi tiết"
    >
      <Form
        name="searchMobile"
        layout="vertical"
        labelAlign="left"
        autoComplete="off"
        className="w-full justify-between mx-auto p-2 border rounded-md bg-white"
        form={form}
        initialValues={{
          provinces: "Hà Nội",
          districts: "Chương Mỹ",
          wards: "Đông Sơn",
          squareFrom: "0",
          squareTo: "100",
          priceFrom: "0",
          priceTo: "1000000000",
        }}
        onFinish={onFinish}
      >
        <Form.Item className="font-bold" label="Tỉnh/TP:" name="provinces">
          <Select
            className="w-full"
            defaultValue="Hà Nội"
            options={provincesOption}
            onChange={(Id) => handleGetDistricts(Id)}
          />
        </Form.Item>

        <Form.Item className="font-bold" label="Huyện:" name="districts">
          <Select
            className="w-full"
            options={districtsOption}
            onChange={(Id) => handleGetWards(Id)}
          />
        </Form.Item>
        <Form.Item className="font-bold" label="Xã:" name="wards">
          <Select options={wardsOption} />
        </Form.Item>
        <Form.Item className="font-bold" label="Diện tích:">
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
                  <Input placeholder="Từ" className="w-full" suffix="m2" />
                </Form.Item>
                <Form.Item
                  className="font-bold"
                  label="Đến"
                  name="squareTo"
                  labelCol={{ span: 3 }}
                  rootClassName="px-2"
                >
                  <Input placeholder="Đến" className="w-full" suffix="m2" />
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
            options={[]}
            value={valuePriceSearch}
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
                  <Input placeholder="Từ" className="w-full" suffix="VNĐ" />
                </Form.Item>
                <Form.Item
                  className="font-bold"
                  label="Đến"
                  name="priceTo"
                  labelCol={{ span: 3 }}
                  rootClassName="px-2"
                >
                  <Input placeholder="Đến" className="w-full" suffix="VNĐ" />
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
        <Form.Item className="w-full justify-end flex">
          <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
            Tìm Kiếm
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
