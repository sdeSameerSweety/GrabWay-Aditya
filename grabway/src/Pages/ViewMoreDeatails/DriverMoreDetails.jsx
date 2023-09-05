// DriverDetails.js
import React from "react";
import {
  Box,
  Image,
  Text,
  VStack,
  HStack,
  Badge,
  Divider,
  Grid,
  GridItem,
  Card,
} from "@chakra-ui/react";
import "./DriverDetails.css"; // Import the CSS file

const DriverDetails = () => {
  // Realistic driver and route data for a driver in Bhubaneswar, Odisha
  const driver = {
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    licenseNumber: "OD123456",
    vehicleNumber: "OD-02-AB-1234",
    carType: "Sedan",
    totalSeats: 3,
    totalFare: "₹500",
    profileImage: "driver-avatar.jpg",
    rating: 4.9,
  };

  const route = {
    from: "Bhubaneswar, Odisha",
    to: "Puri, Odisha",
    pickupTime: "Morning: 7:30 AM",
    dropTime: "Evening: 5:00 PM",
    passengers: [
      {
        id: 1,
        name: "Amit Patel",
        email: "amit@example.com",
        phone: "987-654-3210",
        from: "Bhubaneswar, Odisha",
        to: "Puri, Odisha",
        details: "Frequent traveler to Puri",
      },
      {
        id: 2,
        name: "Neha Singh",
        email: "neha@example.com",
        phone: "789-123-4567",
        from: "Bhubaneswar, Odisha",
        to: "Puri, Odisha",
        details: "Visiting Jagannath Temple",
      },
      {
        id: 3,
        name: "Rahul Sharma",
        email: "rahul@example.com",
        phone: "888-555-3333",
        from: "Bhubaneswar, Odisha",
        to: "Puri, Odisha",
        details: "Solo traveler for leisure",
      },
    ],
  };

  return (
    <Box
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
      bg="white"
      color="gray.800"
      className="container-driver-view-details"
    >
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
      <div className="route-info">
        <h3>Route Information</h3>
        <p>From: {route.from}</p>
        <p>To: {route.to}</p>
        <p>Pickup Time: {route.pickupTime}</p>
        <p>Drop Time: {route.dropTime}</p>
        <p>Total Seats: {driver.totalSeats}</p>
        <p>Total Fare: {driver.totalFare}</p>
      </div>
      <Divider borderColor="gray.300" />
      <div className="customer-card">
        <h4>Customers Information</h4>
        <Grid templateColumns={{ sm: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
          {route.passengers.map((passenger) => (
            <GridItem key={passenger.id}>
              <Card>
                <VStack align="start">
                  {/* <h4>Customer Information</h4> */}
                  <p>Name: {passenger.name}</p>
                  <p>Email: {passenger.email}</p>
                  <p>Phone: {passenger.phone}</p>
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
