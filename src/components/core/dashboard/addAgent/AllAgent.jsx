import React, { useEffect, useState } from "react";
import { getAllAgent } from "../../../../services/operations/agentAPI";
import { IoCall } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { useSelector } from "react-redux";

const AllAgent = ({ newAgent }) => {
  const [agents, setAgents] = useState([]);
  const [showAgents, setShowAgents] = useState(false); // Toggle state
  const { token } = useSelector((state) => state.auth);

  const getAgent = async () => {
    try {
      const result = await getAllAgent(token);
      setAgents(result);
      console.log("Agents:", result);
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };

  useEffect(() => {
    getAgent();
  }, [newAgent]);

  return (
    <div className="w-11/12  p-6">
      

      {/* Button to toggle agent list */}
      <button
        onClick={() => setShowAgents(!showAgents)}
        className="bg-blue-600 text-white fixed px-4 py-2  rounded-md cursor-pointer shadow-md hover:bg-blue-700 transition"
      >
        {showAgents ? "Hide Agents" : "Show All Agents"}
      </button>

      {/* Display agents if showAgents is true */}
      <div className="w-full mt-40">
        {showAgents && agents.length > 0 ? (
          <div className=" mt-4 gap-x-4 grid grid-cols-3 gap-5 ">
            {agents.map((agent) => (
              <div
                key={agent._id}
                className="border min-w-[230px] p-4  rounded-lg shadow-md bg-white"
              >
                <h2 className="text-xl font-semibold text-blue-700">
                  {agent.name}
                </h2>
                <p className="flex items-center gap-x-1 text-gray-600"><HiOutlineMail size={20} /> {agent.email}</p>
                <p className=" flex gap-x-1 items-center text-gray-600"><IoCall className="text-red-500" /> {agent.phone}</p>
                <p className="text-gray-500 text-sm">
                  🕒 Joined: {new Date(agent.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          showAgents && <p className="text-gray-500 mt-4">No agents available</p>
        )}
      </div>
    </div>
  );
};

export default AllAgent;
