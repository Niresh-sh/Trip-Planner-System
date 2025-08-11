import React, { useState } from "react";
import login from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Example local login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          params: { email, password },
        }
      );

      const users = response.data;

      // Find the user with matching email and password
      const matchedUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (matchedUser) {
        // Store matched user's ID and email in localStorage
        localStorage.setItem("id", matchedUser.id); // use correct ID field
        localStorage.setItem("email", matchedUser.email);

        toast.success("Login successful");
        console.log("Local login response:", matchedUser);

        onClose();
        navigate("Destinations");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (err) {
      toast.error("Login failed: " + err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex justify-center items-center z-50">
      <div className="relative bg-white rounded-lg shadow-lg max-w-4xl w-full">
        {/* Close button */}
        <button
          className="absolute top-2 right-3 text-2xl text-gray-500 hover:text-black"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* Image section */}
          <div
            className="hidden lg:block lg:w-1/2 bg-cover bg-center"
            style={{ backgroundImage: `url(${login})` }}
          ></div>

          {/* Form section */}
          <div className="w-full p-8 lg:w-1/2">
            <h2 className="text-2xl font-semibold text-gray-700 text-center">
              Trip Planner
            </h2>
            <p className="text-xl text-gray-600 text-center">Welcome back!</p>

            <Link
              to="#"
              className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"
            >
              <div className="px-4 py-3">
                <svg className="h-6 w-6" viewBox="0 0 40 40">
                  {/* Google icon paths */}
                </svg>
              </div>
              <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">
                Sign in with Google
              </h1>
            </Link>

            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 lg:w-1/4"></span>
              <Link
                to="#"
                className="text-xs text-center text-gray-500 uppercase"
              >
                or login with email
              </Link>
              <span className="border-b w-1/5 lg:w-1/4"></span>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mt-4">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full"
                  placeholder="Email"
                  required
                />
              </div>

              <div className="mt-4">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                  <Link to="/ForgetPassword" className="text-xs text-gray-500">
                    Forget Password?
                  </Link>
                </div>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full"
                  placeholder="Password"
                  required
                />
              </div>

              <div className="mt-8">
                <button className="bg-green-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">
                  Login
                </button>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="border-b w-1/5 md:w-1/4"></span>
                <Link
                  to="/Register"
                  className="text-xs text-gray-500 uppercase"
                >
                  or Register
                </Link>
                <span className="border-b w-1/5 md:w-1/4"></span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
