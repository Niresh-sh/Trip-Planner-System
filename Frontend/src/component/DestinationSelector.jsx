import React, { useEffect, useState } from 'react';
import { MapPinIcon } from '@heroicons/react/24/solid';
import axios from 'axios';

const DestinationSelector = () => {
  const [desti, setDesti] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://api-trip-destination.vercel.app/api/destination')
      .then(response => {
        setDesti(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching destinations:', error);
        setLoading(false);
      });
  }, []);

  const handleSelect = (place) => {
    setSelectedDestination(place);
  };

  const handleChange = () => {
    setSelectedDestination(null);
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <MapPinIcon className="w-5 h-5 text-green-600" />
        <h2 className="text-lg font-semibold">Select Destination</h2>
      </div>

      {/* Loading */}
      {loading ? (
        <p className="text-gray-500 text-sm">Loading...</p>
      ) : (
        <>
          {!selectedDestination ? (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {desti.map((dest, index) => (
                <div
                  key={index}
                  onClick={() => handleSelect(dest)}
                  className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                >
                  <img
                    src={dest.image}
                    alt={dest.title}
                    className="w-12 h-12 object-cover rounded-md mr-3"
                  />
                  <div>
                    <p className="font-medium">{dest.title}</p>
                    <p className="text-sm text-gray-500">₹{dest.cost?.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-100 p-3 rounded flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img
                  src={selectedDestination.image}
                  alt={selectedDestination.title}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <p className="font-semibold">{selectedDestination.title}</p>
                  <p className="text-sm text-gray-500">₹{selectedDestination.cost?.toLocaleString()} per person</p>
                </div>
              </div>
              <button
                onClick={handleChange}
                className="text-sm text-blue-600 hover:underline"
              >
                Change
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DestinationSelector;
