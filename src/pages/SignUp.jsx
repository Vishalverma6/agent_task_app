import Footer from "../components/common/Footer";
import SignupForm from "../components/core/auth/SignupForm";

const Signup = () => {
  return (
    <div className="flex flex-col justify-center items-center py-12 bg-gray-100">
      {/* App Title */}
      <h1 className="text-4xl font-bold mb-4">Join Agent Task App</h1>
      <p className="text-lg text-gray-600 mb-6">Create an account to manage and track tasks efficiently.</p>

      {/* Signup Form Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Sign Up as an Admin</h2>
        <SignupForm />
      </div>

      {/* Login Redirect */}
      <p className="mt-6 text-gray-600 text-sm">
        Already have an account? <a href="/login" className="text-blue-600 hover:underline">Log in here</a>
      </p>

      {/* footer */}
      <Footer/>
    </div>
  );
};

export default Signup;
