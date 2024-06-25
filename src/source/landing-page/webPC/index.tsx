import { Layout } from "antd";
import { HeaderComponent } from "./header";
import { ContentComponent } from "./content";

export const WebLandingPage = () => {
  return (
    <Layout>
      <HeaderComponent />
      <ContentComponent />
    </Layout>
  );
};
