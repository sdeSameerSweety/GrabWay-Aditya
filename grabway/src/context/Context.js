import Cookies from "js-cookie";
import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
export const UserContext = createContext({});
export function UserContextProvider({ children }) {
  const [userEmail, setUserEmail] = useState("");
  const [runContext ,setRunContext] = useState("");

  const email = Cookies.get("grabwayToken");
  useEffect(() => {
      if (email) {
        axios.post("/checkuser", { email }).then((res) => {
          console.log(res.data);
          setUserEmail(res.data);
        });
      }
  }, []);

  useEffect(() => {
    if (email) {
      axios.post("/checkuser", { email }).then((res) => {
        console.log(res.data);
        setUserEmail(res.data);
      });
    }
}, [runContext]);
  
  return (
    <UserContext.Provider value={{ userEmail, setUserEmail,setRunContext }}>
      {children}
    </UserContext.Provider>
  );
}
