"use client";

import { SafeArea } from "antd-mobile";
import { MobileHeaderLandingPage } from "./header";

export const MobileLandingPage = () => {
  return (
    <div>
      <div style={{ background: "#ace0ff" }}>
        <SafeArea position="top" />
      </div>
      <MobileHeaderLandingPage />
      <div style={{ background: "#ffcfac" }}>
        <SafeArea position="bottom" />
      </div>
    </div>
  );
};
