import React, { useState } from "react";
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
  const googleToken=Cookies.get('grabwayGoogleToken');
  if(!googleToken){
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
              src="https://media2.giphy.com/media/Y3MZt5vPAEBvKlFyXN/giphy.gif?cid=ecf05e47pcvuzikb1902sr098awgnai8kxshq3q4392gsvye&ep=v1_gifs_related&rid=giphy.gif&ct=s"
              alt="Rider Animation"
              className="animation-gif"
            />
          )}
          {activeImage === 2 && (
            <img
              src="https://media2.giphy.com/media/YcejjKffZJzgmA4PgZ/giphy.gif?cid=ecf05e47ovbiap0d29den0cw3gb5rjhg3zhhgn32oxskpqto&ep=v1_stickers_search&rid=giphy.gif&ct=s"
              alt="Driver Animation"
              className="animation-gif"
            />
          )}
          {activeImage === 3 && (
            <img
              src="https://media4.giphy.com/media/9rfqu2LxLDdD2/giphy.gif?cid=ecf05e47qud26na0xapoijdrg7ubhe77whq8hvhfg0ov0zny&ep=v1_gifs_related&rid=giphy.gif&ct=s"
              alt="Default Animation"
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
