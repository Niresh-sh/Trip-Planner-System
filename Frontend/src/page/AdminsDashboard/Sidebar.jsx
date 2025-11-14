import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaChartBar,
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
          {/* Dashboard */}
          <Link
            to="/admin/admindashboard"
            className="flex items-center px-4 py-2 rounded bg-green-700 hover:bg-green-600 transition"
          >
            <span className="mr-3">
              <FaTachometerAlt />
            </span>
            Dashboard
          </Link>

          {/* Users */}
          <Link
            to="/admin/admindashboard/adminusers"
            className="flex items-center px-4 py-2 rounded bg-green-700 hover:bg-green-600 transition"
          >
            <FaUsers className="mr-3" />
            Users
          </Link>

          {/* Analytics */}
          <Link
            to="/admin/admindashboard/analytics"
            className="flex items-center px-4 py-2 rounded bg-green-700 hover:bg-green-600 transition"
          >
            <span className="mr-3">
              <FaChartBar />
            </span>
            Analytics
          </Link>

          {/* Category */}
          <Link
            to="/admin/admindashboard/addcategory"
            className="flex items-center px-4 py-2 rounded bg-green-700 hover:bg-green-600 transition"
          >
            <span className="mr-3">
              <FaCog />
            </span>
            Category
          </Link>

          {/* Destinations */}
          <Link
            to="/admin/admindashboard/admindestination"
            className="flex items-center px-4 py-2 rounded bg-green-700 hover:bg-green-600 transition"
          >
            <span className="mr-3">
              <FaBoxOpen />
            </span>
            Destinations
          </Link>

          {/* Guides */}
          <Link
            to="/admin/admindashboard/adminguide"
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
