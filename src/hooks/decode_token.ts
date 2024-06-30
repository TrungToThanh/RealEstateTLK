import { JwtPayload, jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export const useCheckLogin = (token: string) => {
  const [decodedToken, setDecodedToken] = useState<JwtPayload>();
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!token) {
      setIsExpired(true);
      return; 
    }

    const decoded = jwtDecode(token);
    setDecodedToken(decoded);

    // Check if the token is expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken?.exp && decodedToken?.exp < currentTime) {
      setIsExpired(true);
    } else {
      setIsExpired(false);
    }
  }, [decodedToken?.exp, token]);

  return isExpired;
};
