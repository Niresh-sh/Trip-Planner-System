import React from 'react';

const seasonColor = {
  'High Season': 'bg-green-100 text-green-700',
  'Low Season': 'bg-yellow-100 text-yellow-700',
};

const BestTimeToVisit = ({ seasons }) => {
  return (
    <section className="my-10">
      <h2 className="text-xl font-bold mb-4">📅 Best Time to Visit</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {seasons.map((season, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold mb-1">{season.period}</h3>
            <p className="text-sm text-gray-600 mb-2">Average Temp: {season.temp}</p>
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full w-fit inline-block ${seasonColor[season.season]}`}
            >
              {season.season}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestTimeToVisit;
