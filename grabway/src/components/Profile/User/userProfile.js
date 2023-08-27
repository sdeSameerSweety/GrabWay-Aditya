import React from "react";

// components

export default function userProfile({ userData }) {
  const imgProfile = {
    borderRadius: "50%",
    width: "54%",
  };

  const data = JSON.parse(userData);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="relative flex justify-center">
                <img
                  alt="..."
                  src="assets/images/user.png"
                  style={imgProfile}
                />
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
              Jenna Stones
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
              Los Angeles, California
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
