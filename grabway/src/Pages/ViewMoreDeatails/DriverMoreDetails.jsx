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
  // Replace with actual driver data from your backend or state management
  const driver = {
    name: "John Doe",
    email: "john@example.com",
    licenseNumber: "DL123456",
    vehicleNumber: "ABC 123",
    carType: "Toyota Camry",
    totalSeats: 4,
    totalFare: "$40",
    profileImage: "driver-image.jpg",
    routes: [
      {
        id: 1,
        from: "New York",
        to: "San Francisco",
        timing: "Departure: 8:00 AM",
        availableSeats: 3,
        passengers: [
          { id: 1, name: "User 1", details: "Passenger Details 1" },
          { id: 2, name: "User 2", details: "Passenger Details 2" },
        ],
      },
      {
        id: 2,
        from: "Los Angeles",
        to: "Las Vegas",
        timing: "Departure: 10:00 AM",
        availableSeats: 2,
        passengers: [
          { id: 3, name: "User 3", details: "Passenger Details 3" },
          { id: 4, name: "User 4", details: "Passenger Details 4" },
        ],
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
      <HStack spacing={6} align="center">
        <VStack align="start" flex="1">
          <Text fontSize="2xl">{driver.name}</Text>
          <Text fontSize="md">Email: {driver.email}</Text>
          <Text fontSize="md">DL Number: {driver.licenseNumber}</Text>
          <Text fontSize="md">Vehicle Number: {driver.vehicleNumber}</Text>
          <Text fontSize="md">Car Type: {driver.carType}</Text>
          <Text fontSize="md">Total Seats: {driver.totalSeats}</Text>
          <Text fontSize="md">Total Fare: {driver.totalFare}</Text>
        </VStack>
        <VStack align="center">
          <Image
            src={driver.profileImage}
            alt={`Profile of ${driver.name}`}
            borderRadius="full"
            boxSize="150px"
            objectFit="cover"
          />
          <HStack>
            <Badge colorScheme="green">Top Rated</Badge>
            <Text fontSize="md">Rating: {driver.rating}</Text>
          </HStack>
        </VStack>
      </HStack>
      <Divider my={4} borderColor="red.300" />
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        {driver.routes.map((route) => (
          <GridItem key={route.id}>
            <Card p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
              <VStack align="start">
                <Text fontSize="xl">Route Details</Text>
                <Text fontSize="md">From: {route.from}</Text>
                <Text fontSize="md">To: {route.to}</Text>
                <Text fontSize="md">{route.timing}</Text>
                <Text fontSize="md">
                  Available Seats: {route.availableSeats}
                </Text>
                <Text fontSize="xl" mt={2}>
                  Passengers
                </Text>
                <List spacing={2}>
                  {route.passengers.map((passenger) => (
                    <ListItem key={passenger.id}>
                      <Text fontSize="md">{passenger.name}</Text>
                      <Text fontSize="sm" color="gray.500">
                        {passenger.details}
                      </Text>
                    </ListItem>
                  ))}
                </List>
              </VStack>
            </Card>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default DriverDetails;
