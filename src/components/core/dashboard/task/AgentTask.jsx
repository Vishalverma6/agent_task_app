import React, { useEffect, useState } from "react";
import { getAllTask } from "../../../../services/operations/taskAPI";
import { useSelector } from "react-redux";

const AgentTask = () => {
  const [taskList, setTaskList] = useState([]);
  const { token } = useSelector((state) => state.auth);

  const fetchAllTask = async () => {
    try {
      const result = await getAllTask(token); // result is already a flat array
      setTaskList(result);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchAllTask();
  }, []);

  return (
    <div className="p-6  w-full min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">All Tasks</h1>

      {taskList.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks available</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border text-left w-16">S. No</th>
                <th className="px-4 py-2 border text-left w-32">Name</th>
                <th className="px-4 py-2 border text-left w-32">Phone</th>
                <th className="px-4 py-2 border text-left w-64">Notes</th>
                <th className="px-4 py-2 border text-left w-48">Agent Assigned</th>
              </tr>
            </thead>
            <tbody>
              {taskList.map((task, index) => (
                <tr key={task._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{task.firstName || "N/A"}</td>
                  <td className="px-4 py-2 border">{task.phone || "N/A"}</td>
                  <td className="px-4 py-2 border max-w-xs truncate">
                    {task.text || "No notes"}
                  </td>
                  <td className="px-4 py-2 border">{task.agent?.name || "Not Assigned"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AgentTask;
