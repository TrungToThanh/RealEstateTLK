import { Button, Layout, Menu, Row, Space } from "antd";
import { Content } from "antd/es/layout/layout";
import {
  BarChartOutlined,
  BookOutlined,
  LaptopOutlined,
  PrinterOutlined,
  RollbackOutlined,
  UserAddOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { EmployeesComponent } from "../../share/employee";
import Sider from "antd/es/layout/Sider";
import { ProductComponent } from "../../share/products";
import { useNavigate } from "react-router-dom";
import { StatisticalProducts } from "./components/statistical";
import { Report } from "./components/report";

export const ContentAdminComponent = () => {
  const [isShowCreateUser, setShow] = useState(false);
  const navigate = useNavigate();
  const [key, setKey] = useState("1");
  const sideBarMenu = [
    {
      key: "1",
      icon: <BookOutlined />,
      label: "Tin đã đăng",
    },
    {
      key: "3",
      icon: <BarChartOutlined />,
      label: "Thống kê",
    },
    {
      key: "4",
      icon: <PrinterOutlined />,
      label: "Báo cáo",
    },
    {
      key: "2",
      icon: <UserSwitchOutlined />,
      label: "Quản trị nhân sự",
    },
    {
      key: "5",
      icon: <LaptopOutlined />,
      label: "Thiết lập thông số",
    },
    {
      key: "6",
      icon: <UserOutlined />,
      label: "Phê duyệt người dùng",
    },
  ];

  const renderComponent = () => {
    if (key === "1") {
      return (
        <EmployeesComponent
          isShowCreateUser={isShowCreateUser}
          setShow={(value) => setShow(value)}
        />
      );
    }
    if (key === "2") {
      return <ProductComponent isShowTransferButton />;
    }
    if (key === "3") {
      return <StatisticalProducts />;
    }
    if (key === "4") {
      return <Report />;
    }
    return <> Chức năng sẽ phát triển ở giai đoạn 2</>;
  };

  return (
    <Layout
      style={{ minHeight: "100vh" }}
      className="pt-20 bg-white w-full max-w-[1200px] mx-auto"
    >
      <Sider
        theme="light"
        defaultCollapsed={true}
        collapsible
        className="bg-white"
        width={350}
      >
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["1"]}
          items={sideBarMenu}
          onClick={(value) => {
            setKey(value.key);
          }}
          className="pt-10"
        />
      </Sider>
      <Content className="w-full h-[1200px] mx-auto mt-2">
        <Row className="flex justify-between items-center bg-slate-100 rounded-lg p-2 ">
          <div className="text-2xl font-bold">
            {sideBarMenu?.find((item) => item.key === key)?.label.toUpperCase()}
          </div>
          <Space>
            {key === "1" && (
              <Button
                icon={<UserAddOutlined />}
                type="primary"
                onClick={() => setShow(true)}
              >
                Thêm nhân sự mới
              </Button>
            )}

            <Button
              type="primary"
              ghost
              onClick={() => navigate("/products")}
              icon={<RollbackOutlined />}
            >
              Về trang sản phẩm
            </Button>
          </Space>
        </Row>
        <div className="px-10 pt-4">{renderComponent()}</div>
      </Content>
    </Layout>
  );
};
