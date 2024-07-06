import { Layout } from "antd";
import { HeaderComponent } from "../../components/header";
import { BannerComponent } from "./component/banner";
import { HotProductComponent } from "./component/hot-product";
import { AboutUs } from "./component/about-us";
import { ServicesComponent } from "./component/services";
import { NewContact } from "./component/new-contact";

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
        <NewContact />
      </Content>
    </Layout>
  );
};
