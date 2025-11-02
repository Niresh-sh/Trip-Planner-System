import React,{useState} from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import Login from "../page/auth/AdminLogin";
import { toast } from "react-toastify";

function Navbar({ openLoginModal }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const handleLogout = () => {
    localStorage.clear();
    const confirmLogout = window.confirm("Do you really want to logout?");
    if (confirmLogout) {
      // You can add actual logout logic here (e.g., clear tokens, redirect, etc.)

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
                {/* Conditionally show Login or Logout */}
                {email ? (
                  <div className="relative group ">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center text-sm bg-gray-800 rounded-full focus:ring-2 focus:ring-gray-300 "
                    >
                      <img
                        className="w-8 h-8 rounded-full"
                        src="https://cdn-icons-png.flaticon.com/128/12123/12123009.png"
                        alt="User Avatar"
                      />
                    </button>

                    {/* User Dropdown */}
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-[100] overflow: visible">
                        <div className="p-3 border-b ">
                          <p className="text-sm font-medium text-gray-800">
                            {email}
                          </p>
                        </div>
                        <ul className="py-2">
                          <li>
                            <NavLink to="/dashboard/userdetails" className="dropdown-link">
                              Dashboard
                            </NavLink>
                          </li>
                        </ul>
                        <div className="py-2">
                          <button
                            onClick={handleLogout}
                            className="block w-full text-left dropdown-link text-green-500"
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
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  aria-expanded="false"
                  id="mobile-menu-button"
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    ariahidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Mobile menu, show/hide based on menu state --> */}
        <div className="sm:hidden hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="bg-gray-600 text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>

            <Link
              to="About"
              className="text-gray-900 hover:bg-gray-600 block px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </Link>
            <Link
              to="Contact"
              className="text-gray-900 hover:bg-gray-600 block px-3 py-2 rounded-md text-base font-medium"
            >
              Contact
            </Link>

            {/* <div className="pt-4 pb-3 border-t border-gray-200"> */}
            {/* <div className="flex items-center px-3 space-y-2 flex-col"> */}
            {/* Conditionally show Login or Logout */}
            {/* {!email ? ( */}
            {/* <Link to="Login" */}
            {/* className="block w-full text-center bg-indigo-600 text-white px-3 py-2 rounded-md text-base font-medium" */}
            {/* > */}
            {/* Login */}
            {/* </Link> */}
            {/* ) : ( */}
            {/* <button onClick={handleLogout} className="md:flex border-2 px-5 py-3 bg-white text-red-600 rounded-full hover:bg-gray-100"> */}
            {/* <FaUser /> */}
            {/* <span className="hidden md:inline ml-2">Logout</span> */}
            {/* </button> */}
            {/* )} */}
            {/* </div> */}
            {/* </div> */}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
