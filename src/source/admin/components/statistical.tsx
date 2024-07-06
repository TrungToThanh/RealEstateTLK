import { Line, Pie } from "@ant-design/charts";
import { Card, Dropdown } from "antd";
import { useState } from "react";

export const StatisticalProducts = () => {
  const [key, setKey] = useState(1);

  const productsByMonth = [
    { year: "01/2024", value: 3 },
    { year: "02/2024", value: 4 },
    { year: "03/2024", value: 3.5 },
    { year: "04/2024", value: 5 },
    { year: "05/2024", value: 4.9 },
    { year: "06/2024", value: 6 },
    { year: "07/2024", value: 7 },
    { year: "08/2024", value: 9 },
    { year: "09/2024", value: 13 },
  ];

  const configAreas = {
    data: [
      { type: "Chúc Sơn", value: 27 },
      { type: "Xuân Mai", value: 25 },
      { type: "Nam Phương Tiến", value: 18 },
      { type: "Đông Sơn", value: 15 },
      { type: "Đông Phương Yên", value: 10 },
    ],
    angleField: "value",
    colorField: "type",
    label: {
      text: "value",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: false,
        position: "right",
        rowPadding: 5,
      },
    },
  };

  const configEmployee = {
    data: [
      { type: "Nguyễn Văn A", value: 27 },
      { type: "Bùi Thị B", value: 25 },
      { type: "Trần Văn C", value: 18 },
      { type: "Trịnh Văn D", value: 15 },
    ],
    angleField: "value",
    colorField: "type",
    label: {
      text: "value",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: false,
        position: "right",
        rowPadding: 5,
      },
    },
  };

  const configProductByMonth = {
    data: productsByMonth,
    height: 300,
    xField: "year",
    yField: "value",
  };
  const listCharts = [
    {
      key: 1,
      value: <Line {...configProductByMonth} />,
    },
    {
      key: 2,
      value: <Pie {...configAreas} />,
    },
    {
      key: 3,
      value: <Pie {...configEmployee} />,
    },
  ];

  const items = [
    {
      key: 1,
      label: "Hiển thị biểu đồ thống kê số lượng theo tháng",
    },
    {
      key: 2,
      label: "Hiển thị biểu đồ thống kê số lượng theo khu vực",
    },
    {
      key: 3,
      label: "Hiển thị biểu đồ thống kê số lượng theo nhân viên",
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onMenuClick = (e: any) => {
    setKey(e.key);
  };

  return (
    <>
      <Dropdown.Button menu={{ items, onClick: onMenuClick }}>
        Lựa chọn biểu đồ:
      </Dropdown.Button>
      <Card>{listCharts?.find((item) => +item.key === +key)?.value}</Card>
    </>
  );
};
