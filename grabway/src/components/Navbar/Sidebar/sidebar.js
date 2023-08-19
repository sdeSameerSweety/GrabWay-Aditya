import React, { useState, useEffect } from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";

export default function Sidebar({
  classDisplay,
  setClassDisplay,
  counter,
  setDisplayVal,
}) {
  const [sidebarClass, setSidebarClass] = useState("sidebar");
  const toggleClass = () => {
    if (sidebarClass === "sidebar open") {
      setSidebarClass("sidebar");
      setClassDisplay("sidebar");
    } else {
      setSidebarClass("sidebar open");
      setClassDisplay("sidebar open");
    }
  };

  const handleSignout = () => {
    console.log("Signout Successfull");
  };

  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  const [showState, setShowState] = useState(false);
  useEffect(() => {
    setShowState(!showState);
    if (showState === true) setDisplayVal("no");
    else setDisplayVal("yes");
  }, [counter]);
  console.log(counter, showState);
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  function handleSmallChange() {
    setClassDisplay("sidebar");
    return "sidebar";
  }

  function handleBigChange() {
    setClassDisplay(sidebarClass);
    return sidebarClass;
  }

  return (
    <>
      {windowSize[0] > 600 && (
        <div
          class={
            windowSize[0] > 900
              ? `w-[${
                  sidebarClass === "sidebar"
                    ? `${showState === true ? 78 : 0}`
                    : `${showState === true ? 250 : 0}`
                }px] ` + handleBigChange()
              : `w-[${showState === true ? 78 : 0}px] ` + handleSmallChange()
          }
        >
          {windowSize[0] > 900 && (
            <div class={showState === true ? "logo-details" : "hidden"}>
              <i
                class={
                  sidebarClass === "sidebar" ? "bx bx-menu" : "bx bx-x-circle"
                }
                style={{ color: "black" }}
                id="btn"
                onClick={toggleClass}
              ></i>
            </div>
          )}
          <ul class="nav-list">
            <li>
              <Link to="/">
                <div className="items-list-side-book-ride">
                  <i class="bx bx-car" style={{ color: "#000000" }}></i>
                  <span class="links_name">Book Ride</span>
                </div>
                <span class="tooltip">Book Ride</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <div className="items-list-side">
                  <i class="bx bx-grid-alt"></i>
                  <span class="links_name">Dashboard</span>
                </div>
                <span class="tooltip">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <div className="items-list-side">
                  <i class="bx bx-user"></i>
                  <span class="links_name">Ride History</span>
                </div>
                <span class="tooltip">Ride History</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <div className="items-list-side">
                  <i class="bx bx-pie-chart-alt-2"></i>
                  <span class="links_name">Analytics</span>
                </div>
                <span class="tooltip">Analytics</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <div className="items-list-side">
                  <i class="bx bx-chat"></i>
                  <span class="links_name">Packages</span>
                </div>
                <span class="tooltip">Packages</span>
              </Link>
            </li>

            <li>
              <Link to="/">
                <div className="items-list-side">
                  <i class="bx bx-folder"></i>
                  <span class="links_name">Support</span>
                </div>
                <span class="tooltip">Support</span>
              </Link>
            </li>

            <li class={showState === true ? "profile" : "hidden"}>
              <div class="profile-details">
                <img src="/assets/images/user.png" alt="profileImg" />
                <div class="name_job">
                  <div class="name">Demo Person</div>
                  <div class="job">Customer</div>
                </div>
              </div>
              <i
                class="bx bx-log-out"
                id="log_out"
                role="button"
                onClick={handleSignout}
              ></i>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
