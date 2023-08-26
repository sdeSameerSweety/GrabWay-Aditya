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
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Alert,
  AlertIcon,
  Checkbox,
  Avatar,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const UserRegistration = () => {
  const userData = Cookies.get("grabwayUser");
  const hasUserData = userData !== undefined;
  console.log(userData);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: hasUserData ? JSON.parse(userData).email : "",
    phoneNumber: hasUserData ? JSON.parse(userData).phoneNumber : "",
    location: "",
  });

  const [addressData, setAddressData] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pin: "",
  });

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
    if (!formData.name) newErrors.name = "First Name is required";
    // if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    // if (!formData.password) newErrors.password = "Password is required";
    // Add more validation rules here

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
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      // Implement form submission logic here
      console.log("Form submitted successfully:", formData);
    } else {
      setErrors(newErrors);
    }

    e.preventDefault();

    const carNumberRegex = /^[A-Z]{2}\s?\d{1,2}\s?[A-Z]{1,2}\s?\d{4}$/;

    if (!carNumberRegex.test(formData.carNumber)) {
      setError("Invalid car number format. Please use XX00 XX0000 format.");
      return;
    }
    setError("");
  };

  if (!userData) {
    return <Navigate to={"/"} />;
  }
  return (
    <Container className="container-reg" maxW="80%" mt={8}>
      <Box
        className="tab-list"
        display="flex"
        alignItems="center"
        justifyContent="center"
        // bgImg="url('https://img.freepik.com/free-vector/car-driving-concept-illustration_114360-8001.jpg?w=2000')"
        // bgSize="cover"
        // bgPosition="center"
        // bgRepeat="no-repeat"
        // w="100%"
        // h="100%"
      >
        {/* <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          bg="rgba(0, 0, 0, 0.2)" // Adjust the opacity here
        /> */}
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
        <Box flex={3} p={8}>
          <Tabs isFitted variant="enclosed-colored" colorScheme="teal">
            <TabList>
              <Tab>User Registration</Tab>
              {/* <Tab>Driver Registration</Tab> */}
            </TabList>
            <TabPanels>
              <TabPanel>
                <Heading size="md" mt={4}>
                  Apply as User
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
                  {/* Last Name */}
                  {/* <FormControl mt={4} isRequired isInvalid={!!errors.lastName}>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type="text"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                    />
                    <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                  </FormControl> */}

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

                  {/* Password */}
                  {/* <FormControl mt={4} isRequired isInvalid={!!errors.password}>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl> */}

                  {/* Phone Number */}
                  <FormControl
                    mt={4}
                    isRequired
                    isInvalid={!!errors.phoneNumber}
                  >
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
                  <FormControl mt={4} isRequired>
                    <FormLabel>Address Line 1</FormLabel>
                    <Input
                      type="text"
                      placeholder="Address Line 1"
                      value={addressData.addressLine1}
                      onChange={(e) =>
                        setAddressData({
                          ...addressData,
                          addressLine1: e.target.value,
                        })
                      }
                    />
                  </FormControl>

                  {/* Address Line 2 */}
                  <FormControl mt={4}>
                    <FormLabel>Address Line 2</FormLabel>
                    <Input
                      type="text"
                      placeholder="Address Line 2"
                      value={addressData.addressLine2}
                      onChange={(e) =>
                        setAddressData({
                          ...addressData,
                          addressLine2: e.target.value,
                        })
                      }
                    />
                  </FormControl>

                  {/* City */}
                  <FormControl mt={4} isRequired>
                    <FormLabel>City</FormLabel>
                    <Input
                      type="text"
                      placeholder="City"
                      value={addressData.city}
                      onChange={(e) =>
                        setAddressData({ ...addressData, city: e.target.value })
                      }
                    />
                  </FormControl>

                  {/* State */}
                  <FormControl mt={4} isRequired>
                    <FormLabel>State</FormLabel>
                    <Input
                      type="text"
                      placeholder="State"
                      value={addressData.state}
                      onChange={(e) =>
                        setAddressData({
                          ...addressData,
                          state: e.target.value,
                        })
                      }
                    />
                  </FormControl>

                  {/* PIN */}
                  <FormControl mt={4} isRequired>
                    <FormLabel>PIN</FormLabel>
                    <Input
                      type="text"
                      placeholder="PIN"
                      value={addressData.pin}
                      onChange={(e) =>
                        setAddressData({ ...addressData, pin: e.target.value })
                      }
                    />
                  </FormControl>

                  {/* To be added in future */}

                  {/* Location */}

                  {/* Workplace */}

                  {/* Work Schedule */}

                  {/* Preferred Gender */}

                  {/* Smoking Preferences */}

                  {/* Accessibility Needs */}

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
                  <Button
                    colorScheme="blue"
                    mt={4}
                    onClick={handleSubmit}
                    isDisabled={!isChecked}
                  >
                    Register
                  </Button>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Container>
  );
};

export default UserRegistration;
