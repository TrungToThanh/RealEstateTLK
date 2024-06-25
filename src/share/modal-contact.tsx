import {
  MessageOutlined,
  PhoneOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Modal, Rate, Space } from "antd";
import { useMediaQuery } from "react-responsive";

type ModalContact = {
  open: boolean;
  onClose: () => void;
};

export const ModalContact = ({ open, onClose }: ModalContact) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  return (
    <Modal
      title="Liên hệ:"
      open={open}
      onOk={onClose}
      onCancel={onClose}
      footer={<></>}
    >
      <Space className="w-full px-1 justify-between">
        <p className="flex items-center my-auto">
          <Avatar
            src="https://api.dicebear.com/7.x/miniavs/svg?seed=8"
            size="large"
            shape="circle"
            className="border-1 bg-slate-500"
          />
          <div className="px-2">
            <p className="text-xs"> Nguyễn Văn Linh</p>
            <Rate defaultValue={3} allowClear={false} className="text-xs" />
          </div>
        </p>
        <Space.Compact
          direction={isDesktopOrLaptop ? "horizontal" : "vertical"}
        >
          <Button icon={<MessageOutlined />}> Nhắn tin </Button>
          <Button icon={<PhoneOutlined />}> Gọi </Button>
          <Button icon={<WhatsAppOutlined />}> Zalo </Button>
        </Space.Compact>
      </Space>
    </Modal>
  );
};
