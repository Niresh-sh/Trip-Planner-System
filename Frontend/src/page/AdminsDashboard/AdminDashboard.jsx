import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  FaTachometerAlt,
  FaUsers,
  FaChartBar,
  FaShoppingCart,
  FaBoxOpen,
  FaCog,
  FaBell,
  FaSearch,
  FaDownload,
  FaPlus,
  FaDollarSign,
  FaUserCircle,
  FaEllipsisH,
  FaTrashAlt,
  FaPencilAlt,
  FaCheck,
  FaTimes,
  FaCalendarCheck,
} from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";

const AdminDashboard = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [activities, setActivities] = useState([]);
  const [revenueAnalytics, setRevenueAnalytics] = useState([]);
  const [topdestinations, setTopDestinations] = useState([]);
  const [revenueSummary, setRevenueSummary] = useState({
    totalRevenue: 0,
    totalTrips: 0,
    avgRevenuePerTrip: 0,
  });
  const [startDate, setStartDate] = useState(() => {
    const today = new Date().toISOString().split("T")[0];
    return today;
  });
  const [endDate, setEndDate] = useState(() => {
    const today = new Date().toISOString().split("T")[0];
    return today;
  });

  useEffect(() => {
    const socket = io("http://localhost:3000", {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => console.log("Socket connected", socket.id));
    socket.on("connect_error", (err) =>
      console.error("Socket connect_error:", err)
    );
    socket.on("new-activity", (activity) => {
      setActivities((prev) => [activity, ...prev]);
    });

    socket.on("disconnect", (reason) =>
      console.log("Socket disconnected", reason)
    );

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    // Fetch data from backend API
    fetch("http://localhost:3000/api/stats/dashboard")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch stats");
        return res.json();
      })
      .then((data) => {
        // Map API data to your stats format
        setStats([
          {
            label: "Total Revenue",
            value: `Rs.${data.totalRevenue.toLocaleString()}`,
            // growth: `+${data.growth.totalRevenue}%`,
            icon: <FaDollarSign />,
            color: "green",
          },
          {
            label: "Completed Trips",
            value: data.totalTrips.toLocaleString(),
            icon: <FaCalendarCheck />,
            color: "purple",
          },
          {
            label: "Trips Pending",
            value: data.pending.toLocaleString(),
            icon: <FaChartBar />,
            color: "blue",
          },
          {
            label: "Trips Declined",
            value: data.declined.toLocaleString(),
            icon: <FaChartBar />,
            color: "red",
          },
          {
            label: "Trips Approved",
            value: data.approved.toLocaleString(),
            icon: <FaChartBar />,
            color: "green",
          },
          {
            label: "Total Users",
            value: data.totalUsers.toLocaleString(),
            growth: `+${data.growth.totalUsers}%`,
            icon: <FaUsers />,
            color: "green",
          },
          {
            label: "Total Booking",
            value: data.totalBooking.toLocaleString(),
            growth: `+${data.growth.totalBooking}%`,
            icon: <FaCalendarCheck />,
            color: "green",
          },
          {
            label: "Destinations",
            value: data.destinations.toLocaleString(),
            growth: `+${data.growth.destinations}%`,
            icon: <MdPlace />,
            color: "green",
          },
        ]);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/adminbooking", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, 
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
    const fetchRevenueAnalytics = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (startDate) params.append("startDate", startDate);
        if (endDate) params.append("endDate", endDate);

        
        const isSingleDay = startDate && endDate && startDate === endDate;
        if (isSingleDay) params.append("groupBy", "day");

        const res = await fetch(
          `http://localhost:3000/api/analytics/revenue?${params.toString()}`
        );
        if (!res.ok) throw new Error(`Analytics fetch failed: ${res.status}`);
        const data = await res.json();

        let analytics = Array.isArray(data.analytics) ? data.analytics : [];
 
        if (isSingleDay && analytics.length === 1) {
          const singleLabel = analytics[0].label || "";
          if (/^\d{4}-\d{2}-\d{2}$/.test(singleLabel)) {
            const hourly = Array.from({ length: 24 }, (_, i) => ({
              label: `${i}:00`,
              revenue: 0,
              trips: 0,
            }));
            const totalRevenue = analytics[0].revenue || 0;
            const totalTrips = analytics[0].trips || 0;

            const revenuePerHour = totalRevenue / 24;
            const tripsPerHour = totalTrips / 24;

            for (let i = 0; i < 24; i++) {
              hourly[i].revenue = revenuePerHour;
              hourly[i].trips = tripsPerHour;
            }

            analytics = hourly;
          }
        }

        setRevenueAnalytics(analytics);
        setRevenueSummary(
          data.summary || {
            totalRevenue: 0,
            totalTrips: 0,
            avgRevenuePerTrip: 0,
          }
        );
      } catch (err) {
        console.error("Revenue analytics error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRevenueAnalytics();
  }, [startDate, endDate]);


  useEffect(() => {
    const fetchTopDestinations = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/stats/top-destinations"
        );
        if (!res.ok) throw new Error("Failed to fetch top destinations");

        const data = await res.json();
        setTopDestinations(data); 
      } catch (err) {
        console.error(err);
      }
    };
    fetchTopDestinations();
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/api/activity")
      .then((res) => {
        if (!res.ok) throw new Error(`Activities fetch failed (${res.status})`);
        return res.json();
      })
      .then((data) =>
        setActivities(
          Array.isArray(data) ? data : data.data || data.activities || []
        )
      )
      .catch((err) => console.error("Activities fetch error:", err));
  }, []);



  // Approve booking
  const handleApprove = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/adminbooking/${id}/approve`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (!res.ok) throw new Error("Failed to approve booking");
      const updated = await res.json();
      setRecentBookings((prev) =>
        prev.map((b) => (b._id === id ? updated.booking : b))
      );
    } catch (err) {
      toast.error(err.message);
    }
  };

  //  Decline booking
  const handleDecline = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/adminbooking/${id}/decline`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (!res.ok) throw new Error("Failed to decline booking");
      const updated = await res.json();
      setRecentBookings((prev) =>
        prev.map((b) => (b._id === id ? updated.booking : b))
      );
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Delete booking
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?"))
      return;
    try {
      const res = await fetch(`http://localhost:3000/api/adminbooking/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!res.ok) throw new Error("Failed to delete booking");
      setRecentBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      toast.error(err.message);
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

  // debug logs
  console.log("revenueAnalytics:", revenueAnalytics);

  const chartData = {
    labels: revenueAnalytics.map((item) => item.label),
    datasets: [
      {
        label: "Revenue",
        data: revenueAnalytics.map((item) => item.revenue),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
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
            <div
              key={i}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="text-sm text-gray-500">{s.label}</p>
                <p className="text-2xl font-bold">{s.value}</p>
                {/* <p className="text-xs text-green-600">{s.growth} vs last month</p> */}
              </div>
              <div className={`text-${s.color}-500 text-xl`}>{s.icon}</div>
            </div>
          ))}
        </div>

        {/* Revenue & Top destinations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-2 bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Revenue Analytics</h3>
              <div className="flex space-x-2 text-sm">
                <div>
                  <label className="mr-1 text-gray-600">Start:</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border rounded px-2 py-1"
                  />
                </div>
                <div>
                  <label className="mr-1 text-gray-600">End:</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border rounded px-2 py-1"
                  />
                  {/* <button
                    onClick={() => {
                      const today = new Date().toISOString().split("T")[0];
                      setStartDate(today);
                      setEndDate(today);
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Today
                  </button> */}
                </div>
              </div>
            </div>

            <div style={{ height: 320 }}>
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
<div className="bg-white p-4 rounded shadow">
  <div className="flex justify-between items-center mb-2">
    <h3 className="font-medium">Top Destinations</h3>
    <button className="text-green-600 text-sm">View All</button>
  </div>

  {/* Fix overflow container */}
  <div className="max-h-80 overflow-y-auto overflow-x-hidden">
    <ul className="space-y-3">
      {topdestinations
        .sort((a, b) => b.bookings - a.bookings) 
        .map((d, i) => (
          <li
            key={d.title + i}
            className="flex items-center gap-3 p-2 border-b last:border-none overflow-hidden"
          >
            {/* Image */}
            <img
              src={d.image || "/no-image.jpg"}
              className="w-12 h-12 rounded object-cover flex-shrink-0"
              alt={d.title}
            />

            {/* Title + Category */}
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{d.title}</p>
              <p className="text-xs text-gray-500 truncate">{d.category}</p>
            </div>

            {/* Bookings count */}
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-semibold whitespace-nowrap">
                {d.bookings} bookings
              </p>
            </div>
          </li>
        ))}
    </ul>
  </div>
</div>


        </div>

        {/* Recent Bookings */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Recent Bookings</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-gray-900 border-b">
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
                  <tr key={i} className=" hover:bg-gray-100">
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
                    <td>
                      {truncateText(o.destinationId?.title, 25) ||
                        "Unknown Destination"}
                    </td>
                    <td>${o.totalCost?.toLocaleString()}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          o.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : o.status === "declined"
                            ? "bg-red-100 text-red-700"
                            : o.status === "cancelled"
                            ? "bg-gray-200 text-gray-700"
                            : o.status === "success"
                            ? "bg-blue-100 text-blue-700"
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
                    <span
                      className={`w-2 h-2 mt-1 rounded-full bg-${activity.iconColor}-500`}
                    />
                    <div>
                      <p>{activity.text}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(
                          activity.createdAt || activity.timestamp || Date.now()
                        ).toLocaleString()}
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
