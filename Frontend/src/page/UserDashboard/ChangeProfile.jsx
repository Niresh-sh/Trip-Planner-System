import { useState , useEffect} from "react";
import axios from "axios";
import { toast } from "react-toastify";


function ChangeProfile() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [error, setError] = useState("");
  const [old_data, setOldData]= useState([]);
  const [loading, setLoading] = useState(false);
  const [userprofile , setUserProfile] = useState([]);
  const backendURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        let response = await axios.get(
          `${backendURL}/api/users/change-profile`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setOldData(response.data);
        setEmail(response.data.email);
        setFirstName(response.data.firstName);
      } catch (e) {
        setError(" Please try again.");
        console.error(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDatas();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    setLoading(true);

    // Validate input fields
    try {
      let response = await axios.put(
        `${backendURL}/api/users/update-profile`,
        {
         email : email,
         firstName : firstName,
        },
        {
        // multi parse form data for image
          headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      
      );

      if (response.status === 200) {
        toast.success("Profile Updated Successfully");
      }
    } catch (e) {
      setError("Failed to update profile. Please try again.");
      console.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-4">
        Update Profile
      </h2>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Password Change Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="old_password">
            firstName
          </label>
          <input
            type="text"
            id="old_password"
            placeholder="Enter new firstName"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="new_password">
            Email
          </label>
          <input
            type="email"
            disabled
            id="new_password"
            placeholder="Enter Email"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          {loading ? "Processing..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}

export default ChangeProfile;
