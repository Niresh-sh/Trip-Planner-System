import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function UserProfile() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    setLoading(true);

    // Validate input fields
    if (!oldPassword || !newPassword) {
      setError("Both fields are required.");
      setLoading(false);
      return;
    }

    try {
      let response = await axios.put(
        "http://localhost:3000/change-password",
        {
          password: oldPassword,
          confiermPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Password Changed Successfully");
        setOldPassword(""); 
        setNewPassword("");
      }
    } catch (e) {
      setError("Failed to change password. Please try again.");
      console.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-4">
        Change Password
      </h2>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Password Change Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="old_password">
            Old Password
          </label>
          <input
            type="password"
            id="old_password"
            placeholder="Enter old password"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="new_password">
            New Password
          </label>
          <input
            type="password"
            id="new_password"
            placeholder="Enter new password"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 mt-3 text-white text-lg rounded-lg transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Processing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}

export default UserProfile;
