import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Avatar,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  Image,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { BiShareAlt, BiChat } from "react-icons/bi";
import "./Checkout.css";
const Checkout = () => {
  const driverName = "Kittu Singh";
  const driverState = "West Bengal";
  const driverCity = "Kolkata";
  const originText = "Silicon Insititute of Technology";
  const destinationText = "Bhubaneshwar Railway Station, MasterCanteen Area";
  return (
    <div className="p-5">
      <div className="flex flex-col justify-center items-center w-[100%] mt-[2%] mb-[2%] gap-5" >
        <div className="font-semibold font-ubuntu text-1xl">Just a few more minutes,</div>
        <div className="font-bold font-ubuntu text-5xl text-[#E51B23]">LET'S CHECKOUT</div>
      </div>

      <div className="flex justify-between items-center ">
        <div className="flex justify-center items-center ">
          <Card maxW="md" variant={'filled'} className="card">
            <CardHeader>
              <Flex spacing="4">
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <Avatar
                    name="Segun Adebayo"
                    src="https://bit.ly/sage-adebayo"
                  />

                  <Box>
                    <Heading size="sm">{driverName}</Heading>
                    <Text>
                      {driverCity}, {driverState}
                    </Text>
                  </Box>
                </Flex>
                <IconButton
                  variant="ghost"
                  colorScheme="gray"
                  aria-label="See menu"
                  icon={<BsThreeDotsVertical />}
                />
              </Flex>
            </CardHeader>
            <CardBody>
              <Text
                sx={{
                  color: "black",
                }}
              >
                <Text className="flex flex-col justify-center items-center gap-1 ">
                  <Text className="flex text-left w-[100%] font-ubuntu font-semibold">
                    FROM:
                  </Text>
                  <Text
                    sx={{ color: "black" }}
                    className="flex w-[100%] text-left font-semibold"
                  >
                    {originText}
                  </Text>
                </Text>

                <Text className="flex flex-col justify-center items-center gap-1">
                  <Text className="flex text-left w-[100%] font-ubuntu font-semibold">
                    To:
                  </Text>
                  <Text
                    sx={{ color: "black" }}
                    className="flex w-[100%] text-left font-semibold"
                  >
                    {destinationText}
                  </Text>
                </Text>
              </Text>
            </CardBody>
            <Image
              objectFit="cover"
              src="/assets/images/marutiSuzukiSwiftDzire.png"
              alt="Chakra UI"
            />

            <CardFooter
              justify="space-between"
              flexWrap="wrap"
              sx={{
                "& > button": {
                  minW: "136px",
                },
              }}
            >
              <Button flex="1" variant="ghost" leftIcon={<AiOutlineHeart />}>
                WishList
              </Button>
              <Button flex="1" variant="ghost" leftIcon={<BiChat />}>
                Report
              </Button>
              <Button flex="1" variant="ghost" leftIcon={<BiShareAlt />}>
                Share
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
            Confirm Pickup
        </div>
      </div>
    </div>
  );
};

export default Checkout;
