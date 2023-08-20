import React from "react";
import TopBar from "./TopNavBar/TopBar";
import Sidebar from "./Sidebar/sidebar";
import { useState } from "react";

const Navbar = ({
  classDisplay,
  setClassDislay,
  setDisplayVal,
  setLoginState,
}) => {
  const [counter, setCounter] = useState(false);
  return (
    <div>
      <div>
        <TopBar
          counter={counter}
          setCounter={setCounter}
          setLoginState={setLoginState}
        />
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
