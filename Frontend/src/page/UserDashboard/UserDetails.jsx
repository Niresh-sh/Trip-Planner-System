import { FaUser, FaEnvelope, FaPhone, FaUserShield, FaIdCard } from "react-icons/fa";

function UserDetails() {
  const email = localStorage.getItem("email") || "Not Available";
  const firstName = localStorage.getItem("firstName") || "Not Available";
  const lastName = localStorage.getItem("lastName") || "Not Available";
  const role = localStorage.getItem("role") || "Not Available";
  const user_id = localStorage.getItem("_id") || "Not Available";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-4">User Details</h2>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <FaEnvelope className="text-blue-500" />
            <span className="font-semibold text-gray-700 dark:text-gray-300">Email:</span>
            <span className="text-gray-600 dark:text-gray-400">{email}</span>
          </div>

          <div className="flex items-center space-x-3">
            <FaUser className="text-green-500" />
            <span className="font-semibold text-gray-700 dark:text-gray-300">First Name:</span>
            <span className="text-gray-600 dark:text-gray-400">{firstName}</span>
          </div>

          <div className="flex items-center space-x-3">
            <FaPhone className="text-yellow-500" />
            <span className="font-semibold text-gray-700 dark:text-gray-300">Last Name:</span>
            <span className="text-gray-600 dark:text-gray-400">{lastName}</span>
          </div>

          <div className="flex items-center space-x-3">
            <FaUserShield className="text-red-500" />
            <span className="font-semibold text-gray-700 dark:text-gray-300">Role:</span>
            <span className="text-gray-600 dark:text-gray-400">{role}</span>
          </div>

          <div className="flex items-center space-x-3">
            <FaIdCard className="text-purple-500" />
            <span className="font-semibold text-gray-700 dark:text-gray-300">User ID:</span>
            <span className="text-gray-600 dark:text-gray-400">{user_id}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
