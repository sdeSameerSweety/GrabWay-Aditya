import React, { useState } from "react";
import "./Registeration.css";
import {
  Container,
  Box,
  Heading,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Input,
  Radio,
  RadioGroup,
  Select,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Flex,
  Stack,
  HStack,
  Alert,
  AlertIcon,
  Checkbox,
  Avatar,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const DriverRegistration = () => {
  const userData = Cookies.get("grabwayUser");
  const hasUserData = userData !== undefined;
  console.log(userData);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: hasUserData ? JSON.parse(userData).email : "",
    phoneNumber: hasUserData ? JSON.parse(userData).phoneNumber : "",
    location: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pin: "",
    carNumber: "",
    carSeats: "",
    drivingExp: "",
    bio: "",
  });

  const handlePincodeChange = async (e) => {
    const pincode = e.target.value;
    setFormData({
      ...formData,
      pin: pincode,
    });

    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = await response.json();

      if (data && data[0].Status === "Success") {
        const postOffice = data[0].PostOffice[0];
        setFormData({
          ...formData,
          city: postOffice.District,
          state: postOffice.State,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [errors, setErrors] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState("");
  const handleCheckboxChange = (event) => {
    setError("");
    setIsChecked(event.target.checked);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!isChecked) {
      setError("Please accept the terms and conditions.");
    } else {
      console.log("Terms accepted, proceed with further actions.");
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Full Name is required";
    if (!formData.addressLine1) newErrors.addressLine1 = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.pinCode) newErrors.pinCode = "Pin Code is required";
    if (!formData.carNumber) newErrors.carNumber = "Vehicle Number is required";
    if (!formData.carSeats) newErrors.carSeats = "Seat Number is required";
    if (!formData.drivingExp) newErrors.drivingExp = "Experience is required";
    // else if (!/^\d{6}$/.test(formData.pinCode))
    //   newErrors.pinCode = "Pin Code should be a 6-digit number";

    return newErrors;
  };

  const [profilePhoto, setProfilePhoto] = useState(null);
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhoto(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      //Submission logic here
      console.log("Form submitted successfully:", formData);
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };


  if (!userData) {
    return <Navigate to={"/"} />;
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
          <Heading className="heading">Welcome</Heading>
          <Text className="text">
            Step into Grabway, where your commute becomes a canvas of
            connections, savings, and sustainability - all painted in shared
            journeys.
          </Text>
          <Text className="text-sm" color={"black"}>
            Already have a account?
          </Text>
          <Button className="button" colorScheme="blue" size="md">
            Login
          </Button>
        </Box>
        <Box
          flex={3}
          p={8}
          isFitted
          variant="enclosed-colored"
          colorScheme="teal"
        >
          <Heading size="md" mt={4}>
            Apply as a Driver
          </Heading>
          <Box mt={4}>
            <Avatar size="xl" mb={4} src={profilePhoto} />
            <FormControl>
              <FormLabel>Profile Photo</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                mb={4}
              />
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.name}>
              <FormLabel>Full Name</FormLabel>
              <Input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>

            {/* Email */}
            <FormControl mt={4} isRequired isInvalid={!!errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                disabled={hasUserData}
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>

            {/* Phone Number */}
            <FormControl mt={4} isRequired isInvalid={!!errors.phoneNumber}>
              <FormLabel>Phone Number</FormLabel>
              <Input
                type="number"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={(e) => {
                  const inputPhoneNumber = e.target.value;

                  // Ensure the input value is not exceeding the maximum length
                  if (inputPhoneNumber.length <= 10) {
                    setFormData({
                      ...formData,
                      phoneNumber: inputPhoneNumber,
                    });
                  }
                }}
                minLength={10}
                maxLength={10}
                disabled={hasUserData}
              />

              <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
            </FormControl>
            {/* Address Line 1 */}
            <FormControl mt={4} isRequired isInvalid={!!errors.addressLine1}>
              <FormLabel>Address Line 1</FormLabel>
              <Input
                type="text"
                placeholder="Address Line 1"
                value={formData.addressLine1}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    addressLine1: e.target.value,
                  })
                }
              />
              <FormErrorMessage>{errors.addressLine1}</FormErrorMessage>
            </FormControl>

            {/* Address Line 2 */}
            <FormControl mt={4}>
              <FormLabel>Address Line 2</FormLabel>
              <Input
                type="text"
                placeholder="Address Line 2"
                value={formData.addressLine2}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    addressLine2: e.target.value,
                  })
                }
              />
            </FormControl>

            {/* PIN */}
            <FormControl mt={4} isRequired isInvalid={!!errors.pin}>
              <FormLabel>PIN</FormLabel>
              <Input
                type="text"
                placeholder="PIN"
                value={formData.pin}
                onChange={(e) => {
                  setFormData({ ...formData, pin: e.target.value });
                  handlePincodeChange(e);
                }}
                minLength={6}
                maxLength={6}
              />
              <FormErrorMessage>{errors.pin}</FormErrorMessage>
            </FormControl>

            {/* City */}
            <FormControl mt={4} isRequired isInvalid={!!errors.city}>
              <FormLabel>City</FormLabel>
              <Input
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
              />
              <FormErrorMessage>{errors.city}</FormErrorMessage>
            </FormControl>

            {/* State */}
            <FormControl mt={4} isRequired isInvalid={!!errors.state}>
              <FormLabel>State</FormLabel>
              <Input
                type="text"
                placeholder="State"
                value={formData.state}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    state: e.target.value,
                  })
                }
              />
              <FormErrorMessage>{errors.state}</FormErrorMessage>
            </FormControl>

            {/* Number Plate */}
            <FormControl mt={4} isRequired isInvalid={!!errors.carNumber}>
              <FormLabel>Vehicle Number Plate</FormLabel>
              <Input
                type="text"
                placeholder="Enter car number"
                value={formData.carNumber}
                onChange={(e) =>
                  setFormData({ ...formData, carNumber: e.target.value })
                }
              />
              <FormErrorMessage>{errors.carNumber}</FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isRequired isInvalid={!!errors.carNumber}>
              <FormLabel>Vehicle Seats</FormLabel>
              <Select
                placeholder="How many seaters do you have?"
                value={formData.carSeats}
                onChange={(e) =>
                  setFormData({ ...formData, carSeats: e.target.value })
                }
              >
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </Select>
              <FormErrorMessage>{errors.carSeats}</FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isRequired isInvalid={!!errors.drivingExp}>
              <FormLabel>Driving Experiance</FormLabel>
              <Select
                placeholder="Driving experiance in years"
                value={formData.drivingExp}
                onChange={(e) =>
                  setFormData({ ...formData, drivingExp: e.target.value })
                }
              >
                <option value="1L">1 or Less Year</option>
                <option value="12">1-2 Years</option>
                <option value="23">2-3 Years</option>
                <option value="35">3-5 Years</option>
                <option value="2M">5 or More Years</option>
              </Select>
              <FormErrorMessage>{errors.drivingExp}</FormErrorMessage>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Bio</FormLabel>
              <Input
                type="text"
                placeholder="Your Bio (Can be edited later)"
                value={formData.bio}
              />
            </FormControl>
            <FormControl isInvalid={!!error} mt={4}>
              <Checkbox
                isChecked={isChecked}
                onChange={handleCheckboxChange}
                size="lg"
                onSubmit={handleFormSubmit}
              >
                I accept the terms and conditions
              </Checkbox>
              <FormErrorMessage>{error}</FormErrorMessage>
            </FormControl>
            {error && (
              <Alert status="error" mt={5}>
                <AlertIcon />
                {error}
              </Alert>
            )}
          </Box>
          <Button
            colorScheme="blue"
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

export default DriverRegistration;
