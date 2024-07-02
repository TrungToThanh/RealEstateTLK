import Search from "antd/es/input/Search";
import banner from "../../../assets/desktop.webp";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

export const BannerComponent = () => {
  const navigate = useNavigate();
  return (
    <div className="relative z-0 w-full h-full justify-center mx-auto">
      <div
        className="max-w-7xl mx-auto px-4 py-32 text-center relative z-10"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "object-cover",
        }}
      >
        <h1 className="text-4xl font-bold text-white mb-8">
          XIN CHÀO QUÝ KHÁCH!
        </h1>
        <p className="text-3xl font-bold bg-white rounded-2xl w-60 mx-auto">
          <strong>
            <span className="text-blue-800">Thổ Kim </span>
            <span className="text-yellow-500">Land</span>
          </strong>
        </p>
        <p className="text-lg text-white font-bold">
          Uy Tín - Chất Lượng - Sáng Tạo - Bền Vững
        </p>
        <Search
          size="large"
          placeholder="Hãy tìm bất động sản bạn quan tâm"
          className="max-w-[600px] mt-4"
          enterButton={
            <Button type="primary" onClick={() => navigate("/products")}>
              Tìm kiếm
            </Button>
          }
          onClick={() => navigate("/products")}
        />
      </div>
    </div>
  );
};
