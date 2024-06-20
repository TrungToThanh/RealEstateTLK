import { Layout } from "antd";
import { HeaderAdminComponent } from "./webPC/header";
import { ContentAdminComponent } from "./webPC/content";

export const AdminPage = () => {
  return (
    <Layout>
      <HeaderAdminComponent />
      <ContentAdminComponent />
    </Layout>
  );
};
