import React from 'react'

function AdminDash() {
  return (
    <>
      <div className="flex h-screen">
    {/* <!-- Sidebar --> */}
    <aside className="w-64 bg-gradient-to-r from-green-700 via-green-600 to-green-500  shadow-md flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center">
          <img
            src="https://png.pngtree.com/png-clipart/20190628/original/pngtree-vacation-and-travel-icon-png-image_4032146.jpg"
            alt="Logo" className="h-8 w-auto" />
          <span className="ml-2 text-xl font-semibold text-slate-900">Travel Planner</span>
        </div>
      </div>
      <nav className="mt-5 px-2 flex-1">
        <a href="#" className="group flex items-center px-2 py-2 text-base font-medium rounded-md bg-green-700 text-white">
          <i className="fas fa-home mr-3 text-white w-6 h-6"></i>
          Dashboard
        </a>
        <a href="#"
          className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:bg-green-700 hover:text-gray-200">
          <i className="fas fa-users mr-3 text-white group-hover:text-gray-500 w-6 h-6"></i>
          Team
        </a>
        <a href="#"
          className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:bg-green-700 hover:text-gray-200">
          <i className="fas fa-folder-open mr-3 text-white group-hover:text-gray-500 w-6 h-6"></i>
          Projects
        </a>
        <a href="#"
          className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:bg-green-700 hover:text-gray-200">
          <i className="fas fa-calendar-alt mr-3 text-white group-hover:text-gray-500 w-6 h-6"></i>
          Calendar
        </a>
        <a href="#"
          className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:bg-green-700 hover:text-gray-200">
          <i className="fas fa-file-alt mr-3 text-white group-hover:text-gray-500 w-6 h-6"></i>
          Documents
        </a>
        <a href="#"
          className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:bg-green-700 hover:text-gray-200">
          <i className="fas fa-chart-line mr-3 text-white group-hover:text-gray-500 w-6 h-6"></i>
          Reports
        </a>
      </nav>
      <div className="mt-auto p-4 border-t">
        <div className="flex items-center">
          <img className="h-10 w-10 rounded-full"
            src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1754150946~exp=1754154546~hmac=286fdea5211bd763fbcab8b8f2c789672bbeaa6faf8954a6cbd65d4ccd2c4c87&w=1380"
            alt="User" />
          <div className="ml-3">
            <p className="text-base font-semibold text-white">Admin</p>
            <p className="text-sm font-semibold text-gray-200">View Profile</p>
          </div>
        </div>
      </div>
    </aside>

    {/* <!-- Main Content --> */}
    <main className="flex-1 p-6 space-y-6 bg-gray-100">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      <div className="mt-4 p-6 bg-white rounded-lg shadow-md">
        <p className="text-gray-600">Welcome to your dashboard.</p>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {/* <!-- Recent Orders --> */}
        <div className="bg-white shadow-md p-6 rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold">Recent Orders</h3>
            <div className="flex space-x-2 text-xl">
              <i className='bx bx-search'></i>
              <i className='bx bx-filter'></i>
            </div>
          </div>
          <table className="w-full text-gray-600">
            <thead>
              <tr>
                <th className="py-2 text-left">User</th>
                <th className="py-2 text-left">Date Order</th>
                <th className="py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 flex items-center space-x-2">
                  <img
                    src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1754150946~exp=1754154546~hmac=286fdea5211bd763fbcab8b8f2c789672bbeaa6faf8954a6cbd65d4ccd2c4c87&w=1380"
                    className="w-8 h-8 rounded-full" alt="Profile" />
                  <span>Niresh Shakya</span>
                </td>
                <td>01-10-2021</td>
                <td><span className="bg-green-500 text-white rounded-full py-1 px-3">Completed</span></td>
              </tr>
              <tr>
                <td className="py-2 flex items-center space-x-2">
                  <img
                    src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1754150946~exp=1754154546~hmac=286fdea5211bd763fbcab8b8f2c789672bbeaa6faf8954a6cbd65d4ccd2c4c87&w=1380"
                    className="w-8 h-8 rounded-full" alt="Profile" />
                  <span>Hari Kumar</span>
                </td>
                <td>01-10-2021</td>
                <td><span className="bg-yellow-500 text-white rounded-full py-1 px-3">Pending</span></td>
              </tr>
              {/* <!-- Add more rows as necessary --> */}
            </tbody>
          </table>
        </div>
        {/* <!-- Todos --> */}
        <div className="bg-white shadow-md p-6 rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold">Todos</h3>
            <div className="flex space-x-2 text-xl">
              <i className='bx bx-plus'></i>
              <i className='bx bx-filter'></i>
            </div>
          </div>
          <ul>
            <li className="flex justify-between items-center py-2">
              <p>Todo List</p>
              <i className='bx bx-dots-vertical-rounded'></i>
            </li>
            <li className="flex justify-between items-center py-2">
              <p>Todo List</p>
              <i className='bx bx-dots-vertical-rounded'></i>
            </li>
            {/* <!-- Add more todo items --> */}
          </ul>
        </div>
      </div>

    </main>
  </div>
    </>
  )
}

export default AdminDash;
