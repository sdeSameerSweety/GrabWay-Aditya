import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/footer";
import Homepage from "./Pages/HomePage/Homepage";
import Support from "./Pages/Support/Support.jsx";
import MapLayout from "./components/Map/MapLayout";
import Registeration from "./components/Registeration/Registeration";


function App() {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [loginState, setLoginState] = useState(false);
  console.log(loginState);

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
      <Navbar
        classDisplay={classDisplay}
        setClassDislay={setClassDisplay}
        displayVal={displayVal}
        setDisplayVal={setDisplayVal}
        setLoginState={setLoginState}
      />
      <div style={intDivStyle}>
        <Registeration/>
        <Routes>
          <Route path="/" element={<Homepage loginState={loginState} />} />
          <Route path="/support" element={<Support />} />
          <Route path="/maps" element={<MapLayout />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
