import { Button, Drawer, Flex, Layout, Menu } from "antd";
import { Content } from "antd/es/layout/layout";
import {
  UnorderedListOutlined,
  UserAddOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { EmployeesComponent } from "../../share/employee";
import { ProductTableComponent } from "../../share/product-table";

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
      label: "Quản trị nhân sự",
    },
  ];

  const renderComponent = () => {
    if (key === "1") {
      return <ProductTableComponent />;
    }
    if (key === "2") {
      return <EmployeesComponent />;
    }
    return <></>;
  };

  return (
    <Content
      id="content"
      className={`flex h-full overflow-auto mt-28 justify-center`}
    >
      <div className="w-full max-w-[1200px]">
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
          title="Quản trị"
          placement="left"
          closable={true}
          onClose={onClose}
          open={open}
          getContainer={false}
          className="!w-fit"
          styles={{
            body: { padding: 0, margin: 0, height: 800 },
          }}
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

        <Layout className="w-full">
          <Content className="mt-8">{renderComponent()}</Content>
        </Layout>
      </div>
    </Content>
  );
};
