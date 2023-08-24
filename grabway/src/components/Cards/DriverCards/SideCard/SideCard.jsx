import React, { useState, useRef } from "react";
import "./SideCard.css";
export default function SideCard() {
  const [xRotation, setXRotation] = useState(0);
  const [yRotation, setYRotation] = useState(0);
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const sizesboxRef = useRef(null);
  const purchaseRef = useRef(null);

  function handleMouseMove(event) {
    const card = cardRef.current;
    const { offsetWidth: width, offsetHeight: height } = card;
    const { clientX, clientY } = event;
    const x = clientX - card.offsetLeft - width / 2;
    const y = clientY - card.offsetTop - height / 2;
    var mult = 40;
    setXRotation((y / height) * mult);
    setYRotation((x / width) * mult);
  }
  function handleMouseEnter() {
    const img = imgRef.current;
    const title = titleRef.current;
    const sizesBox = sizesboxRef.current;
    const purchase = purchaseRef.current;
    const desc = descRef.current;
    title.style.transform = "translateZ(150px)";
    // img.style.transform = "translateZ(100px) rotateX(0deg)";
    img.style.transform =
      "translateX(-25px) translateY(25px) translateZ(50px) rotateZ(5deg)";
    sizesBox.style.transform = "translateZ(100px)";
    purchase.style.transform = "translateZ(75px)";
    desc.style.transform = "translateZ(75px)";
  }
  function handleMouseLeave() {
    setXRotation(0);
    setYRotation(0);

    const img = imgRef.current;
    const title = titleRef.current;
    const sizesBox = sizesboxRef.current;
    const purchase = purchaseRef.current;
    title.style.transform = "translateZ(0px)";
    img.style.transform = "translateZ(0px) rotateZ(0deg)";
    sizesBox.style.transform = "translateZ(0px)";
    purchase.style.transform = "translateZ(0px)";
  }
  return (
    <>
      <div
        className="sideCard"
        ref={cardRef}
        style={{
          transform: `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src="https://www.transparentpng.com/thumb/car-png/car-free-transparent-png-8.png"
          alt="car free transparent png @transparentpng.com"
          ref={imgRef}
          // src={require("./Shoe-img/Nike-Shoe.PNG")}
          // alt="Nike-Shoe"
          className="car-img"
        />
        <h2 className="title" ref={titleRef}>
          Nike Dunk High
        </h2>
        <p ref={descRef}>
          Nike Dunk High is a high-top version of the classic Nike Dunk sneaker,
          featuring a padded collar for added support and comfort.
        </p>
        <ul className="sizes-box" ref={sizesboxRef}>
          <li>38</li>
          <li>40</li>
          <li>42</li>
          <li>44</li>
        </ul>
        <div className="button-box" ref={purchaseRef}>
          <button className="purchase">Purchase</button>
        </div>
      </div>
    </>
  );
}
