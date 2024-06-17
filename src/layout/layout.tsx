import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";

export const LayoutComponet = () => {
  return (
    <Layout>
      <Header className="bg-transparent">header</Header>
      <Content>main content</Content>
      <Footer>footer</Footer>
    </Layout>
  );
};
