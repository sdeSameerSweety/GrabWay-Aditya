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
    carModel: "Toyota Camry",
    licensePlate: "ABC 123",
    rating: 4.8,
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
          <HStack>
            <Badge colorScheme="green">Top Rated</Badge>
            <Text fontSize="md">Rating: {driver.rating}</Text>
          </HStack>
          <Text fontSize="md">Car Model: {driver.carModel}</Text>
          <Text fontSize="md">License Plate: {driver.licensePlate}</Text>
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
