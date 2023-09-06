import React from "react";
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

const DriverDetails = () => {
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
        profileImage:
          "https://straightforwardguidance.com/wp-content/uploads/2023/02/28ac7dea21d5507f/what-are-lucid-dreams.jpeg",
      },
      {
        id: 2,
        name: "Neha Singh",
        email: "neha@example.com",
        phone: "789-123-4567",
        from: "Bhubaneswar, Odisha",
        to: "Puri, Odisha",
        details: "Visiting Jagannath Temple",
        profileImage:
          "https://www.liquidsandsolids.com/wp-content/uploads/2022/09/talking-to-a-dead-person.jpg",
      },
      {
        id: 3,
        name: "Rahul Sharma",
        email: "rahul@example.com",
        phone: "888-555-3333",
        from: "Bhubaneswar, Odisha",
        to: "Puri, Odisha",
        details: "Solo traveler for leisure",
        profileImage:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVzEtCIxnrCYfIXJXwfJNRY9M65m8k5Eo5HQ&usqp=CAU",
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
        <Text fontSize={{ base: "md", md: "sm" }}>From: {route.from}</Text>
        <Text fontSize={{ base: "md", md: "sm" }}>To: {route.to}</Text>
        <Text fontSize={{ base: "md", md: "sm" }}>
          Pickup Time: {route.pickupTime}
        </Text>
        <Text fontSize={{ base: "md", md: "sm" }}>
          Drop Time: {route.dropTime}
        </Text>
        <Text fontSize={{ base: "md", md: "sm" }}>
          Total Seats: {driver.totalSeats}
        </Text>
        <Text fontSize={{ base: "md", md: "sm" }}>
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
        <Grid templateColumns={{ sm: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
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
