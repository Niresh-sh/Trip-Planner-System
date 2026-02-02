import React, { useState, useEffect } from "react";
import login from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const backendURL = import.meta.env.VITE_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${backendURL}/api/users/login`, {
        email,
        password,
      });

      const user = response.data; 

      if (user && user.token) {
        
        localStorage.setItem("token", user.token);
        localStorage.setItem("id", user._id);
        localStorage.setItem("email", user.email);
        localStorage.setItem("role", user.role);
        localStorage.setItem("firstName", user.firstName);
        localStorage.setItem("lastName", user.lastName);

        toast.success("Login successful");

        if (user.role === "admin") {
          navigate("/admin/admindashboard");
        } else {
          toast.error("You are not authorized to access admin panel.");
        }
      } else {
        setError("Invalid login response");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token && role !== "admin") {
    toast.error("You are logged in as a normal user. Please logout to access admin.");
    navigate("/"); 
  }
}, []);


  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex justify-center items-center z-50">
      <div className="relative bg-white rounded-lg shadow-lg max-w-4xl w-full">
        {/* Close button - you can add functionality or remove */}
        <button
          className="absolute top-2 right-3 text-2xl text-gray-500 hover:text-black"
          onClick={() => navigate("/")} 
          disabled={loading}
          aria-label="Close"
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
              Admin Panel
            </h2>
            <p className="text-xl text-gray-600 text-center mb-4">Welcome back!</p>

            <div className="mt-6 flex items-center justify-between">
              <span className="border-b w-1/5 lg:w-1/4"></span>
              <span className="text-xs text-center text-gray-500 uppercase">
                or login with email
              </span>
              <span className="border-b w-1/5 lg:w-1/4"></span>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center mt-3">{error}</div>
            )}

            <form onSubmit={handleLogin} className="mt-6">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full mb-4"
                placeholder="Email"
                required
                disabled={loading}
              />

              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-gray-700 text-sm font-bold">Password</label>
                  <Link to="/ForgetPassword" className="text-xs text-gray-500 hover:underline">
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
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                className={`bg-green-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
