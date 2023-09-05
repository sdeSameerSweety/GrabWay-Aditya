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
            <Text fontSize="2xl">Route Information</Text>
            <Text fontSize="md">From: {route.from}</Text>
            <Text fontSize="md">To: {route.to}</Text>
            <Text fontSize="md">Pickup Time: {route.pickupTime}</Text>
            <Text fontSize="md">Drop Time: {route.dropTime}</Text>
            <Text fontSize="md">Total Seats: {driver.totalSeats}</Text>
            <Text fontSize="md">Total Fare: {driver.totalFare}</Text>
          </VStack>
        </Box>
      </HStack>
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
                <Text fontSize="md">From: {passenger.from}</Text>
                <Text fontSize="md">To: {passenger.to}</Text>
                <Divider my={1} borderColor="red.300" />
                <Text fontSize="sm">{passenger.details}</Text>
              </VStack>
            </Card>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default DriverDetails;
