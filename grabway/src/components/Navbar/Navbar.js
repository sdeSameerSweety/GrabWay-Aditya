import React from "react";
import TopBar from "./TopNavBar/TopBar";
import Sidebar from "./Sidebar/sidebar";

const Navbar = ({ classDisplay, setClassDislay }) => {
  return (
    <div>
      <div><TopBar /></div>
      <Sidebar classDisplay={classDisplay} setClassDisplay={setClassDislay} />
    </div>
  );
};

export default Navbar;
