import { Button, Flex, Image, Input, notification } from "antd";
import { Header } from "antd/es/layout/layout";

import logoImage from "../../../assets/logo.jpg";
import { FormOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { LoginComponent } from "./login";
import { useMediaQuery } from "react-responsive";
import { SearchComponent } from "../../../share/search";
import { CreateItemComponent } from "../../../share/create-item";
import { NotificationType } from "../../../const/const";

const { Search } = Input;
export const HeaderComponent = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showCreateItem, setShowCreateItem] = useState(false);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: "Thông báo",
      description: "Bạn chưa đăng nhập!",
    });
  };

  return (
    <Header className="block fixed z-50 w-full bg-white p-0 t-0 m-0">
      {contextHolder}
      <div className="bg-white">
        <Flex className="w-full justify-between items-center" wrap>
          <Flex>
            <Image src={logoImage} width={100} height={60} preview={false} />
            <p
              className={`${
                isDesktopOrLaptop ? "text-[28px]" : "text-[18px]"
              } font-semibold text-blue-700`}
            >
              THỔ KIM <span className="text-yellow-500"> LAND </span>
            </p>
          </Flex>
          <Flex className="px-2" gap={8}>
            <Button
              type="primary"
              ghost
              icon={<FormOutlined />}
              iconPosition="end"
              onClick={() => {
                const isLogin = sessionStorage.getItem("login");
                if (isLogin === "true") {
                  setShowCreateItem(true);
                } else {
                  openNotificationWithIcon("error");
                }
              }}
            >
              Tạo tin
            </Button>
            <Button icon={<UserOutlined />} onClick={() => setShowLogin(true)}>
              {isDesktopOrLaptop ? "Đăng nhập" : ""}
            </Button>
          </Flex>
        </Flex>
        <Flex className="p-2">
          {isDesktopOrLaptop ? (
            <SearchComponent />
          ) : (
            <Search
              placeholder="input search text"
              allowClear
              className="w-full m-0 p-0"
              style={{ width: "100%" }}
            />
          )}
        </Flex>
      </div>
      {showLogin && (
        <LoginComponent open={showLogin} onClose={() => setShowLogin(false)} />
      )}
      {showCreateItem && (
        <>
          <CreateItemComponent
            open={showCreateItem}
            onClose={() => setShowCreateItem(false)}
          />
        </>
      )}
    </Header>
  );
};
