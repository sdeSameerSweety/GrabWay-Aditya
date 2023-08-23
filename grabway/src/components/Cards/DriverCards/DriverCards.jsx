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
          <TabPanel>
            <Heading size="md" mb={2}>
              Special Title Treatment
            </Heading>
            <Text fontSize="md" color="gray.600">
              With supporting text below as a natural lead-in to additional
              content.
            </Text>
            {/* <Button
              mt={4}
              colorScheme="blue"
              _hover={{ backgroundColor: "blue.600" }}
            >
              Go Somewhere
            </Button> */}
          </TabPanel>
          <TabPanel>
            <Heading size="md" mb={2}>
              Tab 2 Content
            </Heading>
            <Text fontSize="md" color="gray.600">
              Content for the second tab.
            </Text>
          </TabPanel>
          <TabPanel>
            <Heading size="md" mb={2}>
              Tab 3 Content
            </Heading>
            <Text fontSize="md" color="gray.600">
              Content for the third tab.
            </Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default DriverCard;
