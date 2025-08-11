import React from 'react';
import { UserGroupIcon } from '@heroicons/react/24/solid';

const Travelers = ({ travelers, onChange }) => {
  return (
    <section className=''>
      <div className="w-[80wh] p-4 bg-white rounded-lg shadow">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <UserGroupIcon className="w-5 h-5 text-green-600" />
        <h2 className="text-lg font-semibold">Travelers</h2>
      </div>

      {/* Input */}
      <input
        type="number"
        min="1"
        value={travelers}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="Number of travelers"
      />
    </div>
    </section>
  );
};

export default Travelers;
