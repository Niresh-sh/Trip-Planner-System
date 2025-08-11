import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const categories = ["All", "Nature", "Adventure", "Cultural", "Relaxation", "Spiritual", "Wildlife"];

const AllDestinations = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { isPending, error, data } = useQuery({
    queryKey: ["destinations"],
    queryFn: () =>
      fetch("https://api-trip-destination.vercel.app/api/destination").then((res) =>
        res.json()
      ),
  });

  const navigate = useNavigate();

  // Filter based on category
  const filteredData = data?.filter((dest) => {
    if (selectedCategory === "All") return true;

    // Support array or string category
    if (Array.isArray(dest.category)) {
      return dest.category.some(
        (cat) => cat.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    return dest.category?.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Explore Destinations</h1>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
              selectedCategory === category
                ? "bg-green-600 text-white"
                : "bg-white text-green-600 border-green-500 hover:bg-green-50"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {isPending && (
        <div className="flex justify-center items-center mt-10">
          <img src="/loading.svg" alt="Loading" className="h-45 w-45" />
        </div>
      )}

      {/* Error State */}
      {error && <p className="text-center text-red-500">{error.message}</p>}

      {/* Destination Grid */}
      {!isPending && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredData?.map((dest) => (
            <div
              key={dest.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden relative transition-transform duration-300 hover:scale-105 cursor-pointer"
              onClick={() => navigate(`/destination/${dest.id}`)}
            >
              {/* Image & Badges */}
              <div className="relative">
                <img
                  src={dest.image}
                  alt={dest.title}
                  className="w-full h-56 object-cover"
                />
                {/* Rating Badge */}
                <span className="absolute top-2 left-2 bg-white text-sm px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                  <span className="text-orange-500">⭐</span>
                  <span className="text-gray-800 font-medium text-xs">{dest.rating}</span>
                </span>

                {/* Price Badge */}
                <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full shadow">
                  ${dest.cost}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {dest.title}
                </h3>

                {/* Location */}
                <p className="text-sm text-blue-600 flex items-center gap-1 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-blue-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 019.9 9.9l-4.95 4.95-4.95-4.95a7 7 0 010-9.9zM10 11a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {dest.location}
                </p>

                {/* Description */}
                <p className="text-sm text-gray-600">
                  {dest.description?.length > 80
                    ? dest.description.slice(0, 80) + "..."
                    : dest.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllDestinations;
