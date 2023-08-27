import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import DriverRegistration from "./DriverRegistration/DriverRegistration";
import UserRegistration from "./UserRegistration/UserRegistration";

const Registration = (props) => {
  const userData = Cookies.get("grabwayUser");
  const googleUserData=Cookies.get('grabwayGoogleToken');
  const googleUserType=props.userType;
  if (!userData) {
    if(!googleUserData){
      return <Navigate to={"/"} />;
    }
    if (googleUserData) {
      return <Navigate to={"/googleRegistration"}/>;
    }
    
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
       {userType === "driver" ?  <DriverRegistration />:<UserRegistration /> }
    </>
  );
};

export default Registration;
