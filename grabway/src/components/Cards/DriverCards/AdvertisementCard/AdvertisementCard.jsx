import React, { useState, useRef, useEffect } from "react";
import "./AdvertisementCard.css";

export default function AdvertisementCard() {
  const [xRotation, setXRotation] = useState(0);
  const [yRotation, setYRotation] = useState(0);
  const [cardData, setCardData] = useState({});
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const sizesboxRef = useRef(null);
  const purchaseRef = useRef(null);

  useEffect(() => {
    //API Logic
    const backendResponse = {
      image:
        "https://www.transparentpng.com/thumb/car-png/car-free-transparent-png-8.png",
      title: "Premimum Sedan",
      description: "Description lops lorem",
    };
    setCardData(backendResponse);
  }, []);

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
        <span
          className="badge"
          // style="font-family: cursive; background-color: gold; color: navy; padding: 5px 10px; border-radius: 3px;"
        >
          Sponsored
        </span>
        {/* <div className="main"> */}

        <img
          src={cardData.image}
          alt={cardData.title}
          ref={imgRef}
          className="car-img"
        />
        {/* </div> */}
        <h2 className="title" ref={titleRef}>
          {cardData.title}
        </h2>
        <p ref={descRef}>{cardData.description}</p>
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
