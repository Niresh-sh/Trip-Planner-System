import React from 'react';
import { FaMapMarkedAlt } from 'react-icons/fa';

const LocationRoute = ({ locationName, mapImage, mapLink, routeDescription }) => {
  return (
    <section className="my-10">
      <h2 className="text-xl font-bold mb-4">📍 Location & Route</h2>

      <div className="bg-white border rounded-xl shadow-sm p-5 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left: Text */}
        <div>
          <h3 className="text-lg font-semibold mb-2">
            <FaMapMarkedAlt className="inline-block mr-2 text-green-600" />
            {locationName}
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">{routeDescription}</p>
          <a
            href={mapLink}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-3 text-green-600 hover:underline text-sm"
          >
            Open in Google Maps →
          </a>
        </div>

        {/* Right: Map Image or Embed */}
        <div>
          <img
            src={mapImage}
            alt="Map preview"
            className="rounded-lg w-full h-64 object-cover border"
          />
        </div>
      </div>
    </section>
  );
};

export default LocationRoute;
