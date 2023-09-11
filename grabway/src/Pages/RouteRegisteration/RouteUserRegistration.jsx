import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Input,
  useToast,
  FormControl,
  FormLabel,
  Flex,
  FormErrorMessage,
  Checkbox,
  Container,
  Box,
  Heading,
} from "@chakra-ui/react";
import "./RouteDriverRegisteration.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/Context";
import { useLocation } from "react-router-dom";
import axios from "axios";
import FormAnimation from "../../components/AllAnimations/FormAnimation";
const RouteUserRegisteration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const { setRunContext } = useContext(UserContext); //dont remove this
  const toast = useToast(); //dont remove this
  const originText = location.state.data.state.source;
  const originLat = location.state.data.state.sourceCord.lat;
  const originLong = location.state.data.state.sourceCord.lng;
  const destinationText = location.state.data.state.destination;
  const destinationLat = location.state.data.state.destinationCord.lat;
  const destinationLong = location.state.data.state.destinationCord.lng;
  const [originStartTime, setOriginStartTime] = useState(null);
  const [destinationStartTime, setDestinationStartTime] = useState(null);
  const [originEndTime, setOriginEndTime] = useState(null);
  const [destinationEndTime, setDestinationEndTime] = useState(null);
  const [seats, setSeats] = useState(null);
  const googleUserData = Cookies.get("grabwayGoogleToken");
  const userData = localStorage.getItem("grabwayUser");
  const [originTimeError, setOriginTimeError] = useState("");
  const [destinationTimeError, setDestinationTimeError] = useState("");
  const [search, setSearch] = useState(false);

  //console.log(location);

  if (location === null) {
    navigate("/");

    toast({
      title: "Cannot Access now",
      description: "Please Fill Source and Destination before moving ahead",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  } else if (location.state === undefined || location.state === null) {
    navigate("/");
    toast({
      title: "Cannot Access now",
      description: "Please Fill Source and Destination before moving ahead",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  }
  // //console.log(location.state.data.state);

  const formData = {
    email,
    originText: location.state.data.state.source,
    originLat: location.state.data.state.sourceCord.lat,
    originLong: location.state.data.state.sourceCord.lng,
    destinationText: location.state.data.state.destination,
    destinationLat: location.state.data.state.destinationCord.lat,
    destinationLong: location.state.data.state.destinationCord.lng,
    originStartTime,
    originEndTime,
    destinationStartTime,
    destinationEndTime,
    seats,
    amount: location.state.amount,
  };

  ////console.log(formData);

  const [errors, setErrors] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState("");
  const handleCheckboxChange = (event) => {
    setError("");
    setIsChecked(event.target.checked);
  };

  const validateForm = () => {
    const newErrors = {};

    // if (!formData.seats) {
    //   newErrors.seats = "Number of seats required";
    // }

    if (!originStartTime || !originEndTime) {
      newErrors.originTime =
        "Both origin start and origin end times are required";
    }

    if (!destinationStartTime || !destinationEndTime) {
      newErrors.destinationTime =
        "Both estination and estination end times are required";
    }

    const originStart = new Date(`2000-01-01T${originStartTime}`);
    const originEnd = new Date(`2000-01-01T${originEndTime}`);
    const destinationStart = new Date(`2000-01-01T${destinationStartTime}`);
    const destinationEnd = new Date(`2000-01-01T${destinationEndTime}`);

    if (originEnd <= originStart) {
      newErrors.originTime = "Origin end time must be after origin start time";
    }

    if (destinationEnd <= destinationStart) {
      newErrors.destinationTime =
        "Destination end time must be after destination start time";
    }

    setOriginTimeError(newErrors.originTime || "");
    setDestinationTimeError(newErrors.destinationTime || "");

    return newErrors;
  };

  useEffect(() => {
    if (userData && !email) {
      setEmail(JSON.parse(localStorage.getItem("grabwayUser")).email);
    }
  }, [userData, email]);
  //dont change this part, its for redirecting when not a logged in driver
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const newErrors = validateForm();

    if (Object.keys(newErrors).length !== 0) {
      setErrors(newErrors);
    } else {
      setSearch(true);
    }
  };
  //console.log("search", search);
  if (search) {
    return navigate("/matchedRoutes", { state: formData });
  }

  if (userData) {
    if (JSON.parse(userData).name === "") {
      return <Navigate to={"/registration"} userType="" />;
    }
    if (JSON.parse(userData).userType === "driver") {
      return <Navigate to={"/"} />;
    }
  }
  if (!userData) {
    if (!googleUserData) {
      return <Navigate to={"/"} />;
    }
    if (googleUserData) {
      return <Navigate to={"/googleRegistration"} />;
    }
  }

  return (
    <Container id="form-div" className=" container-reg" maxW="100%" mt={8}>
      <Box
        className="tab-list"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection={{ base: "column", md: "row" }}
        px={8}
      >
        <FormAnimation />
        <Box flex={1} p={8}>
          <Heading className="heading">Register Your Schedule</Heading>
          <FormControl mt={4}>
            <FormLabel>Your Pickup Location</FormLabel>
            <Input type="text" value={originText} isReadOnly />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Your Drop Location</FormLabel>
            <Input type="text" value={destinationText} isReadOnly />
          </FormControl>
          <FormControl isInvalid={!!originTimeError} mt={4}>
            <FormLabel>Your Pickup Time</FormLabel>
            <Flex>
              <Input
                type="time"
                placeholder="Pickup From"
                value={originStartTime}
                onChange={(e) => setOriginStartTime(e.target.value)}
              />

              <Input
                type="time"
                placeholder="Pickup To"
                value={originEndTime}
                onChange={(e) => setOriginEndTime(e.target.value)}
                ml={5}
              />
            </Flex>
            <FormErrorMessage>{originTimeError}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!destinationTimeError} mt={4}>
            <FormLabel>Your Drop Time</FormLabel>
            <Flex>
              <Input
                type="time"
                placeholder="Drop From"
                value={destinationStartTime}
                onChange={(e) => setDestinationStartTime(e.target.value)}
              />

              <Input
                type="time"
                placeholder="Drop To"
                value={destinationEndTime}
                onChange={(e) => setDestinationEndTime(e.target.value)}
                ml={5}
              />
            </Flex>
            <FormErrorMessage>{destinationTimeError}</FormErrorMessage>
          </FormControl>
          {/* <FormControl mt={4} isRequired isInvalid={!!errors.seats}>
            <FormLabel>Seats</FormLabel>
            <Input
              type="number"
              placeholder="Number of available seats"
              value={seats}
              onChange={(e) => setSeats(e.target.value.slice(0, 2))}
            />
            <FormErrorMessage>{errors.seats}</FormErrorMessage>
          </FormControl> */}
          <FormControl isInvalid={!!error} mt={4}>
            <Checkbox
              isChecked={isChecked}
              onChange={handleCheckboxChange}
              size="sm"
            >
              I accept the terms and conditions**
            </Checkbox>
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>
          <Button
            colorScheme="red"
            mt={4}
            onClick={handleSubmit}
            isDisabled={!isChecked}
          >
            Search Drivers
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RouteUserRegisteration;
