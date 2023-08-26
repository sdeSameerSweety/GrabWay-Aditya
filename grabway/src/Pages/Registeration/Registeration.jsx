import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./DriverRegistration";
import "./UserRegistration";

const Registration = () => {
  const userData = Cookies.get("grabwayUser");
  const hasUserData = userData !== undefined;
  const history = useNavigate();

  useEffect(() => {
    if (hasUserData) {
      const user = JSON.parse(userData);
      if (user.isDriver) {
        history.push("./DriverRegistration");
      } else {
        history.push("./DriverRegistration");
      }
    } else {
      history.push("/");
    }
  }, [hasUserData, history]);

  return null; // No need to render anything here
};

export default Registration;
