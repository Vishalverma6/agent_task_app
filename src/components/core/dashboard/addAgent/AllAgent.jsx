import React, { useEffect, useState } from "react";
import { getAllAgent } from "../../../../services/operations/agentAPI";
import { useSelector } from "react-redux";

const AllAgent = ({ newAgent }) => {
  const [agents, setAgents] = useState([]);
  const [showAgents, setShowAgents] = useState(false);
  const [openTaskAgentId, setOpenTaskAgentId] = useState(null); // NEW STATE
  const { token } = useSelector((state) => state.auth);

  const getAgent = async () => {
    try {
      const result = await getAllAgent(token);
      setAgents(result);
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };

  useEffect(() => {
    getAgent();
  }, [newAgent]);

  // Toggle task list for the agent
  const handleShowTasks = (agentId) => {
    if (openTaskAgentId === agentId) {
      setOpenTaskAgentId(null); // Hide if already open
    } else {
      setOpenTaskAgentId(agentId); // Show for this agent
    }
  };

  return (
    <div className="w-11/12 p-6">
      <button
        onClick={() => setShowAgents(!showAgents)}
        className="bg-blue-600 text-white fixed px-4 py-2 rounded-md cursor-pointer shadow-md hover:bg-blue-700 transition"
      >
        {showAgents ? "Hide Agents" : "Show All Agents"}
      </button>

      <div className="w-full mt-40">
        {showAgents && agents.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">S. No</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Phone</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">No. of Tasks</th>
                  <th className="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {agents.map((agent, index) => (
                  <React.Fragment key={agent._id}>
                    <tr className="text-center">
                      <td className="px-4 py-2 border">{index + 1}</td>
                      <td className="px-4 py-2 border">{agent.name}</td>
                      <td className="px-4 py-2 border">{agent.phone}</td>
                      <td className="px-4 py-2 border">{agent.email}</td>
                      <td className="px-4 py-2 border">{agent.tasks?.length || 0}</td>
                      <td className="px-4 py-2 border">
                        <button
                          onClick={() => handleShowTasks(agent._id)}
                          className="bg-green-600 cursor-pointer hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm"
                        >
                          {openTaskAgentId === agent._id ? "Hide Tasks" : "View Tasks"}
                        </button>
                      </td>
                    </tr>

                    {/* Task List Row (conditionally rendered) */}
                    {openTaskAgentId === agent._id && agent.tasks.length > 0 && (
                      <tr>
                        <td colSpan="6" className="px-4 py-2 border bg-gray-50">
                          <ul className="list-disc ml-5 space-y-1 text-left text-gray-700">
                            {agent.tasks.map((task, i) => (
                              <li key={task._id || i}>
                                <strong>Task {i + 1}:</strong> {task.text} &nbsp;
                                <span className="text-sm text-gray-500">
                                  ({new Date(task.createdAt).toLocaleString()})
                                </span>
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    )}

                    {/* No tasks */}
                    {openTaskAgentId === agent._id && agent.tasks.length === 0 && (
                      <tr>
                        <td colSpan="6" className="px-4 py-2 border bg-gray-50 text-center text-gray-500">
                          No tasks assigned to this agent.
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          showAgents && <p className="text-gray-500 mt-4">No agents available</p>
        )}
      </div>
    </div>
  );
};

export default AllAgent;
