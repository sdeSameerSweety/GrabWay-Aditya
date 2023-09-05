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
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const sections = ["Essential Commuter", "Comfort Traveler", "Premier Business"];
const areTabsDisabled = true;

function DriverCard(props) {
  const navigate = useNavigate();
  const userData = localStorage.getItem("grabwayUser");
  const matchDriverRoute = props.matchDriverRoute;
  const UserQuery = props.UserQuery;
  //console.log(matchDriverRoute);

  async function handleBookNow(index) {
    console.log("book now");
    const response = await axios
      .post("/bookRoute", {
        matchDriverRoute: matchDriverRoute[index],
        userDetails: JSON.parse(userData),
        UserQuery: { UserQuery },
      })
      .then(() => {
        console.log("data sent");
      });
  }

  async function handleMoreDetails(index) {
    const response = await axios
      .post("/moreDetailsForMatchRoutes", {
        matchDriverRoute: matchDriverRoute[index],
      })
      .then((res) => {
        // console.log(res.data);
        navigate("/moredetails", { state: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(matchDriverRoute[index]);
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
              <div>
                <div class="card-grid gap-8">
                  {matchDriverRoute.map((driver, driverIndex) => (
                    <div class="bg-white rounded-lg shadow-lg p-8">
                      <div class="relative overflow-hidden">
                        <img
                          class="object-cover w-full h-full"
                          src="https://img.freepik.com/free-vector/red-sedan-car-isolated-white-vector_53876-64366.jpg?w=900&t=st=1692895124~exp=1692895724~hmac=9084cfe1f9e13be10c20ff75317e808efbecd741a345ac619f7814540a6abf66"
                          alt="Car"
                        />
                      </div>
                      <div class="flex items-center justify-between mt-4">
                        <h3 class="text-xl font-bold text-gray-900">
                          {driver.driverName}
                        </h3>
                        <button class="bg-white text-black border-black border-2 py-2 px-4 font-bold rounded-md">
                          More
                        </button>
                      </div>
                      <div className="flex pb-2">
                        <i
                          class="bx bxs-envelope"
                          style={{ color: "#00de82", fontSize: "200%" }}
                        ></i>{" "}
                        <div className="pt-1 pl-4 font-medium">
                          {driver.email}
                        </div>
                      </div>
                      <div className="flex pb-2">
                        <i
                          class="bx bxs-car"
                          style={{ color: "#e51b23", fontSize: "200%" }}
                        ></i>{" "}
                        <div className="pt-1 pl-4 font-medium">
                          {driver.VehicleManufacturer} {driver.VehicleModel}
                        </div>
                      </div>
                      <div className="flex">
                        <i
                          class="bx bxl-shopify"
                          style={{ color: "#7a1bf7", fontSize: "200%" }}
                        ></i>{" "}
                        <div className="pt-1 pl-4 uppercase font-medium">
                          {driver.route.plan}
                        </div>
                      </div>
                      <div class="flex items-center justify-between mt-4">
                        <span class="text-gray-900 font-bold text-lg">
                          Seats:{" "}
                          {driver.route.seats - driver.route.customers.length}
                        </span>
                        <button
                          class="bg-theme text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800"
                          onClick={() => handleMoreDetails(driverIndex)}
                        >
                          Grab it
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default DriverCard;
