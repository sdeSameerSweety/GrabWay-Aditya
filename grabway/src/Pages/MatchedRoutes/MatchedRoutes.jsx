import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { Box, Center, Image, Text, Fade } from "@chakra-ui/react";
// import "./MatchedRoutes.css";
import LoadingCarAnimation from "../../components/AllAnimations/LoadingCarAnimation";
const MatchedRoutes = () => {
  const [matchedRoutes, setMatchedRoutes] = useState(null);
  const [driverFound, setDriverFound] = useState(false);
  const location = useLocation();
  const formData = location.state;
  async function searchData() {
    try {
      const response = await axios
        .post("/routeUserSearch", { formData })
        .then((res) => {
          setMatchedRoutes(res.data);
          console.log(res.data);
        });
    } catch (err) {
      setMatchedRoutes("empty");
    }
  }
  useEffect(() => {
    searchData();
  }, []);

  if (location.state === null) {
    return <Navigate to="/" />;
  }
  const userData = Cookies.get("grabwayUser");
  const googleUserData = Cookies.get("grabwayGoogleToken");
  if (userData !== undefined) {
    if (JSON.parse(userData).name === "") {
      return <Navigate to={"/registration"} userType="" />;
    }
    if (JSON.parse(userData).userType === "driver") {
      return <Navigate to={"/"} />;
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
      {matchedRoutes === null && (
        <>
          <div>
            <LoadingCarAnimation />
          </div>
        </>
      )}

      {matchedRoutes === "empty" && <>driver not found</>}
      {matchedRoutes !== null && matchedRoutes !== "empty" && <></>}
    </>
  );
};

export default MatchedRoutes;
