import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  MarkerF,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { Button, Mark, useControllableProp, useToast } from "@chakra-ui/react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Card, CardBody } from "@chakra-ui/react";
import axios from "axios";

function MyComponent({ nonceVal }, { route, state }) {
  const [amount, setAmount] = useState(null);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  const containerStyle = {
    width: `${windowSize <= 600 ? "500px" : "1000px"}`,
    height: "500px",
    border: "1px solid white",
    borderRadius: "30px",
  };
  const navigate = useNavigate();
  const usData = JSON.parse(localStorage.getItem("grabwayUser"));
  ////console.log(usData);
  const location = useLocation();
  if (!location.state) {
    <Navigate to={"/"} />;
  }
  const toast = useToast();
  const [showCards, setShowCards] = useState(false);
  ////console.log(location);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDJaFr-HFXGBOg8pUSdQfGjGwGdIwtbXhY",
    libraries: ["maps", "places"],
    mapIds: ["7e437361629e930a"],
    nonce: nonceVal,
  });

  //recieving text
  const rideDataText = {
    source: location.state.source,
    destination: location.state.destination,
  };
  ////console.log(rideDataText, location);

  const petrolPrice = 105;

  const handlemapDriverRoute = (type) => {
    if (type === "driver")
      navigate("/routeDriverRegistration", {
        state: { data: location, amount: amount },
      });
    else
      navigate("/routeUserRegistration", {
        state: { data: location, amount: amount },
      });
  };
  //Route setup and display function
  const [directionResponse, setDirectionResponse] = useState("");
  async function calculateRoute() {
    if (rideDataText.source === "" || rideDataText.source === "") {
      return;
    }
    /* eslint-disable */
    const directionService = new google.maps.DirectionsService();
    const results = await directionService.route({
      origin: rideDataText.source,
      destination: rideDataText.destination,
      /* eslint-disable */
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionResponse(results);
  }

  //calculating distance matrix
  const [distanceText, setDistanceText] = useState(null);
  const [durationText, setDurationText] = useState(null);
  const [distanceNum, setDistanceNum] = useState(null);
  const [durationNum, setDurationNum] = useState(null);

  async function distanceMatrix() {
    try {
      /* eslint-disable */
      const service = new google.maps.DistanceMatrixService();
      const request = {
        origins: [rideDataText.source],
        destinations: [rideDataText.destination],
        /* eslint-disable */
        travelMode: google.maps.TravelMode.DRIVING,
        /* eslint-disable */
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
      };
      const responseDistanceMatrix = await service
        .getDistanceMatrix(request)
        .then((res) => {
          setDistanceNum(res.rows[0].elements[0].distance.value);
          setDistanceText(res.rows[0].elements[0].distance.text);
          setDurationNum(res.rows[0].elements[0].duration.value);
          setDurationText(res.rows[0].elements[0].duration.text);
          //console.log(res);
          packagePrice(res.rows[0].elements[0].distance.value);
        });
      setShowCards(true);
    } catch (err) {
      //console.log("Error while calculating distnace");
      toast({
        title: "Didn't find Any such Route",
        description: "Presently we dont provide service in requested route",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setShowCards(false);
    }
  }

  //Contents for map container
  let initialPosition = location.state.sourceCord;
  let finalPosition = location.state.destinationCord;

  const mapOptions = {
    mapId: "7e437361629e930a",
    disableDefaultUI: true,
  };
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  //function to scroll down to cards
  const handleScroll = () => {
    const element = document.getElementById("package-cards");
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  //const declaration for display outputs
  const [fromVerifed, setFromVerified] = useState(false);
  const [showFinalButtonDisplay, setShowFinalButtonDisplay] = useState(true);
  function packagePrice(distanceNum) {
    if (distanceNum) {
      setAmount(Math.floor((distanceNum / 1000) * 15 * 30));
      ////console.log(price);
    }
  }

  return isLoaded ? (
    <>
      <div className="flex justify-center items-center ">
        <div>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={fromVerifed ? finalPosition : initialPosition}
            zoom={14}
            options={mapOptions}
          >
            <MarkerF position={fromVerifed ? finalPosition : initialPosition} />
            {directionResponse && (
              <DirectionsRenderer directions={directionResponse} />
            )}
          </GoogleMap>
        </div>
      </div>
      {showFinalButtonDisplay && (
        <div className="mt-[4%] flex justify-center items-center">
          {!fromVerifed && (
            <Button
              colorScheme="red"
              sx={{ bgColor: "#E51B23", color: "white" }}
              onClick={() => {
                setFromVerified(true);
              }}
            >
              Confirm Source
            </Button>
          )}
          {fromVerifed && (
            <Button
              colorScheme="red"
              sx={{ bgColor: "#E51B23", color: "white" }}
              onClick={() => {
                calculateRoute();
                distanceMatrix();
                setShowFinalButtonDisplay(false);
                setTimeout(() => {
                  handleScroll();
                }, 3000);
              }}
            >
              Confirm Destination
            </Button>
          )}
        </div>
      )}
      {showCards && (
        <>
          {usData.userType === "user" ? (
            <>
              <div>
                <section class="bg-white">
                  <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                      <h2
                        class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900"
                        id="package-cards"
                      >
                        Explore Our Packages
                      </h2>
                      <p class="mb-5 font-light text-gray-500 sm:text-xl">
                        Choose the best as per your preference
                      </p>
                    </div>
                    <div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
                      {/* <!-- Pricing Card --> */}
                      <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                        <h3 class="mb-4 text-2xl font-semibold">Basic</h3>
                        <p class="font-light text-gray-500 sm:text-lg">
                          Best option for your day to day single service
                        </p>
                        <div class="flex justify-center items-baseline my-8">
                          <span class="mr-2 text-5xl font-extrabold">
                            {amount && <>₹{amount}</>}
                            {!amount && <>Calculating...</>}
                          </span>
                          <span class="text-gray-500">/month</span>
                        </div>
                        {/* <!-- List --> */}
                        <ul role="list" class="mb-8 space-y-4 text-left">
                          <li class="flex items-center space-x-3">
                            {/* <!-- Icon --> */}
                            <svg
                              class="flex-shrink-0 w-5 h-5 text-green-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                            <span>Verified Drivers</span>
                          </li>
                          <li class="flex items-center space-x-3">
                            {/* <!-- Icon --> */}
                            <svg
                              class="flex-shrink-0 w-5 h-5 text-green-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                            <span>Assured Clean and Safer Rides</span>
                          </li>
                          <li class="flex items-center space-x-3">
                            {/* <!-- Icon --> */}
                            <svg
                              class="flex-shrink-0 w-5 h-5 text-green-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                            <span>Accompanied with Air Conditioners</span>
                          </li>
                          <li class="flex items-center space-x-3">
                            {/* <!-- Icon --> */}
                            <svg
                              class="flex-shrink-0 w-5 h-5 text-green-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                            <span>
                              Guranteed alternative in case of any break downs
                            </span>
                          </li>
                          <li class="flex items-center space-x-3">
                            {/* <!-- Icon --> */}
                            <svg
                              class="flex-shrink-0 w-5 h-5 text-green-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                            <span>Secured Rides with 2FA</span>
                          </li>
                        </ul>
                        <span
                          role="button"
                          onClick={() => handlemapDriverRoute("user")}
                          class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                          Get GrabWay
                        </span>
                      </div>
                      {/* <!-- Pricing Card --> */}
                      <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow  dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white opacity-40">
                        <div className="flex">
                          <h3 class="mb-4 text-2xl font-semibold pl-[40%] pr-[40%]">
                            Pro
                          </h3>
                          <i
                            class="bx bx-lock-alt"
                            style={{
                              color: "red",
                              fontSize: "xx-large",
                              fontWeight: "700",
                            }}
                          ></i>
                        </div>
                        <p class="font-light text-gray-500 sm:text-lg">
                          Relevant for more than one Services per day.
                        </p>
                        <div class="flex justify-center items-baseline my-8">
                          <span class="mr-2 text-5xl font-extrabold">
                            ₹XXXX
                          </span>
                          <span class="text-gray-500">/month</span>
                        </div>
                        {/* <!-- List --> */}
                        <ul role="list" class="mb-8 space-y-4 text-left">
                          <li class="flex items-center space-x-3">
                            {/* <!-- Icon --> */}
                            <svg
                              class="flex-shrink-0 w-5 h-5 text-green-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                            <span>Verified Drivers</span>
                          </li>
                          <li class="flex items-center space-x-3">
                            {/* <!-- Icon --> */}
                            <svg
                              class="flex-shrink-0 w-5 h-5 text-green-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                            <span>Assured Clean and Safer Rides</span>
                          </li>
                          <li class="flex items-center space-x-3">
                            {/* <!-- Icon --> */}
                            <svg
                              class="flex-shrink-0 w-5 h-5 text-green-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                            <span>Accompanied with Air Conditioners</span>
                          </li>
                          <li class="flex items-center space-x-3">
                            {/* <!-- Icon --> */}
                            <svg
                              class="flex-shrink-0 w-5 h-5 text-green-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                            <span>
                              Guranteed alternative in case of any break downs
                            </span>
                          </li>
                          <li class="flex items-center space-x-3">
                            {/* <!-- Icon --> */}
                            <svg
                              class="flex-shrink-0 w-5 h-5 text-green-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                            <span>Secured Rides with 2FA</span>
                          </li>
                        </ul>
                        <span class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                          Get GrabWay
                        </span>
                      </div>
                      {/* <!-- Pricing Card --> */}
                      <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white opacity-40">
                        <div className="flex">
                          <h3 class="mb-4 text-2xl font-semibold pl-[35%] pr-[30%]">
                            Premium
                          </h3>
                          <i
                            class="bx bx-lock-alt"
                            style={{
                              color: "red",
                              fontSize: "xx-large",
                              fontWeight: "700",
                            }}
                          ></i>
                        </div>
                        <p class="font-light text-gray-500 sm:text-lg">
                          All Accessible features and Support from GrabWay
                          instantly
                        </p>
                        <div class="flex justify-center items-baseline my-8">
                          <span class="mr-2 text-5xl font-extrabold">
                            ₹XXXX
                          </span>
                          <span class="text-gray-500">/month</span>
                        </div>
                        {/* <!-- List --> */}
                        <ul role="list" class="mb-8 space-y-4 text-left">
                          <li class="flex items-center space-x-3">
                            {/* <!-- Icon --> */}
                            <svg
                              class="flex-shrink-0 w-5 h-5 text-green-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                            <span>Verified Drivers</span>
                          </li>
                          <li class="flex items-center space-x-3">
                            {/* <!-- Icon --> */}
                            <svg
                              class="flex-shrink-0 w-5 h-5 text-green-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                            <span>Assured Clean and Safer Rides</span>
                          </li>
                          <li class="flex items-center space-x-3">
                            {/* <!-- Icon --> */}
                            <svg
                              class="flex-shrink-0 w-5 h-5 text-green-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                            <span>Accompanied with Air Conditioners</span>
                          </li>
                          <li class="flex items-center space-x-3">
                            {/* <!-- Icon --> */}
                            <svg
                              class="flex-shrink-0 w-5 h-5 text-green-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                            <span>
                              Guranteed alternative in case of any break downs
                            </span>
                          </li>
                          <li class="flex items-center space-x-3">
                            {/* <!-- Icon --> */}
                            <svg
                              class="flex-shrink-0 w-5 h-5 text-green-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                            <span>Secured Rides with 2FA</span>
                          </li>
                        </ul>
                        <span class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                          Get GrabWay
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </>
          ) : (
            <>
              <div>
                <section class="bg-white">
                  <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                      <h2
                        class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900"
                        id="package-cards"
                      >
                        Explore Our Packages
                      </h2>
                      <p class="mb-5 font-light text-gray-500 sm:text-xl">
                        Choose the best as per your preference
                      </p>
                    </div>
                    <div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
                      {/* <!-- Pricing Card --> */}
                      <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                        <h3 class="mb-4 text-2xl font-semibold">Basic</h3>
                        <p class="font-light text-gray-500 sm:text-lg">
                          Best option for your day to day single service
                        </p>
                        <div class="flex justify-center items-baseline my-8">
                          <span class="mr-2 text-5xl font-extrabold">
                            ₹3000
                          </span>
                          <span class="text-gray-500">/month</span>
                        </div>

                        <span
                          class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                          role="button"
                          onClick={() => handlemapDriverRoute("driver")}
                        >
                          Get GrabWay
                        </span>
                      </div>
                      {/* <!-- Pricing Card --> */}
                      <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow  dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white opacity-40">
                        <div className="flex">
                          <h3 class="mb-4 text-2xl font-semibold pl-[40%] pr-[40%]">
                            Pro
                          </h3>
                          <i
                            class="bx bx-lock-alt"
                            style={{
                              color: "red",
                              fontSize: "xx-large",
                              fontWeight: "700",
                            }}
                          ></i>
                        </div>
                        <p class="font-light text-gray-500 sm:text-lg">
                          Relevant for more than one Services per day.
                        </p>
                        <div class="flex justify-center items-baseline my-8">
                          <span class="mr-2 text-5xl font-extrabold">
                            ₹5000
                          </span>
                          <span class="text-gray-500">/month</span>
                        </div>

                        <span
                          class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                          role="button"
                        >
                          Get GrabWay
                        </span>
                      </div>
                      {/* <!-- Pricing Card --> */}
                      <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white opacity-40">
                        <div className="flex">
                          <h3 class="mb-4 text-2xl font-semibold pl-[35%] pr-[30%]">
                            Premium
                          </h3>
                          <i
                            class="bx bx-lock-alt"
                            style={{
                              color: "red",
                              fontSize: "xx-large",
                              fontWeight: "700",
                            }}
                          ></i>
                        </div>
                        <p class="font-light text-gray-500 sm:text-lg">
                          All Accessible features and Support from GrabWay
                          instantly
                        </p>
                        <div class="flex justify-center items-baseline my-8">
                          <span class="mr-2 text-5xl font-extrabold">
                            ₹8000
                          </span>
                          <span class="text-gray-500">/month</span>
                        </div>

                        <span
                          class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                          role="button"
                        >
                          Get GrabWay
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </>
          )}
        </>
      )}
    </>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
