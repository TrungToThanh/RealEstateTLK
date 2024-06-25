import { useState } from "react";
import { Avatar, NavBar, Popup, SearchBar } from "antd-mobile";

export const MobileHeaderLandingPage = () => {
  const [visible1, setVisible1] = useState(false);
  return (
    <>
      <NavBar right={<Avatar src="" />}>标题</NavBar>
      <SearchBar placeholder="nhập thông tin" />
      <Popup
        visible={visible1}
        onMaskClick={() => {
          setVisible1(false);
        }}
        onClose={() => {
          setVisible1(false);
        }}
        bodyStyle={{ height: "40vh" }}
      >
        121212
      </Popup>
    </>
  );
};
