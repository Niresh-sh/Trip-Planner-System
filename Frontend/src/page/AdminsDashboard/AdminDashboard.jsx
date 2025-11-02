import React,{useState,useEffect} from 'react';
import {
  FaTachometerAlt, FaUsers, FaChartBar, FaShoppingCart, FaBoxOpen, FaCog,
  FaBell, FaSearch, FaDownload, FaPlus, FaDollarSign, FaUserCircle,
  FaEllipsisH, FaTrashAlt, FaPencilAlt, FaCheck, FaTimes
} from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';

const AdminDashboard = () => {
const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [activities, setActivities] = useState([]);
  useEffect(() => {
        const socket = io("http://localhost:3000", {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    socket.on('connect', () => console.log('Socket connected', socket.id));
    socket.on('connect_error', (err) => console.error('Socket connect_error:', err));
    socket.on('new-activity', (activity) => {
      setActivities(prev => [activity, ...prev]);
    });

    socket.on('disconnect', (reason) => console.log('Socket disconnected', reason));

    return () => {
      socket.disconnect();
    };
  }, []);

  
  useEffect(() => {
    // Fetch data from backend API
    fetch('http://localhost:3000/api/stats/dashboard')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch stats');
        return res.json();
      })
      .then(data => {
        // Map API data to your stats format
        setStats([
          {
            label: 'Total Revenue',
            value: `$${data.totalRevenue.toLocaleString()}`,
            growth: `+${data.growth.totalRevenue}%`,
            icon: <FaDollarSign />,
            color: 'green'
          },
          {
            label: 'Total Users',
            value: data.totalUsers.toLocaleString(),
            growth: `+${data.growth.totalUsers}%`,
            icon: <FaUsers />,
            color: 'green'
          },
          {
            label: 'Total Booking',
            value: data.totalBooking.toLocaleString(),
            growth: `+${data.growth.totalBooking}%`,
            icon: <FaShoppingCart />,
            color: 'orange'
          },
          {
            label: 'Destinations',
            value: data.destinations.toLocaleString(),
            growth: `+${data.growth.destinations}%`,
            icon: <FaBoxOpen />,
            color: 'purple'
          }
        ]);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/adminbooking", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // if you use auth
          },
        });
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data = await res.json();
        setRecentBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/api/activity')
      .then(res => {
        if (!res.ok) throw new Error(`Activities fetch failed (${res.status})`);
        return res.json();
      })
      .then(data => setActivities(Array.isArray(data) ? data : (data.data || data.activities || [])))
      .catch(err => console.error('Activities fetch error:', err));
  }, []);

  // listen for real-time updates


  // ✅ Approve booking
  const handleApprove = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/adminbooking/${id}/approve`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!res.ok) throw new Error("Failed to approve booking");
      const updated = await res.json();
      setRecentBookings((prev) =>
        prev.map((b) => (b._id === id ? updated.booking : b))
      );
    } catch (err) {
      alert(err.message);
    }
  };

  // ✅ Decline booking
  const handleDecline = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/adminbooking/${id}/decline`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!res.ok) throw new Error("Failed to decline booking");
      const updated = await res.json();
      setRecentBookings((prev) =>
        prev.map((b) => (b._id === id ? updated.booking : b))
      );
    } catch (err) {
      alert(err.message);
    }
  };

  // ✅ Delete booking
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      const res = await fetch(`http://localhost:3000/api/adminbooking/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!res.ok) throw new Error("Failed to delete booking");
      setRecentBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const truncateText = (text, maxLength) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p>Error loading bookings: {error}</p>;


// {activities}



  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Revenue',
      data: [43000, 46000, 43000, 48000, 51000, 54000],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      fill: true,
      tension: 0.4
    }]
  };

  const topdestinations = [
    { name: 'Maldives', category: 'Beach', amount: '$3,200', growth: '+12%' },
    { name: 'Paris', category: 'City', amount: '$2,900', growth: '+9%' },
    { name: 'Bali', category: 'Island', amount: '$2,100', growth: '+6%' },
    { name: 'New York', category: 'City', amount: '$1,850', growth: '+4%' },
  ];


  

  const system = [
    { label: 'Server Status', status: 'Online', color: 'green' },
    { label: 'Database', status: 'Active', color: 'green' },
    { label: 'API Status', status: 'Warning', color: 'yellow' },
  ];

  return (
    <div className="flex">
      {/* Main Content */}
      <div className="flex-1 bg-gray-100 min-h-screen p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
          
        </div>

        {/* Stats */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((s, i) => (
        <div key={i} className="bg-white p-4 rounded shadow flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-green-600">{s.growth} vs last month</p>
          </div>
          <div className={`text-${s.color}-500 text-xl`}>
            {s.icon}
          </div>
        </div>
      ))}
    </div>

        {/* Revenue & Top destinations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-2 bg-white p-4 rounded shadow">
            <h3 className="font-medium mb-2">Revenue Analytics</h3>
            <Line data={lineData} />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Top destinations</h3>
              <button className="text-green-600 text-sm">View All</button>
            </div>
            <ul>
              {topdestinations.map((p, i) => (
                <li key={i} className="flex justify-between py-2 border-b last:border-none">
                  <div>
                    <p className="font-medium">{p.title}</p>
                    <p className="text-xs text-gray-500">{p.category}</p>
                  </div>
                  <div className="text-right">
                    <p>{p.amount}</p>
                    <p className={`text-xs ${p.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{p.growth}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recent Bookings */}
   <div className="bg-white p-4 rounded shadow mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Recent Bookings</h3>
      </div>

      <table className="w-full text-left text-sm">
        <thead className="text-gray-500 border-b">
          <tr>
            <th className="py-2">Booking ID</th>
            <th>User</th>
            <th>Destination</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recentBookings.map((o, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              <td className="py-2">{o._id}</td>
              <td className="flex items-center space-x-2 py-2">
                <FaUserCircle />
                <div>
                  <p>{o.userId?.firstName || "Unknown User"}</p>
                  <p className="text-xs text-gray-400">
                    {o.userId?.email || "N/A"}
                  </p>
                </div>
              </td>
              <td>{truncateText(o.destinationId?.title, 25)  || "Unknown Destination"}</td>
              <td>${o.totalCost?.toLocaleString()}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    o.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : o.status === "Declined"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {o.status}
                </span>
              </td>
              <td>{new Date(o.createdAt).toLocaleDateString()}</td>

              <td className="space-x-3 text-gray-600 flex items-center">
                {o.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleApprove(o._id)}
                      className="hover:text-green-600"
                      title="Approve"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => handleDecline(o._id)}
                      className="hover:text-yellow-600"
                      title="Decline"
                    >
                      <FaTimes />
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleDelete(o._id)}
                  className="hover:text-red-600"
                  title="Delete"
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          {/* Recent Activity */}
          <div className="bg-white p-4 rounded shadow flex flex-col h-64">
            <h3 className="font-medium">Recent Activity</h3>
            <div className="mt-3 overflow-y-auto flex-1 min-h-0 pr-1">
              <ul className="space-y-3 text-sm">
                {activities.map((activity, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className={`w-2 h-2 mt-1 rounded-full bg-${activity.iconColor}-500`} />
                    <div>
                      <p>{activity.text}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(activity.createdAt || activity.timestamp || Date.now()).toLocaleString()}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
