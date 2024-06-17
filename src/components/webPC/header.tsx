import { Button, Flex, Image, Menu } from "antd";
import { Header } from "antd/es/layout/layout";

import logoImage from "../../assets/logo.jpg";
import { MessageOutlined, UserOutlined } from "@ant-design/icons";

export const HeaderComponent = () => {
  const menus = [
    {
      key: "1",
      label: "Trang Chủ",
    },
    {
      key: "2",
      label: "Sản phẩm",
    },
    {
      key: "3",
      label: "Liên hệ",
    },
  ];
  return (
    <Header
      className="bg-white text-black"
      style={{ display: "flex", alignItems: "center" }}
    >
      <Flex
        className="w-full"
        gap="middle"
        align="center"
        justify="space-between"
        wrap
      >
        <Flex>
          <Image src={logoImage} width={100} height={60} preview={false} />
          <p className="text-[28px] font-semibold text-blue-700">
            THỔ KIM <span className="text-yellow-500"> LAND </span>
          </p>
        </Flex>
        <Flex>
          <Menu
            direction="rtl"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={menus}
            style={{ flex: 1, minWidth: 0 }}
          />
        </Flex>
        <Flex gap={8}>
          <Button icon={<MessageOutlined />}></Button>
          <Button type="primary" icon={<UserOutlined />}>
            Tài Khoản
          </Button>
        </Flex>
      </Flex>
    </Header>
  );
};
