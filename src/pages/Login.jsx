import Footer from "../components/common/Footer";
import LoginForm from "../components/core/auth/LoginForm";

const Login = () => {
  return (
    <div className="flex flex-col justify-center items-center py-12 bg-gray-100">
      {/* App Title */}
      <h1 className="text-3xl font-bold mb-4">Welcome to Agent Task App</h1>
      <p className="text-lg text-gray-600 mb-6">Securely manage and track your tasks with ease.</p>

      {/* Login Form Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Login</h2>
        <LoginForm />
      </div>

      {/* Additional Info */}
      <p className="mt-6 text-gray-600 text-sm">
        Need an account? <a href="/signup" className="text-blue-600 hover:underline">Sign up here</a>
      </p>

      {/* footer */}
      <Footer/>
    </div>
  );
};

export default Login;
