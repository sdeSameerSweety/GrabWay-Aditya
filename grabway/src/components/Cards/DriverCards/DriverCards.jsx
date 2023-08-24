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
      imageSrc:
        "https://img.freepik.com/free-vector/red-sedan-car-isolated-white-vector_53876-64366.jpg?w=900&t=st=1692895124~exp=1692895724~hmac=9084cfe1f9e13be10c20ff75317e808efbecd741a345ac619f7814540a6abf66",
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
      imageSrc:
        "https://img.freepik.com/free-vector/black-sedan-car-isolated-white-vector_53876-67358.jpg?w=900&t=st=1692897448~exp=1692898048~hmac=7e90a67d3923bc1896de058d53392a6b6a27271511aead624547e907e97bd235",
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
      imageSrc:
        "https://img.freepik.com/free-vector/brown-hatchback-car-isolated-white-vector_53876-64374.jpg?w=900&t=st=1692897495~exp=1692898095~hmac=8f4351da7ded634d18aa452c1385c32536aca92822d3b360d5f3e8667d5729a6",
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
      imageSrc:
        "https://img.freepik.com/free-vector/green-sedan-car-isolated-white-vector_53876-64375.jpg?w=900&t=st=1692897544~exp=1692898144~hmac=f2626631b222c15b8055d7803230b3bfe84ad7611db6e9534afcad140499ecb2",
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
      imageSrc:
        "https://img.freepik.com/free-vector/black-sedan-car-isolated-white-vector_53876-67358.jpg?w=900&t=st=1692897623~exp=1692898223~hmac=f8cbf876f78b723db46aa126316762217d833bcdbf99a310505dd98400403210",
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
      imageSrc:
        "https://img.freepik.com/free-vector/green-sedan-car-green-background-vector_53876-67345.jpg?w=900&t=st=1692897571~exp=1692898171~hmac=faaa068b7a89f361ce36bc489f1b8c1464806500853944163d97de48cddb82d3",
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
      imageSrc:
        "https://img.freepik.com/free-vector/modern-blue-urban-adventure-suv-vehicle-illustration_1344-205.jpg?w=740&t=st=1692897613~exp=1692898213~hmac=11371b9a4f0383a73b7a5d5c12e309a02a2b1b7cc99fb9dfaeef80f43f0f2263",
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
      imageSrc:
        "https://img.freepik.com/free-vector/white-convertible-car-isolated-white-vector_53876-66815.jpg?w=1060&t=st=1692897673~exp=1692898273~hmac=e78d5294d3efbfee48e9ce9c07e75af5023bb8dbb2751bcead39222ab177b3bd",
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
      imageSrc:
        "https://img.freepik.com/free-vector/black-convertible-car_53876-64027.jpg?w=1060&t=st=1692897694~exp=1692898294~hmac=421abb699e15c0b2c9f18123957a4555409adc8fa52d62a4c2b0b21b1f628b6f",
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
                    w={400}
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
