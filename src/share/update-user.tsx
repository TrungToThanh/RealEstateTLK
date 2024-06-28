import {
  LockOutlined,
  PlusCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, InputNumber } from "antd";
import { useForm } from "antd/es/form/Form";
import supabase from "../utils/supabaseClient";
import { useEffect } from "react";
import { Profile } from "../types/types";

export const UpdateUserComponent = () => {
  const [form] = useForm();
  // const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    const getProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log("user", user);
    };

    getProfile();
  });
  const onFinish = async (value: Profile) => {
    const { data, error } = await supabase.auth.signUp({
      email: value.email,
      password: value.password || "",
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
    <Form
      name="profile"
      layout="vertical"
      className="mt-4"
      form={form}
      onFinish={onFinish}
    >
      <Form.Item label="Mã nhân viên" name="id">
        <Input readOnly />
      </Form.Item>
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
          Cập nhập thông tin
        </Button>
      </Form.Item>
    </Form>
  );
};
