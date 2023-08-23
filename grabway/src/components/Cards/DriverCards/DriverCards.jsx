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

const cardData = [
  {
    title: "Luxury Car Service",
    imageSrc: "https://via.placeholder.com/300x180?text=Car",
    description:
      "Providing top-notch car services for your luxury vehicle. Our skilled professionals ensure your car's peak performance.",
    services: [
      "🛠️ Engine Maintenance",
      "🚗 Exterior Detailing",
      "🛋️ Interior Cleaning",
    ],
  },
  {
    title: "Good Car Service",
    imageSrc: "https://via.placeholder.com/300x180?text=Car",
    description:
      "Providing top-notch car services for your luxury vehicle. Our skilled professionals ensure your car's peak performance.",
    services: [
      "🛠️ Engine Maintenance",
      "🚗 Exterior Detailing",
      "🛋️ Interior Cleaning",
    ],
  },
  {
    title: "Try Car Service",
    imageSrc: "https://via.placeholder.com/300x180?text=Car",
    description:
      "Providing top-notch car services for your luxury vehicle. Our skilled professionals ensure your car's peak performance.",
    services: [
      "🛠️ Engine Maintenance",
      "🚗 Exterior Detailing",
      "🛋️ Interior Cleaning",
    ],
  },
  // Add more card data as needed
];

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
          {cardData.map((card, index) => (
            <TabPanel key={index}>
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
                  src={card.imageSrc}
                  alt={card.title}
                  objectFit="cover"
                  width="40%"
                  borderRadius="md" // Rounded image corners
                />
                <VStack spacing={4} pl={4} align="start">
                  <Heading size="lg">{card.title}</Heading>
                  <Text color="gray.600">{card.description}</Text>
                  <UnorderedList listStyleType="none" p={0}>
                    {card.services.map((service, serviceIndex) => (
                      <ListItem key={serviceIndex}>{service}</ListItem>
                    ))}
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
                      colorScheme="blue" // Use color scheme for consistent styling
                      size="md" // Adjust button size for uniformity
                      fontWeight="bold"
                      _hover={{ color: "blue.700" }}
                      _focus={{ boxShadow: "none" }} // Remove focus box shadow for a cleaner look
                    >
                      Book Now
                    </Button>
                  </VStack>
                </VStack>
              </Box>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default DriverCard;
