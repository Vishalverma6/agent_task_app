import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdCancel } from "react-icons/md";
import { addAgent } from "../../../../services/operations/agentAPI";
import AllAgent from "./AllAgent";
import { useSelector } from "react-redux";

const countryCodes = [
  { code: "+1", countryName: "USA" },
  { code: "+91", countryName: "India" },
  { code: "+44", countryName: "UK" },
  { code: "+61", countryName: "Australia" },
];

const Agent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAgent, setNewAgent]= useState();
  const {token} = useSelector((state)=> state.auth);
  console.log("token",token);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      countryCode: "+91", 
    },
  });

  
  const onSubmit = async(data) => {
    const result = await addAgent(data,token);
    setNewAgent(result)
    // toast.success("Agent added successfully!");
    reset();
    setIsModalOpen(false); 
  };

  return (
    <div className="flex flex-col  items-center">
      {/* Add Agent Button */}
      <button

        onClick={() => setIsModalOpen(true)}
        className=" cursor-pointer px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Add Agent
      </button>

      {/* All agent  */}
      <div className="mr-32">
      <AllAgent newAgent= {newAgent} />
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-md relative">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="cursor-pointer absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
            >
              <MdCancel />
            </button>

            <h2 className="text-2xl font-bold text-center mb-4">Add New Agent</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Agent Name */}
              <div>
                <label className="block font-semibold">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter agent name"
                  {...register("name", { required: true })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block font-semibold">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  {...register("email", { required: true })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
              </div>

              {/* Mobile Number with Country Code */}
              <div>
                <label className="block font-semibold">Mobile Number</label>
                <div className="flex space-x-2">
                  {/* Country Code Dropdown */}
                  <select
                    {...register("countryCode", { required: true })}
                    
                    className="w-1/4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Code</option>
                    {countryCodes.map((country, index) => (
                      <option key={index} value={country.code} selected="">
                       
                        {country.code} ({country.countryName})
                      </option>
                    ))}
                  </select>

                  {/* Phone Number Input */}
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    {...register("phone", { required: true })}
                    className="w-3/4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {errors.countryCode && <p className="text-red-500 text-sm">Country code is required</p>}
                {errors.phone && <p className="text-red-500 text-sm">Phone number is required</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="cursor-pointer w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Add Agent
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Agent;
