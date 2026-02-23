import React, { useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import Login from "../page/auth/AdminLogin";
import { toast } from "react-toastify";

function Navbar({ openLoginModal }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const handleLogout = () => {
    localStorage.clear();
    const confirmLogout = window.confirm("Do you really want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("_id"); // remove stored token
      localStorage.removeItem("email");
      navigate("/");

      toast.success("Successfully logged out!");
    }
  };

  return (
    <div>
      <nav className="relative bg-green-600 brightness-110 shadow-2xl z-[999] rounded-b-xl">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <img
                  className="block h-10 w-auto text-slate-800"
                  src="https://cdn-icons-png.flaticon.com/512/9683/9683128.png"
                  alt="Logo"
                />
                <span className="ml-2 text-xl font-bold text-white">
                  Trip Planner
                </span>
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  <Link
                    to="/"
                    className="text-white hover:bg-gray-600 px-3 py-2 rounded-md text-md font-medium"
                  >
                    Home
                  </Link>

                  {/* <!-- Products Dropdown Trigger --> */}
                  <div className="relative">
                    <Link
                      to="Destinations"
                      className="text-white hover:bg-gray-600 px-3 py-2 rounded-md text-md font-medium flex items-center"
                    >
                      Destinations
                    </Link>
                  </div>

                  <Link
                    to="About"
                    className="text-white hover:bg-gray-600 px-3 py-2 rounded-md text-md font-medium"
                  >
                    About
                  </Link>

                  <Link
                    to="PlanTrip"
                    className="text-white hover:bg-gray-600 px-3 py-2 rounded-md text-md font-medium"
                  >
                    Plan Trip
                  </Link>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* <div className="hidden sm:flex sm:items-center">
                <Link to="Login"
                  className="ml-4 bg-slate-800 text-white px-4 py-2 rounded-md text-md font-medium hover:bg-slate-900"
                >
                  Login
                </Link>
              </div> */}
              <div className="hidden sm:flex sm:items-center">
                {email ? (
                  <div className="relative group ">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center text-sm bg-gray-800 rounded-full focus:ring-2 focus:ring-gray-300 "
                    >
                      <img
                        className="w-9 h-9 rounded-full"
                        src="https://cdn-icons-png.flaticon.com/512/4140/4140039.png"
                        alt="User Avatar"
                      />
                    </button>

                    {/* User Dropdown */}
                    {dropdownOpen && (
                      <div
                        className="absolute right-0 mt-2 w-56 bg-gray-300 rounded-xl shadow-xl 
                  z-[100] overflow-hidden transition-all duration-200 text-white"
                      >
                        {/* Email */}
                        <div className="p-3 border-b border-green-100 bg-green-700">
                          <p className="text-sm font-semibold truncate w-full">
                            {email}
                          </p>
                        </div>

                        {/* Dashboard */}
                        <ul className="py-2">
                          <li>
                            <NavLink
                              to="/dashboard/userdetails"
                              className="dropdown-link block px-4 py-2 hover:bg-green-500 
                     transition rounded-md text-green-900 font-semibold"
                            >
                              Dashboard
                            </NavLink>
                          </li>
                        </ul>

                        {/* Logout */}
                        <div className="py-2">
                          <button
                            onClick={handleLogout}
                            className="block w-full text-left dropdown-link px-4 py-2 
                   text-green-900 font-semibold hover:bg-green-500 transition rounded-md"
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="hidden md:flex space-x-4">
                    {!email ? (
                      <button
                        onClick={openLoginModal}
                        className="ml-4 bg-slate-800 text-white px-4 py-2 rounded-md text-md font-medium hover:bg-slate-900"
                      >
                        <span className="hidden md:inline ml-2">Login</span>
                      </button>
                    ) : (
                      <button
                        onClick={handleLogout}
                        className="ml-4 bg-slate-800 text-white px-4 py-2 rounded-md text-md font-medium hover:bg-slate-900"
                      >
                        {/* <FaUser /> */}
                        <span className="hidden md:inline ml-2">Logout</span>
                      </button>
                    )}
                  </div>
                )}

                {/* <span className="md:ml-5 text-lg cursor-pointer">
                <i className="fa-solid fa-moon"></i>
              </span>

              <button className="md:hidden focus:outline-none">
                <span className="md:hidden block border-2 px-4 py-1 ml-5 bg-red-600 text-white rounded-lg"> */}
                {/* <FaBars /> */}
                {/* </span>
              </button> */}
              </div>

              {/* <!-- Mobile menu button --> */}
              <div className="sm:hidden">
                <button
                  type="button"
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  {mobileOpen ? (
                    // X icon
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    // Hamburger icon
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                  
                  <span className="sr-only">Open main menu</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
  className={`sm:hidden transition-all duration-300 ease-in-out ${
    mobileOpen ? "block" : "hidden"
  }`}
>
          <div className="px-4 pt-4 pb-6 space-y-3 bg-green-700 rounded-b-xl">
  <Link
    to="/"
    onClick={() => setMobileOpen(false)}
    className="block text-white px-3 py-2 rounded-md text-base font-medium hover:bg-green-800"
  >
    Home
  </Link>

  <Link
    to="Destinations"
    onClick={() => setMobileOpen(false)}
    className="block text-white px-3 py-2 rounded-md text-base font-medium hover:bg-green-800"
  >
    Destinations
  </Link>

  <Link
    to="About"
    onClick={() => setMobileOpen(false)}
    className="block text-white px-3 py-2 rounded-md text-base font-medium hover:bg-green-800"
  >
    About
  </Link>

  <Link
    to="PlanTrip"
    onClick={() => setMobileOpen(false)}
    className="block text-white px-3 py-2 rounded-md text-base font-medium hover:bg-green-800"
  >
    Plan Trip
  </Link>

  {!email ? (
    <button
      onClick={() => {
        openLoginModal();
        setMobileOpen(false);
      }}
      className="w-full mt-3 bg-slate-800 text-white px-4 py-2 rounded-md font-medium hover:bg-slate-900"
    >
      Login
    </button>
  ) : (
    <button
      onClick={() => {
        handleLogout();
        setMobileOpen(false);
      }}
      className="w-full mt-3 bg-slate-800 text-white px-4 py-2 rounded-md font-medium hover:bg-slate-900"
    >
      Logout
    </button>
  )}
</div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
