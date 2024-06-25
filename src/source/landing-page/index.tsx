import { Layout } from "antd";
import { HeaderComponent } from "./header";
import { ContentComponent } from "./content";

export const LandingPage = () => {
  return (
    <Layout>
      <HeaderComponent />
      <ContentComponent />
    </Layout>
  );
};
