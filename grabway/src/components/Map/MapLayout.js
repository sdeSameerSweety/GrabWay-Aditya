import React, { useState } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { Button, Mark } from "@chakra-ui/react";

const containerStyle = {
  width: "1000px",
  height: "500px",
  border: "1px solid white",
  borderRadius: "30px",
};
const iconBase =
  "https://e7.pngegg.com/pngimages/230/877/png-clipart-character-cartoon-drawing-illustration-cartoon-camera-man-painted-hat-watercolor-painting-hat-vector.png";

const center = {
  lat: 20.350898582501245,
  lng: 85.8063896401287,
};

function MyComponent() {
  let initialPosition = { lat: 20.350898582501245, lng: 85.8063896401287 };
  let finalPosition = { lat: 20.350898582501245, lng: 85.9063896401287 };
  const [fromVerifed, setFromVerified] = useState(false);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDJaFr-HFXGBOg8pUSdQfGjGwGdIwtbXhY",
    libraries: ["maps", "places"],
    mapIds: ["7e437361629e930a"],
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
