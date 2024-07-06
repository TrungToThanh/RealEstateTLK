import { Column, DualAxes } from "@ant-design/charts";
import { Card } from "antd";
import { forEach, groupBy } from "lodash";

const data = [
  {
    year: "1991",
    value: 3,
    type: "Số sản phẩm đã đăng",
  },
  {
    year: "1992",
    value: 4,
    type: "Số sản phẩm đã đăng",
  },
  {
    year: "1993",
    value: 35,
    type: "Số sản phẩm đã đăng",
  },
  {
    year: "1994",
    value: 5,
    type: "Số sản phẩm đã đăng",
  },
  {
    year: "1995",
    value: 49,
    type: "Số sản phẩm đã đăng",
  },
  {
    year: "1996",
    value: 6,
    type: "Số sản phẩm đã đăng",
  },
  {
    year: "1997",
    value: 7,
    type: "Số sản phẩm đã đăng",
  },
  {
    year: "1998",
    value: 30,
    type: "Số sản phẩm đã đăng",
  },
  {
    year: "1999",
    value: 13,
    type: "Số sản phẩm đã đăng",
  },
  {
    year: "1991",
    value: 3,
    type: "Số sản phẩm đã bán",
  },
  {
    year: "1992",
    value: 4,
    type: "Số sản phẩm đã bán",
  },
  {
    year: "1993",
    value: 10,
    type: "Số sản phẩm đã bán",
  },
  {
    year: "1994",
    value: 5,
    type: "Số sản phẩm đã bán",
  },
  {
    year: "1995",
    value: 4.9,
    type: "Số sản phẩm đã bán",
  },
  {
    year: "1996",
    value: 6,
    type: "Số sản phẩm đã bán",
  },
  {
    year: "1997",
    value: 7,
    type: "Số sản phẩm đã bán",
  },
  {
    year: "1998",
    value: 9,
    type: "Số sản phẩm đã bán",
  },
  {
    year: "1999",
    value: 13,
    type: "Số sản phẩm đã bán",
  },
];

const dataPrice = [
  { time: "2024-01", value: 350, count: 800 },
  { time: "2024-02", value: 350, count: 100 },
  { time: "2024-03", value: 350, count: 800 },
  { time: "2024-04", value: 900, count: 600 },
  { time: "2024-05", value: 300, count: 400 },
  { time: "2024-06", value: 450, count: 380 },
  { time: "2024-07", value: 470, count: 220 },
];

export const Report = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const annotations: any[] = [];
  forEach(groupBy(data, "year"), (values, k) => {
    const value = values.reduce((a, b) => a + b.value, 0);
    annotations.push({
      type: "text",
      data: [k, value],
      style: {
        textAlign: "center",
        fontSize: 14,
        fill: "rgba(0,0,0,0.85)",
      },
      xField: "year",
      yField: "value",
      tooltip: false,
    });
  });

  const config = {
    data,
    xField: "year",
    yField: "value",
    stack: true,
    colorField: "type",
    label: {
      text: "value",
      textBaseline: "bottom",
      position: "inside",
    },
    annotations,
  };

  const configPrice = {
    data: dataPrice,
    xField: "time",
    legend: true,
    children: [
      {
        type: "interval",
        yField: "value",
        style: { maxWidth: 80 },
      },
      {
        type: "line",
        yField: "count",
        style: { lineWidth: 2 },
        axis: { y: { position: "right" } },
      },
    ],
  };

  return (
    <>
      <Card title="Số sản phẩm đăng bán và đã bán">
        <Column {...config} />
      </Card>
      <Card title="Doanh thu theo sản phẩm">
        <DualAxes {...configPrice} />
      </Card>
    </>
  );
};
