import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import DriverRegistration from "./DriverRegistration";
import UserRegistration from "./UserRegistration";

const Registration = () => {
  const userData = Cookies.get("grabwayUser");
  const hasUserData = userData !== undefined;

  if (!hasUserData) {
    return <Navigate to={"/"} />;
  }

  const userType = JSON.parse(userData).userType;
  return (
    <>
      {userType === "driver" ? <UserRegistration /> : <DriverRegistration />}
    </>
  );
};

export default Registration;
