// "use client";

import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  useColorModeValue,
  Image,
  Center,
  seClipboard,
  useToast,
  useClipboard
} from "@chakra-ui/react";
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
} from "react-icons/md";
import { BsGithub, BsDiscord, BsPerson } from "react-icons/bs";
import { BiCaretDownCircle } from "react-icons/bi";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
export default function ContactFaq() {

  const phone = "+91-9696969696";
  const email = "grabwayhelpdesk@gmail.com";
  const address = "Bhubneswar, India";

  const { onCopy } = useClipboard(phone);
  const toast = useToast();

  const handleCopyClick = (text) => {
    onCopy();
    toast({
      title: "Text Copied",
      description: `${text} has been copied to clipboard.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const userData=(Cookies.get('grabwayUser'));
  if(userData){
    if(!(JSON.parse(userData)).name){
      return <Navigate to={"/registration"}/>
    }
  }
  if(!userData){
      return <Navigate to={"/"}/>
  }
  return (
    <>
      <Container
        bg="whitesmoke"
        maxW="full"
        mt={0}
        centerContent
        overflow="hidden"
      >
        <Heading as="h2" size="2xl" p={4}>
          Welcome to Support Section of Grabway
        </Heading>
        <Flex>
          <Box
            bg="SteelBlue"
            color="white"
            borderRadius="lg"
            m={{ sm: 4, md: 16, lg: 10 }}
            p={{ sm: 5, md: 5, lg: 16 }}
          >
            <Box p={4}>
              <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                <WrapItem>
                  <Box>
                    <Heading>Wanna Reach Us?</Heading>
                    <Text
                      mt={{ sm: 3, md: 3, lg: 5 }}
                      color="white.500"
                      fontStyle="italic"
                    >
                      Fill up the form and get assured support
                    </Text>
                    <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                      <VStack pl={0} spacing={3} alignItems="flex-start">
                        <Button
                          size="md"
                          height="48px"
                          width="auto"
                          variant="ghost"
                          color="#DCE2FF"
                          _hover={{ border: "0px solid #1C6FEB" }}
                          leftIcon={<MdPhone color="Azure" size="20px" />}
                          onClick={() => handleCopyClick(phone)}
                        >
                          {phone}
                        </Button>
                        <Button
                          size="md"
                          height="48px"
                          width="auto"
                          variant="ghost"
                          color="#DCE2FF"
                          _hover={{ border: "0px solid #1C6FEB" }}
                          leftIcon={<MdEmail color="Azure" size="20px" />}
                          onClick={() => handleCopyClick(email)}
                        >
                          {email}
                        </Button>
                        <Button
                          size="md"
                          height="48px"
                          width="auto"
                          variant="ghost"
                          color="#DCE2FF"
                          _hover={{ border: "0px solid #1C6FEB" }}
                          leftIcon={<MdLocationOn color="Azure" size="20px" />}
                          onClick={() => handleCopyClick(address)}
                        >
                          {address}
                        </Button>
                      </VStack>
                    </Box>
                    <HStack
                      mt={{ lg: 10, md: 10 }}
                      spacing={5}
                      px={5}
                      alignItems="flex-start"
                    >
                      <IconButton
                        aria-label="facebook"
                        variant="ghost"
                        size="lg"
                        bg={"white"}
                        isRound={true}
                        _hover={{ bg: "#0D74FF" }}
                        icon={<MdFacebook size="28px" />}
                      />
                      <IconButton
                        aria-label="github"
                        variant="ghost"
                        size="lg"
                        bg={"white"}
                        isRound={true}
                        _hover={{ bg: "#0D74FF" }}
                        icon={<BsGithub size="28px" />}
                      />
                      <IconButton
                        aria-label="discord"
                        variant="ghost"
                        size="lg"
                        bg={"white"}
                        isRound={true}
                        _hover={{ bg: "#0D74FF" }}
                        icon={<BsDiscord size="28px" />}
                      />
                    </HStack>
                  </Box>
                </WrapItem>
                <WrapItem>
                  <Box bg="white" borderRadius="lg">
                    <Box m={8} color="#0B0E3F">
                      <VStack spacing={5}>
                        <FormControl id="name">
                          <FormLabel>Your Name</FormLabel>
                          <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement pointerEvents="none">
                              <BsPerson color="gray.800" />
                            </InputLeftElement>
                            <Input type="text" size="md" />
                          </InputGroup>
                        </FormControl>
                        <FormControl id="name">
                          <FormLabel>Mail</FormLabel>
                          <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement pointerEvents="none">
                              <MdOutlineEmail color="gray.800" />
                            </InputLeftElement>
                            <Input type="text" size="md" />
                          </InputGroup>
                        </FormControl>
                        <FormControl id="name">
                          <FormLabel>Message</FormLabel>
                          <Textarea
                            borderColor="gray.300"
                            _hover={{
                              borderRadius: "gray.300",
                            }}
                            placeholder="Your Solution is Just One Click Away..."
                          />
                        </FormControl>
                        <FormControl id="name" float="right">
                          <Button
                            variant="solid"
                            bg="#0D74FF"
                            color="white"
                            _hover={{}}
                          >
                            Send Message
                          </Button>
                        </FormControl>
                      </VStack>
                    </Box>
                  </Box>
                </WrapItem>
              </Wrap>
            </Box>
          </Box>
        </Flex>
      </Container>
      {/* <Container direction={{ base: "column", md: "row" }} p={5}> */}
      <Heading
        as="h3"
        size="lg"
        align={"center"}
        justify={"center"}
        bg={"whitesmoke"}
      >
        FAQs ? We are here for solution!
      </Heading>
      <Flex
        minH={"70vh"}
        align={"center"}
        justify={"center"}
        // bg={useColorModeValue("gray.50", "gray.800")}
        bg={"#F5F5F5"}
        direction={{ base: "column", md: "row" }}
      >
        <Container>
          <Accordion
            allowMultiple
            width="100%"
            maxW="lg"
            bg="white"
            rounded="lg"
          >
            <AccordionItem>
              <AccordionButton
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                p={4}
                _hover={{ bg: "gray.100" }}
              >
                <Text fontSize="md" color="gray.800">
                  What is Grabway's carpool service all about?
                </Text>
                <BiCaretDownCircle fontSize="24px" />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Text color="gray.600">
                  Grabway is a revolutionary car sharing company that connects
                  company individuals for efficient and convenient carpooling.
                  We provide a platform for employees to share rides, reduce
                  commuting costs, and contribute to a greener environment by
                  reducing the number of vehicles on the road.
                </Text>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                p={4}
                _hover={{ bg: "gray.100" }}
                color="gray.800"
              >
                <Text fontSize="md">
                  How does Grabway ensure the safety of its users?
                </Text>
                <BiCaretDownCircle fontSize="24px" />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Text color="gray.600">
                  Safety is our top priority. We implement rigorous background
                  checks on all users, verifying their identities and driving
                  records. Additionally, our rating and review system allows
                  users to provide feedback about their carpooling experiences,
                  ensuring a community of responsible and reliable members.
                </Text>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                p={4}
                _hover={{ bg: "gray.100" }}
                color="gray.800"
              >
                <Text fontSize="md">
                  How can I become a part of the Grabway community?
                </Text>
                <BiCaretDownCircle fontSize="24px" />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Text color="gray.600">
                  Joining Grabway is easy! Simply sign up on our website or app,
                  create your profile, and provide some basic information about
                  your commuting preferences. You can then browse available
                  carpooling options, connect with fellow coworkers, and start
                  sharing rides.
                </Text>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                p={4}
                _hover={{ bg: "gray.100" }}
                color="gray.800"
              >
                <Text fontSize="md">
                  What are the benefits of using Grabway's carpool service?
                </Text>
                <BiCaretDownCircle fontSize="24px" />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Text color="gray.600">
                  There are numerous benefits to using Grabway's carpool
                  service. You'll save money on commuting costs by sharing
                  expenses with fellow riders. You'll also help reduce traffic
                  congestion and lower your carbon footprint. Moreover,
                  carpooling provides a great opportunity to network with
                  colleagues and make your daily commute more enjoyable.
                </Text>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                p={4}
                _hover={{ bg: "gray.100" }}
                color="gray.800"
              >
                <Text fontSize="md">
                  How does Grabway handle scheduling and route planning?
                </Text>
                <BiCaretDownCircle fontSize="24px" />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Text color="gray.600">
                  Grabway's advanced technology ensures hassle-free scheduling
                  and route planning. Our intuitive app allows users to input
                  their commuting preferences and schedules. The app then
                  matches users with compatible carpool partners and generates
                  optimized routes, making the entire process seamless and
                  efficient.
                </Text>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Container>
        <Flex flex={1} p={3}>
          <Image
            alt={"Image"}
            objectFit={"cover"}
            w={800}
            h={400}
            p={5}
            src={
              "https://cdni.iconscout.com/illustration/premium/thumb/online-taxi-booking-4865328-4046973.png"
            }
          />
        </Flex>
      </Flex>
    </>
  );
}
