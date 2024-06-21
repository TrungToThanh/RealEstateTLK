import { Button, Drawer, Flex, Layout, Menu } from "antd";
import { Content } from "antd/es/layout/layout";
import { UnorderedListOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { ProductComponent } from "../../landing-page/webPC/products";
import { EmployeeComponent } from "../component/employee";
import { AccountComponent } from "../component/account";
import CreateItemComponent from "../component/create-item";

export const ContentAdminComponent = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
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
      label: "Kiểm duyệt tin",
    },
    {
      key: "3",
      icon: <UserOutlined />,
      label: "Quản lý sản phẩm",
    },
    {
      key: "4",
      icon: <UserOutlined />,
      label: "Nhân sự",
    },
    {
      key: "5",
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
      return <ProductComponent />;
    }
    if (key === "4") {
      return <EmployeeComponent />;
    }
    if (key === "5") {
      return <AccountComponent />;
    }
    return <></>;
  };

  return (
    <Layout className="!bg-white">
      <div className="relative overflow-hidden mt-4">
        <Flex className="w-full justify-start items-center ">
          <Button
            type="primary"
            onClick={showDrawer}
            icon={<UnorderedListOutlined />}
          />
          <div className="mx-2 py-1 text-xl font-bold w-full justify-center bg-gray-100 border rounded-xl">
            {sideBarMenu.find((item) => item.key === key)?.label}
          </div>
        </Flex>

        <Drawer
          title="Công cụ"
          placement="left"
          closable={false}
          onClose={onClose}
          open={open}
          getContainer={false}
        >
          <Menu
            mode="inline"
            className="w-[360px]"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["1"]}
            items={sideBarMenu}
            onClick={(value) => {
              setKey(value.key);
            }}
          />
        </Drawer>

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
      </div>
    </Layout>
  );
};
