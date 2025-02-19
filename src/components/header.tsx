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

import logoImage from "../assets/logowhite.png";
import {
  FormOutlined,
  LoginOutlined,
  LogoutOutlined,
  ProductOutlined,
  SearchOutlined,
  SwapOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";
import { useCheckLogin } from "../hooks/decode_token";
import { useGetSizeDevices } from "../hooks/use-get-size-devices";
import { LoginComponent } from "../share/login";
import { CreateItemComponent } from "../share/create-item";
import { SearchMobileComponent } from "../share/search-mobile";

const { Search } = Input;
type Props = {
  isLanding?: boolean;
};
export const HeaderComponent = ({ isLanding = false }: Props) => {
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
        <div>
          <SwapOutlined /> Đổi mật khẩu
        </div>
      ),
      onClick: async () => {
        message.info("Tính năng này sẽ được phát triển ở giai đoạn 2");
      },
    },
    {
      key: "3",
      label: (
        <div>
          <ProductOutlined /> Quản trị
          <Divider className="m-0" />
        </div>
      ),
      onClick: async () => {
        if (localStorage.getItem("TKL_token")) {
          message.info("Bạn nên sử dụng chức năng này ở trình duyệt máy tính!");
          navigator("/admin");
        }
      },
    },
    {
      key: "4",
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
          {!isHideSearchBar && !isLanding && (
            <Search
              readOnly
              className="max-w-[500px] pl-2"
              placeholder="Tìm kiếm bất động sản bạn quan tâm"
              allowClear
              onClick={() => setShowSearch(true)}
              enterButton={
                <SearchOutlined onClick={() => setShowSearch(true)} />
              }
            />
          )}
          <Flex className="px-2" gap={8}>
            <Button
              type="primary"
              ghost
              icon={<FormOutlined />}
              iconPosition="end"
              hidden={isExpired}
              onClick={() => {
                if (isExpired) {
                  message.error("Bạn chưa đăng nhập!");
                  setLogin(false);
                  return;
                }

                const decoded = jwtDecode(
                  localStorage.getItem("TKL_token") || ""
                );

                // Check if the token is expired
                const currentTime = Math.floor(Date.now() / 1000);
                if (decoded?.exp && decoded?.exp < currentTime) {
                  message.error(
                    "Phiên đăng nhập đã hết hiệu lực, vui lòng thực hiện lại!"
                  );
                  setLogin(false);
                  return;
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
