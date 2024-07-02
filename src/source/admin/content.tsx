import { Button, Layout, Menu, Space } from "antd";
import { Content } from "antd/es/layout/layout";
import {
  RollbackOutlined,
  UserAddOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { EmployeesComponent } from "../../share/employee";
import Sider from "antd/es/layout/Sider";
import { useNavigate } from "react-router-dom";

export const ContentAdminComponent = () => {
  const navigate = useNavigate();
  const [key, setKey] = useState("1");
  const sideBarMenu = [
    {
      key: "1",
      icon: <UserSwitchOutlined />,
      label: "Quản trị nhân sự",
    },
    {
      key: "2",
      icon: <UserAddOutlined />,
      label: "Tin đã đăng",
    },
    {
      key: "3",
      icon: <UserSwitchOutlined />,
      label: "Thống kê",
    },
    {
      key: "4",
      icon: <UserSwitchOutlined />,
      label: "Báo cáo",
    },
    {
      key: "5",
      icon: <UserSwitchOutlined />,
      label: "Thiết lập thông số",
    },
    {
      key: "6",
      icon: <UserSwitchOutlined />,
      label: "Phê duyệt người dùng",
    },
  ];

  const renderComponent = () => {
    if (key === "1") {
      return <EmployeesComponent />;
    }
    return <> Chức năng sẽ phát triển ở giai đoạn 2</>;
  };

  return (
    <Layout style={{ minHeight: "100vh" }} className="pt-20 bg-white">
      <Sider collapsible className="bg-white" width={400}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["1"]}
          items={sideBarMenu}
          onClick={(value) => {
            setKey(value.key);
          }}
        />
      </Sider>
      <Content className="w-full h-[1200px] mx-auto mt-2">
        <Space className="flex w-full justify-between px-10">
          <div className="w-full flex  bg-slate-100 h-10 text-2xl font-bold justify-center">
            {sideBarMenu.find((item) => item.key === key)?.label}
          </div>
          <Button
            type="primary"
            ghost
            onClick={() => navigate("/products")}
            icon={<RollbackOutlined />}
          >
            Về trang sản phẩm
          </Button>
        </Space>
        <div className="px-10 pt-4">{renderComponent()}</div>
      </Content>
    </Layout>
  );
};
