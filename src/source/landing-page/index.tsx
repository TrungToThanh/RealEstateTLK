import { useMediaQuery } from "react-responsive";
import { WebLandingPage } from "./webPC";
import { MobileLandingPage } from "./mobile/index,";

export const LandingPage = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  if (isDesktopOrLaptop) {
    return <WebLandingPage />;
  }
  return <MobileLandingPage />;
};
