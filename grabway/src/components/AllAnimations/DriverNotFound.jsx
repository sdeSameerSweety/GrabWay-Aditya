import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Text,
  Button,
  Center,
  Image,
  Fade,
  Flex,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const DriverNotFound = () => {
  const navigate = useNavigate();
  return (
    <Fade in={true}>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        minH="100vh"
        // bgGradient="linear(to-b, red.200, red.400)"
      >
        <Box
          p={6}
          borderRadius="md"
          bg="white"
          boxShadow="lg"
          textAlign="center"
          maxW={{ base: "90%", sm: "80%", md: "500px" }}
          mx="auto"
        >
          <Center>
            <Image
              src="https://img.freepik.com/free-vector/hitchhiking-road-travel-thumbing-man-stopped-car_3446-304.jpg"
              alt="Driver Not Found"
              boxSize="200px"
              borderRadius="full"
            />
          </Center>
          <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" mt={4}>
            Driver Not Found
          </Text>
          <Text fontSize={{ base: "md", md: "lg" }} mt={2}>
            We apologize for the inconvenience.
          </Text>
          <Text fontSize={{ base: "md", md: "lg" }} mt={4}>
            It seems that we couldn't locate a driver for your request at the
            moment. Please try again later or choose another option.
          </Text>
          <VStack spacing={4} mt={6}>
            <Button
              as={Link}
              to="/"
              colorScheme="teal"
              size="md"
              width="100%"
              _hover={{ bg: "teal.300" }}
            >
              Return to Home
            </Button>
            <Button
              // as={Link}
              onClick={() => navigate(-1)}
              colorScheme="gray"
              size="md"
              width="100%"
              _hover={{ bg: "gray.300" }}
            >
              Book Another Time
            </Button>
          </VStack>
        </Box>
      </Flex>
    </Fade>
  );
};

export default DriverNotFound;
