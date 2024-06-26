import { Layout } from "antd";
import { HeaderComponent } from "./header";
import { ContentComponent } from "./content";

export const LandingPage = () => {
  return (
    <Layout className="bg-white">
      <HeaderComponent />
      <ContentComponent />
    </Layout>
  );
};
