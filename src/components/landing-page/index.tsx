import { Modal, Tabs } from "antd";
import { AboutUs } from "./about-us";
import { Contact } from "./contact";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const LandingPageComponent = ({ open, onClose }: Props) => {
  const items = [
    {
      key: "1",
      label: "Về chúng tôi",
      children: <AboutUs />,
    },
    {
      key: "2",
      label: "Liên hệ",
      children: <Contact />,
    },
  ];

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title="Kính chào quý khách!"
      footer={<></>}
      className="gap-0 !w-[800px] h-fit mt-28 !overflow-hidden"
    >
      <div className="h-[580px]">
        <p className="text-[15px]">
          <strong>
            Chào mừng bạn đến với
            <span className="text-blue-600"> Thổ Kim</span>
            <span className="text-yellow-500"> Land</span>, một trong những công
            ty bất động sản hàng đầu tại Việt Nam.
          </strong>
        </p>
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </Modal>
  );
};
