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

  const [showState, setShowState] = useState(counter);
  useEffect(() => {
    setShowState(counter);
    if (counter === true) setDisplayVal("yes");
    else setDisplayVal("no");
  }, [counter]);
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

  function getWidth() {
    if (sidebarClass === "sidebar") {
      if (showState === true) return "w-[78px] ";
      else return "w-[0px] ";
    } else {
      if (showState === true) return "w-[250px] ";
      else return "w-[0px] ";
    }
  }
  return (
    <>
      {windowSize[0] > 600 && (
        <div
          className={
            windowSize[0] > 900
              ? getWidth() + handleBigChange()
              : showState === true
              ? "w-[78px] " + handleSmallChange()
              : "w-[0px] " + handleSmallChange()
          }
        >
          {windowSize[0] > 900 && (
            <div className={showState === true ? "logo-details" : "hidden"}>
              <i
                className={
                  sidebarClass === "sidebar" ? "bx bx-menu" : "bx bx-x-circle"
                }
                style={{ color: "black" }}
                id="btn"
                onClick={toggleClass}
              ></i>
            </div>
          )}
          <ul className="nav-list">
            <li>
              <Link to="/">
                <div className="items-list-side-book-ride">
                  <i
                    className={showState === true ? "bx bx-car" : "hidden"}
                    style={{ color: "#ffffff" }}
                  ></i>
                  <span className="links_name">Book Ride</span>
                </div>
                <span className="tooltip">Book Ride</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                <div className="items-list-side">
                  <i
                    className={showState === true ? "bx bx-grid-alt" : "hidden"}
                  ></i>
                  <span className="links_name">Dashboard</span>
                </div>
                <span className="tooltip">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <div className="items-list-side">
                  <i
                    className={showState === true ? "bx bx-history" : "hidden"}
                    style={{ color: "#ffffff" }}
                  ></i>
                  <span className="links_name">Ride History</span>
                </div>
                <span className="tooltip">Ride History</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <div className="items-list-side">
                  <i
                    className={
                      showState === true ? "bx bx-pie-chart-alt-2" : "hidden"
                    }
                  ></i>
                  <span className="links_name">Analytics</span>
                </div>
                <span className="tooltip">Analytics</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <div className="items-list-side">
                  <i
                    className={showState === true ? "bx bx-chat" : "hidden"}
                  ></i>
                  <span className="links_name">Packages</span>
                </div>
                <span className="tooltip">Packages</span>
              </Link>
            </li>

            <li>
              <Link to="/support">
                <div className="items-list-side">
                  <i
                    className={showState === true ? "bx bx-folder" : "hidden"}
                  ></i>
                  <span className="links_name">Support</span>
                </div>
                <span className="tooltip">Support</span>
              </Link>
            </li>

            <li className={showState === true ? "profile" : "hidden"}>
              <div className="profile-details">
                <img src="/assets/images/user.png" alt="profileImg" />
                <div className="name_job">
                  <div className="name">Demo Person</div>
                  <div className="job">Customer</div>
                </div>
              </div>
              <i
                className="bx bx-log-out"
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
