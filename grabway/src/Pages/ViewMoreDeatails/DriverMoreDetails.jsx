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
      },
      {
        id: 2,
        from: "Los Angeles",
        to: "Las Vegas",
        timing: "Departure: 10:00 AM",
        availableSeats: 2,
        passengers: [
          {
            id: 3,
            name: "User 3",
            email: "user3@example.com",
            phone: "555-555-5555",
            details: "Passenger Details 3",
          },
          {
            id: 4,
            name: "User 4",
            email: "user4@example.com",
            phone: "444-444-4444",
            details: "Passenger Details 4",
          },
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
      <HStack spacing={8}>
        <Box flex="1">
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
        </Box>
        <Box flex="1">
          <VStack spacing={4} align="start">
            <Text fontSize="2xl">Trip Information</Text>
            <Text fontSize="md">Total Seats: {driver.totalSeats}</Text>
            <Text fontSize="md">Total Fare: {driver.totalFare}</Text>
          </VStack>
        </Box>
      </HStack>
      <Divider my={4} borderColor="red.300" />
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        {driver.routes.map((route) => (
          <GridItem key={route.id}>
            <Card p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
              <VStack align="start">
                <Text fontSize="xl">Customers of this route</Text>
                <List spacing={2}>
                  {route.passengers.map((passenger) => (
                    <ListItem key={passenger.id}>
                      <Text fontSize="md">{passenger.name}</Text>
                      <Text fontSize="sm" color="gray.500">
                        Email: {passenger.email}
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        Phone: {passenger.phone}
                      </Text>
                      <Divider my={1} borderColor="red.300" />
                      <Text fontSize="sm">{passenger.details}</Text>
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
