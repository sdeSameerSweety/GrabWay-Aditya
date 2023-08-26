import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/footer";
import Homepage from "./Pages/HomePage/Homepage";
import Support from "./Pages/Support/Support.jsx";
import MapLayout from "./components/Map/MapLayout";
import Registeration from "./Pages/Registeration/Registeration";
import Dashboard from "./Pages/DashboardPage";
import DriverCard from "./components/Cards/DriverCards/DriverCards";
import axios from "axios";
import { UserContext, UserContextProvider } from "./context/Context";
import ProfilePage from "./Pages/ProfilePages/index";
import Cookies from "js-cookie";


import DriverRegistration from "./Pages/Registeration/DriverRegistration";
import UserRegistration from "./Pages/Registeration/UserRegistration";


axios.defaults.baseURL="http://localhost:8080";
axios.defaults.withCredentials=true;
// import NearbyMap from "./components/Map/NearbyMap";
axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;
function App() {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [loginState, setLoginState] = useState(false);
  const [nonce, setNonce] = useState("grabway@123");
  //console.log(loginState);
  const { userEmail, setUserEmail } = useContext(UserContext);
  //console.log(userEmail);
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const [classDisplay, setClassDisplay] = useState("sidebar");
  const [displayVal, setDisplayVal] = useState("no");
  const intDivStyle = {
    position: "relative",
    marginLeft:
      displayVal === "yes"
        ? windowSize > 600
          ? classDisplay === "sidebar"
            ? "78px"
            : "255px"
          : "0px"
        : "0px",
    transition: "all 0.5s ease",
  };
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Navbar
          classDisplay={classDisplay}
          setClassDislay={setClassDisplay}
          displayVal={displayVal}
          setDisplayVal={setDisplayVal}
          setLoginState={setLoginState}
          loginState={loginState}
        />
        <div style={intDivStyle}>
          {/* <Registeration /> */}
          {/* <Support/> */}
          {/* <DriverRegistration /> */}
          <DriverRegistration />
          <Routes>
            {/* <Route path="/nearby" element={<NearbyMap nonceVal={nonce} />} /> */}
            <Route
            // path="/"
            // element={<Homepage nonceVal={nonce} loginState={loginState} />}
            />
            {/* <Route path="/support" element={<Support />} /> */}
            {/* <Route path="/maps" element={<MapLayout nonceVal={nonce} />} /> */}
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            {/* <Route path="/userprofile" element={<UserProfile />} /> */}
            {/* <Route path="/driverregistration" component={DriverRegistration} /> */}
            {/* <Route path="/userregistration" component={UserRegistration} /> */}
            {/* <Route path="/registration" element={<Registeration />} /> */}
            {/* <Route path="/profile" element={<ProfilePage />} /> */}
          </Routes>
          <Footer />
        </div>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
