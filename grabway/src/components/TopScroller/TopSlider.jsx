import React, { useState, useEffect } from "react";
import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import "./TopScroller.css"; // Import your CSS file

export default function TopScroller() {
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    {
      image:
        "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      text: "Slide 1: Kaisa hai Aditya?",
    },
    {
      image:
        "https://images.pexels.com/photos/808465/pexels-photo-808465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      text: "Slide 2: Kya hal chal Kittu",
    },
    {
      image:
        "https://images.pexels.com/photos/808465/pexels-photo-808465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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
    }, 3000); //timer

    return () => {
      clearInterval(interval);
    };
  }, [slideIndex]);

  return (
    <Flex className="slider">
      <VStack
        w={"full"}
        justify={"center"}
        px={useBreakpointValue({ base: 4, md: 8 })}
        rounded="1.5rem"
        bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
      >
        <Stack maxW={"2xl"} align={"flex-start"} spacing={6}>
          <Text
            color={"white"}
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
          >
            {slides[slideIndex].text}
          </Text>
          <Stack direction={"row"}>
            <Button
              onClick={nextSlide}
              bg={"blue.400"}
              rounded={"full"}
              color={"white"}
              _hover={{ bg: "blue.500" }}
            >
              Show me more
            </Button>
            <Button
              onClick={prevSlide}
              bg={"whiteAlpha.300"}
              rounded={"full"}
              color={"white"}
              _hover={{ bg: "whiteAlpha.500" }}
            >
              Show me more
            </Button>
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  );
}
