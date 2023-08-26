import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  MarkerF,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { Button, Mark } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { Card, CardBody } from "@chakra-ui/react";
import axios from "axios";
const containerStyle = {
  width: "1000px",
  height: "500px",
  border: "1px solid white",
  borderRadius: "30px",
};

function MyComponent({ nonceVal }, { route, state }) {
  const location = useLocation();

  console.log(location);
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
  console.log(rideDataText);

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
        console.log(res);
      });
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

  //const declaration for display outputs
  const [fromVerifed, setFromVerified] = useState(false);
  const [showFinalButtonDisplay, setShowFinalButtonDisplay] = useState(true);
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
              }}
            >
              Confirm Destination
            </Button>
          )}
        </div>
      )}

      {!showFinalButtonDisplay && (
        <>
          {distanceText !== null ? (
            <div className="mt-[3%] flex justify-center items-center">
              <Card
                sx={{
                  bgColor: "#E51B23",
                  color: "white",
                  borderRadius: "30px",
                }}
              >
                <CardBody>
                  <div className="flex flex-row justify-center items-center gap-20">
                    <div className="flex justify-center items-center">
                      <div className="font-ubuntu text-3xl">Price - 4999</div>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-3">
                      <div className="font-ubuntu text-2xl">
                        Distance - {distanceText}
                      </div>
                      <div className="font-ubuntu text-2xl">
                        Travel Time - {durationText}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
