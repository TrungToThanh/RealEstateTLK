import { Layout } from "antd";
import { HeaderComponent } from "./webPC/header";
import { ContentComponent } from "./webPC/content";

export const LandingPage = () => {
  return (
    <Layout>
      <HeaderComponent />
      <ContentComponent />
    </Layout>
  );
};
