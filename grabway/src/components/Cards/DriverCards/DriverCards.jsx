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

const sections = ["Essential Commuter", "Comfort Traveler", "Premier Business"];

const cardData = {
  "Essential Commuter": [
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
    // Add more cards for this section if needed
  ],
  "Comfort Traveler": [
    {
      title: "Good Car Service",
      imageSrc: "https://via.placeholder.com/300x180?text=Car",
      description:
        "Providing good car services for your travel needs. Our professionals ensure your comfort and safety.",
      services: [
        "🛠️ Engine Check",
        "🚗 Regular Maintenance",
        "🛋️ Interior Cleaning",
      ],
    },
    // Add more cards for this section if needed
  ],
  "Premier Business": [
    {
      title: "Try Car Service",
      imageSrc: "https://via.placeholder.com/300x180?text=Car",
      description:
        "Experience our premier car services for your business trips. Our fleet guarantees style and reliability.",
      services: [
        "🛠️ Business-Class Maintenance",
        "🚗 Chauffeur Service",
        "🛋️ Comfortable Interior",
      ],
    },
    // Add more cards for this section if needed
  ],
};

function DriverCard() {
  return (
    <Box p={8} borderRadius="md" boxShadow="lg" bg="white">
      <Tabs defaultIndex={0} colorScheme="blue">
        <TabList justifyContent="center" borderBottomWidth="1px" pb={2}>
          {sections.map((section, index) => (
            <Tab
              key={index}
              _selected={{ color: "blue.500", borderBottomWidth: "2px" }}
            >
              {section}
            </Tab>
          ))}
        </TabList>
        <TabPanels mt={4}>
          {sections.map((section, index) => (
            <TabPanel key={index}>
              {cardData[section].map((card, cardIndex) => (
                <Box
                  key={cardIndex}
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
                    borderRadius="md"
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
              ))}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default DriverCard;
