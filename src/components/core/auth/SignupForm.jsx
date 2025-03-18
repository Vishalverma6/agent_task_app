import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { signUp } from "../../../services/operations/authAPI";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { fullName, email, password, confirmPassword } = formData;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    dispatch(signUp(fullName, email, password, confirmPassword, navigate));

    setFormData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const changeHandler = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Sign Up as an Agent</h2>

        {/* Full Name */}
        <label className="block mb-4">
          <p className="text-lg font-medium text-gray-700 mb-1">Full Name<sup className="text-red-500">*</sup></p>
          <input
            type="text"
            name="fullName"
            value={fullName}
            placeholder="Enter Your Full Name"
            onChange={changeHandler}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
          />
        </label>

        {/* Email */}
        <label className="block mb-4">
          <p className="text-lg font-medium text-gray-700 mb-1">Email Address<sup className="text-red-500">*</sup></p>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter Email Address"
            onChange={changeHandler}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
          />
        </label>

        {/* Password */}
        <label className="block mb-4 relative">
          <p className="text-lg font-medium text-gray-700 mb-1">Create Password<sup className="text-red-500">*</sup></p>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              placeholder="Enter Password"
              onChange={changeHandler}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <AiOutlineEyeInvisible fontSize={24} /> : <AiOutlineEye fontSize={24} />}
            </span>
          </div>
        </label>

        {/* Confirm Password */}
        <label className="block mb-6 relative">
          <p className="text-lg font-medium text-gray-700 mb-1">Confirm Password<sup className="text-red-500">*</sup></p>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={changeHandler}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <AiOutlineEyeInvisible fontSize={24} /> : <AiOutlineEye fontSize={24} />}
            </span>
          </div>
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-medium hover:shadow-md hover:from-blue-700 hover:to-blue-600 transition-all duration-300"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
