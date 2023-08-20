import React, { useState } from "react";
import { IoNotificationsSharp } from "react-icons/io5";
import { Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IconButton } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { BsTelephone } from "react-icons/bs";
import { AiFillCar, AiOutlineUser } from "react-icons/ai";
import { useToast } from "@chakra-ui/react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "./TopBar.css";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  InputGroup,
  InputLeftElement,
  Input,
  RadioGroup,
  Radio,
  Stack,Text
} from "@chakra-ui/react";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../firebase";
import {FcGoogle} from "react-icons/fc";

const TopBar = ({ counter, setCounter }) => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userLogged, setUserLogged] = useState(false);
  const [showSignIn, setShowSignIn] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupUserType, setSignupUserType] = useState("");
  const toast = useToast();
  function showModal() {
    if (showSignIn === true) {
      setShowSignIn(false);
    } else {
      setShowSignIn(true);
    }
  }
  function isEmail(eemail) {
    for (var i = 0; i < eemail.length; i++)
      if (eemail.charAt(i) === "@") return true;
    return false;
  }

  function isTextField(nname) {
    if (nname !== "") {
      return true;
    }
    return false;
  }

  function isMobile(mobile) {
    if (mobile !== "") {
      if (mobile.length === 10) {
        return true;
      }
    }
  }
  function handleSignIn() {
    if (isEmail(loginEmail) && isTextField(loginPassword)) {
      signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        .then(async(userCredential) => {
          const user = userCredential.user;
          
          onClose();
          toast({
            title: "Login Successful",
            description: "Welcome",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setCounter(true);
          setUserLogged(true);
        })
        .catch((error) => {
          if (error.message === "Firebase: Error (auth/wrong-password).") {
            toast({
              title: "Wrong Password",
              status: "error",
              isClosable: true,
              position: "top-right",
            });
          }
          if (error.message === "Firebase: Error (auth/user-not-found).") {
            toast({
              title: "User Doesn't Exist",
              status: "error",
              isClosable: true,
              position: "top-right",
            });
          }
        });
    }
    if (!isEmail(loginEmail)) {
      toast({
        title: `Invalid Email`,
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    }
    if (!isTextField(loginPassword)) {
      toast({
        title: `Password cannot be empty`,
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    }
  }
  function handleSignup() {
    if (
      isEmail(signupEmail) &&
      isTextField(signupPassword) &&
      isMobile(signupPhone) &&
      isTextField(signupUserType)
    ) {
      //proceed with signup
      createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          onClose();
          toast({
            title: "Account created.",
            description: "We've created your account for you.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setCounter(true);
          setUserLogged(true);
        })
        .catch((error) => {
          if (
            error.message === "Firebase: Error (auth/email-already-in-use)."
          ) {
            toast({
              title: `User Already Exists`,
              status: "error",
              isClosable: true,
              position: "top-right",
            });
          }
        });
    }
    if (!isEmail(signupEmail)) {
      toast({
        title: `Invalid Email`,
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    }
    if (!isTextField(signupPassword)) {
      toast({
        title: `Password can't be empty`,
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    }
    if (!isMobile(signupPhone)) {
      toast({
        title: `Phone number must be 10 digit`,
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    }
    if (!isTextField(signupUserType)) {
      toast({
        title: `Please specify User type`,
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    }
  }

  function handleGoogleSignIn(){
    signInWithPopup(auth, provider)
    .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    onClose();
          toast({
            title: "Account Verifed",
            description: "Welcome Back !",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setCounter(true);
          setUserLogged(true);
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    toast({
      title: "We are having some Trouble now",
      description: "Try Other Login Methods",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    // ...
  });
  }
  return (
    <>
      <div className="flex flex-row justify-between items-center m-1 mt-2 border-b-2 border-[#77717150] p-2 pl-10 pr-10 rounded-full">
        <Link href="/">
          <div className="flex flex-row justify-center items-center">
            <div className="logo-text flex flex-row justify-center items-center text-2xl font-ubuntu">
              GrabWay
            </div>
            <div className="flex justify-center items-center">
              <img src="/assets/images/logo.png" />
            </div>
          </div>
        </Link>
        <div className="flex flex-row justify-center items-center gap-7">
          <div>
            <IconButton
              sx={{ bgColor: "white" }}
              icon={
                <IoNotificationsSharp
                  bbox="black"
                  fill="#E51B23"
                  className="h-8 w-8"
                />
              }
            />
          </div>
          <div>
            {!userLogged && (
              <>
                <Button
                  onClick={onOpen}
                  colorScheme="red"
                  sx={{
                    bgColor: "#E51B23",
                    _hover: `bgColor:"#E51B23"`,
                    color: "white",
                  }}
                >
                  Sign In
                </Button>

                {showSignIn && (
                  <>
                    <Modal
                      blockScrollOnMount={false}
                      isOpen={isOpen}
                      onClose={onClose}
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <div className="flex flex-col gap-2 justify-center items-center">
                            <div className="flex flex-col justify-center items-center font-ubuntu text-[#E51B23] text-3xl mt-[10%] mb-[5%]">
                              <div>
                                <img src="/assets/images/logo.png" />
                              </div>
                              <div>Sign In</div>
                            </div>
                            <div className="text-[#020202a9]">
                              Welcome Back !
                            </div>
                          </div>
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          <div className="flex flex-col justify-center items-center gap-8">
                            <div>
                              <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                  <div className="flex justify-center items-center mt-2">
                                    <HiOutlineMail />
                                  </div>
                                </InputLeftElement>
                                <Input
                                  onChange={(e) =>
                                    setLoginEmail(e.target.value)
                                  }
                                  size={"lg"}
                                  sx={{ width: "320px" }}
                                  variant={"filled"}
                                  type="email"
                                  placeholder="Enter Your Email"
                                />
                              </InputGroup>
                            </div>
                            <div >
                              <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                  <div className="flex justify-center items-center mt-2">
                                    <RiLockPasswordLine fill="grey" />
                                  </div>
                                </InputLeftElement>
                                <Input
                                  onChange={(e) =>
                                    setLoginPassword(e.target.value)
                                  }
                                  size={"lg"}
                                  sx={{ width: "320px" }}
                                  variant={"filled"}
                                  type="password"
                                  placeholder="Enter Your Password"
                                />
                              </InputGroup>
                            </div>
                            <div className="mb-[5%]">
                              <Button
                                leftIcon={<FcGoogle/>}
                                colorScheme="gray"
                                onClick={handleGoogleSignIn}
                              >
                                <Text>Sign In with Google</Text>
                              </Button>
                            </div>
                          </div>
                          <div className="flex justify-center items-center">
                            Not yet registered?&nbsp;&nbsp;{" "}
                            <button
                              onClick={showModal}
                              className="text-[#E51B23]"
                            >
                              Register Here
                            </button>
                          </div>
                        </ModalBody>

                        <ModalFooter>
                          <Button color={"red"} mr={3} onClick={onClose}>
                            Close
                          </Button>
                          <Button
                            onClick={handleSignIn}
                            bgColor={"red"}
                            textColor={"white"}
                            sx={{ _hover: `bgColor:"red"` }}
                          >
                            Sign In
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </>
                )}
                {!showSignIn && (
                  <>
                    <Modal
                      blockScrollOnMount={false}
                      isOpen={isOpen}
                      onClose={onClose}
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <div className="flex flex-col gap-2 justify-center items-center">
                            <div className="flex flex-col justify-center items-center font-ubuntu text-[#E51B23] text-3xl mt-[10%] mb-[5%]">
                              <div>
                                <img src="/assets/images/logo.png" />
                              </div>
                              <div>Sign Up</div>
                            </div>
                            <div className="text-[#020202a9]">Welcome</div>
                          </div>
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          <div className="flex flex-col justify-center items-center gap-8">
                            <div>
                              <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                  <div className="flex justify-center items-center mt-2">
                                    <HiOutlineMail />
                                  </div>
                                </InputLeftElement>
                                <Input
                                  onChange={(e) =>
                                    setSignupEmail(e.target.value)
                                  }
                                  size={"lg"}
                                  sx={{ width: "320px" }}
                                  variant={"filled"}
                                  type="email"
                                  placeholder="Enter Your Email"
                                />
                              </InputGroup>
                            </div>
                            <div>
                              <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                  <div className="flex justify-center items-center mt-2">
                                    <RiLockPasswordLine fill="grey" />
                                  </div>
                                </InputLeftElement>
                                <Input
                                  onChange={(e) =>
                                    setSignupPassword(e.target.value)
                                  }
                                  size={"lg"}
                                  sx={{ width: "320px" }}
                                  variant={"filled"}
                                  type="password"
                                  placeholder="Enter Your Password"
                                />
                              </InputGroup>
                            </div>
                            <div>
                              <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                  <div className="flex justify-center items-center mt-2">
                                    <BsTelephone fill="grey" />
                                  </div>
                                </InputLeftElement>
                                <Input
                                  onChange={(e) =>
                                    setSignupPhone(e.target.value)
                                  }
                                  size={"lg"}
                                  sx={{ width: "320px" }}
                                  variant={"filled"}
                                  type="number"
                                  placeholder="Enter Your Phone"
                                />
                              </InputGroup>
                            </div>
                            <div className="mb-[5%]">
                              <InputGroup>
                                <div className="flex flex-row justify-center items-center">
                                  <div className="flex justify-center items-center">
                                    You are&nbsp;&nbsp;
                                  </div>
                                  <div className="flex justify-center items-center">
                                    <RadioGroup aria-required>
                                      <Stack spacing={10} direction="row">
                                        <Radio
                                          onChange={(e) =>
                                            setSignupUserType(e.target.value)
                                          }
                                          colorScheme="red"
                                          value="driver"
                                        >
                                          <div className="flex gap-2 justify-center items-center">
                                            <AiFillCar />
                                            &nbsp;Driver
                                          </div>
                                        </Radio>
                                        <Radio
                                          onChange={(e) =>
                                            setSignupUserType(e.target.value)
                                          }
                                          colorScheme="green"
                                          value="user"
                                        >
                                          <div className="flex gap-2 justify-center items-center">
                                            <AiOutlineUser />
                                            &nbsp;User
                                          </div>
                                        </Radio>
                                      </Stack>
                                    </RadioGroup>
                                  </div>
                                </div>
                              </InputGroup>
                            </div>
                          </div>
                          <div className="flex justify-center items-center">
                            Already our User?&nbsp;&nbsp;{" "}
                            <button
                              onClick={showModal}
                              className="text-[#E51B23]"
                            >
                              Login Here
                            </button>
                          </div>
                        </ModalBody>

                        <ModalFooter>
                          <Button color={"red"} mr={3} onClick={onClose}>
                            Close
                          </Button>
                          <Button
                            onClick={handleSignup}
                            bgColor={"red"}
                            textColor={"white"}
                            sx={{ _hover: `bgColor:"red"` }}
                          >
                            Sign Up
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </>
                )}
              </>
            )}

            {userLogged && (
              <>
                <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBar;
