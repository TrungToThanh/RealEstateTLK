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
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { LoginComponent } from "../../share/login";
import { CreateItemComponent } from "../../share/create-item";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchMobileComponent } from "../../share/search-mobile";

import { useGetSizeDevices } from "../../hooks/use-get-size-devices";
import { useCheckLogin } from "../../hooks/decode_token";
import { jwtDecode } from "jwt-decode";

const { Search } = Input;
export const HeaderComponent = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(false);
  const [showCreateItem, setShowCreateItem] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isLogin, setLogin] = useState(false);

  const isHideSearchBar = location.pathname?.includes("/admin");

  const isExpired = useCheckLogin(localStorage.getItem("TKL_token") || "");

  useEffect(() => {
    setLogin(!isExpired);
  }, [isExpired]);

  const { isLaptop } = useGetSizeDevices();

  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          <div>Xin chào {localStorage.getItem("TKL_user_login_name")} !</div>

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
        if (localStorage.getItem("TKL_token")) {
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
        localStorage.removeItem("TKL_token");
        message.success("Bạn đã đăng xuất!");
        navigator("/");
      },
    },
  ];

  return (
    <Header className="flex fixed z-50 w-full bg-white p-0 t-0 m-0 justify-center h-20 shadow-md">
      <div className="w-full max-w-[1200px]">
        <Flex className="w-full justify-between items-center ">
          <Flex onClick={() => navigator("/")} className="cursor-pointer">
            <Image
              src={logoImage}
              width={100}
              height={74}
              sizes="large"
              preview={false}
            />
            {isLaptop && (
              <div>
                <div
                  className={`${
                    isLaptop ? "text-[28px]" : "text-[18px]"
                  } font-semibold text-blue-700 m-0 p-0 h-8 text-start`}
                >
                  THỔ KIM <span className="text-yellow-500"> LAND </span>
                </div>

                <div className="h-4 font-semibold">
                  Phố Gốt, Xã Đông Sơn, Huyện Chương Mỹ, Hà Nội
                </div>
              </div>
            )}
          </Flex>
          {!isHideSearchBar && (
            <Search
              className="max-w-[500px]"
              placeholder="Tìm kiếm bất động sản bạn quan tâm"
              allowClear
              onClick={() => setShowSearch(true)}
              enterButton={<SearchOutlined />}
            />
          )}
          <Flex className="px-2" gap={8}>
            <Button
              type="primary"
              ghost
              icon={<FormOutlined />}
              iconPosition="end"
              onClick={() => {
                const decoded = jwtDecode(
                  localStorage.getItem("TKL_token") || ""
                );

                // Check if the token is expired
                const currentTime = Math.floor(Date.now() / 1000);
                if (decoded?.exp && decoded?.exp < currentTime) {
                  return message.error(
                    "Bạn chưa đăng nhập! Hoặc phiên đăng nhập đã hết hiệu lực, vui lòng đăng nhập lại!"
                  );
                  setLogin(false);
                } else {
                  setShowCreateItem(true);
                }
              }}
            >
              {isLaptop ? "Tạo tin" : ""}
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
                {isLaptop ? "Đăng nhập" : ""}
              </Button>
            )}
          </Flex>
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
      {
        <SearchMobileComponent
          open={showSearch}
          onClose={() => setShowSearch(false)}
        />
      }
    </Header>
  );
};
