import React from 'react';
import { FaMountain, FaSun, FaClock, FaSnowflake } from 'react-icons/fa';

const AboutExperience = ({ description, highlights }) => {
  return (
    <section className="my-10 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Text Content */}
      <div className="md:col-span-2">
        <h2 className="text-xl font-bold mb-4">About This Experience</h2>
        <p className="text-gray-700 leading-relaxed">{description}</p>

        {/* Highlight Cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {highlights.map((item, index) => (
            <div key={index} className="flex items-start bg-green-50 rounded-lg p-4 shadow-sm">
              <div className="text-green-600 text-2xl mr-3 mt-1">{item.icon}</div>
              <div>
                <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-gray-600">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Placeholder for sidebar or map later */}
      <div></div>
    </section>
  );
};

export default AboutExperience;
