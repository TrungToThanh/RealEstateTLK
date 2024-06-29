import {
  LockOutlined,
  PlusCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  message,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { Employee } from "../types/types";
import { createEmployee } from "../api/employee";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const CreateNewUserComponent = ({ open, onClose }: Props) => {
  const [form] = useForm();

  const onFinish = async (employee: Employee) => {
    const employeeSubmit = {
      ...employee,
      phone: employee.phone.toString(),
      id: 0,
      position: "string",
      salary: 0,
    };
    const res = await createEmployee(employeeSubmit);
    if (res) {
      message.success("Tạo tài khoản thành công!");
      onClose();
    }
    message.error("Tạo tài khoản thất bại, vui lòng kiểm tra lại!");
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
          name="phone"
          rules={[{ required: true, message: "Hãy nhập số điện thoại" }]}
        >
          <InputNumber
            placeholder="Số điện thoại"
            className="w-full"
            controls={false}
            maxLength={11}
          />
        </Form.Item>
        <Form.Item
          label="Ngày sinh"
          name="birth"
          rules={[{ required: true, message: "Hãy chọn ngày tháng năm sinh" }]}
        >
          <DatePicker className="w-full" />
        </Form.Item>
        <Form.Item
          label="Giới tính"
          name="gender"
          rules={[{ required: true, message: "Hãy chọn giới tính" }]}
        >
          <Select
            options={[
              {
                value: "Male",
                label: "Nam",
              },
              {
                value: "FeMale",
                label: "Nữ",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Hãy nhập địa chỉ liên hệ" }]}
        >
          <Input placeholder="Địa chỉ liên hệ" />
        </Form.Item>
        <Form.Item
          label="Vai trò"
          name="role"
          rules={[{ required: true, message: "Hãy chọn vai trò" }]}
        >
          <Select
            options={[
              {
                label: "Quản trị",
                value: "Admin",
              },
              {
                label: "Nhân viên",
                value: "Staff",
              },
            ]}
          />
        </Form.Item>
        <Form.Item className="w-full justify-end flex">
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
