import { useState } from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { FaUser, FaLock, FaEdit, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";

function Dashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className={`w-64 bg-white dark:bg-gray-800 shadow-lg transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0 fixed md:relative h-full md:h-auto`}>
        <div className="p-5 flex items-center justify-between md:justify-start">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Dashboard</h2>
          <button className="md:hidden text-gray-800 dark:text-white" onClick={() => setSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        <nav className="mt-4">
          <ul className="space-y-3">
            <li>
              <NavLink to="userdetails" className="dashboard-link flex items-center mx-auto w-[20vh] gap-5">
                <FaUser className="text-blue-500" />
                User Details
              </NavLink>
            </li>
            {/* <li>
              <NavLink to="updateprofile" className="dashboard-link flex items-center mx-auto w-[20vh] gap-5">
                <FaEdit className="text-green-500" />
                Update Profile
              </NavLink>
            </li> */}
            <li>
              <NavLink to="changepassword" className="dashboard-link flex items-center mx-auto w-[20vh] gap-5 ">
                <FaLock className="text-yellow-500" />
                Change Password
              </NavLink>
            </li>
             <li>
              <NavLink to="bookinghistory" className="dashboard-link flex items-center mx-auto w-[20vh] gap-5 ">
                <FaLock className="text-yellow-500" />
                Booking History
              </NavLink>
            </li>
            <li>
              <button onClick={handleLogout} className="dashboard-link flex items-center mx-auto w-[20vh] gap-5 text-red-500 text-left">
                <FaSignOutAlt />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 ml-64 md:ml-0 transition-all">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
