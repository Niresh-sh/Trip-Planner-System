import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaChartBar,
  FaShoppingCart,
  FaBoxOpen,
  FaCog,
} from "react-icons/fa";


function Sidebar() {
const navigate = useNavigate();
  const handleLogout = () => {
    // Clear all auth info
    localStorage.clear(); // removes token, role, user info etc.

    // Redirect to home or login page
    navigate("/", { replace: true });
  };
  return (
    <>
      {/* Sidebar */}
      <aside className="w-64 min-h-screen bg-green-700 text-white flex flex-col">
        <div className="h-16 flex items-center justify-center bg-green-600 font-bold text-xl">
          Trip Planner
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link
            to="admin" relative="path"
            className="flex items-center px-4 py-2 rounded bg-green-700 hover:bg-green-600 transition"
          >
            <span className="mr-3">
              <FaTachometerAlt />
            </span>
            Dashboard
          </Link>

          <Link
            to="AdminUsers"
            className="flex items-center px-4 py-2 rounded bg-green-700 hover:bg-green-600 transition"
          >
            <FaUsers className="mr-3" />
            Users
          </Link>

          <Link
            to="/analytics"
            className="flex items-center px-4 py-2 rounded bg-green-700 hover:bg-green-600 transition"
          >
            <span className="mr-3">
              <FaChartBar />
            </span>
            Analytics
          </Link>

          <Link
            to="AddCategory"
            className="flex items-center px-4 py-2 rounded bg-green-700 hover:bg-green-600 transition"
          >
            <span className="mr-3">
              <FaCog />
            </span>
            Category
          </Link>

          <Link
            to="AdminDestination"
            className="flex items-center px-4 py-2 rounded bg-green-700 hover:bg-green-600 transition"
          >
            <span className="mr-3">
              <FaBoxOpen />
            </span>
            Destinations
          </Link>

          <Link
            to="AdminGuide"
            className="flex items-center px-4 py-2 rounded bg-green-700 hover:bg-green-600 transition"
          >
            <span className="mr-3">
              <FaBoxOpen />
            </span>
            Guides
          </Link>
          
        </nav>

        <button
        onClick={handleLogout}
        className="m-4 p-2 bg-red-600 hover:bg-red-700 rounded"
      >
        Logout
      </button>
      </aside>
    </>
  );
}

export default Sidebar;
