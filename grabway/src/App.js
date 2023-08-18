import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import TopSection from "./components/HomePage/TopSection";
import Footer from "./components/Footer/footer";
import TopScroller from "./components/TopScroller/TopSlider";
function App() {
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

  const [classDisplay, setClassDisplay] = useState("sidebar");
  const intDivStyle = {
    position: "relative",
    marginLeft:
      windowSize > 600
        ? classDisplay === "sidebar"
          ? "78px"
          : "255px"
        : "0px",
    transition: "all 0.5s ease",
  };

  console.log(classDisplay);
  return (
    <BrowserRouter>
      <Navbar classDisplay={classDisplay} setClassDislay={setClassDisplay} />
      <div style={intDivStyle}>
        <TopScroller />
        <Routes>
          <Route path="/" element={<TopSection />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
