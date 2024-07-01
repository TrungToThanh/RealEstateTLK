import { LockOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Space, message } from "antd";
// import { useNavigate } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { login } from "../api/auth";

type Props = {
  open: boolean;
  onClose: () => void;
};
export const LoginComponent = ({ open, onClose }: Props) => {
  const [form] = useForm();

  const onFinish = async (values: { email: string; password: string }) => {
    const response = await login(values.email, values.password);
    if (response.data?.success) {
      message.success("Đăng nhập thành công!");
      localStorage.setItem("TKL_token", response.data?.token);
      localStorage.setItem("TKL_user_login_id", response.data?.employee?.id);
      localStorage.setItem(
        "TKL_user_login_name",
        response.data?.employee?.name
      );
      localStorage.setItem(
        "TKL_user_login_mail",
        response.data?.employee?.email
      );
      localStorage.setItem("TKL_user_login_role", response.data?.employee?.role);
      setTimeout(() => {
        onClose();
      }, 500);

      return;
    }

    message.error("Thất bại, vui lòng kiểm tra lại thông tin!");
    localStorage.removeItem("TKL_token");
    localStorage.removeItem("TKL_user_login_id");
    localStorage.removeItem("TKL_user_login_name");
    localStorage.removeItem("TKL_user_login_mail");
    localStorage.removeItem("TKL_user_login_role");
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
              <Button
                type="link"
                onClick={() =>
                  message.info("Liên hệ Admin để cấp mật khẩu mới!")
                }
              >
                Quên mật khẩu
              </Button>

              <Button
                type="primary"
                htmlType="submit"
                ghost
                icon={<LoginOutlined />}
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
