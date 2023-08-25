import React from "react";
import TopBar from "./TopNavBar/TopBar";
import Sidebar from "./Sidebar/sidebar";
import { useState } from "react";

const Navbar = ({
  classDisplay,
  setClassDislay,
  setDisplayVal,
  setLoginState,
  loginState
}) => {
  const [counter, setCounter] = useState(false);
  return (
    <div>
      <div>
        <TopBar
          counter={counter}
          setCounter={setCounter}
          setLoginState={setLoginState}
          loginState={loginState}
        />
      </div>
      <Sidebar
        classDisplay={classDisplay}
        setClassDisplay={setClassDislay}
        counter={counter}
        setDisplayVal={setDisplayVal}
        setCounter={setCounter}
        setLoginState={setLoginState}
        
      />
    </div>
  );
};

export default Navbar;
