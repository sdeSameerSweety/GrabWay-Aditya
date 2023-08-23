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
          {/* <TabPanel>
            <Heading size="md" mb={2}>
              Special Title Treatment
            </Heading>
            <Text fontSize="md" color="gray.600">
              With supporting text below as a natural lead-in to additional
              content.
            </Text>
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
          </TabPanel> */}

          <Box
            width="75%" // Taking 75% of the left space
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="lg" // Slightly more pronounced box shadow
            display="flex" // Displaying elements in a row
          >
            <Image
              src="https://via.placeholder.com/300x180?text=Car" // Larger placeholder image
              alt="Luxury Car Service" // Updated alt text
              objectFit="cover"
              width="40%" // Taking 40% of the width for the image
            />
            <VStack spacing={4} p={4} align="left">
              <Text fontSize="xl" fontWeight="bold">
                Luxury Car Service
              </Text>
              <Text color="gray.600">
                Providing top-notch car services for your luxury vehicle. Our
                skilled professionals ensure your car's peak performance.
              </Text>
              <UnorderedList listStyleType="none" p={0}>
                <ListItem p={2}>🛠️ Engine Maintenance</ListItem>
                <ListItem p={2}>🚗 Exterior Detailing</ListItem>
                <ListItem p={2}>🛋️ Interior Cleaning</ListItem>
              </UnorderedList>
              <VStack spacing={2}>
                <Link
                  href="#"
                  color="blue.500"
                  _hover={{ color: "blue.700" }}
                  fontWeight="bold"
                >
                  Learn More
                </Link>
                <Link
                  href="#"
                  color="blue.500"
                  _hover={{ color: "blue.700" }}
                  fontWeight="bold"
                >
                  Book Now
                </Link>
              </VStack>
            </VStack>
          </Box>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default DriverCard;

// import React from "react";
// import {
//   Box,
//   Image,
//   Text,
//   VStack,
//   Link,
//   UnorderedList,
//   ListItem,
// } from "@chakra-ui/react";

// function DriverCard() {
//   return (
//     <Box
//       width="75%" // Taking 75% of the left space
//       borderWidth="1px"
//       borderRadius="lg"
//       overflow="hidden"
//       boxShadow="lg" // Slightly more pronounced box shadow
//       display="flex" // Displaying elements in a row
//     >
//       <Image
//         src="https://via.placeholder.com/300x180?text=Car" // Larger placeholder image
//         alt="Luxury Car Service" // Updated alt text
//         objectFit="cover"
//         width="40%" // Taking 40% of the width for the image
//       />
//       <VStack spacing={4} p={4} align="left">
//         <Text fontSize="xl" fontWeight="bold">
//           Luxury Car Service
//         </Text>
//         <Text color="gray.600">
//           Providing top-notch car services for your luxury vehicle. Our skilled
//           professionals ensure your car's peak performance.
//         </Text>
//         <UnorderedList listStyleType="none" p={0}>
//           <ListItem p={2}>🛠️ Engine Maintenance</ListItem>
//           <ListItem p={2}>🚗 Exterior Detailing</ListItem>
//           <ListItem p={2}>🛋️ Interior Cleaning</ListItem>
//         </UnorderedList>
//         <VStack spacing={2}>
//           <Link
//             href="#"
//             color="blue.500"
//             _hover={{ color: "blue.700" }}
//             fontWeight="bold"
//           >
//             Learn More
//           </Link>
//           <Link
//             href="#"
//             color="blue.500"
//             _hover={{ color: "blue.700" }}
//             fontWeight="bold"
//           >
//             Book Now
//           </Link>
//         </VStack>
//       </VStack>
//     </Box>
//   );
// }

// export default DriverCard;
