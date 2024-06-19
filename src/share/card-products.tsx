import {
  DollarOutlined,
  EnvironmentOutlined,
  EyeOutlined,
  GatewayOutlined,
  PhoneOutlined,
  PictureOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, Row, Space, Watermark } from "antd";
import Meta from "antd/es/card/Meta";

type CardProductComponentProps = {
  setOpen: (value: boolean) => void;
};

export const CardProductComponent = ({
  setOpen,
}: CardProductComponentProps) => {
  return (
    <>
      <Card
        hoverable
        style={{ width: 300 }}
        cover={
          <>
            <div className="w-[96%] justify-between flex text-start my-2">
              <Space className="w-full px-1 justify-between">
                <p className="flex items-center my-auto">
                  <Avatar
                    src="https://api.dicebear.com/7.x/miniavs/svg?seed=8"
                    size="small"
                    shape="circle"
                    className="border-1 bg-slate-500"
                  />
                  <div className="px-2">
                    <p className="text-xs"> N.V.Linh</p>
                    <p className="text-xs"> 12/06/2024</p>
                  </div>
                </p>
                <Space>
                  <Button
                    icon={<PhoneOutlined />}
                    onClick={() => setOpen(true)}
                  />
                </Space>
              </Space>
            </div>
            <Watermark content="Tho Kim Land">
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                width={"100%"}
                className="p-1 rounded"
              />
            </Watermark>
            <Space className="w-full flex justify-between px-2" size={4}>
              <div className="w-[96%] text-end absolute -mt-44 z-10">
                <p></p>
                <p className="block">
                  <p className="text-red-500">
                    380 <EyeOutlined />
                  </p>
                  <p className="w-full flex text-start justify-between absolute mt-[126px] -mx-1 z-10">
                    <Button icon={<EnvironmentOutlined />} size="small">
                      Thụy Hương
                    </Button>
                    <p>
                      12 <PictureOutlined />
                    </p>
                  </p>
                </p>
              </div>
            </Space>
          </>
        }
        actions={[
          <p>
            <GatewayOutlined /> <span>50m2</span>
          </p>,
          <p>
            <DollarOutlined />
            <span className="text-red-500 font-bold"> 2,x tỷ</span>
          </p>,
          <p>
            <Button
              type="link"
              icon={<ShareAltOutlined />}
              size="small"
              className="-mx-[6px]"
            >
              Chia sẽ
            </Button>
          </p>,
        ]}
      >
        <Meta
          title={
            <Row>
              <span className="text-wrap flex text-md text-start pt-0">
                Bán Đất Phân Lô Cực Đẹp Ngay Gần Trung Tâm Xã
              </span>
            </Row>
          }
        />
      </Card>
    </>
  );
};
