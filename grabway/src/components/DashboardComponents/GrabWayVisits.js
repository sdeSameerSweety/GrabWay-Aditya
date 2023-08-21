import React from "react";
import {
  CircularProgress,
  CircularProgressLabel,
  Divider,
} from "@chakra-ui/react";

export default function GrabWayVisits() {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              {/* <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                Performance
              </h6> */}
              <h2 className="text-blueGray-700 text-xl font-semibold">
                Visits
              </h2>
              <Divider paddingBottom="5%" />
            </div>
          </div>
        </div>
        <div className="p-4 flex justify-center gap-[25%]">
          <CircularProgress
            value={40}
            size="130px"
            color="#168eff"
            thickness="6px"
          >
            <CircularProgressLabel
              fontSize="14px"
              color="grey"
              fontFamily="sans-serif"
              fontWeight="medium"
              paddingBottom="12%"
            >
              App Visits
            </CircularProgressLabel>
            <CircularProgressLabel fontSize="24px" marginTop="11.5%">
              5847
            </CircularProgressLabel>
          </CircularProgress>
          <CircularProgress
            value={40}
            size="130px"
            color="#e51b23"
            thickness="6px"
          >
            <CircularProgressLabel
              fontSize="14px"
              color="grey"
              fontFamily="sans-serif"
              fontWeight="medium"
              paddingBottom="12%"
            >
              Active Users
            </CircularProgressLabel>
            <CircularProgressLabel fontSize="24px" marginTop="11.5%">
              2926
            </CircularProgressLabel>
          </CircularProgress>
        </div>
      </div>
    </>
  );
}
