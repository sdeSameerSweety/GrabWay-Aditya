import { React, useState, useEffect } from "react";
import {
  Box,
  Button,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Image,
  VStack,
  Link,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import AdvertisementCard from "./AdvertisementCard/AdvertisementCard";
import "./DriverCard.css";

// Define your sections and other constants
const sections = ["Essential Commuter", "Comfort Traveler", "Premier Business"];
const areTabsDisabled = true;

// Simulated driver data (replace with actual data fetching)
const driverData = [
  {
    driverName: "Kittu Singh",
    email: "driver@gmail.com",
    VehicleManufacturer: "Maruti Suzuki",
    VehicleModel: "Swift Dzire",
    plan: "basic",
    seats: 10,
  },
  {
    driverName: "John Doe",
    email: "john.doe@gmail.com",
    VehicleManufacturer: "Toyota",
    VehicleModel: "Camry",
    plan: "premium",
    seats: 5,
  },
  {
    driverName: "Alice Johnson",
    email: "alice.johnson@gmail.com",
    VehicleManufacturer: "Honda",
    VehicleModel: "Civic",
    plan: "standard",
    seats: 4,
  },
  {
    driverName: "Michael Smith",
    email: "michael.smith@gmail.com",
    VehicleManufacturer: "Ford",
    VehicleModel: "F-150",
    plan: "basic",
    seats: 6,
  },
  {
    driverName: "Emily Wilson",
    email: "emily.wilson@gmail.com",
    VehicleManufacturer: "Chevrolet",
    VehicleModel: "Malibu",
    plan: "standard",
    seats: 4,
  },
];

// ... your existing imports and code ...

function DriverCard() {
  // Render the component with the fetched data
  return (
    <Box p={8} borderRadius="md" boxShadow="lg" bg="white">
      <Tabs defaultIndex={0} colorScheme="blue">
        <TabList justifyContent="center" borderBottomWidth="1px" pb={2}>
          {/* ... your existing TabList mapping code ... */}
        </TabList>
        <TabPanels mt={4}>
          {sections.map((section, index) => (
            <TabPanel key={index}>
              {driverData.map((driver, driverIndex) => (
                <Box className="responsive-card" key={driverIndex}>
                  <Image
                    src="https://img.freepik.com/free-vector/red-sedan-car-isolated-white-vector_53876-64366.jpg?w=900&t=st=1692895124~exp=1692895724~hmac=9084cfe1f9e13be10c20ff75317e808efbecd741a345ac619f7814540a6abf66"
                    alt="Driver Image"
                    objectFit="cover"
                    borderRadius="md"
                    w={400}
                  />
                  <div className="card-content">
                    <Heading size="lg">{driver.driverName}</Heading>
                    <Text>Email: {driver.email}</Text>
                    <Text>
                      Vehicle: {driver.VehicleManufacturer}{" "}
                      {driver.VehicleModel}
                    </Text>
                    <Text>Plan: {driver.plan}</Text>
                    <Text>Seats: {driver.seats}</Text>
                  </div>
                  <Box mx={6} my={4} className="sideCardCss">
                    {/* Conditionally render AdvertisementCard only for the first driver */}
                    {driverIndex === 0 && <AdvertisementCard />}
                  </Box>
                </Box>
              ))}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default DriverCard;
