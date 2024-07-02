export const handleModifyPrice = (value: number) => {
    if (!value) return "";

    // Remove non-numeric characters
    const numericValue = value.toString()?.replace(/[^0-9]/g, "");

    const isLogin = sessionStorage.getItem("TKL_login") === "true";

    if (isLogin) {
      return `${numericValue}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const displayValue =
      numericValue.length > 9
        ? Math.floor(Number(numericValue) / 1000000000)
        : numericValue.length > 6
        ? Math.floor(Number(numericValue) / 1000000)
        : numericValue;

    return (
      `${displayValue}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
      `${
        numericValue.length > 9
          ? ",xxx tỷ"
          : numericValue.length > 6
          ? ",xxx triệu"
          : " đồng"
      }`
    );
  };