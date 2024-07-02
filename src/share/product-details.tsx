import {
  Button,
  Card,
  Divider,
  Flex,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Watermark,
} from "antd";
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
import { useContext, useEffect, useState } from "react";
import { getImages } from "../api/product";
import { apiUrl } from "../const/const";
import { wardsList } from "../const/wards";
import { ProductsContext } from "../components/product-provider";
import { PhoneOutlined } from "@ant-design/icons";
import logo from "../assets/logowhite.png";

type Props = {
  product: Product;
  open: boolean;
  onClose: () => void;
  setOpenModalContact: () => void;
};
export const ProductsDetail = ({
  product,
  open,
  onClose,
  setOpenModalContact,
}: Props) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 480px)",
  });
  const { employee } = useContext(ProductsContext);

  const [thumbsSwiper, setThumbsSwiper] = useState(product.thumbnail);
  const [imagePaths, setImagePaths] = useState<string[]>([]);

  useEffect(() => {
    const getDetail = async () => {
      const listImages = await getImages(product.productId);
      setImagePaths(listImages);
    };
    getDetail();
  }, [product]);

  const wardName =
    wardsList?.find((item) => item.wardId === product.ward)?.ward || "";

  const provinceName =
    wardsList?.find((item) => item.provinceId === product.province)?.province ||
    "";

  const districtName =
    wardsList?.find((item) => item.districtId === product.district)?.district ||
    "";

  return (
    <>
      <Modal
        open={open}
        footer={<></>}
        onCancel={onClose}
        title="Chi tiết sản phẩm"
        className={isDesktopOrLaptop ? "!w-[1200px] z-0" : "w-[300px] z-0"}
      >
        <Flex wrap>
          <Card
            title={` ${product.title}`}
            className={isDesktopOrLaptop ? "!w-[800px]" : "!w-full"}
          >
            <Watermark
              content="Tho Kim Land"
              image={logo}
              height={50}
              width={120}
              gap={[200, 200]}
              className="bg-transparent rounded-full bg-white"
            >
              <Image
                src={thumbsSwiper}
                width={isDesktopOrLaptop ? 800 : "100%"}
                height={isDesktopOrLaptop ? 400 : 300}
              />
            </Watermark>
            <Swiper
              loop={true}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mt-4 w-full"
            >
              {imagePaths?.map((fileName, index) => {
                const srcImage = `${apiUrl}/api/Products/image/${
                  product.productId
                }/${encodeURIComponent(fileName)}`;
                return (
                  <SwiperSlide onClick={() => setThumbsSwiper(srcImage)}>
                    <img key={index} src={srcImage} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Card>
          <Card
            title={
              <p>
                Giá bán:
                <InputNumber
                  className="text-red-700 w-fit border-0"
                  value={product.price}
                  formatter={(value) =>
                    `${value} VNĐ`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) =>
                    value?.replace(/\$\s?|(,*)/g, "") as unknown as number
                  }
                  readOnly
                />
              </p>
            }
            className="w-[350px]"
          >
            <Form
              initialValues={{
                description: product.description,
                province: provinceName,
                district: districtName,
                ward: wardName,
                users:
                  employee?.find(
                    (x) => Number(x.id) === Number(product.createdBy)
                  )?.name || "",
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
              <Divider>Vị trí bất động sản</Divider>
              <Form.Item label="Vị trí" noStyle></Form.Item>
              <Form.Item label="Tỉnh/TP" name="province">
                <Input bordered={false} readOnly />
              </Form.Item>
              <Form.Item label="Huyện/Quận" name="district">
                <Input bordered={false} readOnly />
              </Form.Item>
              <Form.Item label="Xã/Phường" name="ward">
                <Input bordered={false} readOnly />
              </Form.Item>
              <Form.Item label="Bản đồ" name="googleMap">
                <a href={product.location}>{product.location}</a>
              </Form.Item>
              <Divider>Đặc điểm bất động sản</Divider>
              <Flex>
                <Form.Item label={"Diện tích (m2)"} name="square">
                  <Input bordered={false} readOnly />
                </Form.Item>
                <Form.Item label="Chiều dài (m)" name="length">
                  <Input bordered={false} readOnly />
                </Form.Item>
              </Flex>
              <Flex>
                <Form.Item label="Mặt tiền (m)" name="frontWidth">
                  <Input bordered={false} readOnly />
                </Form.Item>
                <Form.Item label="Mặt sau (m)" name="backWidth">
                  <Input bordered={false} readOnly />
                </Form.Item>
              </Flex>
              <Divider>Thông tin môi giới</Divider>
              <Form.Item label="Môi giới" name="users">
                <Input
                  bordered={false}
                  readOnly
                  suffix={
                    <Button
                      size="small"
                      icon={<PhoneOutlined />}
                      onClick={setOpenModalContact}
                    >
                      Liên hệ
                    </Button>
                  }
                />
              </Form.Item>
            </Form>
          </Card>
        </Flex>
      </Modal>
    </>
  );
};
