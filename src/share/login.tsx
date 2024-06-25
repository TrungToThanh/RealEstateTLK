import {
  LockOutlined,
  PoweroffOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input, Modal, Result, Row } from "antd";
// import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};
export const LoginComponent = ({ open, onClose }: Props) => {
  const [isShowResult, setShowResult] = useState(false);
  const [isLoginSuccess, setLogin] = useState(false);

  useEffect(() => {
    sessionStorage.setItem("login", "false");
  }, []);

  return (
    <>
      <Modal
        open={open}
        footer={<></>}
        onCancel={onClose}
        title="Đăng nhập tài khoản"
        className="max-w-[350px]"
      >
        {isShowResult ? (
          <Result
            status={isLoginSuccess ? "success" : "error"}
            title="Thông tin đăng nhập"
            subTitle={
              isLoginSuccess ? "Đăng nhập thành công!" : "Đăng nhập thất bại!"
            }
          />
        ) : (
          <Form
            name="normal_login"
            initialValues={{ remember: true }}
            layout="vertical"
            className="mt-4"
          >
            <Form.Item
              label="Tài khoản:"
              name="username"
              rules={[{ required: true, message: "Hãy nhập tài khoản" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Tài khoản" />
            </Form.Item>
            <Form.Item
              label="Mật khẩu:"
              name="password"
              rules={[{ required: true, message: "Hãy nhập mật khẩu" }]}
              className="-mt-2"
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Mật khẩu"
              />
            </Form.Item>
            <Flex className="w-full justify-between -mt-2">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Flex>
            <Row className="w-full mt-4 justify-end">
              <Button
                className="w-24"
                type="primary"
                icon={<PoweroffOutlined />}
                onClick={() => {
                  sessionStorage.setItem("login", "true");
                  setShowResult(true);
                  setLogin(true);
                  setTimeout(() => {
                    onClose();
                  }, 1500);
                  // navigate("/admin");
                }}
              >
                Log in
              </Button>
            </Row>
          </Form>
        )}
      </Modal>
    </>
  );
};
