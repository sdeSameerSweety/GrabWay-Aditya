import React, { useContext, useState } from "react";
import "../../Registeration.css";
import {
  Container,
  Box,
  Heading,
  Text,
  Input,
  Radio,
  RadioGroup,
  Select,
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
import axios from "axios";
import { UserContext } from "../../../../context/Context";
import imageCompression from "browser-image-compression";

const DriverRegistration = () => {
  const { setRunContext } = useContext(UserContext);
  const userData = Cookies.get("grabwayGoogleToken");
  const GoogleUserType = "driver";
  const hasUserData = userData !== undefined;
  //console.log(userData);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: hasUserData ? userData : "",
    phoneNumber: "",
    location: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pin: "",
    carNumber: "",
    dlNumber: "",
    drivingExp: "",
    bio: "",
    imgDp: "",
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
          pin: postOffice.PinCode,
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
    //if (!formData.pinCode) newErrors.pinCode = "Pin Code is required";
    if (!formData.drivingExp) newErrors.drivingExp = "Experience is required";
    if (
      !/^(([A-Z]{2}[0-9]{2})|([A-Z]{2}-[0-9]{2}))((19|20)[0-9]{2})[0-9]{7}$/.test(
        formData.dlNumber
      )
    ) {
      newErrors.dlNumber = "DL is Invalid";
    }
    if (
      !/^[A-Z]{2}[ -]?[0-9]{2}[ -]?[A-Z]{1,2}[ -]?[0-9]{4}$/.test(
        formData.carNumber
      )
    )
      newErrors.carNumber = "Invalid Vehicle Number Plate";
    // else if (!/^\d{6}$/.test(formData.pinCode))
    //   newErrors.pinCode = "Pin Code should be a 6-digit number";

    return newErrors;
  };

  const handlePhotoChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const options = {
          maxSizeMB: 0.01,
          maxWidthOrHeight: 300,
        };
        const compressedFile = await imageCompression(file, options);
        await imageCompression
          .getDataUrlFromFile(compressedFile)
          .then((dataUrl) => {
            setFormData({
              ...formData,
              imgDp: dataUrl,
            });
          });
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const newErrors = validateForm();
    console.log(Object.keys(newErrors));
    if (Object.keys(newErrors).length === 0) {
      //Submission logic here
      //console.log('clicked');
      const response = await axios
        .post("/googleCreateDriver", { formData })
        .then((res) => {
          //console.log(res.data);
          setTimeout(() => {
            setRunContext("Google Driver form submited");
          }, 1500);
          if (res.data) {
            Cookies.remove("grabwayGoogleToken");
            window.location.reload(false);
          }
        })
        .catch(() => {
          console.log("Internal server Error");
        });
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
          <Heading className="heading">Dear Commodator</Heading>
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
          <Heading
            size="xl"
            mt={4}
            fontFamily="cursive"
            letterSpacing="wide"
            color="black.500"
            textAlign="justify"
            textShadow="2px 2px 4px rgba(0, 0, 0, 0.4)"
          >
            Welcome to Grabway!
          </Heading>
          <Box mt={4}>
            <Avatar size="xl" mb={4} src={formData.imgDp} />
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

            <FormControl mt={4} isRequired isInvalid={!!errors.dlNumber}>
              <FormLabel>DL Number</FormLabel>
              <Input
                type="text"
                placeholder="DL Number"
                value={formData.dlNumber}
                onChange={(e) =>
                  setFormData({ ...formData, dlNumber: e.target.value })
                }
              />
              <FormErrorMessage>{errors.dlNumber}</FormErrorMessage>
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
