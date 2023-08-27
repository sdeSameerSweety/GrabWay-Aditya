import React, { useState,useEffect } from "react";
import "./GRegisteration.css";
import { Navigate } from "react-router-dom";
import GDriverRegistation from "./GDriverRegistration/GDriverRegistration";
import GUserRegistration from "./GUserRegistration/GUserRegistration";
import Cookies from "js-cookie";
const GRegistration = () => {
  const [activeImage, setActiveImage] = useState(3); // Default: Image 3
  const [rider,setRider]=useState(false);
  const [driver,setDriver]=useState(false);
  const handleHover = (imageIndex) => {
    setActiveImage(imageIndex);
  };
  function handleRiderClick(){
    setRider(true);
  }
  function handleDriverClick(){
    setDriver(true);
  }
  const googleUserData=Cookies.get('grabwayGoogleToken');
  if(!googleUserData){
    return <Navigate to={"/"}/>
  }
  return (<>
    {!driver && !rider && <>
    <div className="gRegisteration-container">
      <header>
        <img
          src="/assets/images/logo.png"
          alt="Uber-like Project Logo"
          className="logo"
        />
      </header>
      <main>
        <div className="content">
          <h1>Join the Future of Transportation</h1>
          <p>Choose your journey:</p>
          <div className="buttons">
            <button className="user-button" 
            onClick={handleRiderClick}
            onMouseEnter={() => handleHover(1)}>
              I'm a Rider
            </button>
            <button
            onClick={handleDriverClick}
              className="driver-button"
              onMouseEnter={() => handleHover(2)}
            >
              I'm a Driver
            </button>
          </div>
        </div>
        <div className="animation">
          {activeImage === 1 && (
            <img
              src="/assets/gif/user.gif"
              alt="Rider Animation"
              className="animation-gif"
            />
          )}
          {activeImage === 2 && (
            <img
              src="/assets/gif/driver.gif"
              alt="Driver Animation"
              className="animation-gif"
            />
          )}
          {activeImage === 3 && (
            <img
              src="/assets/gif/default.gif"
              className="animation-gif"
            />
          )}
        </div>
      </main>
    </div></>}
    {driver && <>
    <GDriverRegistation/>
    </>}
    {rider && <><GUserRegistration/></>}
    </>
  );
};

export default GRegistration;
