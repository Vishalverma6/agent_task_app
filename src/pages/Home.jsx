import React from "react";
import Footer from "../components/common/Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Home = () => {
    const {token} =  useSelector((state)=>state.auth)
    const navigate = useNavigate();
    const clickHandler = ()=> {

        if(token){
            navigate("/dashboard/upload-file")
        }
        else{
            toast.error("please login first to add task")
            navigate("/login")
        }
    }
    const taskHandler = async()=> {
        if(token){
            navigate("/dashboard/get-task")
        }
        else{
            toast.error("please login first to see the task list")
            navigate("/login")
        }
    }

  return (
    <div className="min-h-screen  bg-gray-100 py-20">
      {/* App Title */}
      <h1 className="text-5xl font-extrabold text-gray-800 text-center">Agent Task App</h1>
      <p className="text-gray-600 text-lg text-center mt-2">
        Stay on top of your assignments and manage tasks efficiently.
      </p>

      {/* Introduction Section */}
      <div className="mt-10 flex flex-col items-center">
        <h2 className="text-3xl font-semibold text-gray-700">Your Mission, Simplified</h2>
        <p className="text-gray-600 mt-2 text-lg">
          Whether you're tracking tasks, completing assignments, or managing operations, our app ensures you stay organized and productive.
        </p>
      </div>

      {/* Features Section */}
      <div className="mt-10 flex flex-col items-center">
        <h2 className="text-3xl font-semibold text-gray-700">Key Features</h2>
        <ul className="mt-4 text-gray-700 text-lg space-y-3">
          <li> Task Assignment & Management</li>
          <li>Real-Time Status Updates</li>
          <li> Easy Collaboration with Agents</li>
          <li> Secure & Fast Access</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="mt-12 flex justify-center gap-6">
        <button 
         onClick={taskHandler}
        className="bg-blue-600 cursor-pointer text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700">
          View Tasks
        </button>
        <button 
         onClick={clickHandler}
        className="bg-green-600 cursor-pointer text-white px-6 py-3 rounded-lg text-lg hover:bg-green-700">
          Add New Task
        </button>
      </div>

      {/* footer */}
      <Footer/>
    </div>
  );
};

export default Home;
