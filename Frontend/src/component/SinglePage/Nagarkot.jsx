import React from 'react';
import { FaMountain, FaSun, FaClock, FaSnowflake, FaMapMarkerAlt, FaCalendarAlt, FaSignal } from 'react-icons/fa';

const ExperienceDetails = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

      {/* Left Column */}
      <div className="lg:col-span-2">
        <h2 className="text-xl font-semibold mb-4">About This Experience</h2>
        <p className="text-gray-700 mb-6 text-sm leading-relaxed">
          The Nagarkot Panoramic Hiking Trail is one of Nepal’s most spectacular hiking experiences, offering breathtaking 360-degree views of the Himalayan range. Located just 32 kilometers east of Kathmandu, this scenic trail attracts thousands of visitors seeking stunning sunrise views and mountain panoramas.
          <br /><br />
          The trail winds through traditional Nepalese villages, terraced farmlands, and dense forests of pine and rhododendron. On clear days, hikers can see up to 8 Himalayan peaks, including Mount Everest, Annapurna, Manaslu, and Ganesh Himal.
          <br /><br />
          The highlight of the experience is the sunrise viewing from Nagarkot Tower, where visitors gather before dawn to witness the golden alpenglow illuminating the snow-capped peaks.
        </p>

        {/* Feature Boxes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-green-50 p-3 rounded-md flex items-start space-x-2">
            <FaMountain className="text-green-600 mt-1" />
            <div>
              <p className="font-semibold text-sm text-gray-800">Himalayan Views</p>
              <p className="text-xs text-gray-600">Panoramic view of 8 peaks</p>
            </div>
          </div>

          <div className="bg-green-50 p-3 rounded-md flex items-start space-x-2">
            <FaSun className="text-yellow-500 mt-1" />
            <div>
              <p className="font-semibold text-sm text-gray-800">Sunrise Experience</p>
              <p className="text-xs text-gray-600">World-famous sunrise spot</p>
            </div>
          </div>

          <div className="bg-green-50 p-3 rounded-md flex items-start space-x-2">
            <FaClock className="text-green-600 mt-1" />
            <div>
              <p className="font-semibold text-sm text-gray-800">3-4 Hours</p>
              <p className="text-xs text-gray-600">Moderate hiking difficulty</p>
            </div>
          </div>

          <div className="bg-green-50 p-3 rounded-md flex items-start space-x-2">
            <FaSnowflake className="text-blue-500 mt-1" />
            <div>
              <p className="font-semibold text-sm text-gray-800">Cool Climate</p>
              <p className="text-xs text-gray-600">Pleasant year-round</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-6">

        {/* Location & Route */}
        <div className="bg-gray-50 border rounded-md p-4">
          <h3 className="text-sm font-semibold mb-2 flex items-center space-x-2">
            <FaMapMarkerAlt className="text-green-600" />
            <span>Location & Route</span>
          </h3>
          <div className="bg-white border rounded-md p-4 text-center text-sm text-gray-700 mb-2">
            <p className="font-semibold">Interactive Map</p>
            <p>Nagarkot, Bhaktapur District</p>
            <p>32km from Kathmandu</p>
          </div>
          <p className="text-sm text-gray-600 mt-2"><strong>Starting Point:</strong> Nagarkot Bus Park</p>
          <p className="text-sm text-gray-600"><strong>Elevation:</strong> 2,195m (7,201ft)</p>
        </div>

        {/* Best Time to Visit */}
        <div className="bg-gray-50 border rounded-md p-4">
          <h3 className="text-sm font-semibold mb-3 flex items-center space-x-2">
            <FaCalendarAlt className="text-green-600" />
            <span>Best Time to Visit</span>
          </h3>
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span>Oct–Dec</span>
              <span className="text-green-600 text-xs bg-green-100 px-2 py-0.5 rounded">High Season</span>
            </div>
            <div className="flex justify-between">
              <span>Mar–May</span>
              <span className="text-green-600 text-xs bg-green-100 px-2 py-0.5 rounded">High Season</span>
            </div>
            <div className="flex justify-between">
              <span>Jun–Sep</span>
              <span className="text-yellow-600 text-xs bg-yellow-100 px-2 py-0.5 rounded">Low Season</span>
            </div>
          </div>
        </div>

        {/* Duration and Difficulty */}
        <div className="bg-gray-50 border rounded-md p-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-2">
            <FaClock className="text-green-600" />
            <span><strong>Duration:</strong> 3-4 Hours</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaSignal className="text-blue-600" />
            <span><strong>Difficulty:</strong> Moderate</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ExperienceDetails;
