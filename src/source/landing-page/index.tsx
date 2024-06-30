import { FloatButton, Layout } from "antd";
import { HeaderComponent } from "./header";
import { ContentComponent } from "./content";
import { FacebookOutlined, WhatsAppOutlined } from "@ant-design/icons";

export const LandingPage = () => {
  return (
    <Layout className="w-full h-full bg-[#f9f9f9]">
      <HeaderComponent />
      <ContentComponent />
      <FloatButton.Group shape="square" style={{ right: 24 }}>
        <FloatButton
          icon={<FacebookOutlined />}
          onClick={() =>
            window.open(
              "https://www.facebook.com/p/TH%E1%BB%94-KIM-LAND-100063812612699/",
              "_blank"
            )
          }
        />
        <FloatButton icon={<WhatsAppOutlined />} />
        <FloatButton.BackTop
          visibilityHeight={0}
          onClick={() => {
            const element = document.getElementById("content");
            if (element) {
              element.scrollTop = 10;
            }
          }}
        />
      </FloatButton.Group>
    </Layout>
  );
};
