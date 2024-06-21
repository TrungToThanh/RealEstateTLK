import axios from "axios";

export const GetDistricts = async (Id:string) => {
    const { data } = await axios.get( `https://open.oapi.vn/location/districts?page=0&size=100&&provinceId=${Id}`)
    return data?.data?.map((item: { id: string; name: string }) => {
        return {
          ...item,
          label: item?.name || "",
          value: item?.id || "",
        };
      }) || [];

  };