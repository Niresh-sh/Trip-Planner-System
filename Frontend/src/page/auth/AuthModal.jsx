import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import registerService from "../../services/RegisterService";
import loginImage from "../../assets/login.png";
import { GoogleLogin } from "@react-oauth/google";

const AuthModal = ({ isOpen, onClose }) => {
  const [isLoginView, setIsLoginView] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setConfirmPassword("");
    setError("");
    setLoading(false);
  };

  const backendURL = "http://localhost:3000";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${backendURL}/api/users/login`, { email, password });
      const user = response.data;

      if (user && user.email === email) {
        localStorage.setItem("token", user.token);
        localStorage.setItem("id", user._id);
        localStorage.setItem("email", user.email);
        localStorage.setItem("firstName", user.firstName);
        localStorage.setItem("lastName", user.lastName);
        localStorage.setItem("role", user.role);
        toast.success("Login successful");
        onClose();
        resetForm();
        navigate("Destinations");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (err) {
      toast.error("Login failed: " + err.message);
    } finally {
      setLoading(false);
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
    setLoading(true);

    try {
      await registerService(firstName, lastName, email, password, confirmPassword, navigate);
      setIsLoginView(true);
      resetForm();
      onClose();
    } catch (e) {
      toast.error("User cannot be created: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      const idToken = credentialResponse.credential;

      const response = await axios.post(`${backendURL}/api/users/google-login`, {
        id_token: idToken,
      });

      const { email, firstName,lastName, token, role, _id } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      localStorage.setItem("firstName", firstName);
      localStorage.setItem("lastName", lastName);
      localStorage.setItem("role", role)
      localStorage.setItem("id", _id)

      toast.success('login successful!');
      onClose();
      resetForm();

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setError("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
          disabled={loading}
        >
          &times;
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div
            className="hidden lg:block lg:w-1/2 bg-cover bg-center"
            style={{ backgroundImage: `url(${loginImage})` }}
          ></div>

          {/* Form Section */}
          <div className="w-full p-8 lg:w-1/2">
            <h2 className="text-2xl font-semibold text-gray-700 text-center">Trip Planner</h2>
            <p className="text-xl text-gray-600 text-center">
              {isLoginView ? "Welcome back!" : "Welcome!"}
            </p>

            {/* Google Login Button */}
            {isLoginView && (
              <div className="flex justify-center mt-4">
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={handleGoogleLoginError}
                  useOneTap
                />
              </div>
            )}

            {/* Divider */}
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 lg:w-1/4"></span>
              {isLoginView && (
                <span className="text-xs text-center text-gray-500 uppercase">or login with email</span>
              )}
              <span className="border-b w-1/5 lg:w-1/4"></span>
            </div>

            {/* Error Message */}
            {error && <div className="text-red-500 text-sm text-center mt-2">{error}</div>}

            {/* Form */}
            <form onSubmit={isLoginView ? handleLogin : handleRegister}>
              {!isLoginView && (
                <>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full mt-4"
                    placeholder="First Name"
                    disabled={loading}
                    required
                  />
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full mt-4"
                    placeholder="Last Name"
                    disabled={loading}
                    required
                  />
                </>
              )}

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full mt-4"
                placeholder="Email"
                disabled={loading}
                required
              />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full mt-4"
                placeholder="Password"
                disabled={loading}
                required
              />

              {!isLoginView && (
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full mt-4"
                  placeholder="Confirm Password"
                  disabled={loading}
                  required
                />
              )}

              <button
                type="submit"
                className={`bg-green-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600 mt-8 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Please wait..." : isLoginView ? "Login" : "Register"}
              </button>
            </form>

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
                    disabled={loading}
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
                    disabled={loading}
                  >
                    Login
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
