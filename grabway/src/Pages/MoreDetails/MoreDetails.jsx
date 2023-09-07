import React, { useEffect } from "react";
import { useLocation, Navigate, Link } from "react-router-dom";
import "./details.css";

export default function MoreDetails() {
  const location = useLocation();
  if (!location.state) {
    return <Navigate to={"/"} />;
  }
  // const location.state = location.state;
  const matchDriverRoute=location.state.matchDriverRoute;
  const UserQuery=location.state.UserQuery;
  //origin
  const orgMst =
    Number(location.state.state.route.originTime[0].start.split(":")[0]) >= 12
      ? " PM"
      : " AM";
  let orgtimest =
    (
      Number(location.state.state.route.originTime[0].start.split(":")[0]) % 12
    ).toString() +
    ":" +
    location.state.state.route.originTime[0].start.split(":")[1] +
    orgMst;

  const orgMen =
    Number(location.state.state.route.originTime[0].end.split(":")[0]) >= 12
      ? " PM"
      : " AM";
  let orgtimeen =
    (
      Number(location.state.state.route.originTime[0].end.split(":")[0]) % 12
    ).toString() +
    ":" +
    location.state.state.route.originTime[0].end.split(":")[1] +
    orgMen;

  //destination
  const destMst =
    Number(location.state.state.route.destinationTime[0].start.split(":")[0]) >= 12
      ? " PM"
      : " AM";
  let desttimest =
    (
      Number(location.state.state.route.destinationTime[0].start.split(":")[0]) % 12
    ).toString() +
    ":" +
    location.state.state.route.destinationTime[0].start.split(":")[1] +
    destMst;

  const destMen =
    Number(location.state.state.route.destinationTime[0].end.split(":")[0]) >= 12
      ? " PM"
      : " AM";
  let desttimeen =
    (
      Number(location.state.state.route.destinationTime[0].end.split(":")[0]) % 12
    ).toString() +
    ":" +
    location.state.state.route.destinationTime[0].end.split(":")[1] +
    destMen;

  console.log(location.state);

  const finalTime = {
    origin: [orgtimest, orgtimeen],
    destination: [desttimest, desttimeen],
  };
  return (
    <main class="profile-page">
      <section class="relative block h-500-px">
        <div
          class="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/free-vector/red-sedan-car-isolated-white-vector_53876-64366.jpg?w=900&t=st=1692895124~exp=1692895724~hmac=9084cfe1f9e13be10c20ff75317e808efbecd741a345ac619f7814540a6abf66')",
          }}
        >
          <span
            id="blackOverlay"
            class="w-full h-full absolute opacity-50 bg-black"
          ></span>
        </div>
        <div
          class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
          style={{ transform: "translateZ(0px)" }}
        >
          <svg
            class="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              class="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </section>
      <section class="relative py-16 bg-blueGray-200">
        <div class="container mx-auto px-4">
          <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div class="px-6">
              <div class="flex flex-wrap justify-center">
                <div class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div class="relative">
                    <img
                      alt="..."
                      src={
                        location.state.state.profilePicture.length !== 0
                          ? location.state.state.profilePicture
                          : "/assets/images/user.png"
                      }
                      class="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                    />
                  </div>
                </div>
                <div class="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div class="py-6 px-3 mt-32 sm:mt-0">
                    <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600 pb-[5px]">
                      Vehicle No.
                    </span>
                    <button
                      class="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      {location.state.state.VehicleNumber.slice(0, 2) +
                        " " +
                        location.state.state.VehicleNumber.slice(2)}
                    </button>
                  </div>
                </div>
                <div class="w-full lg:w-4/12 px-4 lg:order-1">
                  <div class="flex justify-center py-4 lg:pt-4 pt-8">
                    <div class="mr-4 p-3 text-center">
                      <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        Driving License
                      </span>
                      <span class="text-lg text-blueGray-400 font-bold">
                        {location.state.state.drivingLicenseNumber.slice(0, 2) +
                          "*".repeat(
                            location.state.state.drivingLicenseNumber.length - 4
                          ) +
                          location.state.state.drivingLicenseNumber.slice(-2)}
                      </span>
                    </div>
                    <div class="mr-4 p-3 text-center">
                    <Link to='/userCheckout' state={{matchDriverRoute:matchDriverRoute, UserQuery:UserQuery}}>
                      <button
                        // onClick={handleBookNow}
                        class="bg-theme text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800"
                      >
                        Grab it
                      </button></Link>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-center mt-12">
                <h3 class="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                  {location.state.name}
                </h3>
                <div className="ico1 text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  {location.state.state.route.origin[0].text}
                </div>
                <div className="ico2 text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
                  {location.state.state.route.destination[0].text}
                </div>
              </div>
              <div class="py-10 border-t border-blueGray-200 text-center">
                <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
                  <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Pickup
                  </span>
                </button>
                <div class="flex flex-wrap justify-center">
                  <div class="w-full lg:w-9/12 px-4">
                    <blockquote class="text-2xl font-semibold italic text-center text-slate-900">
                      <span style={{ paddingRight: "10px" }}>
                        The Driver usually picks up at
                      </span>
                      <span
                        class="before:block before:absolute before:-inset-1 before:-skew-y-0 relative inline-block"
                        style={{
                          background: "#e51b23",
                          paddingRight: "1%",
                          paddingLeft: "1%",
                        }}
                      >
                        <span class="relative text-white">
                          {finalTime.origin[0]}
                        </span>
                      </span>
                    </blockquote>
                    <blockquote
                      class="text-2xl font-semibold italic text-center text-slate-900"
                      style={{ marginTop: "2%" }}
                    >
                      <span style={{ paddingRight: "10px" }}>
                        but he can still manages to pick you up till
                      </span>
                      <span
                        class="before:block before:absolute before:-inset-1 before:-skew-y-0 relative inline-block"
                        style={{
                          background: "green",
                          paddingRight: "1%",
                          paddingLeft: "1%",
                        }}
                      >
                        <span class="relative text-white">
                          {finalTime.origin[1]}
                        </span>
                      </span>
                    </blockquote>
                  </div>
                </div>
              </div>

              <div class="py-10 border-t border-blueGray-200 text-center">
                <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                  <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Drop
                  </span>
                </button>
                <div class="flex flex-wrap justify-center">
                  <div class="w-full lg:w-9/12 px-4">
                    <blockquote class="text-2xl font-semibold italic text-center text-slate-900">
                      <span style={{ paddingRight: "10px" }}>
                        The Driver will peacefully drop you by
                      </span>
                      <span
                        class="before:block before:absolute before:-inset-1 before:-skew-y-0 relative inline-block"
                        style={{
                          background: "#e51b23",
                          paddingRight: "1%",
                          paddingLeft: "1%",
                        }}
                      >
                        <span class="relative text-white">
                          {finalTime.destination[0]}
                        </span>
                      </span>
                    </blockquote>
                    <blockquote
                      class="text-2xl font-semibold italic text-center text-slate-900"
                      style={{ marginTop: "2%" }}
                    >
                      <span style={{ paddingRight: "10px" }}>
                        but in some scenarios it can be extended till
                      </span>
                      <span
                        class="before:block before:absolute before:-inset-1 before:-skew-y-0 relative inline-block"
                        style={{
                          background: "green",
                          paddingRight: "1%",
                          paddingLeft: "1%",
                        }}
                      >
                        <span class="relative text-white">
                          {finalTime.destination[1]}
                        </span>
                      </span>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
