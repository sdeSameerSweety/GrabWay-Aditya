import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./status.css";
import "./extramore.css";
import { UserContext } from "../../context/Context";

export default function StatusBar() {
  const [home, setHome] = useState("home");
  const [products, setProducts] = useState("products");
  const [services, setServices] = useState("services active");
  const [about, setAbout] = useState("about");
  const [help, setHelp] = useState("help");
  const { setRunContext } = useContext(UserContext);
  const navigate = useNavigate();
  const usdata = JSON.parse(localStorage.getItem("grabwayUser"));

  const handleSignout = () => {
    //console.log("Signout Successfull");
    localStorage.removeItem("grabwayToken");
    localStorage.removeItem("grabwayUser");
    localStorage.removeItem("grabwayGoogleToken");
    Cookies.remove("grabwayToken");
    Cookies.remove("grabwayUser");
    Cookies.remove("grabwayGoogleToken");
    setRunContext("logout");
    window.location.reload(false);
  };

  const [openSide, setOpenSide] = useState(false);
  return (
    <>
      <div class="container-s">
        <div class="tabbar tab-style5">
          <ul class="flex-center">
            <Link to="/dashboard">
              <li className={home} data-where="home">
                <span
                  class="material-icons-outlined"
                  onClick={() => {
                    setHome("home active");
                    setProducts("products");
                    setServices("services");
                    setAbout("about");
                    setHelp("help");
                    setOpenSide(false);
                  }}
                >
                  grid_view
                </span>
              </li>
            </Link>
            <Link to="#">
              <li className={products} data-where="products">
                <span
                  class="material-icons-outlined"
                  onClick={() => {
                    setHome("home");
                    setProducts("products active");
                    setServices("services");
                    setAbout("about");
                    setHelp("help");
                    setOpenSide(false);
                  }}
                >
                  history
                </span>
              </li>
            </Link>
            <Link to="/">
              <li className={services} data-where="services">
                <span
                  class="material-icons-outlined"
                  onClick={() => {
                    setHome("home");
                    setProducts("products");
                    setServices("services active");
                    setAbout("about");
                    setHelp("help");
                    setOpenSide(false);
                  }}
                >
                  directions_car
                </span>
              </li>
            </Link>
            <Link
              to={
                usdata.userType === "user" ? "/userPackages" : "/driverpackage"
              }
            >
              <li className={about} data-where="about">
                <span
                  class="material-icons-outlined"
                  onClick={() => {
                    setHome("home");
                    setProducts("products");
                    setServices("services");
                    setAbout("about active");
                    setHelp("help");
                    setOpenSide(false);
                  }}
                >
                  shopping_cart
                </span>
              </li>
            </Link>
            <li className={help} data-where="help">
              <span
                class="material-icons-outlined"
                onClick={() => {
                  setHome("home");
                  setProducts("products");
                  setServices("services");
                  setAbout("about");
                  setHelp("help active");
                  if (openSide) setOpenSide(false);
                  else setOpenSide(true);
                }}
              >
                menu
              </span>
            </li>
          </ul>
        </div>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
      </div>

      <div class={openSide ? "w-[78px] sidebar-more" : "w-[0px] sidebar-more"}>
        <ul class="nav-list-more">
          <li style={{ width: "0px" }}>
            <a href="#">
              <i class="bx bx-grid-alt" style={{ color: "transparent" }}></i>
              <span class="links_name-more">Dashboard</span>
            </a>
            <span class="tooltip-more">Dashboard</span>
          </li>
          <li style={{ width: "0px" }}>
            <a href="#">
              <i class="bx bx-user" style={{ color: "transparent" }}></i>
              <span class="links_name-more">User</span>
            </a>
            <span class="tooltip-more">User</span>
          </li>
          <li style={{ width: "0px" }}>
            <a href="#">
              <i class="bx bx-chat" style={{ color: "transparent" }}></i>
              <span class="links_name-more">Messages</span>
            </a>
            <span class="tooltip-more">Messages</span>
          </li>
          <li style={{ width: "0px" }}>
            <a href="#">
              <i
                class="bx bx-pie-chart-alt-2"
                style={{ color: "transparent" }}
              ></i>
              <span class="links_name-more">Analytics</span>
            </a>
            <span class="tooltip-more">Analytics</span>
          </li>
          <li style={{ width: "0px" }}>
            <a href="#">
              <i class="bx bx-folder" style={{ color: "transparent" }}></i>
              <span class="links_name-more">File Manager</span>
            </a>
            <span class="tooltip-more">Files</span>
          </li>
          <li>
            <a href="#" onClick={() => navigate("/support")}>
              <i class="bx bx-support"></i>
              <span class="links_name-more">Support</span>
            </a>
            <span class="tooltip-more">Support</span>
          </li>
          <li>
            <a href="#">
              <i class="bx bx-trending-up"></i>
              <span class="links_name-more">Packages</span>
            </a>
            <span class="tooltip-more">Packages</span>
          </li>
          <li>
            <a href="#" onClick={() => handleSignout()}>
              <i class="bx bx-log-out"></i>
              <span class="links_name-more">Log Out</span>
            </a>
            <span class="tooltip-more">Log Out</span>
          </li>
        </ul>
      </div>
    </>
  );
}
