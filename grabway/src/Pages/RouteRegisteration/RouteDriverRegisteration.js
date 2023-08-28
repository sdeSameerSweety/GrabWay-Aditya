import React, { useContext, useEffect, useState } from "react";
import { Button, Input, useToast } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/Context";
import axios from "axios";
const RouteDriverRegisteration = () => {
  const [email, setEmail] = useState(null);
  const { setRunContext } = useContext(UserContext); //dont remove this
  const toast = useToast(); //dont remove this
  const originText = "origin";
  const originLat = 1212123214323;
  const originLong = 21212321321;
  const destinationText = "destiny";
  const destinationLat = 5454516547475;
  const destinationLong = 321654151321;
  const [originStartTime, setOriginStartTime] = useState(null);
  const [destinantionStartTime, setDestinationStartTime] = useState(null);
  const [originEndTime, setOriginEndTime] = useState(null);
  const [destinationEndTime, setDestinationEndTime] = useState(null);
  const [seats, setSeats] = useState(null);
  const googleUserData = Cookies.get("grabwayGoogleToken");
  const userData = Cookies.get("grabwayUser");
  const formData = {
    email,
    originText,
    originLat,
    originLong,
    destinationText,
    destinationLat,
    destinationLong,
    originStartTime,
    originEndTime,
    destinantionStartTime,
    destinationEndTime,
    seats,
  };
  async function handleSubmit() {
    try {
      const res = await axios.post("/routeDriverRegistration", { formData });
      if (res) {
        console.log("driver route added");
        setRunContext("driver route added");
        toast({
          title: "Route has been Added",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        return <Navigate to={"/driverHomepage"} />;
      }
    } 
    catch (err) {
      toast({
        title: "Failed to Add Route",
        description:
          "There was some problem adding the details, Please Try again Later",
        status: "Error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    if (userData !== undefined) {
      setEmail(JSON.parse(Cookies.get("grabwayUser")).email);
    }
  });

  //dont change this part, its for redirecting when not a logged in driver
  if (userData !== undefined) {
    if (JSON.parse(userData).name === "") {
      return <Navigate to={"/registration"} userType="" />;
    }
    if (JSON.parse(userData).userType === "user") {
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
    <div className="flex flex-col justify-center items-center w-[50vw] ml-[10vw]">
      <Input
        placeholder="originStartTime"
        onChange={(e) => setOriginStartTime(e.target.value)}
      />
      <Input
        placeholder="originEndTime"
        onChange={(e) => setOriginEndTime(e.target.value)}
      />
      <Input
        placeholder="destinationnStartTime"
        onChange={(e) => setDestinationStartTime(e.target.value)}
      />
      <Input
        placeholder="destinationEndTime"
        onChange={(e) => setDestinationEndTime(e.target.value)}
      />
      <Input placeholder="seats" onChange={(e) => setSeats(e.target.value)} />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default RouteDriverRegisteration;
