import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import registerService from "../../services/RegisterService";
import { useState } from "react";

function Register(isOpen, onClose) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError(""); // Clear previous errors

    try {
      await registerService(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        navigate
      );
       onClose();
        navigate("LoginModal");
    } catch (e) {
      toast.error("User cannot be created: " + e.message);
      console.log(e.message);
    }
  };
    if (!isOpen) return null;
  return (
    <>
    <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex justify-center items-center z-50">

      <div className="relative bg-white rounded-lg shadow-lg max-w-4xl w-full">
        {/* Close button */}
        <button
          className="absolute top-2 right-3 text-2xl text-gray-500 hover:text-black"
          onClick={onClose}
        >
          &times;
        </button>
      <div className="py-16 bg-gray-300">
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <div
            className="hidden lg:block lg:w-1/2 bg-cover"
            style={{
              backgroundImage: `url(https://images.pexels.com/photos/32182854/pexels-photo-32182854.jpeg)`,
            }}
          ></div>
          <div className="w-full p-8 lg:w-1/2">
            <h2 className="text-2xl font-semibold text-gray-700 text-center">
              Trip Planner
            </h2>
            <p className="text-xl text-gray-600 text-center">Welcome !</p>
              <form className="" onSubmit={handleRegister}>
            <div className="mt-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                First Name
              </label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="text"
                value={firstName}
                name="firstName"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" >
                Last Name
              </label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="text"
                value={lastName} name="lastName" onChange={(e)=> setLastName(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="email"
                value={email}
                name="Email Address"
                onChange={(e)=> setemail(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
              </div>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="password"
                value={password}
                name="Password"
                onChange={(e)=>setpassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Confirm Password
                </label>
              </div>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="password"
                value={confirmPassword}
                name="confirmPassword"
                onChange={(e)=>setconfirmPassword(e.target.value)}
                placeholder="Confirm Password"
              />
            </div>
            <div className="mt-8">
              <button className="bg-green-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">
                Register
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 md:w-1/4"></span>
              <Link to="LoginModal" className="text-xs text-gray-500 uppercase">
                or Login
              </Link>
              <span className="border-b w-1/5 md:w-1/4"></span>
            </div>
            </form>
          </div>
        </div>
      </div>
      </div>
      </div>
    </>
  );
}

export default Register;
