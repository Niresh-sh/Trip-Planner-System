import React from 'react';
import { CalendarDaysIcon } from '@heroicons/react/24/solid';

const TravelDates = ({ startDate, endDate, onStartDateChange, onEndDateChange }) => {
  return (
    <div className="w-[80wh] p-4 bg-white rounded-lg shadow">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <CalendarDaysIcon className="w-5 h-5 text-green-600" />
        <h2 className="text-lg font-semibold">Travel Dates</h2>
      </div>

      {/* Date Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>
    </div>
  );
};

export default TravelDates;
