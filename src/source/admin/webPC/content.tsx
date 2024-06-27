import { Button, Drawer, Flex, Layout, Menu } from "antd";
import { Content } from "antd/es/layout/layout";
import {
  UnorderedListOutlined,
  UserAddOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { CreateNewUserComponent } from "../../../share/create-user";
import { EmployeesComponent } from "../../../share/employee";

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
      icon: <UserAddOutlined />,
      label: "Tin đã đăng",
    },
    {
      key: "2",
      icon: <UserSwitchOutlined />,
      label: "Thông tin tài khoản",
    },
    {
      key: "3",
      icon: <UserAddOutlined />,
      label: "Tạo nhân sự mới",
    },
    {
      key: "4",
      icon: <UserSwitchOutlined />,
      label: "Quản trị nhân sự",
    },
  ];

  const renderComponent = () => {
    if (key === "3") {
      return <CreateNewUserComponent />;
    }
    if (key === "4") {
      return <EmployeesComponent />;
    }
    return <></>;
  };

  return (
    <Layout className="!bg-white mt-16 max-w-[1200px]">
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
          className="!w-[230px] !m-0 !p-0"
          styles={{ body: { padding: 0, margin: 0 } }}
        >
          <Menu
            mode="inline"
            className="w-full"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["1"]}
            items={sideBarMenu}
            onClick={(value) => {
              setKey(value.key);
            }}
          />
        </Drawer>

        <Layout
          style={{ padding: "0 24px 24px", backgroundColor: "white" }}
          className="w-full"
        >
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
