import React, { useState } from "react";
import { Avatar, Divider } from "@chakra-ui/react";

export default function TopDrivers() {
  const [topDrivers, setTopDrivers] = useState([
    {
      img: "https://bit.ly/kent-c-dodds",
      name: "Kittu Singh",
      email: "kittu@gmail.com",
      status: "offline",
    },
    {
      img: "https://bit.ly/kent-c-dodds",
      name: "Kittu Singh",
      email: "kittu@gmail.com",
      status: "offline",
    },
    {
      img: "https://bit.ly/kent-c-dodds",
      name: "Kittu Singh",
      email: "kittu@gmail.com",
      status: "online",
    },
    {
      img: "https://bit.ly/kent-c-dodds",
      name: "Kittu Singh",
      email: "kittu@gmail.com",
      status: "online",
    },
  ]);

  function getStatus(item) {
    if (item.status === "online") return "bg-green-500";
    else return "bg-red-500";
  }
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Top Drivers
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                className="bg-indigo-500 text-black hover:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                See all
              </button>
            </div>
          </div>
        </div>
        <Divider />
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <tbody>
              {topDrivers.map((item) => (
                <tr>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    <Avatar name="Kent Dodds" src={item.img} />
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 flex flex-col">
                    <div style={{ fontSize: "medium", paddingBottom: "5%" }}>
                      {item.name}
                    </div>
                    <div style={{ color: "GrayText", fontSize: "small" }}>
                      {item.email}
                    </div>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <div className="flex items-center">
                      <div className="relative w-full">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                          <div
                            style={{ width: "100%" }}
                            className={
                              "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center " +
                              getStatus(item)
                            }
                          ></div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
