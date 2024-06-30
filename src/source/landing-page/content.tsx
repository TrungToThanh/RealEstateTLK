import { Carousel } from "antd";
import { ProductComponent } from "../../share/products";
import { Content } from "antd/es/layout/layout";
import banner1 from "../../assets/banner1.png";
import banner2 from "../../assets/banner2.png";
import { useGetSizeDevices } from "../../hooks/use-get-size-devices";

export const ContentComponent = () => {
  const { isIpad, isLaptop } = useGetSizeDevices();
  return (
    <Content
      className={`max-h-[900px] max-w-[1200px] overflow-auto mt-20 pb-40`}
    >
      <Carousel autoplay>
        <div>
          <img
            src={banner1}
            style={{
              height: isLaptop ? 220 : isIpad ? 200 : 140,
              width: "100%",
            }}
          />
        </div>
        <div>
          <img
            src={banner2}
            style={{
              height: isLaptop ? 220 : isIpad ? 200 : 140,
              width: "100%",
            }}
          />
        </div>
      </Carousel>
      <ProductComponent />
    </Content>
  );
};
