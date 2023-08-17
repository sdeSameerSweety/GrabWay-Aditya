import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import TopSection from "./components/HomePage/TopSection";

function App() {
  const [classDisplay, setClassDisplay] = useState("sidebar");
  const intDivStyle = {
    position: "relative",
    marginLeft: classDisplay === "sidebar" ? "78px" : "250px",
    transition: "all 0.5s ease",
  };
  return (
    <BrowserRouter>
      <Navbar classDisplay={classDisplay} setClassDislay={setClassDisplay} />
      <div style={intDivStyle}>
        <Routes>
          <Route path="/" element={<TopSection />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
