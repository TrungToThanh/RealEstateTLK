import { useMediaQuery } from "react-responsive";

export const useGetSizeDevices = () => {
    const isIpad = useMediaQuery({
        query: "(min-width: 768px)",
      });
    
      const isNormalPhone = useMediaQuery({
        query: "(min-width: 390px)",
      });
    
      const isLaptop = useMediaQuery({
        query: "(min-width: 1200px)",
      });
    
    return({isIpad, isNormalPhone, isLaptop})
}