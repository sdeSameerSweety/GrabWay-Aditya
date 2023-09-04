import React, { useState, useEffect } from "react";
import "./LoadingCarAnimation.css";
import { Box } from "@chakra-ui/react";

function LoadingCarAnimation() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box>
      {isMobile ? (
        <div className="mobile-gif"></div>
      ) : (
        <div className="container-loading">
          <div className="moon"></div>
          <div className="tree">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="car">
            <span className="spion"></span>
            <span className="handle-front"></span>
            <span className="handle-back"></span>
            <span className="head-lamp">
              <span></span>
            </span>
            <span className="cap-body">
              <span></span>
              <span></span>
            </span>
            <span className="tire-front">
              <span></span>
            </span>
            <span className="tire-back">
              <span></span>
            </span>
            <span className="back-lamp"></span>
          </div>
          <div className="street">
            <h4>your ride is on the way !</h4>
          </div>
          <h2>
            <span>l</span>
            <span>o</span>
            <span>a</span>
            <span>d</span>
            <span>i</span>
            <span>n</span>
            <span>g</span>
          </h2>
        </div>
      )}
    </Box>
  );
}

export default LoadingCarAnimation;
