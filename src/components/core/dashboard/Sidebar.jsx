import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { GoFileDirectoryFill } from "react-icons/go";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className=" min-w-[222px] h-[calc(100vh-3.5rem)]  w-64 bg-gray-800 text-white flex flex-col p-5">
      {/* Sidebar Header */}
      <h2 className="text-xl font-bold mb-6 text-center">Task Agent</h2>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-4">
        <NavLink
          to="/dashboard/add-agent"
          className={({ isActive }) =>
            `p-3 flex items-center gap-x-2 rounded-md transition-all ${
              isActive ? "bg-blue-600" : "hover:bg-gray-700"
            }`
          }
        >
          <FaPlusCircle /> Add Agent
        </NavLink>

        <NavLink
          to="/dashboard/upload-file"
          className={({ isActive }) =>
            `p-3 flex items-center gap-x-2  rounded-md transition-all ${
              isActive ? "bg-blue-600" : "hover:bg-gray-700"
            }`
          }
        >
          <GoFileDirectoryFill className="text-yellow-300" /> Upload Task File
        </NavLink>

        <NavLink
          to="/dashboard/get-task"
          className={({ isActive }) =>
            `p-3 rounded-md transition-all ${
              isActive ? "bg-blue-600" : "hover:bg-gray-700"
            }`
          }
        >
          📋 Get Task by Agent
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
