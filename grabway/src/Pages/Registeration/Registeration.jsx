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

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    location: "",
    workplace: "",
    workSchedule: "",
    commuteFrequency: "",
    preferredGender: "",
    musicPreferences: "",
    smokingPreferences: "",
    accessibilityNeeds: "",
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
      // Proceed with your desired action here, since terms are accepted.
      console.log("Terms accepted, proceed with further actions.");
    }
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
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

  const [workSchedule, setWorkSchedule] = useState({
    from: "",
    to: "",
  });

  const handleTimeChange = (field, value) => {
    setWorkSchedule((prevSchedule) => ({
      ...prevSchedule,
      [field]: value,
    }));
  };

  const [formDataCarno, setFormDataCarno] = useState({
    location: "",
    carType: "",
    carNumber: "",
  });

  const handleCarTypeChange = (e) => {
    setFormDataCarno({ ...formDataCarno, carType: e.target.value });
  };

  const handleCarNumberChange = (e) => {
    setFormDataCarno({ ...formDataCarno, carNumber: e.target.value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const carNumberRegex = /^[A-Z]{2}\s?\d{1,2}\s?[A-Z]{1,2}\s?\d{4}$/;

  //   if (!carNumberRegex.test(formData.carNumber)) {
  //     alert("Invalid car number format. Please use XX00 XX0000 format.");
  //     return;
  //   }
  //   };

  return (
    <Container className="container" maxW="75%" mt={8}>
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
            connections, savings, and sustainability – all painted in shared
            journeys.
          </Text>
          <Text className="text-sm" color={'black'}>Already have a account?</Text>
          <Button className="button" colorScheme="blue" size="md">
            Login
          </Button>
        </Box>
        <Box flex={3} p={8}>
          <Tabs isFitted variant="enclosed-colored" colorScheme="teal">
            <TabList>
              <Tab>User Registration</Tab>
              <Tab>Driver Registration</Tab>
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
                  <FormControl isRequired isInvalid={!!errors.firstName}>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type="text"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                    />
                    <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                  </FormControl>
                  {/* Last Name */}
                  <FormControl mt={4} isRequired isInvalid={!!errors.lastName}>
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
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>

                  {/* Password */}
                  <FormControl mt={4} isRequired isInvalid={!!errors.password}>
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
                  </FormControl>

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
                    />

                    <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
                  </FormControl>

                  {/* Location */}
                  <FormControl mt={4} isRequired>
                    <FormLabel>Pickup Location</FormLabel>
                    <Input
                      type="text"
                      placeholder="Location"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                    />
                  </FormControl>

                  {/* Workplace */}
                  <FormControl mt={4} isRequired>
                    <FormLabel>Workplace Location</FormLabel>
                    <Input
                      type="text"
                      placeholder="Workplace"
                      value={formData.workplace}
                      onChange={(e) =>
                        setFormData({ ...formData, workplace: e.target.value })
                      }
                    />
                  </FormControl>

                  {/* Work Schedule */}
                  <FormControl mt={4} isRequired>
                    <FormLabel>Work Schedule</FormLabel>
                    <Flex>
                      <Input
                        type="time"
                        placeholder="From"
                        value={workSchedule.from}
                        onChange={(e) =>
                          handleTimeChange("from", e.target.value)
                        }
                      />
                      <Input
                        type="time"
                        placeholder="To"
                        value={workSchedule.to}
                        onChange={(e) => handleTimeChange("to", e.target.value)}
                        ml={4} // Add some margin for spacing
                      />
                    </Flex>
                  </FormControl>
                  {/* Preferred Gender */}
                  <FormControl mt={4}>
                    <FormLabel>Preferred Gender</FormLabel>
                    <RadioGroup
                      value={formData.preferredGender}
                      onChange={(value) =>
                        setFormData({
                          ...formData,
                          preferredGender: value,
                        })
                      }
                    >
                      <Stack direction="row">
                        <Radio value="male">Male</Radio>
                        <Radio value="female">Female</Radio>
                        <Radio value="nonBinary">Non-binary</Radio>
                        <Radio value="other">Other</Radio>
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                  {/* Smoking Preferences */}
                  <FormControl mt={4}>
                    <FormLabel>Smoking Preferences</FormLabel>
                    <RadioGroup
                      value={formData.smokingPreferences}
                      onChange={(value) =>
                        setFormData({
                          ...formData,
                          smokingPreferences: value,
                        })
                      }
                    >
                      <HStack spacing="24px">
                        <Radio value="non-smoker">Non-Smoker</Radio>
                        <Radio value="occasional-smoker">
                          Occasional Smoker
                        </Radio>
                        <Radio value="regular-smoker">Regular Smoker</Radio>
                      </HStack>
                    </RadioGroup>
                  </FormControl>

                  {/* Accessibility Needs */}
                  <FormControl mt={4}>
                    <FormLabel>Accessibility Needs</FormLabel>
                    <Input
                      type="text"
                      placeholder="Accessibility Needs"
                      value={formData.accessibilityNeeds}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          accessibilityNeeds: e.target.value,
                        })
                      }
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
              <TabPanel>
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
                  <FormControl
                    isRequired
                    isInvalid={!!errors.firstName}
                    onSubmit={handleSubmit}
                  >
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type="text"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                    />
                    <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                  </FormControl>
                  {/* Last Name */}
                  <FormControl mt={4} isRequired isInvalid={!!errors.lastName}>
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
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>

                  {/* Password */}
                  <FormControl mt={4} isRequired isInvalid={!!errors.password}>
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
                  </FormControl>

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
                    />

                    <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
                  </FormControl>

                  {/* Location */}
                  <FormControl mt={4} isRequired>
                    <FormLabel>Residance Location</FormLabel>
                    <Input
                      type="text"
                      placeholder="Location"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                    />
                  </FormControl>
                  <FormControl mt={4} isRequired>
                    <FormLabel>Vehicle Number Plate</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter car number"
                      value={formDataCarno.carNumber}
                      onChange={handleCarNumberChange}
                    />
                  </FormControl>

                  <FormControl mt={4} isRequired>
                    <FormLabel>Vehicle Seats</FormLabel>
                    <Select
                      placeholder="How many seaters do you have?"
                      value={formDataCarno.carType}
                      onChange={handleCarTypeChange}
                    >
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      {/* Add more options as needed */}
                    </Select>
                  </FormControl>
                  <FormControl mt={4} isRequired>
                    <FormLabel>Driving Experiance(Years)</FormLabel>
                    <Select placeholder="Driving experiance in years">
                      <option value="1L">1 or Less</option>
                      <option value="12">1-2</option>
                      <option value="23">2-3</option>
                      <option value="35">3-5</option>
                      <option value="2M">5 or More</option>
                      {/* Add more options as needed */}
                    </Select>
                  </FormControl>
                  <FormControl mt={4} isRequired>
                    <FormLabel>Bio</FormLabel>
                    <Input type="text" placeholder="Your Bio" />
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
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Container>
  );
};

export default Registration;
