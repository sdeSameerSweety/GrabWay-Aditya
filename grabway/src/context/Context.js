import Cookies from "js-cookie";
import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
export const UserContext = createContext({});
export function UserContextProvider({ children }) {
  const [userEmail, setUserEmail] = useState("");
  const [runContext, setRunContext] = useState("");

  const email = Cookies.get("grabwayToken");
  const [profilePhoto, setProfilePhoto] = useState("");
  const googleToken = Cookies.get("grabwayGoogleToken");
  useEffect(() => {
    if (email && !googleToken) {
      axios.post("/checkuser", { email }).then((res) => {
        // console.log(res.data);
        let data = res.data;
        setProfilePhoto(data.profilePicture);
        if (delete data.profilePicture)
          Cookies.set("grabwayUser", JSON.stringify(data), { expires: 7 });
        setUserEmail(res.data);
      });
    }
    if (email && googleToken) {
      axios.post("/checkuser", { email }).then((res) => {
        console.log("I am here up", res.data);
        let data = res.data;
        setProfilePhoto(data.profilePicture);
        if (delete data.profilePicture)
          Cookies.set("grabwayUser", JSON.stringify(data), { expires: 7 });
        setUserEmail(res.data);
      });
    }
  }, []);

  useEffect(() => {
    if (email && !googleToken) {
      axios.post("/checkuser", { email }).then((res) => {
        // console.log("I am here", res.data);
        let data = res.data;
        setProfilePhoto(data.profilePicture);
        if (delete data.profilePicture)
          Cookies.set("grabwayUser", JSON.stringify(data), { expires: 7 });
        setUserEmail(res.data);
      });
    }
    if (email && googleToken) {
      axios.post("/checkuser", { email }).then((res) => {
        console.log("I am here down", res.data);
        let data = res.data;
        setProfilePhoto(data.profilePicture);
        if (delete data.profilePicture)
          Cookies.set("grabwayUser", JSON.stringify(data), { expires: 7 });
        setUserEmail(res.data);
      });
    }
  }, [runContext]);

  return (
    <UserContext.Provider
      value={{ profilePhoto, userEmail, setUserEmail, setRunContext }}
    >
      {children}
    </UserContext.Provider>
  );
}
