import { Avatar, Button, Dropdown, Flex, Image, Row, Tooltip } from "antd";
import { Header } from "antd/es/layout/layout";

import logoImage from "../../../assets/logo.jpg";
import { BellOutlined, MessageOutlined, UserOutlined } from "@ant-design/icons";

export const HeaderAdminComponent = () => {
  const items = [
    {
      key: "1",
      label: (
        <Row className="w-full block">
          <Row>Xin Chào!</Row>
          <Row>Nguyễn Văn An</Row>
        </Row>
      ),
    },
    {
      key: "2",
      danger: true,
      label: "Thoát",
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
            THỔ KIM <span className="text-[#f4de8c]"> LAND </span>
          </p>
        </Flex>
        <Flex gap={8} className="flex justify-center items-center">
          <Tooltip title="Thông báo" placement="top">
            <Button icon={<BellOutlined />} />
          </Tooltip>
          <Tooltip title="Tin nhắn" placement="top">
            <Button icon={<MessageOutlined />} />
          </Tooltip>
          <Dropdown menu={{ items }}>
            <Avatar
              style={{ backgroundColor: "#87d068" }}
              icon={<UserOutlined />}
            />
          </Dropdown>
        </Flex>
      </Row>
    </Header>
  );
};
