import { Space } from "antd";
import home from "../../../assets/map.jpg";
import image1 from "../../../assets/Gioithieuchung.png";
import image2 from "../../../assets/Sumenh.png";
import image3 from "../../../assets/Tamnhin.png";
import { useGetSizeDevices } from "../../../hooks/use-get-size-devices";

export const AboutUs = () => {
  const { isIpad } = useGetSizeDevices();

  return (
    <div className="w-full justify-center max-w-[1200px] mx-auto">
      <div style={{ backgroundImage: `url(${home})` }}>
        <p className="font-bold text-[30px] pt-10">VỀ CHÚNG TÔI</p>
        <Space className="gap-12" wrap={isIpad ? false : true}>
          <div className="flex w-full justify-center mx-auto">
            <div className="flex flex-col  w-full justify-center mx-auto">
              <img src={image1} className="w-20 h-20 mx-auto mt-4 mb-4" />
              <p className="text-center text-[16px] font-bold">
                Giới thiệu chung
              </p>
              <p>
                Chúng tôi là một công ty bất động sản hàng đầu, chuyên cung cấp
                các dịch vụ bất động sản uy tín và chất lượng. Với nhiều năm
                kinh nghiệm, chúng tôi tự hào đã và đang mang đến những giải
                pháp bất động sản tối ưu, đáp ứng nhu cầu đa dạng của khách hàng
                từ cá nhân, gia đình đến doanh nghiệp.
              </p>
            </div>
          </div>
          <div className="flex w-full justify-center mx-auto">
            <div className="flex flex-col w-full justify-center mx-auto">
              <img src={image2} className="w-20 h-20 mx-auto mt-4 mb-4" />
              <p className="text-center text-[16px] font-bold">Sứ mệnh</p>
              <p>
                Chúng tôi cam kết cung cấp những giải pháp bất động sản toàn
                diện và sáng tạo, đáp ứng nhu cầu đa dạng của khách hàng. Bằng
                sự tận tâm và chuyên nghiệp, chúng tôi mang đến những giá trị
                bền vững, nâng cao chất lượng cuộc sống và góp phần vào sự phát
                triển cộng đồng.
              </p>
            </div>
          </div>
          <div className="flex w-full justify-center mx-auto">
            <div className="flex flex-col w-full justify-center mx-auto">
              <img src={image3} className="w-20 h-20 mx-auto mt-4 mb-4" />
              <p className="text-center text-[16px] font-bold">Tầm nhìn</p>
              <p>
                Trở thành công ty dẫn đầu trong lĩnh vực bất động sản, không chỉ
                ở trong nước mà còn trên thị trường quốc tế. Chúng tôi đặt mục
                tiêu xây dựng một hệ sinh thái bất động sản thông minh, kết nối
                cộng đồng và mang lại trải nghiệm sống tốt nhất cho khách hàng.
              </p>
            </div>
          </div>
        </Space>
      </div>
    </div>
  );
};
