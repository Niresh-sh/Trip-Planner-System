import React from "react";

const SelectedDestinationCard = ({ destination, onChange }) => {
  if (!destination) return null;

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <h3 className="font-semibold text-lg mb-3 text-green-700 flex items-center">
        <span className="mr-2">📍</span> Select Destination
      </h3>

      <div className="flex items-center justify-between bg-gray-100 p-3 rounded">
        <div className="flex items-center space-x-3">
          <img
            src={destination.image}
            alt={destination.title}
            className="w-12 h-12 object-cover rounded"
          />
          <div>
            <p className="font-medium">{destination.title}</p>
            <p className="text-sm text-gray-500">₹{destination.cost} per person</p>
          </div>
        </div>

        <button
          onClick={onChange}
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Change
        </button>
      </div>
    </div>
  );
};

export default SelectedDestinationCard;
