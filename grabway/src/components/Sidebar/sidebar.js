import React, { useState } from "react";
import "./sidebar.css";
import { Switch, Divider } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [sidebarClass, setSidebarClass] = useState("sidebar");
  const toggleClass = () => {
    if (sidebarClass === "sidebar open") setSidebarClass("sidebar");
    else setSidebarClass("sidebar open");
  };

  const handleSignout = () => {
    console.log("Signout Successfull");
  };

  return (
    <>
      <div class={sidebarClass}>
        <div class="logo-details">
          <i
            class={sidebarClass === "sidebar" ? "bx bx-menu" : "bx bx-x-circle"}
            style={{ color: "black" }}
            id="btn"
            onClick={toggleClass}
          ></i>
        </div>
        <ul class="nav-list">
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

          <li class="profile">
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
    </>
  );
}
