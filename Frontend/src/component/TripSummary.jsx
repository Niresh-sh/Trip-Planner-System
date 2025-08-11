import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPinIcon, PlusIcon } from "@heroicons/react/24/solid";

const TripSummaryPage = () => {
  const navigate = useNavigate();

  const handlePlanTrip = () => {
    navigate("/PlanTrip"); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f9f9]">
      <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-4 rounded-full">
            <MapPinIcon className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-2">No trips planned yet</h2>
        <p className="text-gray-600 mb-6">
          Start planning your dream Nepal adventure and <br /> create unforgettable memories
        </p>

        <button
          onClick={handlePlanTrip}
          className="flex items-center justify-center gap-2 px-6 py-3 ml-14 bg-gradient-to-r from-green-500 to-blue-400 text-white font-medium rounded-lg shadow hover:opacity-90 transition"
        >
          <PlusIcon className="w-5 h-5" />
          Plan Your First Trip
        </button>
      </div>
    </div>
  );
};

export default TripSummaryPage;
