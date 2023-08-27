import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import DriverRegistration from "./DriverRegistration/DriverRegistration";
import UserRegistration from "./UserRegistration/UserRegistration";

const Registration = (props) => {
  const userData = Cookies.get("grabwayUser");
  const hasUserData = userData !== undefined;
  const googleUserType=props.userType;
  if (!hasUserData) {
    return <Navigate to={"/"} />;
  }
  if(userData){
    if((JSON.parse(userData).name)!==''){
      return <Navigate to={"/"} />;
    }
  }
  const userType = JSON.parse(userData).userType;

  //{googleUserType==='driver'? <GoogleDriverRegistration/>:<GoogleUserRegistration/>}
  return (
    <>
      {<>
      {googleUserType==='' && <>
      {userType === "driver" ?  <DriverRegistration />:<UserRegistration /> }
      </>}
      {googleUserType!=='' && <>
        google driver / user conditional rendering page.
      </>}
      </>}
    </>
  );
};

export default Registration;
