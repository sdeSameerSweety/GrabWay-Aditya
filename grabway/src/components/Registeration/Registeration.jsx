import React from "react";
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
} from "@chakra-ui/react";

const Registration = () => {
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
            You are 30 seconds away from saving environment and money!
          </Text>
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
                  <Input type="text" placeholder="First Name *" />
                  <Input type="text" placeholder="Last Name *" />
                  <Input type="password" placeholder="Password *" />
                  <Input type="password" placeholder="Confirm Password *" />
                  <RadioGroup defaultValue="male">
                    <Radio value="male">Male</Radio>
                    <Radio value="female">Female</Radio>
                  </RadioGroup>
                </Box>
                <Button colorScheme="blue" mt={4}>
                  Register
                </Button>
              </TabPanel>
              <TabPanel>
                <Heading size="md" mt={4}>
                  Apply as a Driver
                </Heading>
                <Box mt={4}>
                  <Input type="text" placeholder="First Name *" />
                  <Input type="text" placeholder="Last Name *" />
                  <Input type="email" placeholder="Email *" />
                  <Input type="text" placeholder="Phone *" />
                  <Input type="password" placeholder="Password *" />
                  <Input type="password" placeholder="Confirm Password *" />
                  <Select placeholder="Select your Security Question">
                    <option value="birthdate">What is your Birthdate?</option>
                    <option value="oldPhone">
                      What is Your old Phone Number
                    </option>
                    <option value="petName">What is your Pet Name?</option>
                  </Select>
                  <Input type="text" placeholder="Answer *" />
                </Box>
                <Button colorScheme="blue" mt={4}>
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
