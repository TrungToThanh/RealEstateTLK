import {
  LockOutlined,
  PlusCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import supabase from "../utils/supabaseClient";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const CreateNewUserComponent = ({ open, onClose }: Props) => {
  const [form] = useForm();

  const onFinish = async (value: {
    email: string;
    name: string;
    password: string;
    numberPhone: number;
  }) => {
    const { data, error } = await supabase.auth.signUp({
      email: value.email,
      password: value.password,
      options: {
        data: {
          name: value.name,
          phone: value.numberPhone,
        },
      },
    });

    console.log(data, error);
  };
  return (
    <Modal
      open={open}
      footer={<></>}
      onCancel={onClose}
      title="Đăng nhập tài khoản"
      className="max-w-[350px]"
    >
      <Form
        name="signup"
        layout="vertical"
        className="mt-4"
        form={form}
        onFinish={onFinish}
        title="Tạo mới người dùng"
      >
        <Form.Item
          label="Họ và tên"
          name="name"
          rules={[{ required: true, message: "Hãy nhập họ và tên của bạn" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Họ và tên" />
        </Form.Item>
        <Form.Item
          label="Email"
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
        <Form.Item
          label="Số điện thoại"
          name="numberPhone"
          rules={[{ required: true, message: "Hãy nhập số điện thoại" }]}
        >
          <InputNumber
            placeholder="Số điện thoại"
            className="w-full"
            controls={false}
            maxLength={11}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            ghost
            icon={<PlusCircleOutlined />}
          >
            Tạo tài khoản
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
