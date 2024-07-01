import { Card, Row, Space } from "antd";
import message from "../../assets/messageI.png";
import { FlagOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";

export const Contact = () => {
  return (
    <div className="w-full flex">
      <img src={message} className="w-full" />
      <div className="absolute ml-10 mt-20 justify-end ">
        <Card title="Liên hệ với chúng tôi" className="text-[15px]" hoverable>
          <Space direction="vertical">
            <Row className="text-[20px] mb-4">
              <span className="text-blue-600 font-bold"> Thổ Kim</span>
              <span className="text-yellow-500 px-2 font-bold"> Land</span>
            </Row>
            <Row>
              <FlagOutlined />
              <span className="text-[15px] px-2">
                Phố Gót, Xã Đông Sơn, Huyện Chương Mỹ, Hà Nội
              </span>
            </Row>
            <Row>
              <PhoneOutlined />{" "}
              <span className="text-[15px] px-2">
                Hotline: (+84) 9890 22922
              </span>
            </Row>
            <Row>
              <MailOutlined />{" "}
              <span className="text-[15px] px-2">
                Email: manhhien8491@gmail.com
              </span>
            </Row>
          </Space>
        </Card>
      </div>
    </div>
  );
};
