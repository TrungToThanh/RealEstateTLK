import { Button, Flex, Image } from "antd";
import { Header } from "antd/es/layout/layout";

import logoImage from "../../../assets/logo.jpg";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { LoginComponent } from "./login";

export const HeaderComponent = () => {
  const [showLogin, setShowLogin] = useState(false);
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
      <Flex className="w-full justify-between items-center" wrap>
        <Flex>
          <Image src={logoImage} width={100} height={60} preview={false} />
          <p className="text-[28px] font-semibold text-blue-700">
            THỔ KIM <span className="text-yellow-500"> LAND </span>
          </p>
        </Flex>
        <Flex gap={8}>
          <Button
            type="primary"
            icon={<UserOutlined />}
            onClick={() => setShowLogin(true)}
          >
            Đăng nhập
          </Button>
        </Flex>
      </Flex>
      {showLogin && (
        <LoginComponent open={showLogin} onClose={() => setShowLogin(false)} />
      )}
    </Header>
  );
};
