import { FloatButton, Layout, Tooltip } from "antd";

import { FacebookOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { ContentComponent } from "./content";
import { HeaderComponent } from "../../components/header";
import { useNavigate } from "react-router-dom";

export const ProductPage = () => {
  const navigate = useNavigate();
  return (
    <Layout className="w-full h-full bg-[#f9f9f9]">
      <HeaderComponent />
      <ContentComponent />
      <FloatButton.Group shape="circle" style={{ right: 24 }}>
        <Tooltip title="Theo dõi facebook">
          <FloatButton
            icon={<FacebookOutlined />}
            onClick={() =>
              window.open(
                "https://www.facebook.com/p/TH%E1%BB%94-KIM-LAND-100063812612699/",
                "_blank"
              )
            }
          />
        </Tooltip>
        <Tooltip title="Liên hệ với chúng tôi">
          <FloatButton
            icon={<WhatsAppOutlined />}
            onClick={() => navigate("/")}
          />
        </Tooltip>
        <Tooltip title="Lên đầu trang">
          <FloatButton.BackTop
            visibilityHeight={0}
            onClick={() => {
              const element = document.getElementById("content");
              if (element) {
                element.scrollTop = 10;
              }
            }}
          />
        </Tooltip>
      </FloatButton.Group>
    </Layout>
  );
};
