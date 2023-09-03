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
} from "@chakra-ui/react";
import AdvertisementCard from "./AdvertisementCard/AdvertisementCard";
import "./DriverCard.css";
import axios from "axios";

const sections = ["Essential Commuter", "Comfort Traveler", "Premier Business"];
const areTabsDisabled = true;

function DriverCard(props) {
  const matchDriverRoute = props.matchDriverRoute;
  //console.log(matchDriverRoute);

  async function handleMoreDetails(index) {
    const response = await axios
      .post("/moreDetailsForMatchRoutes", {
        matchDriverRoute: matchDriverRoute[index],
      })
      .then(() => {
        console.log("data sent");
      });
  }

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
                <AdvertisementCard />
                {matchDriverRoute.map((driver, driverIndex) => (
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
                    <Text>Plan: {driver.route.plan}</Text>
                    <Text>Seats: {driver.route.seats}</Text>
                    <Button colorScheme="blue" mt={2} mr={2}>
                      Book Now
                    </Button>
                    <Button
                      colorScheme="gray"
                      mt={2}
                      onClick={() => {
                        handleMoreDetails(driverIndex);
                      }}
                    >
                      More Details
                    </Button>
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
