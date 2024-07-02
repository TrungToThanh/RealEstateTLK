import { Space } from "antd";
import image from "../../../assets/services.jpg";
import { useGetSizeDevices } from "../../../hooks/use-get-size-devices";

export const ServicesComponent = () => {
  const { isIpad } = useGetSizeDevices();
  return (
    <div className="w-full justify-center max-w-[1200px] mx-auto ">
      <p className="font-bold text-[30px] pt-10">DỊCH VỤ CỦA CHÚNG TÔI</p>
      <Space wrap={isIpad ? false : true}>
        <img src={image} className="rounded-md mt-4" />
        <Space direction="vertical" className="my-auto items-center gap-10">
          <p className="text-start px-4">
            <span>
              <strong>Môi Giới Bất Động Sản:</strong> Chúng tôi cung cấp dịch vụ
              môi giới mua bán và cho thuê bất động sản, đảm bảo khách hàng tìm
              được những bất động sản phù hợp nhất với nhu cầu và mong muốn của
              mình.
            </span>
          </p>
          <p className="text-start px-4">
            <span>
              <strong>Tư Vấn Đầu Tư:</strong> Đội ngũ chuyên gia của chúng tôi
              luôn sẵn sàng tư vấn cho khách hàng về các cơ hội đầu tư bất động
              sản hiệu quả, giúp tối ưu hóa lợi nhuận và giảm thiểu rủi ro.
            </span>
          </p>
          <p className="text-start px-4">
            <span>
              <strong>Quản Lý Bất Động Sản:</strong> Chúng tôi cung cấp dịch vụ
              quản lý bất động sản chuyên nghiệp, đảm bảo tài sản của khách hàng
              luôn được duy trì và gia tăng giá trị theo thời gian.
            </span>
          </p>
        </Space>
      </Space>
    </div>
  );
};
