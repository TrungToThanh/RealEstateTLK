import axios from "axios";

export const GetProvinces = async () => {
    const { data } = await axios.get("https://open.oapi.vn/location/provinces?page=0&size=100")
    return data?.data?.map((item: { id: string; name: string }) => {
        return {
          ...item,
          label: item?.name || "",
          value: item?.id || "",
        };
      }) || [];

  };