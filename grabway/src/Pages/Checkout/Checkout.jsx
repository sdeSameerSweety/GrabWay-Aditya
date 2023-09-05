import React, { useContext, useState } from "react";
import { useToast } from '@chakra-ui/react'
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
import {SiRazorpay} from "react-icons/si";
const Checkout = () => {
  const toast = useToast();
  const [confirmOrigin, setConfirmOrigin]=useState(false);
  const [paymentSelected, setPaymentSelected]=useState(null);
  const driverName = "Kittu Singh";
  const driverState = "West Bengal";
  const driverCity = "Kolkata";
  const originText = "Silicon Insititute of Technology";
  const destinationText = "Bhubaneshwar Railway Station, MasterCanteen Area";
  const pickupTime='10:00';
  const dropTime="12:00";
function handlePay(){
  if(!paymentSelected){
    toast({
      title: "Please Select a Payment Method",
      status: 'error',
      duration: 2000,
      isClosable: true,
    })
  }
}

function selectPayment(option){
  setPaymentSelected(option);
    toast({
      title: "Perfect, Now Lets Pay with the Selected Option",
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
  
}

  return (
    <>
    <div className="dekstop-view p-5">
      <div className="flex flex-col justify-center items-center w-[100%] mt-[2%] mb-[2%] gap-5">
        <div className="font-semibold font-ubuntu text-1xl">
          Just a few more minutes,
        </div>
        <div className="font-bold font-ubuntu text-5xl text-[#E51B23]">
          LET'S CHECKOUT
        </div>
      </div>

      <div className="main-div-two-cards flex justify-center items-center gap-10 mt-6">
        <div className="driver-card flex justify-center items-center ">
          <Card maxW="md" variant={"filled"} className="card">
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

        <div className="flex">
          {!confirmOrigin && <>
            <div className="first-box flex flex-col justify-between items-center gap-10">
            <div className="flex-row justify-between items-center">
              <Card
                variant={"elevated"}
                sx={{
                  width: "auto",
                  border: "2px solid black",
                }}
              >
                <CardHeader>
                  <Heading size="md">
                    <div className="flex flex-col gap-10">
                      <div>
                        <div className="text-sm font-ubuntu text-[#0000006c]">
                          FROM:
                        </div>
                        <div className="text-[black]">{originText}</div>
                      </div>
                      <div>
                        <div className="text-sm font-ubuntu text-[#0000006c]">
                          TO:
                        </div>
                        <div className="text-[black]">{destinationText}</div>
                      </div>
                      <div>
                        <div className="text-sm font-ubuntu text-[#00000027]">
                          TIMING:
                        </div>
                        <div className="text-[black]">11;00-12;00</div>
                      </div>
                    </div>
                  </Heading>
                </CardHeader>
                <CardBody>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      Total Seats -{" "}
                      <span className="text-lg text-[#E51B23]">10</span>
                    </div>
                    <div className="text-sm">
                      Available -{" "}
                      <span className="text-lg text-[#3bb34d]">3</span>
                    </div>
                  </div>
                </CardBody>
                <CardFooter sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                  <Button onClick={setConfirmOrigin} 
                  sx={{bgColor:'#E51B23', color:'white', _hover:`bgColor:'#E51B23'`}}>Matches Perfectely</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          </>}

          {confirmOrigin && <>
            <div className="second-box flex flex-col justify-between items-center gap-10">
            <div className="flex-row justify-between items-center">
              <Card
                variant={"elevated"}
                sx={{
                  width: "auto",
                  border: "2px solid black",
                }}
              >
                <CardHeader>
                  <Heading size="md" sx={{color:"#E51B23"}}>
                    <div className="flex flex-col gap-3">
                      <div>
                        <div className="text-md font-ubuntu">
                          SELECT A PAYMENT METHOD:
                        </div>
                        </div>
                    </div>
                  </Heading>
                </CardHeader>
                <CardBody>
                  <div className="flex justify-start items-end flex-col gap-10">
                    <div className="flex flex-row justify-start gap-10 each-payment-option">
                      <div className="flex justify-center items-center">
                      <img src="/assets/images/razropaylogo.png" className="razorpaylogo" alt="RazorPay"/>
                      </div>
                      <div className="preffered flex justify-center items-center">
                      {paymentSelected===1 ? <><Button variant={'solid'} sx={{fontSize:'19px', fontWeight:"bold", width:'300px',color:"white", bgColor:'#E51B23', _hover:`bgColor:"#E51B23"`}}>Pay with Razor-Pay Gateway</Button></>:<><Button onClick={()=>{
                        selectPayment(1);
                      }} variant={'solid'} sx={{fontSize:'19px', fontWeight:"bold", width:'300px'}}>Pay with Razor-Pay Gateway</Button></>}
                      <div className="flex justify-center items-center text-[#E51B23] font-semibold">
                        (Preffered)
                      </div>
                      </div>
                    </div>

                    <div className="flex flex-row justify-start gap-10 each-payment-option">
                    <div className="flex justify-center items-center ">
                    <img src="/assets/images/visalogo.png" className="visalogo" alt="Debit Card"/>
                      </div>
                      {paymentSelected===2 ? <><Button variant={'solid'} sx={{fontSize:'19px', fontWeight:"bold", width:'300px',color:"white", bgColor:'#E51B23', _hover:`bgColor:"#E51B23"`}}>Pay with Credit?Debit Card</Button></>:<><Button onClick={()=>{
                        selectPayment(2);
                      }} variant={'solid'} sx={{fontSize:'19px', fontWeight:"bold", width:'300px'}}>Pay with Cash</Button></>}
                    </div>

                    <div className="flex flex-row justify-start gap-10 each-payment-option">
                    <div className="flex justify-center items-center ">
                    <img src="/assets/images/upilogo.png" className="upilogo" alt="Debit Card"/>
                      </div>
                      {paymentSelected===3 ? <><Button variant={'solid'} sx={{fontSize:'19px', fontWeight:"bold", width:'300px',color:"white", bgColor:'#E51B23', _hover:`bgColor:"#E51B23"`}}>Pay with UPI</Button></>:<><Button onClick={()=>{
                        selectPayment(3);
                      }} variant={'solid'} sx={{fontSize:'19px', fontWeight:"bold", width:'300px'}}>Pay with UPI</Button></>}
                    </div>

                    <div className="flex flex-row justify-start gap-10 each-payment-option">
                    <div className="flex justify-center items-center ">
                    <img src="/assets/images/cashlogo.png" className="cashlogo" alt="Debit Card"/>
                      </div>
                      {paymentSelected===4 ? <><Button variant={'solid'} sx={{fontSize:'19px', fontWeight:"bold", width:'300px',color:"white", bgColor:'#E51B23', _hover:`bgColor:"#E51B23"`}}>Pay with Cash</Button></>:<><Button onClick={()=>{
                        selectPayment(4);
                      }} variant={'solid'} sx={{fontSize:'19px', fontWeight:"bold", width:'300px'}}>Pay with Cash</Button></>}
                    </div>

                  </div>
                </CardBody>
                <CardFooter sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                  <Button onClick={handlePay} 
                  sx={{bgColor:'#E51B23', color:'white', _hover:`bgColor:'#E51B23'`}}>Let's Pay</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          </>}
        </div>
      </div>
    </div>
    <div className="mobile-view p-5">
      <div className="flex flex-col justify-center items-center w-[100%] mt-[2%] mb-[2%] gap-5">
        <div className="font-semibold font-ubuntu text-1xl">
          Just a few more minutes,
        </div>
        <div className="font-bold font-ubuntu text-3xl text-[#E51B23]">
          LET'S CHECKOUT
        </div>
      </div>

      <div className="main-div-two-cards flex justify-center items-center gap-10 mt-6">
        <div className="driver-card flex justify-center items-center ">
          <Card maxW="md" variant={"filled"} className="card">
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

        <div className="flex">
          {!confirmOrigin && <>
            <div className="first-box flex flex-col justify-between items-center gap-10">
            <div className="flex-row justify-between items-center">
              <Card
                variant={"elevated"}
                sx={{
                  width: "90vw",
                  border: "2px solid black",
                }}
              >
                <CardHeader>
                  <Heading size="md">
                    <div className="flex flex-col gap-10">
                      <div>
                        <div className="text-sm font-ubuntu text-[#0000006c]">
                          PICKUP AT
                        </div>
                        <div className="text-[black]">{pickupTime}</div>
                      </div>
                      <div>
                        <div className="text-sm font-ubuntu text-[#0000006c]">
                          TO:
                        </div>
                        <div className="text-[black]">{dropTime}</div>
                      </div>
                    </div>
                  </Heading>
                </CardHeader>
                
                <CardFooter sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                  <Button onClick={setConfirmOrigin} 
                  sx={{bgColor:'#E51B23', color:'white', _hover:`bgColor:'#E51B23'`}}>Matches Perfectely</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          </>}

          {confirmOrigin && <>
            <div className="second-box flex flex-col justify-between items-center gap-10">
            <div className="flex-row justify-between items-center">
              <Card
                variant={"elevated"}
                sx={{
                  width: "90vw",
                  border: "2px solid black",
                }}
              >
                <CardHeader>
                  <Heading size="md" sx={{color:"#E51B23"}}>
                    <div className="flex flex-col gap-3">
                      <div>
                        <div className="text-md font-ubuntu">
                          SELECT A PAYMENT METHOD:
                        </div>
                        </div>
                    </div>
                  </Heading>
                </CardHeader>
                <CardBody>
                  <div className="flex justify-start items-end flex-col gap-10">
                    <div className="flex flex-row justify-start gap-10 each-payment-option">
                      <div className="flex justify-center items-center">
                      <img src="/assets/images/razropaylogo.png" className="razorpaylogo" alt="RazorPay"/>
                      </div>
                      <div className="preffered flex justify-center items-center">
                      {paymentSelected===1 ? <><Button variant={'solid'} sx={{fontSize:'19px', fontWeight:"bold", width:'300px',color:"white", bgColor:'#E51B23', _hover:`bgColor:"#E51B23"`}}>Pay with Razor-Pay Gateway</Button></>:<><Button onClick={()=>{
                        selectPayment(1);
                      }} variant={'solid'} sx={{fontSize:'19px', fontWeight:"bold", width:'300px'}}>Pay with Razor-Pay Gateway</Button></>}
                      <div className="flex justify-center items-center text-[#E51B23] font-semibold">
                        (Preffered)
                      </div>
                      </div>
                    </div>

                    <div className="flex flex-row justify-start gap-10 each-payment-option">
                    <div className="flex justify-center items-center ">
                    <img src="/assets/images/visalogo.png" className="visalogo" alt="Debit Card"/>
                      </div>
                      {paymentSelected===2 ? <><Button variant={'solid'} sx={{fontSize:'19px', fontWeight:"bold", width:'300px',color:"white", bgColor:'#E51B23', _hover:`bgColor:"#E51B23"`}}>Pay with Credit?Debit Card</Button></>:<><Button onClick={()=>{
                        selectPayment(2);
                      }} variant={'solid'} sx={{fontSize:'19px', fontWeight:"bold", width:'300px'}}>Pay with Cash</Button></>}
                    </div>

                    <div className="flex flex-row justify-start gap-10 each-payment-option">
                    <div className="flex justify-center items-center ">
                    <img src="/assets/images/upilogo.png" className="upilogo" alt="Debit Card"/>
                      </div>
                      {paymentSelected===3 ? <><Button variant={'solid'} sx={{fontSize:'19px', fontWeight:"bold", width:'300px',color:"white", bgColor:'#E51B23', _hover:`bgColor:"#E51B23"`}}>Pay with UPI</Button></>:<><Button onClick={()=>{
                        selectPayment(3);
                      }} variant={'solid'} sx={{fontSize:'19px', fontWeight:"bold", width:'300px'}}>Pay with UPI</Button></>}
                    </div>

                    <div className="flex flex-row justify-start gap-10 each-payment-option">
                    <div className="flex justify-center items-center ">
                    <img src="/assets/images/cashlogo.png" className="cashlogo" alt="Debit Card"/>
                      </div>
                      {paymentSelected===4 ? <><Button variant={'solid'} sx={{fontSize:'19px', fontWeight:"bold", width:'300px',color:"white", bgColor:'#E51B23', _hover:`bgColor:"#E51B23"`}}>Pay with Cash</Button></>:<><Button onClick={()=>{
                        selectPayment(4);
                      }} variant={'solid'} sx={{fontSize:'19px', fontWeight:"bold", width:'300px'}}>Pay with Cash</Button></>}
                    </div>

                  </div>
                </CardBody>
                <CardFooter sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                  <Button onClick={handlePay} 
                  sx={{bgColor:'#E51B23', color:'white', _hover:`bgColor:'#E51B23'`}}>Let's Pay</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          </>}
        </div>
      </div>
    </div>
    </>
    
  );
};

export default Checkout;
