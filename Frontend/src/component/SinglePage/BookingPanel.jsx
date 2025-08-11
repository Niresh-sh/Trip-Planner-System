import React from 'react';
import { FaCheckCircle, FaUserFriends, FaLanguage, FaSignal } from 'react-icons/fa';

const BookingPanel = ({ packages, quickInfo }) => {
  return (
    <section className="my-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left: Packages */}
      <div className="lg:col-span-2 space-y-6">
        <h2 className="text-xl font-bold mb-4">🛒 Book Your Experience</h2>

        {packages.map((pkg, index) => (
          <div key={index} className="border rounded-lg shadow-sm p-5 bg-white hover:shadow-md transition">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{pkg.name}</h3>
              <span className="text-green-600 font-bold text-lg">${pkg.price}</span>
            </div>

            <p className="text-sm text-gray-600 mb-3">{pkg.description}</p>

            <div className="flex flex-wrap gap-2 mb-3">
              {pkg.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <button className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm">
              Book {pkg.name}
            </button>
          </div>
        ))}
      </div>

      {/* Right: Sidebar Quick Info */}
      <div className="bg-white border rounded-xl shadow-sm p-5 sticky top-20 space-y-4">
        <h4 className="text-md font-semibold mb-2">Quick Info</h4>
        <div className="flex items-center text-sm text-gray-700 gap-2">
          <FaSignal className="text-green-500" />
          Difficulty: {quickInfo.difficulty}
        </div>
        <div className="flex items-center text-sm text-gray-700 gap-2">
          <FaLanguage className="text-green-500" />
          Languages: {quickInfo.languages}
        </div>
        <div className="flex items-center text-sm text-gray-700 gap-2">
          <FaUserFriends className="text-green-500" />
          Group Size: {quickInfo.groupSize}
        </div>
      </div>
    </section>
  );
};

export default BookingPanel;
