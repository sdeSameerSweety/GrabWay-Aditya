import React, { useRef } from "react";
import "./Homepage.css";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  border,
  Button,
} from "@chakra-ui/react";
import { FiRefreshCcw } from "react-icons/fi";
import { FaCircleDot } from "react-icons/fa6";
import TopSlider from "./TopScroller/TopSlider";
import { PiMountainsDuotone } from "react-icons/pi";
import { BiLeaf } from "react-icons/bi";
import { GiGlassBall } from "react-icons/gi";
import { AiFillHeart, AiOutlineThunderbolt } from "react-icons/ai";
import { FaRoad } from "react-icons/fa6";
import { useJsApiLoader } from "@react-google-maps/api";
import { Autocomplete } from "@react-google-maps/api";
const TopSection = ({ loginState }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAfuFBhydCeCnk1Kl1c6u_1SfrIyXlReh0",
    libraries: ["places"],
  });
  if (!isLoaded) {
    return (
      <div className="h-[100vh] flex justify-center items-center">
        <Button size={'lg'} isLoading colorScheme="red" color={"red"} bgColor={"white"}>
          
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="relative dekstop-view">
        <div className="flex justify-center items-center w-auto h-auto ml-14">
          <div className="flex justify-center items-center h-[80vh] w-[100%] z-10">
            <img
              className="h-[75vh] w-[80%] opacity-70"
              src="/assets/images/loginImage.jpg"
            />
          </div>
          <div className="flex flex-col justify-center items-center absolute z-20 mt-5 ml-[-6vw]">
            <div className="input-main-div flex justify-center items-center ">
              <div>
                <Card
                  variant="filled"
                  sx={{ boxShadow: "0px 0px 0px 10px white" }}
                >
                  <CardHeader>
                    <Heading size="lg">
                      <div className="font-ubuntu">FROM</div>
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>
                      <div className="flex flex-row">
                        <div className="flex justify-center items-center">
                          <InputGroup>
                            <InputLeftElement
                              sx={{
                                marginTop: "13px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              pointerEvents="none"
                            >
                              <FaCircleDot fill="green" />
                            </InputLeftElement>
                            <Autocomplete className="font-ubuntu text-center">
                              <Input
                                className="card"
                                variant="filled"
                                sx={{
                                  border: "2px solid grey",
                                  padding: "30px",
                                  paddingLeft: "40px",
                                }}
                                type="text"
                                placeholder="From where ?"
                              />
                            </Autocomplete>
                          </InputGroup>
                        </div>
                      </div>
                    </Text>
                  </CardBody>
                </Card>
              </div>
              <div>
                <Card variant={"filled"} sx={{ borderRadius: "0px" }}>
                  <CardBody>
                    <Text
                      sx={{ border: "2px solid black", width: "10vw" }}
                    ></Text>
                  </CardBody>
                </Card>
              </div>
              <div>
                <Card
                  variant="filled"
                  sx={{ boxShadow: "0px 0px 0px 10px white" }}
                >
                  <CardHeader>
                    <Heading size="lg">
                      <div className="font-ubuntu">DESTINATION</div>
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>
                      <div className="flex flex-row">
                        <div className="flex justify-center items-center">
                          <InputGroup variant={"filled"}>
                            <InputLeftElement
                              sx={{
                                marginTop: "13px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              pointerEvents="none"
                            >
                              <FaCircleDot fill="red" />
                            </InputLeftElement>
                            <Autocomplete className="font-ubuntu text-center">
                              <Input
                                variant="filled"
                                sx={{
                                  border: "2px solid grey",
                                  padding: "30px",
                                  paddingLeft: "40px",
                                }}
                                type="text"
                                placeholder="Where to ?"
                              />
                            </Autocomplete>
                          </InputGroup>
                        </div>
                      </div>
                    </Text>
                  </CardBody>
                </Card>
              </div>
            </div>
            <div>
              <Button
                colorScheme="red"
                sx={{
                  padding: "40px",
                  backgroundColor: "#E51B23",
                  color: "white",
                  marginTop: "10%",
                  borderRadius: "9px",
                  boxShadow: "10px 10px #824244",
                }}
              >
                <div className="font-ubuntu text-2xl">Search GrabWay</div>
              </Button>
            </div>
          </div>
        </div>
        {loginState === false && (
          <>
            <div className="scroller">
              <TopSlider />
            </div>
            <div className="info-section mt-[5%] flex flex-col justify-center items-center gap-10">
              <div className="flex flex-row justify-center items-center">
                <div>
                  <img
                    className="w-[30vw] h-[60vh]"
                    src="/assets/images/mission.jpg"
                  />
                </div>
                <div>
                  <Card
                    className="w-[50vw]"
                    sx={{ border: "none", boxShadow: "none" }}
                  >
                    <CardHeader>
                      <Heading>
                        <div className="flex justify-center items-center font-ubuntu">
                          <div className="mr-[1%]">
                            <PiMountainsDuotone fill="#E51B23" />
                          </div>
                          Our Mission
                        </div>
                      </Heading>
                    </CardHeader>
                    <CardBody>
                      <Text>
                        <div className="flex text-center justify-center items-center text-xl opacity-80">
                          We aim at reducing your travel time, socializing your
                          world of travel
                          <br />
                          and providing comfort at your doorstep.
                        </div>
                        <div className="font-ubuntu mt-[3%] flex justify-center items-center text-2xl opacity-95 text-[#1b4ee5] text-center">
                          <AiOutlineThunderbolt className="mr-[1%]" />
                          JUST GRABWAY AND CHILL
                          <AiOutlineThunderbolt className="ml-[1%]" />
                        </div>
                      </Text>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>

            <div className="flex flex-row justify-center items-center">
              <div>
                <Card
                  className="w-[50vw]"
                  sx={{ border: "none", boxShadow: "none" }}
                >
                  <CardHeader>
                    <Heading>
                      <div className="flex justify-center items-center font-ubuntu">
                        <div className="mr-[1%]">
                          <BiLeaf fill="#E51B23" />
                        </div>
                        Our Vission
                      </div>
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>
                      <div className="flex text-center justify-center items-center text-xl opacity-80">
                        Grabway is commited to reducing Carbon prints from our
                        planet by providing a public yet personal mode of
                        transport.
                      </div>
                      <div className="font-ubuntu mt-[3%] flex justify-center items-center text-2xl opacity-95 text-[#4ee51b] text-center">
                        <AiFillHeart className="mr-[1%]" />
                        LET US CONTRIBUTE TO A GREENER EARTH
                        <AiFillHeart className="ml-[1%]" />
                      </div>
                    </Text>
                  </CardBody>
                </Card>
              </div>
              <div>
                <img
                  className="w-[30vw] h-[60vh]"
                  src="/assets/images/vission.jpg"
                />
              </div>
            </div>

            <div className="flex flex-row justify-center items-center">
              <div>
                <img
                  className="w-[37vw] h-[60vh]"
                  src="/assets/images/goal.jpg"
                />
              </div>
              <div>
                <Card
                  className="w-[50vw] mt-[4%]"
                  sx={{ border: "none", boxShadow: "none" }}
                >
                  <CardHeader>
                    <Heading>
                      <div className="flex justify-center items-center font-ubuntu">
                        <div className="mr-[1%]">
                          <GiGlassBall fill="#E51B23" />
                        </div>
                        Our Goal
                      </div>
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>
                      <div className="flex text-center justify-center items-center text-xl opacity-80">
                        We plan to become India's most trusted platform for
                        shuttle service,providing completely a new dimension to
                        your daily Life
                      </div>
                      <div className="font-ubuntu mt-[3%] flex justify-center items-center text-2xl opacity-95 text-[#1b4ee5] text-center">
                        <FaRoad className="mr-[1%]" />
                        REDEFINING INDIA'S TRANSPORT ASPIRATIONS
                        <FaRoad className="ml-[1%]" />
                      </div>
                    </Text>
                  </CardBody>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mobile-view mt-[2vh] flex flex-col justify-center items-center">
        <div>
          <img className="h-[20vh]" src="/assets/images/loginImage.jpg" />
        </div>
        <div className="flex justify-center items-center">
          <Card variant="filled" sx={{ boxShadow: "0px 0px 0px 10px white" }}>
            <CardHeader>
              <Heading size="lg">
                <div className="font-ubuntu">FROM</div>
              </Heading>
            </CardHeader>
            <CardBody>
              <Text>
                <div className="flex flex-row">
                  <div className="flex justify-center items-center">
                    <InputGroup>
                      <InputLeftElement
                        sx={{
                          marginTop: "3px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        pointerEvents="none"
                      >
                        <FaCircleDot fill="green" />
                      </InputLeftElement>
                      <Input
                        className="card"
                        variant="filled"
                        sx={{
                          border: "2px solid grey",
                          padding: "15px",
                          paddingLeft: "40px",
                        }}
                        type="text"
                        placeholder="Where to ?"
                      />
                    </InputGroup>
                  </div>
                </div>
              </Text>
            </CardBody>
          </Card>
        </div>
        <div className="flex justify-center items-center">
          <Card variant="filled" sx={{ boxShadow: "0px 0px 0px 10px white" }}>
            <CardHeader>
              <Heading size="lg">
                <div className="font-ubuntu">DESTINATION</div>
              </Heading>
            </CardHeader>
            <CardBody>
              <Text>
                <div className="flex flex-row">
                  <div className="flex justify-center items-center">
                    <InputGroup>
                      <InputLeftElement
                        sx={{
                          marginTop: "3px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        pointerEvents="none"
                      >
                        <FaCircleDot fill="red" />
                      </InputLeftElement>
                      <Input
                        className="card"
                        variant="filled"
                        sx={{
                          border: "2px solid grey",
                          padding: "15px",
                          paddingLeft: "40px",
                        }}
                        type="text"
                        placeholder="Where to ?"
                      />
                    </InputGroup>
                  </div>
                </div>
              </Text>
            </CardBody>
          </Card>
        </div>
        <div>
          <Button
            colorScheme="red"
            sx={{
              padding: "20px",
              backgroundColor: "#E51B23",
              color: "white",
              marginTop: "10%",
              borderRadius: "9px",
              boxShadow: "5px 5px #824244",
            }}
          >
            <div className="font-ubuntu text-2xl">Search GrabWay</div>
          </Button>
        </div>
        {loginState === false && (
          <div className="info-section mt-[5%] flex flex-col justify-center items-center gap-10">
            <div className="flex flex-col justify-center items-center">
              <div>
                <img
                  className="w-[60vw] h-[40vh]"
                  src="/assets/images/vission.jpg"
                />
              </div>
              <div>
                <Card className="w-[90vw]" variant={"filled"}>
                  <CardHeader>
                    <Heading>
                      <div className="flex justify-center items-center font-ubuntu">
                        <div className="mr-[1%]">
                          <PiMountainsDuotone fill="#E51B23" />
                        </div>
                        Our Mission
                      </div>
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>
                      <div className="flex text-center justify-center items-center text-xl opacity-80">
                        We aim at reducing your travel time, socializing your
                        world of travel
                        <br />
                        and providing comfort at your doorstep.
                      </div>
                      <div className="font-ubuntu mt-[3%] flex justify-center items-center text-2xl opacity-95 text-[#1b4ee5] text-center">
                        <AiOutlineThunderbolt className="mr-[1%]" />
                        JUST GRABWAY AND CHILL
                        <AiOutlineThunderbolt className="ml-[1%]" />
                      </div>
                    </Text>
                  </CardBody>
                </Card>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div>
                <Card className="w-[90vw]" variant={"filled"}>
                  <CardHeader>
                    <Heading>
                      <div className="flex justify-center items-center font-ubuntu">
                        <div className="mr-[1%]">
                          <BiLeaf fill="#E51B23" />
                        </div>
                        Our Vission
                      </div>
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>
                      <div className="flex text-center justify-center items-center text-xl opacity-80">
                        Grabway is commited to reducing Carbon prints from our
                        planet by providing a public yet personal mode of
                        transport.
                      </div>
                      <div className="font-ubuntu mt-[3%] flex justify-center items-center text-2xl opacity-95 text-[#4ee51b] text-center">
                        <AiFillHeart className="mr-[1%]" />
                        LET US CONTRIBUTE TO A GREENER EARTH
                        <AiFillHeart className="ml-[1%]" />
                      </div>
                    </Text>
                  </CardBody>
                </Card>
              </div>
              <div className="flex flex-col justify-center items-center">
                <div>
                  <Card className="w-[90vw] mt-[4%]" variant={"filled"}>
                    <CardHeader>
                      <Heading>
                        <div className="flex justify-center items-center font-ubuntu">
                          <div className="mr-[1%]">
                            <GiGlassBall fill="#E51B23" />
                          </div>
                          Our Goal
                        </div>
                      </Heading>
                    </CardHeader>
                    <CardBody>
                      <Text>
                        <div className="flex text-center justify-center items-center text-xl opacity-80">
                          We plan to become India's most trusted platform for
                          shuttle service,providing completely a new dimension
                          to your daily Life
                        </div>
                        <div className="font-ubuntu mt-[3%] flex justify-center items-center text-2xl opacity-95 text-[#1b4ee5] text-center">
                          <FaRoad className="mr-[1%]" />
                          REDEFINING INDIA'S TRANSPORT ASPIRATIONS
                          <FaRoad className="ml-[1%]" />
                        </div>
                      </Text>
                    </CardBody>
                  </Card>
                </div>
                <div>
                  <img
                    className="w-70vw] h-[30vh]"
                    src="/assets/images/goal.jpg"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TopSection;
