import React from 'react';
import {
  FaTachometerAlt, FaUsers, FaChartBar, FaShoppingCart, FaBoxOpen, FaCog,
  FaBell, FaSearch, FaDownload, FaPlus, FaDollarSign, FaUserCircle,
  FaEllipsisH, FaTrashAlt, FaPencilAlt
} from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  // Inlined data
  const stats = [
    { label: 'Total Revenue', value: '$48,291', growth: '+12%', icon: <FaDollarSign />, color: 'green' },
    { label: 'Total Users', value: '15,847', growth: '+8%', icon: <FaUsers />, color: 'green' },
    { label: 'Total Orders', value: '2,847', growth: '+15%', icon: <FaShoppingCart />, color: 'orange' },
    { label: 'Destinations', value: '1,247', growth: '+5%', icon: <FaBoxOpen />, color: 'purple' }
  ];

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Revenue',
      data: [43000, 46000, 45000, 48000, 51000, 54000],
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

  const recentbookings = [
    { id: '#BK001', user: 'Alice Johnson', email: 'alice@email.com', destination: 'Paris', amount: '$2900', status: 'Complete', date: 'Aug 12, 2025' },
    { id: '#BK002', user: 'Bob Smith', email: 'bob@email.com', destination: 'Bali', amount: '$2100', status: 'Pending', date: 'Aug 11, 2025' },
    { id: '#BK003', user: 'Charlie Brown', email: 'charlie@email.com', destination: 'Maldives', amount: '$3200', status: 'Cancelled', date: 'Aug 10, 2025' },
  ];

  const activities = [
    { text: 'New user registered', info: '2 hours ago', iconColor: 'green' },
    { text: 'Booking confirmed', info: '3 hours ago', iconColor: 'blue' },
    { text: 'Order canceled', info: '5 hours ago', iconColor: 'red' },
    { text: 'Payment failed', info: 'Yesterday', iconColor: 'yellow' },
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
          <div className="flex items-center space-x-4">
            <div className="relative text-gray-600">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input className="pl-10 pr-4 py-2 rounded border" placeholder="Search…" />
            </div>
            <button className="relative p-2 rounded-full text-gray-600 hover:bg-gray-200">
              <FaBell className="text-xl" />
              <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full px-1">3</span>
            </button>
          </div>
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
                    <p className="font-medium">{p.name}</p>
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
            <div className="space-x-2">
              <button className="flex items-center px-3 py-1 border rounded text-gray-600 hover:bg-gray-50"><FaDownload className="mr-2" />Export</button>
              <button className="flex items-center px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"><FaPlus className="mr-2" />Add Order</button>
            </div>
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
              {recentbookings.map((o, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="py-2">{o.id}</td>
                  <td className="flex items-center space-x-2 py-2">
                    <FaUserCircle />
                    <div>
                      <p>{o.user}</p>
                      <p className="text-xs text-gray-400">{o.email}</p>
                    </div>
                  </td>
                  <td>{o.destination}</td>
                  <td>{o.amount}</td>
                  <td>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      o.status === 'Complete' ? 'bg-green-100 text-green-700'
                      : o.status === 'Pending' ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                    }`}>{o.status}</span>
                  </td>
                  <td>{o.date}</td>
                  <td className="space-x-2 text-gray-600">
                    <Link to={`/bookings/${o.id}/edit`}>
                      <FaPencilAlt className="inline hover:text-green-600 cursor-pointer" />
                    </Link>
                    <Link to={`/bookings/${o.id}/view`}>
                      <FaEllipsisH className="inline hover:text-blue-600 cursor-pointer" />
                    </Link>
                    <FaTrashAlt className="inline hover:text-red-600 cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Recent Activity */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-medium mb-3">Recent Activity</h3>
            <ul className="space-y-3 text-sm">
              {activities.map((a, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className={`w-2 h-2 mt-1 rounded-full bg-${a.iconColor}-500`} />
                  <div>
                    <p>{a.text}</p>
                    <p className="text-xs text-gray-400">{a.info}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* System Status */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-medium mb-3">System Status</h3>
            <ul className="space-y-3 text-sm">
              {system.map((s, i) => (
                <li key={i} className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className={`w-3 h-3 rounded-full bg-${s.color}-500`} />
                    <p>{s.label}</p>
                  </div>
                  <p className={`font-medium text-${s.color}-600`}>{s.status}</p>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <p className="text-xs text-gray-500">Server Load</p>
              <div className="h-2 w-full bg-gray-200 rounded-full">
                <div className="h-full bg-green-600 rounded-full" style={{ width: '68%' }}></div>
              </div>
              <p className="text-right text-xs text-gray-500 mt-1">68%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
