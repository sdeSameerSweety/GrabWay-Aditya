import React from "react";
import TopBar from "./TopNavBar/TopBar";
import Sidebar from "./Sidebar/sidebar";
import { useState } from "react";

const Navbar = ({
  classDisplay,
  setClassDislay,
  displayVal,
  setDisplayVal,
}) => {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <div>
        <TopBar counter={counter} setCounter={setCounter} />
      </div>
      <Sidebar
        classDisplay={classDisplay}
        setClassDisplay={setClassDislay}
        counter={counter}
        setDisplayVal={setDisplayVal}
      />
    </div>
  );
};

export default Navbar;
