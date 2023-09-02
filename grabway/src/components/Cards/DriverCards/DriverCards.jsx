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

const sections = ["Essential Commuter", "Comfort Traveler", "Premier Business"];
const areTabsDisabled = true;
// const cardData = {};
function DriverCard() {
  const [driverData, setDriverData] = useState({
    driverName: "",
    email: "",
    VehicleManufacturer: "",
    VehicleModel: "",
    plan: "",
    seats: 0,
  });

  const fetchDriverData = async () => {
    try {
      const response = await fetch("/api/driver");
      const data = await response.json();

      setDriverData(data);
    } catch (error) {
      console.error("Error fetching driver data: ", error);
    }
  };

  // Fetch driver data when the component mounts
  useEffect(() => {
    fetchDriverData();
  }, []);

  return (
    <Box p={8} borderRadius="md" boxShadow="lg" bg="white">
      <Tabs defaultIndex={0} colorScheme="blue">
        <TabList justifyContent="center" borderBottomWidth="1px" pb={2}>
          {sections.map((section, index) => (
            <Tab
              key={index}
              isDisabled={
                areTabsDisabled &&
                (section === "Comfort Traveler" ||
                  section === "Premier Business")
              }
              _selected={{
                color: "blue.500",
                borderBottomWidth: "2px",
              }}
            >
              {section}
            </Tab>
          ))}
        </TabList>
        <TabPanels mt={4}>
          {sections.map((section, index) => (
            <TabPanel key={index}>
              {/* Display driver information */}
              <Box className="responsive-card">
                <Image
                  src="https://img.freepik.com/free-vector/red-sedan-car-isolated-white-vector_53876-64366.jpg?w=900&t=st=1692895124~exp=1692895724~hmac=9084cfe1f9e13be10c20ff75317e808efbecd741a345ac619f7814540a6abf66"
                  alt="Driver Image"
                  objectFit="cover"
                  borderRadius="md"
                  w={400}
                />
                <div className="card-content">
                  <Heading size="lg">{driverData.driverName}</Heading>
                  <Text>Email: {driverData.email}</Text>
                  <Text>
                    Vehicle: {driverData.VehicleManufacturer}{" "}
                    {driverData.VehicleModel}
                  </Text>
                  <Text>Plan: {driverData.plan}</Text>
                  <Text>Seats: {driverData.seats}</Text>
                </div>
                <Box mx={6} my={4} className="sideCardCss">
                  <AdvertisementCard />
                </Box>
              </Box>
              {/* Rest of your component code for services */}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default DriverCard;
