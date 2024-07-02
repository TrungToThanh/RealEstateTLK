import { Layout } from "antd";
import { HeaderComponent } from "../../components/header";
import { BannerComponent } from "./component/banner";
import { HotProductComponent } from "./component/hot-product";
import { AboutUs } from "./component/about-us";
import { ContactComponent } from "./component/contact";
import { ServicesComponent } from "./component/services";

const { Content } = Layout;

export const LandingPage = () => {
  return (
    <Layout className="w-full h-full">
      <HeaderComponent isLanding={true} />
      <Content className="bg-white">
        <BannerComponent />
        <HotProductComponent />
        <AboutUs />
        <ServicesComponent />
        <ContactComponent />
      </Content>
    </Layout>
  );
};
