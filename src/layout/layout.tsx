import { Layout } from "antd";
import { HeaderComponent } from "../components/landing-page/webPC/header";
import { ContentComponent } from "../components/landing-page/webPC/content";

export const LayoutComponent = () => {
  return (
    <Layout>
      <HeaderComponent />
      <ContentComponent />
    </Layout>
  );
};
