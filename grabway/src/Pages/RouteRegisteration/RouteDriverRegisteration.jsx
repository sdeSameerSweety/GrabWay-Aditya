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
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/Context";
import axios from "axios";
const RouteDriverRegisteration = () => {
  const [email, setEmail] = useState(null);
  const { setRunContext } = useContext(UserContext); //dont remove this
  const toast = useToast(); //dont remove this
  const originText = "origin";
  const originLat = 1212123214323;
  const originLong = 21212321321;
  const destinationText = "destiny";
  const destinationLat = 5454516547475;
  const destinationLong = 321654151321;
  // const [originStartTime, setOriginStartTime] = useState(null);
  // const [destinationStartTime, setDestinationStartTime] = useState(null);
  // const [originEndTime, setOriginEndTime] = useState(null);
  // const [destinationEndTime, setDestinationEndTime] = useState(null);
  const [seats, setSeats] = useState(null);
  const googleUserData = Cookies.get("grabwayGoogleToken");
  const userData = Cookies.get("grabwayUser");
  // Modify the initialization of state variables
  const [originStartTime, setOriginStartTime] = useState({ from: "", to: "" });
  const [destinationStartTime, setDestinationStartTime] = useState({
    from: "",
    to: "",
  });
  const [originTimeError, setOriginTimeError] = useState("");
  const [destinationTimeError, setDestinationTimeError] = useState("");

  const formData = {
    email,
    originText,
    originLat,
    originLong,
    destinationText,
    destinationLat,
    destinationLong,
    originStartTime,
    // originEndTime,
    destinationStartTime,
    // destinationEndTime,
    seats,
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post("/routeDriverRegistration", {
          formData,
        });

        if (response.data) {
          console.log("driver route added");
          setRunContext("driver route added");

          toast({
            title: "Route has been Added",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });

          // Redirect to driver homepage
          window.location.href = "/driverHomepage";
        }
      } catch (err) {
        console.error(err);
        toast({
          title: "Failed to Add Route",
          description:
            "There was some problem adding the details, Please Try again Later",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      setErrors(newErrors);
    }

    if (!userData) {
      // Redirect if userData is not available
      window.location.href = "/";
    }
  };

  const [errors, setErrors] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState("");
  const handleCheckboxChange = (event) => {
    setError("");
    setIsChecked(event.target.checked);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.seats) {
      newErrors.seats = "Number of seats required";
    }

    if (!originStartTime.from || !originStartTime.to) {
      newErrors.originTime = "Both start and end times are required for origin";
    }

    if (!destinationStartTime.from || !destinationStartTime.to) {
      newErrors.destinationTime =
        "Both start and end times are required for destination";
    }

    const originStart = new Date(`2000-01-01T${originStartTime.from}`);
    const originEnd = new Date(`2000-01-01T${originStartTime.to}`);
    const destinationStart = new Date(
      `2000-01-01T${destinationStartTime.from}`
    );
    const destinationEnd = new Date(`2000-01-01T${destinationStartTime.to}`);

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
    if (userData !== undefined && !email) {
      setEmail(JSON.parse(Cookies.get("grabwayUser")).email);
    }
  }, [userData, email]);

  //dont change this part, its for redirecting when not a logged in driver
  if (userData !== undefined) {
    if (JSON.parse(userData).name === "") {
      return <Navigate to={"/registration"} userType="" />;
    }
    if (JSON.parse(userData).userType === "user") {
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
    <Container className="container-reg" maxW="75%" mt={8}>
      <Box
        className="tab-list"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection={{ base: "column", md: "row" }}
      >
        <Box flex={1} p={8}>
          <Heading className="heading">Register Your Schedule</Heading>
          <FormControl isInvalid={!!originTimeError} mt={4}>
            <FormLabel>Your Start Time</FormLabel>
            <Flex>
              <Input
                type="time"
                placeholder="From"
                value={originStartTime.from}
                onChange={(e) =>
                  setOriginStartTime({
                    ...originStartTime,
                    from: e.target.value,
                  })
                }
              />

              <Input
                type="time"
                placeholder="To"
                value={originStartTime.to}
                onChange={(e) =>
                  setOriginStartTime({
                    ...originStartTime,
                    to: e.target.value,
                  })
                }
                ml={5}
              />
            </Flex>
            <FormErrorMessage>{originTimeError}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!destinationTimeError} mt={4}>
            <FormLabel>Your End Time</FormLabel>
            <Flex>
              <Input
                type="time"
                placeholder="From"
                value={destinationStartTime.from}
                onChange={(e) =>
                  setDestinationStartTime({
                    ...destinationStartTime,
                    from: e.target.value,
                  })
                }
              />
              <Input
                type="time"
                placeholder="To"
                value={destinationStartTime.to}
                onChange={(e) =>
                  setDestinationStartTime({
                    ...destinationStartTime,
                    to: e.target.value,
                  })
                }
                ml={5}
              />
            </Flex>
            <FormErrorMessage>{destinationTimeError}</FormErrorMessage>
          </FormControl>
          <FormControl mt={4} isRequired isInvalid={!!errors.seats}>
            <FormLabel>Seats</FormLabel>
            <Input
              type="number"
              placeholder="Number of available seats"
              value={seats}
              onChange={(e) => setSeats(e.target.value.slice(0, 1))}
            />
            <FormErrorMessage>{errors.seats}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!error} mt={4}>
            <Checkbox
              isChecked={isChecked}
              onChange={handleCheckboxChange}
              size="lg"
              // onSubmit={handleSubmit}
            >
              I accept the terms and conditions
            </Checkbox>
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>
          <Button
            colorScheme="red"
            mt={4}
            onClick={handleSubmit}
            isDisabled={!isChecked}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RouteDriverRegisteration;
