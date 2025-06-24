import React from "react";
import Sidebar from "../components/core/dashboard/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);

  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-lg font-semibold text-gray-700 animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-50 p-6">
        {/* Dashboard Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

        {/* Page Content */}
        <div className=" shadow-md rounded-lg p-6 w-9/12 ml-64 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
