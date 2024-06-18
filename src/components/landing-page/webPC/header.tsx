import { Button, Flex, Image, Menu, Row } from "antd";
import { Header } from "antd/es/layout/layout";

import logoImage from "../../../assets/logo.jpg";
import { UserOutlined } from "@ant-design/icons";

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
      style={{
        display: "block",
        alignItems: "center",
        position: "sticky",
        zIndex: 1,
        width: "100%",
        top: 0,
        backgroundColor: "white",
        padding: 0,
      }}
    >
      <Row className="w-full justify-between items-center">
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
          <Button type="primary" icon={<UserOutlined />}>
            Tài Khoản
          </Button>
        </Flex>
      </Row>
    </Header>
  );
};
