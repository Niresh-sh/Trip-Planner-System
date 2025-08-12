import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import registerService from "../../services/RegisterService";
import loginImage from "../../assets/login.png";
import { GoogleLogin } from "@react-oauth/google";


const AuthModal = ({ isOpen, onClose }) => {
  const [isLoginView, setIsLoginView] = useState(true); // Toggle login/register

  // Shared form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Register-only fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Reset fields on modal close or toggle
  const resetForm = () => {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setConfirmPassword("");
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          email,
          password,
        }
      );

      const user = response.data;

      if (user && user.email === email) {
        localStorage.setItem("token", user.token);
        localStorage.setItem("id", user._id);
        localStorage.setItem("email", user.email);
        toast.success("Login successful");
        onClose();
        navigate("Destinations");
        resetForm();
      } else {
        toast.error("Invalid email or password");
      }
    } catch (err) {
      toast.error("Login failed: " + err.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    try {
      await registerService(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        navigate
      );
      setIsLoginView(true);
      resetForm();
      onClose();
    } catch (e) {
      toast.error("User cannot be created: " + e.message);
    }
  };

    // Google success callback
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      // "credential" is the Google ID token
      const idToken = credentialResponse.credential;

      // POST to your Node backend
      const response = await axios.post("http://localhost:3000/google-login", {
        id_token: idToken,
      });
      console.log("Google Login response:", response.data);

      // Extract any data you want to store
      const {
        email,
        firstName,
        token
      } = response.data;

      // Store in localStorage for example
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      localStorage.setItem("firstName", firstName);
      // localStorage.setItem("role", role);
      // localStorage.setItem("user_id", user_id);
      // localStorage.setItem("is_Verified", is_Verified);

      // Navigate based on role
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/Home");
      }
    } catch (err) {
      console.error(err);
      setError("Google login failed. Please try again.");
    }
  };

  // Google error callback
  const handleGoogleLoginError = () => {
    setError("Google login failed. Please try again.");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex justify-center items-center z-50">
      <div className="relative bg-white rounded-lg shadow-lg max-w-4xl w-full">
        {/* Close Button */}
        <button
          className="absolute top-2 right-3 text-2xl text-gray-500 hover:text-black"
          onClick={() => {
            resetForm();
            onClose();
          }}
        >
          &times;
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* Image */}
          <div
            className="hidden lg:block lg:w-1/2 bg-cover bg-center"
            style={{ backgroundImage: `url(${loginImage})` }}
          ></div>

          {/* Form */}
          <div className="w-full p-8 lg:w-1/2">
            <h2 className="text-2xl font-semibold text-gray-700 text-center">
              Trip Planner
            </h2>
            <p className="text-xl text-gray-600 text-center">
              {isLoginView ? "Welcome back!" : "Welcome!"}
            </p>

            {isLoginView && (
              <Link
                to="#"
                className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"
              >
                <div className="px-4 py-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 533.5 544.3"
                    className="h-6 w-6"
                  >
                    <path
                      fill="#4285F4"
                      d="M533.5 278.4c0-17.4-1.4-34-4.1-50.2H272v95h146.9c-6.4 34-25.6 62.7-54.7 81.9l88.4 68.7c51.6-47.6 81.9-117.7 81.9-195.4z"
                    />
                    <path
                      fill="#34A853"
                      d="M272 544.3c73.6 0 135.4-24.4 180.6-66.4l-88.4-68.7c-24.6 16.6-56 26.3-92.2 26.3-70.8 0-130.8-47.8-152.3-112.1l-90.2 69.5c44.4 87.5 135 151.4 242.9 151.4z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M119.7 323.4C114.3 306.8 111.2 289 111.2 270.9c0-18.1 3.1-35.9 8.5-52.5l-90.2-69.5C11.2 192.6 0 230.4 0 270.9s11.2 78.3 29.5 111.9l90.2-69.4z"
                    />
                    <path
                      fill="#EA4335"
                      d="M272 107.7c39.9 0 75.6 13.7 103.8 40.8l77.9-77.9C407.4 26.3 345.6 0 272 0 164.1 0 73.5 63.9 29.5 159l90.2 69.5C141.2 155.5 201.2 107.7 272 107.7z"
                    />
                  </svg>
                </div>
                <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">
                  Sign in with Google
                  <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onError={handleGoogleLoginError}
                    
                  />
                </h1>
              </Link>
            )}
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 lg:w-1/4"></span>
              {isLoginView && (
                <Link
                  to="#"
                  className="text-xs text-center text-gray-500 uppercase"
                >
                  or login with email
                </Link>
              )}
              <span className="border-b w-1/5 lg:w-1/4"></span>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center mt-2">
                {error}
              </div>
            )}

            <form onSubmit={isLoginView ? handleLogin : handleRegister}>
              {!isLoginView && (
                <>
                  <div className="mt-4">
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="mt-4">
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full"
                      placeholder="Last Name"
                    />
                  </div>
                </>
              )}

              <div className="mt-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full"
                  placeholder="Email"
                  required
                />
              </div>

              <div className="mt-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full"
                  placeholder="Password"
                  required
                />
              </div>

              {!isLoginView && (
                <div className="mt-4">
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full"
                    placeholder="Confirm Password"
                    required
                  />
                </div>
              )}

              <div className="mt-8">
                <button
                  type="submit"
                  className="bg-green-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                >
                  {isLoginView ? "Login" : "Register"}
                </button>
              </div>

              <div className="mt-4 text-center text-sm text-gray-500">
                {isLoginView ? (
                  <>
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setIsLoginView(false);
                        setError("");
                      }}
                      className="text-green-700 underline"
                    >
                      Register
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setIsLoginView(true);
                        setError("");
                      }}
                      className="text-green-700 underline"
                    >
                      Login
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
