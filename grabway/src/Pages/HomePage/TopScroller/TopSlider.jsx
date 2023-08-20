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
  const sidebarWidth = useBreakpointValue({ base: "100%", md: "100%",sm: "none" });

  const slides = [
    {
      image:
        "https://media.istockphoto.com/id/1205122850/vector/modern-grandmother-driving-sports-car-on-city-road.jpg?s=612x612&w=0&k=20&c=3L3UrKzl8wjTaRfwFZq5qKl-xOkzZMt_vwkK3wA22IA=",
      text: "Slide 1: Kaisa hai Aditya?",
    },
    {
      image:
        "https://media.istockphoto.com/id/1179640327/vector/group-of-people-sharing-car-online-car-sharing-service-vector-happy-friend-with-multi-ethnic.jpg?s=612x612&w=0&k=20&c=22qYP3RU42CY_dZ22YgeToTU527eEnJtvo-8YOZDNFQ=",
      text: "Slide 2: Kya hal chal Kittu",
    },
    {
      image:
        "https://media.istockphoto.com/id/1163993432/vector/car-sharing-illustration-young-people-are-ready-to-move-off.jpg?s=612x612&w=0&k=20&c=u4Mjn7Aa4OCQJv-fzSR6oCxz99SeZdyCiU5Ffbn7jP4=",
      text: "Slide 3: Rajiv Mast hai",
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
    }, 5000); //timer

    return () => {
      clearInterval(interval);
    };
  }, [slideIndex]);

  return (
    <VStack w={sidebarWidth}>
      <Flex className="slider">
        <VStack
          w={"full"}
          justify={"center"}
          px={useBreakpointValue({ base: 4, md: 8 })}
          rounded="1.5rem"
          bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
          position="relative"
        >
          <Image
            src={slides[slideIndex].image}
            alt={`Slide ${slideIndex + 1}`}
            borderRadius="1.5rem"
            boxShadow="xl"
            maxWidth="100%"
          />
          <Text
            position="absolute"
            bottom="2rem"
            left="2rem"
            color={"white"}
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
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
            bg={"green.400"}
            rounded={"full"}
            color={"white"}
            _hover={{ bg: "green.500" }}
            position="absolute"
            bottom="1rem"
            left="50%"
            transform="translateX(-50%)"
          >
            Action Button
          </Button>
        </VStack>
      </Flex>
    </VStack>
  );
}
