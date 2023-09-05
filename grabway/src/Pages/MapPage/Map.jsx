import React from 'react'
import MapLayout from '../../components/Map/MapLayout'
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Map = (props) => {
    const nonce =  props.nonceVal;
    const googleUserData = Cookies.get("grabwayGoogleToken");

    const userData = localStorage.getItem("grabwayUser");
    if (userData) {
      if (JSON.parse(userData).name === "") {
        return <Navigate to={"/registration"} userType="" />;
      }
    }
    if (!userData) {
      if (!googleUserData) {
        return <Navigate to={"/"} />;
      }
      if (googleUserData) {
        return <Navigate to={"/googleRegistration"} />;
      }
    }
  return (
    <div>
      <MapLayout nonceVal={nonce} />
    </div>
  )
}

export default Map
