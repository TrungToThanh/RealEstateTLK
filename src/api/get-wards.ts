import axios from "axios";

export const GetWards = async (Id:string) => {
    const { data } = await axios.get( `https://open.oapi.vn/location/wards?page=0&size=100&&districtId=${Id}`)
    return data?.data?.map((item: { id: string; name: string }) => {
        return {
          ...item,
          label: item?.name || "",
          value: item?.id || "",
        };
      }) || [];

  };