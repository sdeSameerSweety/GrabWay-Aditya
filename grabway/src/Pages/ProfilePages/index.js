import React from "react";

// components

import UserSettings from "../../components/Profile/User/userSettings";
import UserProfile from "../../components/Profile/User/userProfile";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

export default function Settings() {
  const googleUserData = Cookies.get("grabwayGoogleToken");

  const userData = Cookies.get("grabwayUser");
  if (userData !== undefined) {
    if (JSON.parse(userData).name === "") {
      return <Navigate to={"/registration"} userType="" />;
    }
  }
  if (!userData) {
    if (!googleUserData) {
      return <Navigate to={"/"} />;
    }
    if (googleUserData) {
      return <Navigate to={"/googleRegistration"} />;
    }
  }

  return (
    <>
      <div className="flex flex-wrap justify-center items-center">
        <div className="w-full lg:w-8/12 px-4">
          <UserSettings userData={userData} />
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <UserProfile userData={userData} />
        </div>
      </div>
    </>
  );
}
