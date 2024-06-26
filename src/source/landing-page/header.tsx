import {
  Avatar,
  Button,
  Divider,
  Dropdown,
  Flex,
  Image,
  Input,
  message,
} from "antd";
import { Header } from "antd/es/layout/layout";

import logoImage from "../../assets/logo.jpg";
import {
  FormOutlined,
  LoginOutlined,
  LogoutOutlined,
  ProductOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { LoginComponent } from "../../share/login";
import { useMediaQuery } from "react-responsive";
import { SearchComponent } from "../../share/search";
import { CreateItemComponent } from "../../share/create-item";
import supabase from "../../utils/supabaseClient";
import { useLocation, useNavigate } from "react-router-dom";

const { Search } = Input;
export const HeaderComponent = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(false);
  const [showCreateItem, setShowCreateItem] = useState(false);
  console.log(navigator.name);
  const isHideSearchBar = location.pathname?.includes("/admin");
  const isLogin = sessionStorage.getItem("login") === "true";

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          <div>XIN CHÀO!</div>
          {sessionStorage.getItem("TKL_login_user")}
          <Divider className="m-0" />
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <div className="text-blue-800">
          <ProductOutlined /> Quản trị
          <Divider className="m-0" />
        </div>
      ),
      onClick: async () => {
        if (isLogin) {
          navigator("/admin");
        }
      },
    },
    {
      key: "3",
      danger: true,
      label: (
        <>
          <LogoutOutlined /> Đăng xuất
        </>
      ),
      onClick: async () => {
        await supabase.auth.signOut();
        sessionStorage.setItem("login", "false");
        message.success("Bạn đã đăng xuất!");
      },
    },
  ];

  return (
    <Header className="block fixed z-50 w-full bg-white p-0 t-0 m-0 max-w-[1200px]">
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
                if (!isLogin) {
                  message.error("Bạn chưa đăng nhập!");
                } else {
                  setShowCreateItem(true);
                }
              }}
            >
              Tạo tin
            </Button>
            {isLogin ? (
              <Dropdown menu={{ items }} className="mt-1">
                <Avatar
                  style={{ backgroundColor: "#87d068" }}
                  icon={<UserOutlined />}
                  size={"small"}
                />
              </Dropdown>
            ) : (
              <Button
                icon={<LoginOutlined />}
                onClick={() => setShowLogin(true)}
              >
                {isDesktopOrLaptop ? "Đăng nhập" : ""}
              </Button>
            )}
          </Flex>
        </Flex>
        {!isHideSearchBar && (
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
        )}
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
