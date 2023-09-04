import React, { useEffect, useRef, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import "../HomePage/DriverHomepage/DriverHomePage";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Button,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
const UserPackages = ({ nonceVal, loginState }) => {
  const userData = localStorage.getItem("grabwayUser");
  const [routes, setRoutes] = useState(null);
  const [routesEmpty, setRoutesEmpty] = useState(false);
  useEffect(() => {
    if (userData) {
      if (JSON.parse(userData).routes.length !== 0) {
        setRoutes(JSON.parse(userData).routes);
      }
      if (JSON.parse(userData).routes.length === 0) {
        setRoutesEmpty(true);
      }
    }
  });
  if (userData) {
    if (JSON.parse(userData).name === "") {
      return <Navigate to={"/registration"} userType="" />;
    }
    if (JSON.parse(userData).userType === "driver") {
      return <Navigate to={"/"} userType="" />;
    }
  }
  const googleUserData = Cookies.get("grabwayGoogleToken");
  if (googleUserData) {
    return <Navigate to={"/googleRegistration"} />;
  }
  if (!Cookies.get("grabwayToken")) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <div className="dekstop-view-driver">
        {routesEmpty && (
          <>
            <div className="flex flex-row justify-between items-center gap-20 mt-[8vh]">
              <div className="flex justify-center items-center">
                <img
                  className="flex justify-center items-center w-[30vw]"
                  src="/assets/gif/noRoute.gif"
                />
              </div>
              <div className="flex flex-col justify-center items-center">
                <div className="animated-text">
                  Greetings,
                  <br /> The Routes You Enroll in will be shown here
                  <br />
                  Happy Ridding xD
                </div>
                <div className="flex justify-center items-center ">
                  <Link to="/userHomepage">
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
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
        {!routesEmpty && (
          <>
            <div className="flex justify-center items-center flex-row m-5">
              <div className="flex justify-center items-center flex-col mt-5 ">
                <div className="flex justify-center items-center mb-10">
                  <Link to="/userHomepage">
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
                  </Link>
                </div>
                <div className="flex flex-col justify-between items-center gap-10 mt-5">
                  {routes &&
                    routes.map((element, index) => {
                      return (
                        <>
                          {index % 2 === 0 && (
                            <>
                              <div className="flex flex-row justify-between items-center w-[100%] gap-10">
                                <div className="flex-row justify-between items-center">
                                  <Card
                                    variant={"elevated"}
                                    sx={{
                                      width: "40vw",
                                      border: "2px solid black",
                                    }}
                                  >
                                    <CardHeader>
                                      <Heading size="md">
                                        <div className="flex flex-col gap-10">
                                          <div>
                                            <div className="text-sm font-ubuntu text-[#0000006c]">
                                              FROM:
                                            </div>
                                            <div className="text-[black]">
                                              {element.origin.text}
                                            </div>
                                          </div>
                                          <div>
                                            <div className="text-sm font-ubuntu text-[#0000006c]">
                                              TO:
                                            </div>
                                            <div className="text-[black]">
                                              {element.destination.text}
                                            </div>
                                          </div>
                                        </div>
                                      </Heading>
                                    </CardHeader>
                                    <CardBody></CardBody>
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
                                <div className="flex justify-between items-center">
                                  <img
                                    className="flex h-[40vh]"
                                    src="/assets/gif/driverHomepage2.gif"
                                  />
                                </div>
                                <div className="flex-row justify-between items-center">
                                  <Card
                                    variant={"elevated"}
                                    sx={{
                                      width: "40vw",
                                      border: "2px solid black",
                                    }}
                                  >
                                    <CardHeader>
                                      <Heading size="md">
                                        <div className="flex flex-col gap-10">
                                          <div>
                                            <div className="text-sm font-ubuntu text-[#0000006c]">
                                              FROM:
                                            </div>
                                            <div className="text-[black]">
                                              {element.origin.text}
                                            </div>
                                          </div>
                                          <div>
                                            <div className="text-sm font-ubuntu text-[#0000006c]">
                                              TO:
                                            </div>
                                            <div className="text-[black]">
                                              {element.destination.text}
                                            </div>
                                          </div>
                                        </div>
                                      </Heading>
                                    </CardHeader>
                                    <CardBody></CardBody>
                                    <CardFooter>
                                      <Button>View More Details</Button>
                                    </CardFooter>
                                  </Card>
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
          </>
        )}
      </div>
      <div className="mobile-view-driver">
        {routesEmpty && (
          <>
            <div className="flex flex-col justify-between items-center gap-20 mt-[8vh]">
              <div className="flex justify-center items-center">
                <img
                  className="flex justify-center items-center pl-[5%] pr-[5%]"
                  src="/assets/gif/noRoute.gif"
                />
              </div>
              <div className="flex flex-col justify-center items-center">
                <div className="animated-text">
                  Welcome,
                  <br /> Lets Begin with adding your Routes
                </div>
                <div className="flex justify-center items-center ">
                  <Link to="/userHomepage">
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
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
        {!routesEmpty && (
          <>
            <div className="flex justify-center items-center flex-row m-5">
              <div className="flex justify-center items-center flex-col mt-5 ">
                <div className="flex justify-center items-center mb-10">
                  <Link to="/userHomepage">
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
                  </Link>
                </div>
                <div className="flex flex-col justify-between items-center gap-10 mt-5">
                  {routes &&
                    routes.map((element, index) => {
                      return (
                        <>
                          {index % 2 === 0 && (
                            <>
                              <div className="flex flex-col justify-between items-center w-[100%] gap-10">
                                <div className="flex-row justify-between items-center">
                                  <Card
                                    variant={"elevated"}
                                    sx={{
                                      width: "80vw",
                                      border: "2px solid black",
                                    }}
                                  >
                                    <CardHeader>
                                      <Heading size="md">
                                        <div className="flex flex-col gap-10">
                                          <div>
                                            <div className="text-sm font-ubuntu text-[#0000006c]">
                                              FROM:
                                            </div>
                                            <div className="text-[black]">
                                              {element.origin.text}
                                            </div>
                                          </div>
                                          <div>
                                            <div className="text-sm font-ubuntu text-[#0000006c]">
                                              TO:
                                            </div>
                                            <div className="text-[black]">
                                              {element.destination.text}
                                            </div>
                                          </div>
                                        </div>
                                      </Heading>
                                    </CardHeader>
                                    <CardBody></CardBody>
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
                                    sx={{
                                      width: "80vw",
                                      border: "2px solid black",
                                    }}
                                  >
                                    <CardHeader>
                                      <Heading size="md">
                                        <div className="flex flex-col gap-10">
                                          <div>
                                            <div className="text-sm font-ubuntu text-[#0000006c]">
                                              FROM:
                                            </div>
                                            <div className="text-[black]">
                                              {element.origin.text}
                                            </div>
                                          </div>
                                          <div>
                                            <div className="text-sm font-ubuntu text-[#0000006c]">
                                              TO:
                                            </div>
                                            <div className="text-[black]">
                                              {element.destination.text}
                                            </div>
                                          </div>
                                        </div>
                                      </Heading>
                                    </CardHeader>
                                    <CardBody></CardBody>
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
          </>
        )}
      </div>
    </>
  );
};
export default UserPackages;
