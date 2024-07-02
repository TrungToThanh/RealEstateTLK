import { FlagOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Card, Space } from "antd";
import { useGetSizeDevices } from "../../../hooks/use-get-size-devices";

export const ContactComponent = () => {
  const { isIpad } = useGetSizeDevices();
  return (
    <div className="w-full justify-center max-w-[1200px] mx-auto pb-40">
      <p className="font-bold text-[30px] pt-10">LIÊN HỆ VỚI CHÚNG TÔI</p>
      <Space
        className="pt-4 justify-between mx-auto w-full"
        wrap={isIpad ? false : true}
      >
        <Card hoverable className="h-[250px] w-full">
          <Space
            direction="vertical"
            className="gap-4 justify-start text-start"
          >
            <div className="text-[28px] mb-4">
              <span className="text-blue-600 font-bold"> THỔ KIM</span>
              <span className="text-yellow-500 px-2 font-bold"> LAND</span>
            </div>
            <div>
              <FlagOutlined />
              <span className="text-[15px] px-2">
                <strong>Địa chỉ:</strong> Phố Gót, Xã Đông Sơn, Huyện Chương Mỹ,
                Hà Nội
              </span>
            </div>
            <div>
              <PhoneOutlined />
              <span className="text-[15px] px-2">
                <strong>Hotline:</strong> (+84) 9890 22922
              </span>
            </div>
            <div>
              <MailOutlined />
              <span className="text-[15px] px-2">
                <strong>Email:</strong> manhhien8491@gmail.com
              </span>
            </div>
          </Space>
        </Card>
        <div
          style={{
            width: "45vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3726.997665422746!2d105.61326497612684!3d20.912413591762782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31344ffe258ff4ad%3A0x548095d55083fe74!2zQuG6pXQgxJDhu5luZyBT4bqjbiBUaOG7lSBLaW0gTGFuZA!5e0!3m2!1svi!2s!4v1719929395159!5m2!1svi!2s"
            loading="lazy"
            className="h-[250px] w-full"
          ></iframe>
        </div>
      </Space>
    </div>
  );
};
