import {
  MessageOutlined,
  PhoneOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Modal, Rate, Space, message } from "antd";
import { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { ProductsContext } from "../components/product-provider";

type ModalContact = {
  open: boolean;
  onClose: () => void;
  userId?: number;
};

export const ModalContact = ({ open, userId, onClose }: ModalContact) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  const { employee } = useContext(ProductsContext);
  const userName = employee?.find((x) => x.id === userId)?.name;
  const userPhone = employee?.find((x) => x.id === userId)?.phone;

  return (
    <Modal
      title="Liên hệ:"
      open={open}
      onOk={onClose}
      onCancel={onClose}
      footer={<></>}
      className="z-[99999] flex"
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
            <p className="text-xs">{userName}</p>
            <Rate defaultValue={3} allowClear={false} className="text-xs" />
          </div>
        </p>
        <Space.Compact
          direction={isDesktopOrLaptop ? "horizontal" : "vertical"}
        >
          <Button
            icon={<MessageOutlined />}
            onClick={() => (window.location.href = `tel:${userPhone}`)}
          >
            Nhắn tin
          </Button>
          <Button
            icon={<PhoneOutlined />}
            onClick={() => (window.location.href = `tel:${userPhone}`)}
          >
            Gọi
          </Button>
          <Button
            icon={<WhatsAppOutlined />}
            onClick={() =>
              message.info("Tính năng này sẽ được phát triển ở giai đoạn 2")
            }
          >
            Zalo
          </Button>
        </Space.Compact>
      </Space>
    </Modal>
  );
};
