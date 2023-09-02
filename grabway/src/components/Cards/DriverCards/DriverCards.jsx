import React from "react";
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

const sections = ["Essential Commuter", "Comfort Traveler", "Premier Business"];
const areTabsDisabled = true;

const driverData = [
  {
    driverName: "Kittu Singh",
    email: "driver@gmail.com",
    VehicleManufacturer: "Maruti Suzuki",
    VehicleModel: "Swift Dzire",
    plan: "Basic",
    seats: 10,
  },
  {
    driverName: "John Doe",
    email: "john.doe@gmail.com",
    VehicleManufacturer: "Toyota",
    VehicleModel: "Camry",
    plan: "Premium",
    seats: 5,
  },
  {
    driverName: "Alice Johnson",
    email: "alice.johnson@gmail.com",
    VehicleManufacturer: "Honda",
    VehicleModel: "Civic",
    plan: "Standard",
    seats: 4,
  },
  {
    driverName: "Michael Smith",
    email: "michael.smith@gmail.com",
    VehicleManufacturer: "Ford",
    VehicleModel: "F-150",
    plan: "Basic",
    seats: 6,
  },
  {
    driverName: "Emily Wilson",
    email: "emily.wilson@gmail.com",
    VehicleManufacturer: "Chevrolet",
    VehicleModel: "Malibu",
    plan: "Standard",
    seats: 4,
  },
];

function DriverCard() {
  return (
    <Box p={8} borderRadius="md" boxShadow="lg" bg="white">
      <Tabs defaultIndex={0} colorScheme="blue" isLazy={areTabsDisabled}>
        <TabList justifyContent="center" borderBottomWidth="1px" pb={2}>
          {sections.map((section, index) => (
            <Tab key={index} isDisabled={index > 0 && areTabsDisabled}>
              {section}
            </Tab>
          ))}
        </TabList>
        <TabPanels mt={4}>
          {sections.map((section, index) => (
            <TabPanel key={index}>
              <Box className="driver-card-container">
                {driverData.map((driver, driverIndex) => (
                  <Box
                    key={driverIndex}
                    borderRadius="md"
                    boxShadow="md"
                    bg="white"
                    p={4}
                    m={2}
                    textAlign="center"
                    width="300px" // Set a fixed width for each card
                    position="relative"
                  >
                    <Image
                      src="https://img.freepik.com/free-vector/red-sedan-car-isolated-white-vector_53876-64366.jpg?w=900&t=st=1692895124~exp=1692895724~hmac=9084cfe1f9e13be10c20ff75317e808efbecd741a345ac619f7814540a6abf66"
                      alt="Driver Image"
                      objectFit="cover"
                      borderRadius="md"
                      w={200}
                      h={120}
                      mx="auto"
                    />
                    <Heading size="md">{driver.driverName}</Heading>
                    <Text>Email: {driver.email}</Text>
                    <Text>
                      Vehicle: {driver.VehicleManufacturer}{" "}
                      {driver.VehicleModel}
                    </Text>
                    <Text>Plan: {driver.plan}</Text>
                    <Text>Seats: {driver.seats}</Text>
                    {driverIndex === 0 && (
                      <Box position="absolute" top={2} right={2} zIndex={1}>
                        <AdvertisementCard />
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default DriverCard;
