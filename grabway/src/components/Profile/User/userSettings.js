import { useStatStyles } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";

// components

export default function UserSettings({ userData }) {
  const data = JSON.parse(userData);
  const toast = useToast();
  var name = data.name.split(" ");
  const [displayData, setDisplayData] = useState({});
  useEffect(() => {
    setDisplayData({
      username: data.email.slice(0, 5) + data._id.slice(0, 5),
      email: data.email,
      firstName: name[0],
      lastName: name.slice(1).join(" "),
      phone: data.phoneNumber,
      address:
        data.address[0].addressLine1 + " " + data.address[0].addressLine2,
      city: data.address[0].city,
      state: data.address[0].state,
      pin: data.address[0].pincode,
    });
  }, []);
  // console.log(displayData);
  const [editData, setEditData] = useState({});
  useEffect(() => {
    setEditData({
      username: data.email.slice(0, 5) + data._id.slice(0, 5),
      email: data.email,
      firstName: name[0],
      lastName: name.slice(1).join(" "),
      phone: data.phoneNumber,
      address:
        data.address[0].addressLine1 + " " + data.address[0].addressLine2,
      city: data.address[0].city,
      state: data.address[0].state,
      pin: data.address[0].pincode,
    });
  }, []);
  const [disabledState, setDisabledState] = useState(false);
  const [editVal, setEditVal] = useState("Edit Profile");
  const handlePincodeChange = async (e) => {
    const pincode = e.target.value;
    setEditData({
      ...editData,
      pin: pincode,
    });
    setDisplayData({ ...displayData, pin: pincode });

    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = await response.json();
      console.log(data);
      if (data && data[0].Status === "Error") {
        setEditData({
          ...editData,
          city: "",
          state: "",
        });
        setDisplayData({
          ...displayData,
          city: "",
          state: "",
        });
      }
      if (data && data[0].Status === "Success") {
        const postOffice = data[0].PostOffice[0];
        setEditData({
          ...editData,
          city: postOffice.Region,
          state: postOffice.State,
        });
        setDisplayData({
          ...displayData,
          city: postOffice.Region,
          state: postOffice.State,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  function isEmail(eemail) {
    for (var i = 0; i < eemail.length; i++)
      if (eemail.charAt(i) === "@") return true;
    return false;
  }

  const [dataStatus, setDataStatus] = useState({
    emptyStatus: true,
    email: false,
  });

  const handleProfileChanges = () => {
    console.log(editData);
    if (dataStatus.emptyStatus === true) {
      var ctr = 0;
      for (var property in editData) {
        if (editData[property].length === 0) {
          console.log(ctr);
          ctr++;
        }
      }
      if (ctr === 0) setDataStatus({ ...dataStatus, emptyStatus: false });
      else
        toast({
          title: "Fields cannot be left blank",
          status: "error",
          isClosable: true,
          position: "top-right",
        });
    } else {
      console.log("I am inside else");
      if (!isEmail(editData.email))
        toast({
          title: "Invalid Email",
          status: "error",
          isClosable: true,
          position: "top-right",
        });
      else {
        setDataStatus({ ...dataStatus, email: true });
        console.log("data ready to update");
      }
    }
  };
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">My account</h6>
            <button
              className="bg-theme text-white active:bg-rose-300 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={handleProfileChanges}
            >
              {editVal}
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              User Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={displayData.username}
                    disabled="true"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={displayData.email}
                    disabled={disabledState}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={displayData.firstName}
                    disabled={disabledState}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={displayData.lastName}
                    disabled={disabledState}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Contact Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={displayData.address}
                    disabled={disabledState}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    City
                  </label>
                  <input
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={displayData.city}
                    disabled="true"
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    State
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={displayData.state}
                    disabled="true"
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Postal Code
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={displayData.pin}
                    disabled={disabledState}
                    onChange={(e) => {
                      setEditData({
                        ...editData,
                        pin: e.target.value,
                      });
                      handlePincodeChange(e);
                    }}
                  />
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              About Me
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    About me
                  </label>
                  <textarea
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue="A beautiful UI Kit and Admin for React & Tailwind CSS. It is Free and Open Source."
                    disabled={disabledState}
                    rows="4"
                  ></textarea>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
