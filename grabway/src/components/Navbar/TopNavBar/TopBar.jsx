import React, { useContext, useEffect, useState } from "react";
import { IoNotificationsSharp } from "react-icons/io5";
import { Avatar, useConst } from "@chakra-ui/react";
import { Link, Navigate } from "react-router-dom";
import { IconButton } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { BsTelephone } from "react-icons/bs";
import { AiFillCar, AiOutlineUser } from "react-icons/ai";
import { BsShieldLock } from "react-icons/bs";
import { useToast } from "@chakra-ui/react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
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
  Stack,
  Text,
  InputRightElement,
} from "@chakra-ui/react";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../firebase";
import { FcGoogle } from "react-icons/fc";
import Cookies from "js-cookie";
import { UserContext } from "../../../context/Context";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

const TopBar = ({ counter, setCounter, setLoginState, loginState }) => {
  /* For hiding password */
  const [showPassword, setShowPassword] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("");
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const { userEmail, setUserEmail, setRunContext } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showSignIn, setShowSignIn] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupUserType, setSignupUserType] = useState("");
  const [otp, setOtp] = useState(null);
  const [signupOtp, setSignupOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const toast = useToast();
  const [weatherData, setWeatherData] = useState(null);
  let dt = useContext(UserContext);
  useEffect(() => {
    if (dt.profilePhoto !== undefined || dt.profilePhoto !== null)
      setProfilePhoto(dt.profilePhoto);
  });
  async function getWeather(city) {
    const res = await fetch(
      `https://api.weatherapi.com/v1/current.json?q=${city}&key=%20beab78d23f424b26923110343233008`
    );

    const myJson = await res.json();
    //console.log(myJson);
    setWeatherData(myJson);
  }

  const [city, setCity] = useState("");

  useEffect(() => {
    const UserData = localStorage.getItem("grabwayUser");
    if (UserData) {
      if (JSON.parse(UserData).name !== "") {
        setCity(JSON.parse(UserData).address[0].city);
      }
    }
  });
  // //console.log(city);
  // if (city !== null) {
  //   getWeather(city);
  // }
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
  useEffect(() => {
    if (userEmail) {
      setCounter(true);
      setLoginState(true);
    }
  }, [userEmail]);

  function handleSignIn() {
    if (isEmail(loginEmail) && isTextField(loginPassword)) {
      signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        .then(async (userCredential) => {
          const user = userCredential.user;
          // //console.log(user.uid);
          onClose();
          toast({
            title: "Login Successful",
            description: "Welcome",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          Cookies.set("grabwayToken", loginEmail, { expires: 7 });
          setRunContext("login");
          window.location.reload(false);
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

  async function handleSignUpInitial() {
    var otpResponse = await axios
      .post("/verifyEmail", { signupEmail })
      .then((res) => {
        setOtp(res.data);
      });
  }

  async function VerifyOtp() {
    //console.log(JSON.stringify(otp));
    //console.log(parseInt(signupOtp));
    let generatedOtp = JSON.stringify(otp);
    generatedOtp = parseInt(generatedOtp);
    generatedOtp = generatedOtp - 2025;
    //console.log(generatedOtp)
    if (parseInt(signupOtp) === generatedOtp) {
      setShowOtpInput(true);
      //display the other fields
    } else {
      toast({
        title: `Invalid Otp`,
        message: "Note: OTP must be 4-digit",
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    }
  }

  async function handleSignup() {
    if (
      isEmail(signupEmail) &&
      isTextField(signupPassword) &&
      isMobile(signupPhone) &&
      isTextField(signupUserType)
    ) {
      //proceed with signup
      createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
        .then(async (userCredential) => {
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
          Cookies.set("grabwayToken", signupEmail, { expires: 7 });

          ////console.log(signupUserType);
          if (signupUserType === "user") {
            //console.log("inside user if");
            const res = await axios.post(`/createUser`, {
              signupEmail,
              signupPhone,
            });
            const userMongo = res.data.email;
            setUserEmail(userMongo);
            if (res) {
              setRunContext("signup");
              window.location.reload(false);
            }
          }
          if (signupUserType === "driver") {
            const res = await axios.post(`/createDriver`, {
              signupEmail,
              signupPhone,
            });
            const driverMongo = res.data.email;
            setUserEmail(driverMongo);
            if (res) {
              setRunContext("signup");
              window.location.reload(false);
            }
          }
        })
        .catch((error) => {
          //console.log(error.message);
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
          if (error.message === "Firebase: Error (auth/invalid-email).") {
            toast({
              title: `Invalid Email`,
              status: "error",
              isClosable: true,
              position: "top-right",
            });
          }
          if (
            error.message ===
            "Firebase: Password should be at least 6 characters (auth/weak-password)."
          ) {
            toast({
              title: `Password should be at least 6 characters`,
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
  function handleGoogleSignIn() {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        //console.log(user);
        //console.log(result);
        Cookies.set("grabwayToken", user.email, { expires: 7 });
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
        //console.log(user.email);
        try {
          const userFound = await axios.post("/googlecheckUser", {
            email: user.email,
          });
          if (userFound) {
            Cookies.set("grabwayToken", user.email, { expires: 7 });
            setRunContext("signInWithGoogle");
            setCounter(true);
            setLoginState(true);
            window.location.reload(false);
          }
        } catch (err) {
          //console.log("not found");
          Cookies.set("grabwayGoogleToken", user.email);

          setCounter(true);
          setLoginState(true);
          window.location.reload(false);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        toast({
          title: "We are having some Trouble now",
          description: "Try Other Login Methods",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        // ...
      });
  }
  return (
    <>
      <div className="flex flex-row justify-between items-center m-1 mt-2 border-b-2 border-[#77717150] topbar rounded-full">
        <Link to="/">
          <div className="flex flex-row justify-center items-center">
            <div className="logo-text flex flex-row justify-center items-center text-2xl font-ubuntu">
              GrabWay
            </div>
            <div className="flex justify-center items-center">
              <img src="/assets/images/logo.png" alt="logo" />
            </div>
          </div>
        </Link>
        <div className="flex flex-row justify-center items-center gap-7">
          {weatherData && (
            <>
              <div className="weather-info flex justify-center items-center gap-1">
                <img className="w-9" src={weatherData.current.condition.icon} />
                <div className="flex justify-center flex-col items-center font-ubuntu">
                  <div className="text-[11px]">
                    {weatherData.current.temp_c}°C
                  </div>
                  <div className="text-[11px]">{weatherData.location.name}</div>
                </div>
              </div>
            </>
          )}
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
            {!loginState && (
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
                            <div>
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
                                  type={showPassword ? "text" : "password"}
                                  placeholder="Enter Your Password"
                                />
                                <InputRightElement>
                                  <IconButton
                                    aria-label={
                                      showPassword
                                        ? "Hide password"
                                        : "Show password"
                                    }
                                    icon={
                                      showPassword ? (
                                        <RiEyeOffLine />
                                      ) : (
                                        <RiEyeLine />
                                      )
                                    }
                                    onClick={() =>
                                      setShowPassword(!showPassword)
                                    }
                                    variant="unstyled"
                                    size="md"
                                  />
                                </InputRightElement>
                              </InputGroup>
                            </div>
                            <div className="mb-[5%]">
                              <Button
                                leftIcon={<FcGoogle />}
                                colorScheme="gray"
                                onClick={handleGoogleSignIn}
                              >
                                <div>Sign In with Google</div>
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

                            {otp !== null && (
                              <div>
                                <InputGroup>
                                  <InputLeftElement pointerEvents="none">
                                    <div className="flex justify-center items-center mt-2">
                                      <BsShieldLock fill="grey" />
                                    </div>
                                  </InputLeftElement>
                                  <Input
                                    onChange={(e) =>
                                      setSignupOtp(e.target.value)
                                    }
                                    size={"lg"}
                                    sx={{ width: "320px" }}
                                    variant={"filled"}
                                    type="number"
                                    placeholder="4-digit OTP sent to your E-Mail"
                                  />
                                </InputGroup>
                              </div>
                            )}
                            {showOtpInput && (
                              <>
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
                                      type={showPassword ? "text" : "password"}
                                      placeholder="Enter Your Password"
                                    />
                                    <InputRightElement>
                                      <IconButton
                                        aria-label={
                                          showPassword
                                            ? "Hide password"
                                            : "Show password"
                                        }
                                        icon={
                                          showPassword ? (
                                            <RiEyeOffLine />
                                          ) : (
                                            <RiEyeLine />
                                          )
                                        }
                                        onClick={() =>
                                          setShowPassword(!showPassword)
                                        }
                                        variant="unstyled"
                                        size="md"
                                      />
                                    </InputRightElement>
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
                                                setSignupUserType(
                                                  e.target.value
                                                )
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
                                                setSignupUserType(
                                                  e.target.value
                                                )
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
                              </>
                            )}
                          </div>
                          <div className="flex justify-center items-center mt-[5%]">
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
                          {!otp && !showOtpInput && (
                            <>
                              <Button
                                onClick={handleSignUpInitial}
                                bgColor={"red"}
                                textColor={"white"}
                                sx={{ _hover: `bgColor:"red"` }}
                              >
                                Send Otp
                              </Button>
                            </>
                          )}
                          {otp && !showOtpInput && (
                            <>
                              <Button
                                onClick={VerifyOtp}
                                bgColor={"red"}
                                textColor={"white"}
                                sx={{ _hover: `bgColor:"red"` }}
                              >
                                Verify Otp
                              </Button>
                            </>
                          )}
                          {otp && showOtpInput && (
                            <>
                              <Button
                                onClick={handleSignup}
                                bgColor={"red"}
                                textColor={"white"}
                                sx={{ _hover: `bgColor:"red"` }}
                              >
                                Sign Up
                              </Button>
                            </>
                          )}
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </>
                )}
              </>
            )}

            {loginState && (
              <>
                <Link to="/profile">
                  <Avatar
                    name="Kent Dodds"
                    src={
                      profilePhoto
                        ? profilePhoto
                        : "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"
                    }
                  />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBar;
