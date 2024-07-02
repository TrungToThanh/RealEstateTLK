import { Layout, message } from "antd";
import { ContentAdminComponent } from "./content";
import { useCheckLogin } from "../../hooks/decode_token";
import { useNavigate } from "react-router-dom";
import { HeaderComponent } from "../../components/header";

export const AdminPage = () => {
  const navigator = useNavigate();
  const isExpired = useCheckLogin(localStorage.getItem("TKL_token") || "");
  if (isExpired) {
    message.error("Hãy đăng nhập lại tài khoản!");
    navigator("/");
  }
  return (
    <Layout className="bg-white">
      <HeaderComponent />
      <ContentAdminComponent />
    </Layout>
  );
};
