import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { CreateItemComponent } from "../component/create-item";
import { ProductComponent } from "../../landing-page/webPC/products";
import { EmployeeComponent } from "../component/employee";
import { AccountComponent } from "../component/account";

export const ContentAdminComponent = () => {
  const [key, setKey] = useState("1");
  const sideBarMenu = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "Đăng tin mới",
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: "Quản lý sản phẩm",
    },
    {
      key: "3",
      icon: <UserOutlined />,
      label: "Nhân sự",
    },
    {
      key: "4",
      icon: <UserOutlined />,
      label: "Tài khoản",
    },
  ];

  const renderComponent = () => {
    if (key === "1") {
      return <CreateItemComponent />;
    }
    if (key === "2") {
      return <ProductComponent />;
    }
    if (key === "3") {
      return <EmployeeComponent />;
    }
    if (key === "4") {
      return <AccountComponent />;
    }
    return <></>;
  };

  return (
    <Layout className="mt-10 !bg-white">
      <Sider width={250}>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["1"]}
          items={sideBarMenu}
          onClick={(value) => {
            setKey(value.key);
          }}
        />
      </Sider>
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "white" }}>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          {renderComponent()}
        </Content>
      </Layout>
    </Layout>
  );
};
