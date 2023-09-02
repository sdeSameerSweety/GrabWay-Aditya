import React from "react";
import "./status.css";

export default function StatusBar() {
  function moveBy(a, b, c) {
    console.log("hello");
  }

  return (
    <div id="navbarContainer">
      <div id="navbar">
        <div id="bubbleWrapper">
          <div id="bubble1" className="bubble">
            <span className="icon">
              <i class="fas fa-home"></i>
            </span>
          </div>
          <div id="bubble2" className="bubble">
            <span className="icon">
              <i class="fas fa-home"></i>
            </span>
          </div>
          <div id="bubble3" className="bubble">
            <span className="icon">
              <i class="fas fa-home"></i>
            </span>
          </div>
          <div id="bubble4" className="bubble">
            <span className="icon">
              <i class="fas fa-home"></i>
            </span>
          </div>
        </div>

        <div id="menuWrapper">
          <div
            id="menu1"
            className="menuElement"
            onClick={() => moveBy("1", "50px", "#ffcc80")}
          >
            <i class="fas fa-home"></i>
          </div>
          <div
            id="menu2"
            className="menuElement"
            onClick={() => moveBy("1", "50px", "#ffcc80")}
          >
            <i class="fas fa-home"></i>
          </div>
          <div
            id="menu3"
            className="menuElement"
            onClick={() => moveBy("1", "50px", "#ffcc80")}
          >
            <i class="fas fa-home"></i>
          </div>
          <div
            id="menu4"
            className="menuElement"
            onClick={() => moveBy("1", "50px", "#ffcc80")}
          >
            <i class="fas fa-home"></i>
          </div>
        </div>

        <div id="bgWrapper">
          <div id="bg"></div>
          <div id="bgBubble"></div>
        </div>

        <div>
          <svg width="0" height="0">
            <defs>
              <filter id="goo">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="20"
                  result="blur"
                  id="blurFilter"
                />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 30 -15"
                  result="goo"
                />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
