import { Layout } from "antd";
import { ContentAdminComponent } from "./webPC/content";
import { HeaderComponent } from "../landing-page/header";

export const AdminPage = () => {
  return (
    <Layout className="bg-white">
      <HeaderComponent />
      <ContentAdminComponent />
    </Layout>
  );
};
