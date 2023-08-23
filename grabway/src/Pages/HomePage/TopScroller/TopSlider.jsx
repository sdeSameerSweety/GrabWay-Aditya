import React, { useState, useEffect } from "react";
import {
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
  Image,
} from "@chakra-ui/react";
import "./TopSlider.css";

export default function TopSlider() {
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    {
      image:
        "https://static.vecteezy.com/system/resources/previews/007/523/317/non_2x/travaling-of-sport-roster-car-driving-on-tha-asphalt-road-path-sized-a-ocean-beach-with-sandy-beaches-and-a-background-of-island-under-a-blue-sky-illustrator-and-for-summer-posters-vector.jpg",
      text: "1. Drive, Earn, and Share the Ride with Grabway Carpooling!",
    },
    {
      image:
        "https://img.freepik.com/premium-vector/big-semi-truck-trailer-driving-coutryside-road-nature-landscape-horizontal-banner_48369-13353.jpg?w=2000",
      text: "2. Cut Costs, Connect, and Contribute: Grabway Carpooling!",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAp-a2nDcV-73s-VEmgO85PvjZQGkwE6PSPA&usqp=CAU",
      text: "3. Carpooling Redefined: Grabway - Your Daily Solution!",
    },
  ];

  const nextSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setSlideIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 1000); //timer

    return () => {
      clearInterval(interval);
    };
  }, [slideIndex]);

  return (
    <Flex className="slider">
      <VStack
        w={"full"}
        justify={"center"}
        // px={useBreakpointValue({ base: 2, md: 1 })}
        // py={useBreakpointValue({ base: 2, md: 1 })}
        rounded="1.5rem"
        bg={"transparent"}
        position="relative"
      >
        <Image
          src={slides[slideIndex].image}
          alt={`Slide ${slideIndex + 1}`}
          borderRadius="0"
          boxShadow="sm"
          maxWidth="100%"
          maxH={"100%"}
          w="100%"
          h="auto"
          objectFit={"fill"}
        />
        <div className="dark-overlay"></div>
        <Text
          position="absolute"
          bottom="4rem"
          left="3rem"
          color={"white"}
          fontWeight={700}
          lineHeight={1.5}
          fontSize={useBreakpointValue({ base: "2xl", md: "3xl" })}
          zIndex={1}
        >
          {slides[slideIndex].text}
        </Text>
        {/* <Button
          onClick={prevSlide}
          bg={"whiteAlpha.300"}
          rounded={"full"}
          color={"white"}
          _hover={{ bg: "whiteAlpha.500" }}
          position="absolute"
          bottom="1rem"
          right="1rem"
        >
          Previous
        </Button>
        <Button
          onClick={nextSlide}
          bg={"blue.400"}
          rounded={"full"}
          color={"white"}
          _hover={{ bg: "blue.500" }}
          position="absolute"
          bottom="1rem"
          right="6rem"
        >
          Next
        </Button> */}
        <Button
          onClick={null} // Driver click to signup
          bg={"red.500"}
          rounded={"full"}
          color={"white"}
          _hover={{ bg: "green.500" }}
          position="absolute"
          bottom="1rem"
          left="13%"
          transform="translateX(-50%)"
          shadow={2}
        >
          Join Now
        </Button>
      </VStack>
    </Flex>
  );
}