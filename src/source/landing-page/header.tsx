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
import { useState } from "react";
import { LoginComponent } from "../../share/login";
import { CreateItemComponent } from "../../share/create-item";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchMobileComponent } from "../../share/search-mobile";

import { useGetSizeDevices } from "../../hooks/use-get-size-devices";

const { Search } = Input;
export const HeaderComponent = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(false);
  const [showCreateItem, setShowCreateItem] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const isHideSearchBar = location.pathname?.includes("/admin");

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
    <Header className="block fixed z-50 w-full bg-white p-0 t-0 m-0 max-w-[1200px] ">
      <div className="bg-white">
        <Flex className="w-full justify-between items-center" wrap>
          <Flex onClick={() => navigator("/")}>
            <Image
              src={logoImage}
              width={100}
              height={74}
              sizes="large"
              preview={false}
            />
            <div>
              <div
                className={`${
                  isLaptop ? "text-[28px]" : "text-[18px]"
                } font-semibold text-blue-700 m-0 p-0 h-8 text-start`}
              >
                THỔ KIM <span className="text-yellow-500"> LAND </span>
              </div>
              {isLaptop && (
                <div className="h-4 font-semibold">
                  Phố Gốt, Xã Đông Sơn, Huyện Chương Mỹ, Hà Nội
                </div>
              )}
            </div>
          </Flex>
          {isLaptop && !isHideSearchBar && (
            <Search
              className="w-[500px]"
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
                if (!localStorage.getItem("TKL_token")) {
                  message.error("Bạn chưa đăng nhập!");
                } else {
                  setShowCreateItem(true);
                }
              }}
            >
              Tạo tin
            </Button>
            {localStorage.getItem("TKL_token") ? (
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
        {!isHideSearchBar && (
          <Flex className="p-2">
            {isLaptop ? (
              // <SearchComponent />
              <></>
            ) : (
              <Search
                placeholder="input search text"
                allowClear
                className="w-full m-0 p-0"
                style={{ width: "100%" }}
                onClick={() => setShowSearch(true)}
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
      {
        <SearchMobileComponent
          open={showSearch}
          onClose={() => setShowSearch(false)}
        />
      }
    </Header>
  );
};
