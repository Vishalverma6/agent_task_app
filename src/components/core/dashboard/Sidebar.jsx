import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { GoFileDirectoryFill } from "react-icons/go";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="fixed top-[3.5rem] left-0 w-64 h-[calc(100vh-3.5rem)] bg-gray-800 text-white flex flex-col p-5 shadow-lg z-20">
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
            `p-3 flex items-center gap-x-2 rounded-md transition-all ${
              isActive ? "bg-blue-600" : "hover:bg-gray-700"
            }`
          }
        >
          <GoFileDirectoryFill className="text-yellow-300" /> Upload Task File
        </NavLink>

        <NavLink
          to="/dashboard/get-task"
          className={({ isActive }) =>
            `p-3 flex items-center gap-x-2 rounded-md transition-all ${
              isActive ? "bg-blue-600" : "hover:bg-gray-700"
            }`
          }
        >
          📋 Get All Task
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
