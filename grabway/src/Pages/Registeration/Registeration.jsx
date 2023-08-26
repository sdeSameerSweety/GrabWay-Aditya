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
    user.userType === "driver" ? "./DriverRegistration" : "./UserRegistration";//Not able to get path

  return <Navigate to={targetPath} />;
};

export default Registration;
const userAction = async (pincode) => {
  const response = await fetch(
    `https://api.postalpincode.in/pincode/${pincode}`
  );
  const myJson = await response.json(); //extract JSON from the http response
  console.log(myJson[0].PostOffice[0].State);
  console.log(myJson[0].PostOffice[0].Region);
};
userAction(361335);
