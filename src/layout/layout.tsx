import { Layout } from "antd";
import { HeaderComponent } from "../components/webPC/header";
import { ContentComponent } from "../components/webPC/content";

export const LayoutComponet = () => {
  return (
    <Layout>
      <HeaderComponent />
      <ContentComponent />
    </Layout>
  );
};
