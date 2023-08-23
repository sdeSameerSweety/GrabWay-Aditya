import React from "react";
import {
  Box,
  Button,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Image,
  VStack,
  Link,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

function DriverCard() {
  return (
    <Box p={8} borderRadius="md" boxShadow="lg" bg="white">
      <Tabs defaultIndex={0} colorScheme="blue">
        <TabList justifyContent="center" borderBottomWidth="1px" pb={2}>
          <Tab _selected={{ color: "blue.500", borderBottomWidth: "2px" }}>
            Essential Commuter
          </Tab>
          <Tab _selected={{ color: "blue.500", borderBottomWidth: "2px" }}>
            Comfort Traveler
          </Tab>
          <Tab _selected={{ color: "blue.500", borderBottomWidth: "2px" }}>
            Premier Business
          </Tab>
        </TabList>
        <TabPanels mt={4}>
          <Box
            width="75%"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="lg"
            display="flex"
            bg="gray.100"
            p={4}
          >
            <Image
              src="https://via.placeholder.com/300x180?text=Car"
              alt="Luxury Car Service"
              objectFit="cover"
              width="40%"
              borderRadius="md"
            />
            <VStack spacing={4} pl={4} align="start">
              <Heading size="lg">Luxury Car Service</Heading>
              <Text color="gray.600">
                Providing top-notch car services for your luxury vehicle. Our
                skilled professionals ensure your car's peak performance.
              </Text>
              <UnorderedList listStyleType="none" p={0}>
                <ListItem>🛠️ Engine Maintenance</ListItem>
                <ListItem>🚗 Exterior Detailing</ListItem>
                <ListItem>🛋️ Interior Cleaning</ListItem>
              </UnorderedList>
              <VStack spacing={2} align="start">
                <Link
                  href="#"
                  color="blue.500"
                  _hover={{ color: "blue.700" }}
                  fontWeight="bold"
                >
                  Learn More
                </Link>
                <Button
                  href="#"
                  colorScheme="blue"
                  size="md"
                  fontWeight="bold"
                  _hover={{ color: "blue.700" }}
                  _focus={{ boxShadow: "none" }}
                >
                  Book Now
                </Button>
              </VStack>
            </VStack>
          </Box>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default DriverCard;
