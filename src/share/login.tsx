import {
  LockOutlined,
  PlusCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Modal, Row, Space, message } from "antd";
// import { useNavigate } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import supabase from "../utils/supabaseClient";

type Props = {
  open: boolean;
  onClose: () => void;
};
export const LoginComponent = ({ open, onClose }: Props) => {
  const [form] = useForm();

  const onFinish = async (values: { email: string; password: string }) => {
    console.log("values", values);
    const { data } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    if (data?.user?.id) {
      message.success("Đăng nhập thành công!");
      sessionStorage.setItem("login", "true");
      sessionStorage.setItem("TKL_login_user", data.user?.email || "");
      setTimeout(() => {
        onClose();
      }, 500);
    } else {
      message.error("Thất bại, vui lòng kiểm tra lại thông tin!");
      sessionStorage.setItem("login", "false");
      sessionStorage.setItem("TKL_login_user", "");
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
          name="normal_login"
          initialValues={{ remember: true }}
          layout="vertical"
          className="mt-4"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            label="Email:"
            name="email"
            rules={[{ required: true, message: "Hãy nhập email của bạn" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu:"
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
          <Row className="w-full mt-4 justify-end"></Row>
        </Form>
      </Modal>
    </>
  );
};
