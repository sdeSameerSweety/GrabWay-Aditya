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

function MyComponentNearby({ nonceVal }, { route, state }) {
  const location = useLocation();

  //geocode convert function
  // async function getgeoCode(place, type) {
  //   await axios
  //     .get("https://maps.googleapis.com/maps/api/geocode/json", {
  //       params: {
  //         address: place,
  //         key: "AIzaSyDJaFr-HFXGBOg8pUSdQfGjGwGdIwtbXhY",
  //       },
  //     })
  //     .then((res) => {
  //       if (type === "source")
  //         setsrcCord(res.data.results[0].geometry.location);
  //       else setDestCord(res.data.results[0].geometry.location);
  //     })
  //     .catch((err) => //console.log(err));
  // }
  // //console.log({ srcCord, destCord });
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDJaFr-HFXGBOg8pUSdQfGjGwGdIwtbXhY",
    libraries: ["maps", "places"],
    mapIds: ["7e437361629e930a"],
    nonce: nonceVal,
  });

  const currLocation = { lat: 20.35080802966228, lng: 85.80646474874787 };
  const places = [
    {
      lat: 20.349258903966863,
      lng: 85.80780583408101,
    },
    {
      lat: 20.348592635212352,
      lng: 85.8045150158752,
    },
    { lat: 20.347520643003353, lng: 85.807291587609 },
    { lat: 20.352227273150287, lng: 85.80728145886991 },
    { lat: 20.35180888518804, lng: 85.81352851844089 },
    { lat: 20.343895303636334, lng: 85.82286309752871 },
  ];

  const mapOptions = {
    mapId: "7e437361629e930a",
    disableDefaultUI: true,
  };
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(currLocation);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  //console.log(map);
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km;
    return d;
  }

  const range = 0.5;
  //const declaration for display outputs
  return isLoaded ? (
    <>
      <div className="flex justify-center items-center ">
        <div>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={currLocation}
            zoom={14}
            options={mapOptions}
          >
            {places.map(
              (item) =>
                getDistanceFromLatLonInKm(
                  currLocation.lat,
                  currLocation.lng,
                  item.lat,
                  item.lng
                ) < range && <MarkerF position={item} />
            )}
          </GoogleMap>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}

export default React.memo(MyComponentNearby);
