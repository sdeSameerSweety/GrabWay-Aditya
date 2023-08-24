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
import SideCard from "./SideCard/SideCard";
import "./DriverCard.css";

const sections = ["Essential Commuter", "Comfort Traveler", "Premier Business"];

const cardData = {
  /* Essential Commuter Data */
  "Essential Commuter": [
    {
      title: "Engine Performance Boost",
      imageSrc: "https://via.placeholder.com/300x180?text=Engine",
      description:
        "Experience the thrill of driving with our engine performance enhancement services. Unlock your luxury car's true potential.",
      services: [
        "🔧 High-Performance Engine Tuning",
        "⚙️ Advanced Fuel Injection System",
        "🌪️ Turbocharger Upgrade",
      ],
    },
    {
      title: "Exquisite Detailing Package",
      imageSrc: "https://via.placeholder.com/300x180?text=Detailing",
      description:
        "Indulge your luxury vehicle with our meticulous detailing services. Every curve and finish will shine like new.",
      services: [
        "🚿 Premium Hand Wash and Wax",
        "🛁 Deep Interior Vacuuming",
        "💎 Paint Correction and Ceramic Coating",
      ],
    },
    {
      title: "Interior Opulence Renewal",
      imageSrc: "https://via.placeholder.com/300x180?text=Interior",
      description:
        "Elevate your driving experience with a rejuvenated interior. Our experts will transform your luxury car's cabin to perfection.",
      services: [
        "🛋️ Deep Leather Cleaning and Conditioning",
        "✨ Wood and Metal Trim Restoration",
        "🎵 High-End Audio System Upgrade",
      ],
    },
  ],

  /* Comfort Traveler Data */

  "Comfort Traveler": [
    {
      title: "TuneUp Auto Care",
      imageSrc: "https://via.placeholder.com/300x180?text=TuneUp",
      description:
        "Experience top-notch auto care services that prioritize your vehicle's performance and your satisfaction.",
      services: [
        "🛠️ Engine Diagnostics",
        "🚗 Full Service Inspection",
        "🧼 Exterior Detailing",
      ],
    },
    {
      title: "Luxury Wheels Workshop",
      imageSrc: "https://via.placeholder.com/300x180?text=Luxury+Wheels",
      description:
        "Elevate your driving experience with specialized services dedicated to luxury vehicles. Your comfort and style matter.",
      services: [
        "🔧 Performance Upgrades",
        "🚓 Advanced Electronics",
        "🏁 Precision Alignment",
      ],
    },
    {
      title: "Green Mile Electric Autos",
      imageSrc: "https://via.placeholder.com/300x180?text=Electric",
      description:
        "Pioneering the future of automotive services with a focus on electric vehicles. Join the eco-friendly revolution.",
      services: [
        "🔌 Battery Diagnostics",
        "🔋 Range Optimization",
        "🌿 Sustainable Materials",
      ],
    },
  ],

  /* Premier Business Data */
  "Premier Business": [
    {
      title: "Luxury Business Travel",
      imageSrc: "https://via.placeholder.com/300x180?text=Luxury",
      description:
        "Elevate your business trips with our luxury car services. Experience top-tier comfort and professionalism.",
      services: [
        "🎩 Executive-Class Vehicles",
        "👔 Professional Chauffeurs",
        "🥂 Complimentary Refreshments",
      ],
    },
    {
      title: "Explore the City in Style",
      imageSrc: "https://via.placeholder.com/300x180?text=City",
      description:
        "Discover the city in ultimate style and convenience. Our fleet ensures an unforgettable urban experience.",
      services: [
        "🏙️ City Tour Packages",
        "🛍️ Shopping Excursions",
        "🍽️ Gourmet Dining Reservations",
      ],
    },
    {
      title: "Relaxation on the Road",
      imageSrc: "https://via.placeholder.com/300x180?text=Relax",
      description:
        "Unwind during your travels with our relaxation-focused car services. Enjoy a peaceful journey like never before.",
      services: [
        "🎵 Ambient Relaxation",
        "📚 Reading Material Selection",
        "🌸 Aromatherapy Options",
      ],
    },
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
              _selected={{
                color: "blue.500",
                borderBottomWidth: "2px",
              }}
            >
              {section}
            </Tab>
          ))}
        </TabList>
        <TabPanels mt={4}>
          {sections.map((section, index) => (
            <TabPanel key={index}>
              {cardData[section].map((card, cardIndex) => (
                <Box key={cardIndex} className="responsive-card">
                  <Image
                    src={card.imageSrc}
                    alt={card.title}
                    objectFit="cover"
                    borderRadius="md"
                  />
                  <div className="card-content">
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
                        rounded={10}
                        _hover={{ color: "blue.700" }}
                        _focus={{ boxShadow: "none" }}
                      >
                        Book Now
                      </Button>
                    </VStack>
                  </div>
                  <Box mx={6} my={4} className="sideCardCss">
                    <SideCard />
                  </Box>
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
