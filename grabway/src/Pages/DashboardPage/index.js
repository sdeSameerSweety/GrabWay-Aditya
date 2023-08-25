import React from "react";
import HeaderStats from "../../components/DashboardComponents/HeaderStats";
import GrabWayVisits from "../../components/DashboardComponents/GrabWayVisits";
import DashBoardMap from "../../components/DashboardComponents/DashBoardMap";
import TopDrivers from "../../components/DashboardComponents/TopDrivers";
import DriversCustomerChart from "../../components/DashboardComponents/DriversCustomerChart";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

export default function Dashboard() {

  const userData=(Cookies.get('grabwayUser'));
  if(userData){
    if(!(JSON.parse(userData)).name){
      return <Navigate to={"/registration"}/>
    }
  }
  if(!userData){
      return <Navigate to={"/"}/>
  }
  return (
    <>
      <HeaderStats />
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <DriversCustomerChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <GrabWayVisits />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <DashBoardMap />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <TopDrivers />
        </div>
      </div>
    </>
  );
}
