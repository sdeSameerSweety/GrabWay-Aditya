import React from "react";

// components

import UserSettings from "../../components/Profile/User/userSettings";
import UserProfile from "../../components/Profile/User/userProfile";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

export default function Settings() {

  const userData = Cookies.get("grabwayUser");
  if (userData !== undefined) {
    if ((JSON.parse(userData)).name==='') {
      return <Navigate to={"/registration"} />;
    }
  }
  if(!userData){
      return <Navigate to={"/"}/>
  }

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <UserSettings />
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <UserProfile />
        </div>
      </div>
    </>
  );
}
