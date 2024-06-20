import {
  LockOutlined,
  PoweroffOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input, Modal, Row } from "antd";

type Props = {
  open: boolean;
  onClose: () => void;
};
export const LoginComponent = ({ open, onClose }: Props) => {
  //   const onFinish = (values) => {
  //     console.log("Received values of form: ", values);
  //   };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title="Đăng nhập tài khoản"
      footer={<></>}
      className="max-w-[350px]"
    >
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
          <Button className="w-24" type="primary" icon={<PoweroffOutlined />}>
            Log in
          </Button>
        </Row>
      </Form>
    </Modal>
  );
};
