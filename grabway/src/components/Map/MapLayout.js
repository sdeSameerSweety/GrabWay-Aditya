import React, { useState } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { Button, Mark } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
const containerStyle = {
  width: "1000px",
  height: "500px",
  border: "1px solid white",
  borderRadius: "30px",
};

const center = {
  lat: 20.350898582501245,
  lng: 85.8063896401287,
};

function MyComponent({nonceVal}) {
  const location = useLocation();

  const rideData = {
    source: center,
    destination: center,
  };
  console.log(rideData);
  let initialPosition = rideData.source;
  let finalPosition = rideData.destination;
  const [fromVerifed, setFromVerified] = useState(false);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDJaFr-HFXGBOg8pUSdQfGjGwGdIwtbXhY",
    libraries: ["maps", "places"],
    mapIds: ["7e437361629e930a"],
    nonce: nonceVal,
  });
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
  console.log(isLoaded);
  return isLoaded ? (
    <>
      <div className="flex justify-center items-center ">
      <div>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={fromVerifed?initialPosition:finalPosition}
                zoom={14}
                options={mapOptions}
                
              >
                <MarkerF position={fromVerifed?initialPosition:finalPosition} />
                
              </GoogleMap>
            </div>
      </div>
      <div className="mt-[4%] flex justify-center items-center">
        <Button colorScheme="red" sx={{ bgColor: "#E51B23", color: "white" }}
        onClick={()=>{setFromVerified(true)}}
        >
          Confirm Destination
        </Button>
      </div>
    </>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
