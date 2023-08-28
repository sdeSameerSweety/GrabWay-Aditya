import React, { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./DriverHomePage.css";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Button,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
const TopSection = ({ nonceVal, loginState }) => {
  const routes = [
    {
      origin:
        "Silicon Institute Silicon Institute Silicon Institute Silicon Institute1",
      destination: "MasterCanteen",
      seats: 10,
      customers: [
        { name: "Abhinav Singh", Email: "demo@gmail.com" },
        { name: "Abhinav Singh", Email: "demo@gmail.com" },
      ],
    },
    {
      origin: "Silicon Institute2",
      destination: "MasterCanteen",
      seats: 10,
      customers: [
        { name: "Abhinav Singh", Email: "demo@gmail.com" },
        { name: "Abhinav Singh", Email: "demo@gmail.com" },
      ],
    },
    {
      origin: "Silicon Institute3",
      destination: "MasterCanteen",
      seats: 10,
      customers: [{ name: "Abhinav Singh", Email: "demo@gmail.com" }],
    },
    {
      origin: "Silicon Institute4",
      destination: "MasterCanteen",
      seats: 10,
      customers: [
        { name: "Abhinav Singh", Email: "demo@gmail.com" },
        { name: "Abhinav Singh", Email: "demo@gmail.com" },
      ],
    },
    {
      origin: "Silicon Institute",
      destination: "MasterCanteen",
      seats: 10,
      customers: [
        { name: "Abhinav Singh", Email: "demo@gmail.com" },
        { name: "Abhinav Singh", Email: "demo@gmail.com" },
      ],
    },
    {
      origin: "Silicon Institute",
      destination: "MasterCanteen",
      seats: 10,
      customers: [
        { name: "Abhinav Singh", Email: "demo@gmail.com" },
        { name: "Abhinav Singh", Email: "demo@gmail.com" },
      ],
    },
    {
      origin: "Silicon Institute",
      destination: "MasterCanteen",
      seats: 10,
      customers: [
        { name: "Abhinav Singh", Email: "demo@gmail.com" },
        { name: "Abhinav Singh", Email: "demo@gmail.com" },
      ],
    },
  ];

  const userData = Cookies.get("grabwayUser");
  if (userData) {
    if (JSON.parse(userData).name === "") {
      return <Navigate to={"/registration"} userType="" />;
    }
  }
  const googleUserData = Cookies.get("grabwayGoogleToken");
  if (googleUserData) {
    return <Navigate to={"/googleRegistration"} />;
  }

  return (
    <>
      <div className="dekstop-view flex justify-center items-center">
        <div className="flex justify-center items-center flex-row m-5">
          <div className="flex justify-center items-center flex-col mt-5 ">
            <div className="flex justify-center items-center mb-10">
              <Button
                colorScheme="red"
                sx={{
                  bgColor: "#E51B23",
                  _hover: `bgColor:"#E51B23"`,
                  color: "white",
                }}
              >
                Add New Route
              </Button>
            </div>
            <div className="flex flex-col justify-between items-center gap-10 mt-5">
              {routes.map((element, index) => {
                return (
                  <>
                    {index % 2 === 0 && (
                      <>
                        <div className="flex flex-row justify-between items-center w-[100%] gap-10">
                          <div className="flex-row justify-between items-center">
                            <Card
                              variant={"elevated"}
                              sx={{ width: "40vw", border: "2px solid black" }}
                            >
                              <CardHeader>
                                <Heading size="md">
                                  <div className="flex flex-col gap-3">
                                    <div>
                                      <div className="text-sm font-ubuntu text-[#0000006c]">
                                        FROM:
                                      </div>
                                      <div className="text-[black]">
                                        {element.origin}
                                      </div>
                                    </div>
                                    <div>
                                      <div className="text-sm font-ubuntu text-[#0000006c]">
                                        TO:
                                      </div>
                                      <div className="text-[black]">
                                        {element.destination}
                                      </div>
                                    </div>
                                  </div>
                                </Heading>
                              </CardHeader>
                              <CardBody>
                                <div className="flex justify-between items-center">
                                  <div className="text-sm">
                                    Total Seats -{" "}
                                    <span className="text-lg text-[#E51B23]">
                                      {element.seats}
                                    </span>
                                  </div>
                                  <div className="text-sm">
                                    Available -{" "}
                                    <span className="text-lg text-[#3bb34d]">
                                      {element.seats - element.customers.length}
                                    </span>
                                  </div>
                                </div>
                              </CardBody>
                              <CardFooter>
                                <Button>View More Details</Button>
                              </CardFooter>
                            </Card>
                          </div>
                          <div className="flex justify-between items-center">
                            <img
                              className="flex h-[40vh]"
                              src="/assets/gif/driverHomepage.gif"
                            />
                          </div>
                        </div>
                      </>
                    )}
                    {index % 2 !== 0 && (
                      <>
                        <div className="flex flex-row justify-between items-center w-[100%] gap-10">
                          <div className="flex-row justify-between items-center">
                            <Card
                              variant={"elevated"}
                              sx={{ width: "40vw", border: "2px solid black" }}
                            >
                              <CardHeader>
                                <Heading size="md">
                                  <div className="flex flex-col gap-3">
                                    <div>
                                      <div className="text-sm font-ubuntu text-[#0000006c]">
                                        FROM:
                                      </div>
                                      <div className="text-[black]">
                                        {element.origin}
                                      </div>
                                    </div>
                                    <div>
                                      <div className="text-sm font-ubuntu text-[#0000006c]">
                                        TO:
                                      </div>
                                      <div className="text-[black]">
                                        {element.destination}
                                      </div>
                                    </div>
                                  </div>
                                </Heading>
                              </CardHeader>
                              <CardBody>
                                <div className="flex justify-between items-center">
                                  <div className="text-sm">
                                    Total Seats -{" "}
                                    <span className="text-lg text-[#E51B23]">
                                      {element.seats}
                                    </span>
                                  </div>
                                  <div className="text-sm">
                                    Available -{" "}
                                    <span className="text-lg text-[#3bb34d]">
                                      {element.seats - element.customers.length}
                                    </span>
                                  </div>
                                </div>
                              </CardBody>
                              <CardFooter>
                                <Button>View More Details</Button>
                              </CardFooter>
                            </Card>
                          </div>
                          <div className="flex justify-between items-center">
                            <img
                              className="flex h-[40vh]"
                              src="/assets/gif/driverHomepage2.gif"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="mobile-view flex justify-center items-center">
        <div className="flex justify-center items-center flex-row m-5">
          <div className="flex justify-center items-center flex-col mt-5 ">
            <div className="flex justify-center items-center mb-10">
              <Button
                colorScheme="red"
                sx={{
                  bgColor: "#E51B23",
                  _hover: `bgColor:"#E51B23"`,
                  color: "white",
                }}
              >
                Add New Route
              </Button>
            </div>
            <div className="flex flex-col justify-between items-center gap-10 mt-5">
              {routes.map((element, index) => {
                return (
                  <>
                    {index % 2 === 0 && (
                      <>
                        <div className="flex flex-col justify-between items-center w-[100%] gap-10">
                          <div className="flex-row justify-between items-center">
                            <Card
                              variant={"elevated"}
                              sx={{ width: "80vw", border: "2px solid black" }}
                            >
                              <CardHeader>
                                <Heading size="md">
                                  <div className="flex flex-col gap-3">
                                    <div>
                                      <div className="text-sm font-ubuntu text-[#0000006c]">
                                        FROM:
                                      </div>
                                      <div className="text-[black]">
                                        {element.origin}
                                      </div>
                                    </div>
                                    <div>
                                      <div className="text-sm font-ubuntu text-[#0000006c]">
                                        TO:
                                      </div>
                                      <div className="text-[black]">
                                        {element.destination}
                                      </div>
                                    </div>
                                  </div>
                                </Heading>
                              </CardHeader>
                              <CardBody>
                                <div className="flex justify-between items-center">
                                  <div className="text-sm">
                                    Total Seats -{" "}
                                    <span className="text-lg text-[#E51B23]">
                                      {element.seats}
                                    </span>
                                  </div>
                                  <div className="text-sm">
                                    Available -{" "}
                                    <span className="text-lg text-[#3bb34d]">
                                      {element.seats - element.customers.length}
                                    </span>
                                  </div>
                                </div>
                              </CardBody>
                              <CardFooter>
                                <Button>View More Details</Button>
                              </CardFooter>
                            </Card>
                          </div>
                          <div className="flex justify-between items-center">
                            <img
                              className="flex h-[40vh]"
                              src="/assets/gif/driverHomepage.gif"
                            />
                          </div>
                        </div>
                      </>
                    )}
                    {index % 2 !== 0 && (
                      <>
                        <div className="flex flex-col justify-between items-center w-[100%] gap-10">
                          <div className="flex-row justify-between items-center">
                            <Card
                              variant={"elevated"}
                              sx={{width:'80vw', border: "2px solid black" }}
                            >
                              <CardHeader>
                                <Heading size="md">
                                  <div className="flex flex-col gap-3">
                                    <div>
                                      <div className="text-sm font-ubuntu text-[#0000006c]">
                                        FROM:
                                      </div>
                                      <div className="text-[black]">
                                        {element.origin}
                                      </div>
                                    </div>
                                    <div>
                                      <div className="text-sm font-ubuntu text-[#0000006c]">
                                        TO:
                                      </div>
                                      <div className="text-[black]">
                                        {element.destination}
                                      </div>
                                    </div>
                                  </div>
                                </Heading>
                              </CardHeader>
                              <CardBody>
                                <div className="flex justify-between items-center">
                                  <div className="text-sm">
                                    Total Seats -{" "}
                                    <span className="text-lg text-[#E51B23]">
                                      {element.seats}
                                    </span>
                                  </div>
                                  <div className="text-sm">
                                    Available -{" "}
                                    <span className="text-lg text-[#3bb34d]">
                                      {element.seats - element.customers.length}
                                    </span>
                                  </div>
                                </div>
                              </CardBody>
                              <CardFooter>
                                <Button>View More Details</Button>
                              </CardFooter>
                            </Card>
                          </div>
                          <div className="flex justify-between items-center">
                            <img
                              className="flex h-[40vh]"
                              src="/assets/gif/driverHomepage2.gif"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TopSection;
