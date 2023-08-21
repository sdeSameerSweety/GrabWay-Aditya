import React from "react";
import HeaderStats from "../../components/DashboardComponents/HeaderStats";
import DriversCustomerChart from "../../components/DashboardComponents/DriversCustomerChart";
import GrabWayVisits from "../../components/DashboardComponents/GrabWayVisits";
import DashBoardMap from "../../components/DashboardComponents/DashBoardMap";
import TopDrivers from "../../components/DashboardComponents/CardSocialTraffic";

export default function Dashboard() {
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
