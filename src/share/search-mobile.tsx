import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { GetDistricts, GetProvinces, GetWards } from "../api/location";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const SearchMobileComponent = ({ open, onClose }: Props) => {
  const [provincesOption, setProvincesOptions] = useState([]);
  const [districtsOption, setDistrictsOptions] = useState([]);
  const [wardsOption, setWardsOptions] = useState([]);
  const [valueSquareSearch, setValueSquareSearch] = useState("0 tới 100 m2");
  const [valuePriceSearch, setValuePriceSearch] = useState("0 tới 1 tỷ");

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
