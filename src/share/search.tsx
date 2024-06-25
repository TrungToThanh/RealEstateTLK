import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Divider,
  Form,
  Input,
  InputRef,
  Row,
  Select,
  Space,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { useForm } from "antd/es/form/Form";
// import { DefaultOptionType } from "antd/es/select";
import axios from "axios";
import { GetDistricts, GetProvinces, GetWards } from "../api/location";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

export const SearchComponent = () => {
  const [provincesOption, setProvincesOptions] = useState([]);
  const [districtsOption, setDistrictsOptions] = useState([]);
  const [wardsOption, setWardsOptions] = useState([]);
  const [dataTest, setDataTest] = useState("");
  // const [squares, setSquares] = useState<DefaultOptionType[]>();
  const [square, setSquare] = useState("");

  const [form] = useForm();

  const pricesOptions = [
    { value: "Dưới 500 triệu", label: "Dưới 500 triệu" },
    { value: "500 triệu tới 1 tỷ", label: "500 triệu tới 1 tỷ" },
    { value: "1 tỷ tới 2 tỷ", label: "1 tỷ tới 2 tỷ" },
    { value: "> 2 tỷ", label: "> 2 tỷ" },
  ];

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

  const inputRef = useRef<InputRef>(null);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSquare(event.target.value);
  };

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    // const newList = squares;
    // square && newList && setSquares([...newList, square]);
    setSquare("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const getWeather = async () => {
    const url = `${apiUrl}/WeatherForecast`;
    await axios.get(url).then((data) => {
      setDataTest(data.data?.at(0).date || "");
    });
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      labelAlign="left"
      autoComplete="off"
      className="w-full justify-between mx-auto p-2 border rounded-md bg-white mt-4"
      form={form}
      initialValues={{
        provinces: "Hà Nội",
        districts: "Chương Mỹ",
        wards: "Đông Sơn",
        price: pricesOptions[1],
        square: "100m2",
      }}
    >
      <div>1212 ${dataTest}</div>
      <Space.Compact size="large">
        <Form.Item className="font-bold" label="Tỉnh/TP:" name="provinces">
          <Select
            defaultValue="Hà Nội"
            style={{ width: 180 }}
            options={provincesOption}
            onChange={(Id) => handleGetDistricts(Id)}
          />
        </Form.Item>

        <Form.Item className="font-bold" label="Huyện:" name="districts">
          <Select
            style={{ width: 180 }}
            options={districtsOption}
            onChange={(Id) => handleGetWards(Id)}
          />
        </Form.Item>
        <Form.Item className="font-bold" label="Xã:" name="wards">
          <Select style={{ width: 180 }} options={wardsOption} />
        </Form.Item>
        <Form.Item className="font-bold" label="Diện tích:" name="square">
          <Select
            style={{ width: 180 }}
            options={[]}
            popupClassName="!w-[400px]"
            className="w-[400px]"
            dropdownRender={(menu) => (
              <Row className="flex w-[300px]">
                {menu}
                <Divider style={{ margin: "8px 0" }} />
                <Space>
                  <Select
                    options={[
                      {
                        value: "less",
                        label: "<",
                      },
                      {
                        value: "same",
                        label: "=",
                      },
                      {
                        value: "more",
                        label: ">",
                      },
                    ]}
                    className="!w-16"
                  />
                  <Input
                    placeholder="Nhập diện tích"
                    ref={inputRef}
                    value={square}
                    onChange={onNameChange}
                    onKeyDown={(e) => e.stopPropagation()}
                    className="w-40"
                    suffix="m2"
                  />
                  <Button icon={<PlusOutlined />} onClick={addItem}>
                    Thêm
                  </Button>
                </Space>
              </Row>
            )}
          />
        </Form.Item>
        <Form.Item className="font-bold" label="Mức giá:" name="price">
          <Select
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
          <Button
            type="primary"
            htmlType="submit"
            icon={<SearchOutlined />}
            onClick={getWeather}
          >
            Tìm Kiếm
          </Button>
        </Form.Item>
      </Space.Compact>
    </Form>
  );
};
