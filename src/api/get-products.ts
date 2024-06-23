import axios from "axios";
import { apiUrl } from "../const/const";

export const GetProducts = async () => {
    const { data } = await axios.get( `${apiUrl}/api/Products`)
    console.log(data)

  };