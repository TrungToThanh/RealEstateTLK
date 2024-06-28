import { Card, Divider, Flex, Form, Input, Modal } from "antd";
import { Product } from "../types/types";
import { useMediaQuery } from "react-responsive";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useState } from "react";

type Props = {
  product: Product;
  open: boolean;
  onClose: () => void;
};
export const ProductsDetail = ({ product, open, onClose }: Props) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 480px)",
  });
  const [thumbsSwiper, setThumbsSwiper] = useState();

  return (
    <>
      <Modal
        open={open}
        footer={<></>}
        onCancel={onClose}
        title="Chi tiết sản phẩm"
        className={isDesktopOrLaptop ? "!w-[1200px]" : "w-[300px]"}
      >
        <Flex wrap>
          <Card
            title={`Thông tin sản phẩm: ${product.title}`}
            className={isDesktopOrLaptop ? "!w-[800px]" : "!w-[300px]"}
          >
            <img
              src={thumbsSwiper}
              width={isDesktopOrLaptop ? 750 : 300}
              height={isDesktopOrLaptop ? 400 : 300}
            />
            <Swiper
              loop={true}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mt-4 w-full"
            >
              {product.images.map((image) => {
                return (
                  <SwiperSlide onClick={() => setThumbsSwiper(image)}>
                    <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Card>
          <Card
            title={<p className="text-red-700">Giá bán: {product.price} VNĐ</p>}
            className="w-[350px]"
          >
            <Form
              initialValues={{
                description: product.description,
                location: `${product.province}/${product.district}/${product.ward}`,
                users: product.createdBy || "12122",
                googleMap: product.location || "",
                square: product.square || 0,
                length: product.length || 0,
                backWidth: product.backWidth || 0,
                frontWidth: product.frontWidth || 0,
              }}
            >
              <Form.Item label="Mô tả" name="description">
                <Input.TextArea bordered={false} readOnly />
              </Form.Item>
              <Form.Item label="Vị trí" name="location">
                <Input bordered={false} readOnly />
              </Form.Item>
              <Form.Item label="Bản đồ" name="googleMap">
                <Input bordered={false} readOnly />
              </Form.Item>
              <Divider />
              <Form.Item label="Chiều dài" name="length">
                <Input bordered={false} readOnly />
              </Form.Item>
              <Form.Item label="Mặt sau" name="backWidth">
                <Input bordered={false} readOnly />
              </Form.Item>
              <Form.Item label="Diện tích" name="square">
                <Input bordered={false} readOnly />
              </Form.Item>
              <Form.Item label="Mặt tiền" name="frontWidth">
                <Input bordered={false} readOnly />
              </Form.Item>
              <Divider />
              <Form.Item label="Mô giới" name="users">
                <Input bordered={false} readOnly />
              </Form.Item>
            </Form>
            <Divider />
          </Card>
        </Flex>
      </Modal>
    </>
  );
};
