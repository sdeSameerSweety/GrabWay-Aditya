// DriverDetails.js
import React from "react";
import {
  Box,
  Image,
  Text,
  VStack,
  Badge,
  Divider,
  Card,
  List,
  HStack,
  //   ListItem,
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
    timing: "Departure: 8:00 AM",
    availableSeats: 3,
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
        <Text fontSize="2xl">Trip Information</Text>
        <Text fontSize="md">From: {route.from}</Text>
        <Text fontSize="md">To: {route.to}</Text>
        <Text fontSize="md">Pickup Timing: {route.timing}</Text>
        <Text fontSize="md">Available Seats: {route.availableSeats}</Text>
        <Divider borderColor="red.300" />
        <Text fontSize="2xl">Customers of this route</Text>
        <List spacing={2}>
          {route.passengers.map((passenger) => (
            <List key={passenger.id}>
              <Text fontSize="md">{passenger.name}</Text>
              <Text fontSize="sm" color="gray.500">
                Email: {passenger.email}
              </Text>
              <Text fontSize="sm" color="gray.500">
                Phone: {passenger.phone}
              </Text>
              <Divider my={1} borderColor="red.300" />
              <Text fontSize="sm">{passenger.details}</Text>
            </List>
          ))}
        </List>
      </VStack>
    </Box>
  );
};

export default DriverDetails;
