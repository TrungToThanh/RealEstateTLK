import {
  Avatar,
  Button,
  Collapse,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
} from "antd";

export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

export const AccountComponent = () => {
  const items = [
    {
      key: "1",
      label: <p className="font-bold">THÔNG TIN ĐĂNG NHẬP</p>,
      children: <ChangePassComponent />,
    },
    {
      key: "2",
      label: <p className="font-bold">THÔNG TIN LIÊN HỆ</p>,
      children: <ContactDetail />,
    },
  ];

  return (
    <>
      <Row>
        <Avatar /> Nguyễn Văn An - Ngày tham gia: 12/01/2024
      </Row>
      <Collapse items={items} defaultActiveKey={["1"]} className="mt-8" />
    </>
  );
};

export const ChangePassComponent = () => {
  return (
    <>
      <Form {...formItemLayout} scrollToFirstError>
        <Form.Item
          name={`currentPassword`}
          label={`Mật khẩu hiện tại`}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập đầy đủ thông tin",
            },
          ]}
        >
          <Input placeholder="Mật khẩu hiện tại" />
        </Form.Item>
        <Form.Item
          name={`newPassword`}
          label={`Mật khẩu mới`}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập đầy đủ thông tin",
            },
          ]}
        >
          <Input placeholder="Mật khẩu mới" />
        </Form.Item>
        <Form.Item
          name={`currentPassword`}
          label={`Xác nhận mật khẩu`}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập đầy đủ thông tin",
            },
          ]}
        >
          <Input placeholder="Xác nhận mật khẩu" />
        </Form.Item>
        <Button> Xác nhận </Button>
      </Form>
    </>
  );
};
export const ContactDetail = () => {
  return (
    <>
      <Form {...formItemLayout} scrollToFirstError>
        <Form.Item
          name={`name`}
          label={`Họ và tên`}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập đầy đủ thông tin",
            },
          ]}
        >
          <Input placeholder="Họ và tên" />
        </Form.Item>
        <Form.Item
          name={`birthday`}
          label={`Ngày sinh`}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập đầy đủ thông tin",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name={`gender`}
          label={`Giới tính`}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập đầy đủ thông tin",
            },
          ]}
        >
          <Radio.Group>
            <Radio value={1}>Nam</Radio>
            <Radio value={2}>Nữ</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name={`address`}
          label={`Địa chỉ`}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập đầy đủ thông tin",
            },
          ]}
        >
          <Input placeholder="Địa chỉ" />
        </Form.Item>
        <Form.Item
          name={`phone`}
          label={`Số điện thoại`}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập đầy đủ thông tin",
            },
          ]}
        >
          <Input placeholder="Số điện thoại" />
        </Form.Item>
        <Form.Item
          name={`email`}
          label={`Email`}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập đầy đủ thông tin",
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name={`id`}
          label={`CCCD`}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập đầy đủ thông tin",
            },
          ]}
        >
          <Input placeholder="CCCD" />
        </Form.Item>

        <Button> Xác nhận </Button>
      </Form>
    </>
  );
};
