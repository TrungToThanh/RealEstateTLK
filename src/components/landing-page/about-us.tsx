import { Carousel } from "antd";
import home from "../../assets/home.png";
import { useGetSizeDevices } from "../../hooks/use-get-size-devices";

export const AboutUs = () => {
  const { isLaptop } = useGetSizeDevices();
  return (
    <>
      <img
        src={home}
        className={`pl-10 absolute w-full ${isLaptop ? "" : "h-[450px]"}`}
      />
      <Carousel
        autoplay
        className={`${isLaptop ? "w-6/12" : "w-8/12"} pt-20 text-md`}
        fade
      >
        <div className="h-fit">
          <h3 className="border-0 border-solid border-black w-full bg-slate-100 rounded-lg p-5 shadow-2xl ">
            <p className="w-full wrap whitespace-pre-line break-words text-md">
              <strong>Tầm nhìn:</strong> <br />{" "}
              <i>
                Chúng tôi luôn hướng tới việc xây dựng một cộng đồng bất động
                sản phát triển bền vững, nơi mọi người có thể tìm thấy ngôi nhà
                mơ ước và những cơ hội đầu tư tốt nhất.
              </i>
            </p>
          </h3>
        </div>
        <div>
          <h3 className="border-0 border-solid border-black w-full bg-slate-100 rounded-lg p-5 shadow-2xl ">
            <p className="w-full wrap whitespace-pre-line break-words text-md">
              <strong>Sứ mệnh của chúng tôi là:</strong> <br />{" "}
              <i>
                + Đối với khách hàng: Cung cấp các sản phẩm và dịch vụ bất động
                sản chất lượng, phù hợp với nhu cầu và khả năng tài chính của
                khách hàng.
                <br /> + Đối với nhân viên: Tạo ra môi trường làm việc chuyên
                nghiệp, sáng tạo và phát triển.
                <br /> + Đối với xã hội: Đóng góp vào sự phát triển bền vững của
                cộng đồng và môi trường sống.
              </i>
            </p>
          </h3>
        </div>
        <div>
          <h3 className="border-0 border-solid border-black w-full bg-slate-100 rounded-lg p-5 shadow-2xl ">
            <p className="w-full wrap whitespace-pre-line break-words text-md">
              <strong>Giá trị cốt lõi:</strong> <br />{" "}
              <i>
                + Chất lượng: Cam kết cung cấp các sản phẩm và dịch vụ đạt tiêu
                chuẩn cao nhất.
                <br /> + Tận tâm: Luôn đặt lợi ích của khách hàng lên hàng đầu.
                <br /> + Uy tín: Giữ vững chữ tín trong mọi giao dịch và quan
                hệ.
                <br /> + Sáng tạo: Luôn đổi mới và cải tiến để mang lại những
                giá trị tốt nhất.
              </i>
            </p>
          </h3>
        </div>
      </Carousel>
    </>
  );
};
