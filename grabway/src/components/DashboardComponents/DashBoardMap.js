import React from "react";

// components

export default function DashBoardMap() {
  return (
    <>
      <div
        style={{
          maxWidth: "100%",
          listStyle: "none",
          transition: "none",
          overflow: "hidden",
          height: "100%",
        }}
      >
        <div
          id="canvas-for-googlemap"
          style={{ height: "100%", width: "100%", maxWidth: "100%" }}
        >
          <iframe
            style={{ height: "100%", width: "100%", border: "0" }}
            frameborder="0"
            src="https://www.google.com/maps/embed/v1/place?q=Silicon+Institute+of+Technology,+near+DLF+cybercity,+Chandaka+Industrial+Estate,+Infocity,+Patia,+Bhubaneswar,+Odisha,+India&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
          ></iframe>
        </div>
      </div>
    </>
  );
}