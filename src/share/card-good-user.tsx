import { PlusCircleOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Modal,
  Rate,
  Space,
  message,
} from "antd";
import { useState } from "react";

type Props = {
  name?: string;
  content?: string;
};
export const CardGoodUser = ({ name = "", content = "" }: Props) => {
  const [isShowContact, setShowContact] = useState(false);
  return (
    <>
      <Card title={"Nhân viên tiêu biểu"} bordered={false}>
        <Space direction="vertical" className="w-full justify-start mx-auto">
          <div>
            <Avatar src="https://joeschmoe.io/api/v1/random" className="mx-2">
              {name?.at(0)}
            </Avatar>
            {name}
          </div>
          {content}
          <Rate />
        </Space>
        <Button> Liên hệ </Button>
      </Card>
      {isShowContact && (
        <Modal
          open={isShowContact}
          onCancel={() => setShowContact(false)}
          title="Liên hệ môi giới"
          footer={<></>}
          className="w-full gap-0"
        >
          <Form>
            <Form.Item
              label="Họ và tên"
              name="name"
              rules={[
                { required: true, message: "Hãy nhập họ và tên của bạn" },
              ]}
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
            <Form.Item>
              <Space className="w-full justify-center">
                <Button
                  type="primary"
                  ghost
                  icon={<PlusCircleOutlined />}
                  onClick={() =>
                    message.info(
                      "Cám ơn bạn đã để lại thông tin! Nhân viên sẽ liên hệ bạn trong thời gian sớm nhất"
                    )
                  }
                >
                  Liên hệ
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};
