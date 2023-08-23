import React from "react";

// components

import UserSettings from "../../components/Profile/User/userSettings";
import UserProfile from "../../components/Profile/User/userProfile";

export default function Settings() {
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
