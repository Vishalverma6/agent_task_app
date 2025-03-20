import React, { useEffect, useState } from "react";
import { getTaskByAgent } from "../../../../services/operations/taskAPI";
import { IoCall } from "react-icons/io5";
import { useSelector } from "react-redux";

const AgentTask = () => {
  const [agentTask, setAgentTask] = useState([]);
  const {token}= useSelector((state)=> state.auth);

  const getTaskByEachAgent = async () => {
    try {
      const result = await getTaskByAgent(token);
      console.log("Tasks:", result);
      setAgentTask(result);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    getTaskByEachAgent();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">Agent Tasks</h1>

      {agentTask.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks available</p>
      ) : (
        <div className="space-y-6">
          {agentTask.map((agentData, index) => (
            <div key={index} className="border p-6 rounded-lg shadow-lg bg-white">
              {/* Agent Details */}
              <h1 className="text-xl font-bold text-purple-700 border-b pb-2 mb-2">Agent Details</h1>
              <h2 className="text-lg font-semibold text-blue-700">{agentData.agent.name}</h2>
              <p className="text-gray-600">📧 {agentData.agent.email}</p>

              {/* Tasks */}
              <h1 className="text-lg font-bold text-green-700 border-b pb-2 mt-4 mb-2">Task List</h1>
              {agentData.tasks.length > 0 ? (
                <ul className="mt-3 space-y-3">
                  {agentData.tasks.map((task) => (
                    <li key={task._id} className="border p-3 rounded-md bg-gray-100 shadow-md">
                      <p className="text-gray-800 font-medium">{task.text}</p>
                      <p className="flex items-center text-gray-500">
                        <IoCall className="text-red-500 mr-1" /> {task.phone}
                      </p>
                      <p className="text-sm text-gray-400">
                        🕒 {new Date(task.createdAt).toLocaleString()}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 mt-2">No tasks assigned</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgentTask;
