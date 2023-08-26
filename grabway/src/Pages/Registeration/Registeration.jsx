import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import "./UserRegistration";
import "./DriverRegistration";
import Cookies from "js-cookie";

const Registration = () => {
  const userData = Cookies.get("grabwayUser");
  const hasUserData = userData !== undefined;

  if (!hasUserData) {
    return <Navigate to={"/"} />;
  }

  const user = JSON.parse(userData);
  const targetPath =
    user.userType === "driver" ? "./DriverRegistration" : "./UserRegistration"; //Not able to get path

  return <Navigate to={targetPath} />;
};
