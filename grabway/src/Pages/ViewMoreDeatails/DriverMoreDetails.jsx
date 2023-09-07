import React, { useState } from "react";
import {
  Box,
  Image,
  Text,
  VStack,
  Badge,
  Divider,
  Grid,
  GridItem,
  Card,
} from "@chakra-ui/react";
import "./DriverMoreDetails.css";
import { useLocation, Navigate } from "react-router-dom";
import { getApp } from "firebase/app";

const DriverDetails = () => {
  const location = useLocation();
  const driverData = JSON.parse(localStorage.getItem("grabwayUser"));
  // const [customerdetails, setcustomerdetails] = useState([]);
  if (location.state === null || location.state === undefined) {
    return <Navigate to={"/"} />;
  }
  if (driverData === null || driverData === undefined) {
    return <Navigate to={"/"} />;
  }

  function getampm(time) {
    if (Number(time.split(":")[0]) >= 12) return " PM";
    else return " AM";
  }

  function getTimein12(time) {
    let rettime = "";
    if (Number(time.split(":")[0]) >= 12) rettime += "Evening: ";
    else rettime += "Morning: ";

    rettime +=
      (Number(time.split(":")[0]) % 12).toString() +
      ":" +
      time.split(":")[1] +
      getampm(time);
    return rettime;
  }

  function getTimein12customers(time) {
    let rettime = "";
    rettime +=
      (Number(time.split(":")[0]) % 12).toString() +
      ":" +
      time.split(":")[1] +
      getampm(time);
    return rettime;
  }

  function getCutomers() {
    let retlist = [];
    for (var i = 0; i < location.state.customers.length; i++) {
      let tmpset = {
        id: i + 1,
        name: location.state.customers[i].name,
        email: location.state.customers[i].email,
        phone: `${getTimein12customers(
          location.state.customers[i].originTime
        )}`,
        from:
          location.state.customers[i].originLocation[0].text.split(",")[0] +
          ", " +
          location.state.customers[i].originLocation[0].text.split(",")[1],
        to:
          location.state.customers[i].destinationLocation[0].text.split(
            ","
          )[0] +
          ", " +
          location.state.customers[i].destinationLocation[0].text.split(",")[1],
        details: "Frequent traveler to Puri",
        profileImage: "assets/images/user.png",
      };
      retlist.push(tmpset);
    }
    return retlist;
  }

  console.log(location.state);
  function getPpic() {
    if ("profilePictutre" in driverData) return driverData.profilePicture;
    else return "assets/images/user.png";
  }

  console.log(location.state);
  console.log(driverData);
  const driver = {
    name: driverData.name,
    email: driverData.email,
    licenseNumber: driverData.drivingLicenseNumber,
    vehicleNumber:
      driverData.VehicleNumber.slice(0, 2) +
      "-" +
      driverData.VehicleNumber.slice(2, 4) +
      "-" +
      driverData.VehicleNumber.slice(4, 6) +
      "-" +
      driverData.VehicleNumber.slice(-4),
    carType: "Sedan",
    totalSeats: location.state.seats,
    totalFare: "₹500",
    profileImage: getPpic(),
    rating: 4.9,
  };

  const route = {
    from:
      location.state.origin[0].text.split(",")[0] +
      ", " +
      location.state.origin[0].text.split(",")[1],
    to:
      location.state.destination[0].text.split(",")[0] +
      ", " +
      location.state.destination[0].text.split(",")[1],
    pickupTime: getTimein12(location.state.originTime[0].start),
    dropTime: getTimein12(location.state.destinationTime[0].start),
    passengers: getCutomers(),
  };

  // console.log(route.pickupTime);

  return (
    <Box
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
      bg="white"
      color="gray.800"
      className="container-driver-view-details"
      position="relative"
    >
      {/* Route Information in the top-right corner */}
      <Box
        position={{ base: "static", md: "absolute" }}
        top={{ base: "auto", md: "1rem" }}
        right={{ base: "auto", md: "1rem" }}
        bg="gray.100"
        p={2}
        borderRadius="md"
      >
        <Text fontSize={{ base: "md", md: "sm" }} fontWeight="bold">
          Route Information
        </Text>
        <Text textOverflow="ellipsis" fontSize={{ base: "md", md: "sm" }}>
          From: {route.from}
        </Text>
        <Text textOverflow="ellipsis" fontSize={{ base: "md", md: "sm" }}>
          To: {route.to}
        </Text>
        <Text textOverflow="ellipsis" fontSize={{ base: "md", md: "sm" }}>
          Pickup Time: {route.pickupTime}
        </Text>
        <Text textOverflow="ellipsis" fontSize={{ base: "md", md: "sm" }}>
          Drop Time: {route.dropTime}
        </Text>
        <Text textOverflow="ellipsis" fontSize={{ base: "md", md: "sm" }}>
          Total Seats: {driver.totalSeats}
        </Text>
        <Text textOverflow="ellipsis" fontSize={{ base: "md", md: "sm" }}>
          Total Fare: {driver.totalFare}
        </Text>
      </Box>
      {/* Driver Profile */}
      <div className="profile-header">
        <Image
          src={driver.profileImage}
          alt={`Profile of ${driver.name}`}
          className="profile-image"
        />
        <div className="driver-info">
          <h2>{driver.name}</h2>
          <p>Email: {driver.email}</p>
          <p>DL Number: {driver.licenseNumber}</p>
          <p>Vehicle Number: {driver.vehicleNumber}</p>
          <p>Car Type: {driver.carType}</p>
          <div className="driver-rating">
            <Badge colorScheme="green">Top Rated</Badge>
            <p>Rating: {driver.rating}</p>
          </div>
        </div>
      </div>
      <Divider borderColor="gray.300" />

      {/* Customer Information */}
      <div className="customer-card">
        <h4>Customers Information</h4>
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
          {route.passengers.map((passenger) => (
            <GridItem key={passenger.id}>
              <Card className="customer-info-card">
                {/* User profile picture in the top half */}
                <div className="customer-profile-picture-container">
                  <div className="customer-profile-picture">
                    <Image
                      src={passenger.profileImage}
                      alt={`Profile of ${passenger.name}`}
                      className="profile-image"
                    />
                  </div>
                </div>
                <VStack align="start">
                  <p>Name: {passenger.name}</p>
                  <p>Email: {passenger.email}</p>
                  <p>Start: {passenger.phone}</p>
                  <p>From: {passenger.from}</p>
                  <p>To: {passenger.to}</p>
                  <Divider my={1} borderColor="gray.300" />
                  <p>{passenger.details}</p>
                </VStack>
              </Card>
            </GridItem>
          ))}
        </Grid>
      </div>
    </Box>
  );
};

export default DriverDetails;
