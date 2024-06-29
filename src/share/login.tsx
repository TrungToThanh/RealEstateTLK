import {
  LockOutlined,
  PlusCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Modal, Space, message } from "antd";
// import { useNavigate } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { login } from "../api/auth";
import { useContext } from "react";
import { ProductsContext } from "../components/product-provider";

type Props = {
  open: boolean;
  onClose: () => void;
};
export const LoginComponent = ({ open, onClose }: Props) => {
  const [form] = useForm();
  const { setUserLogin } = useContext(ProductsContext);

  const onFinish = async (values: { email: string; password: string }) => {
    const response = await login(values.email, values.password);
    if (response.status >= 200 && response.status < 300) {
      message.success("Đăng nhập thành công!");
      localStorage.setItem("TKL_token", response.data?.token);
      setUserLogin(response.data?.employee);
      setTimeout(() => {
        onClose();
      }, 500);
    } else {
      message.error("Thất bại, vui lòng kiểm tra lại thông tin!");
      localStorage.removeItem("TKL_token");
      setUserLogin(null);
    }
  };

  return (
    <>
      <Modal
        open={open}
        footer={<></>}
        onCancel={onClose}
        title="Đăng nhập tài khoản"
        className="max-w-[350px]"
      >
        <Form
          name="login"
          initialValues={{ remember: true }}
          layout="vertical"
          className="mt-4"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Hãy nhập email của bạn" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Hãy nhập mật khẩu" }]}
            className="-mt-2"
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Mật khẩu"
            />
          </Form.Item>
          <Form.Item>
            <Space className="w-full justify-between">
              <a className="login-form-forgot" href="">
                Quên mật khẩu
              </a>
              <Button
                type="primary"
                htmlType="submit"
                ghost
                icon={<PlusCircleOutlined />}
              >
                Đăng nhập
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
