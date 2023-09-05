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
  List,
  ListItem,
} from "@chakra-ui/react";

const DriverDetails = () => {
  // Replace with actual driver and route data from your backend or state management
  const driver = {
    name: "John Doe",
    email: "john@example.com",
    licenseNumber: "DL123456",
    vehicleNumber: "ABC 123",
    carType: "Toyota Camry",
    totalSeats: 4,
    totalFare: "$40",
    profileImage: "driver-image.jpg",
    rating: 4.8,
  };

  const route = {
    from: "New York",
    to: "San Francisco",
    pickupTime: "8:00 AM",
    dropTime: "5:00 PM",
    passengers: [
      {
        id: 1,
        name: "User 1",
        email: "user1@example.com",
        phone: "123-456-7890",
        details: "Passenger Details 1",
      },
      {
        id: 2,
        name: "User 2",
        email: "user2@example.com",
        phone: "987-654-3210",
        details: "Passenger Details 2",
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
      color="red.800"
    >
      <VStack spacing={4} align="start">
        <HStack spacing={4} align="center">
          <Image
            src={driver.profileImage}
            alt={`Profile of ${driver.name}`}
            borderRadius="full"
            boxSize="150px"
            objectFit="cover"
          />
          <VStack align="start">
            <Text fontSize="2xl">{driver.name}</Text>
            <Text fontSize="md">Email: {driver.email}</Text>
            <Text fontSize="md">DL Number: {driver.licenseNumber}</Text>
            <Text fontSize="md">Vehicle Number: {driver.vehicleNumber}</Text>
            <Text fontSize="md">Car Type: {driver.carType}</Text>
            <HStack>
              <Badge colorScheme="green">Top Rated</Badge>
              <Text fontSize="md">Rating: {driver.rating}</Text>
            </HStack>
          </VStack>
        </HStack>
        <Divider borderColor="red.300" />
        <Text fontSize="2xl">Route Information</Text>
        <Text fontSize="md">From: {route.from}</Text>
        <Text fontSize="md">To: {route.to}</Text>
        <Divider borderColor="red.300" />
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          {route.passengers.map((passenger) => (
            <GridItem key={passenger.id}>
              <Card p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
                <VStack align="start">
                  <Text fontSize="xl">Customer Information</Text>
                  <Text fontSize="md">Name: {passenger.name}</Text>
                  <Text fontSize="md">Email: {passenger.email}</Text>
                  <Text fontSize="md">Phone: {passenger.phone}</Text>
                  <Divider my={1} borderColor="red.300" />
                  <Text fontSize="sm">{passenger.details}</Text>
                </VStack>
                <Divider my={2} borderColor="red.300" />
                <Text fontSize="md">Pickup Time: {route.pickupTime}</Text>
                <Text fontSize="md">Drop Time: {route.dropTime}</Text>
              </Card>
            </GridItem>
          ))}
        </Grid>
      </VStack>
    </Box>
  );
};

export default DriverDetails;
