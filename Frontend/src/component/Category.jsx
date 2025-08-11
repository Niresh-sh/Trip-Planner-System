import React, { useState, useEffect } from 'react';

const categories = ['All','Nature', 'Adventure', 'Cultural', 'Relaxation', 'Spiritual', 'Wildlife'];

function Category() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDestinations = async (category) => {
    setLoading(true);

    try {
      const url =
        category === 'All'
          ? 'https://api-trip-destination.vercel.app/api/destination'
          : `https://api-trip-destination.vercel.app/api/destination?category=${encodeURIComponent(
              category
            )}`;

      const res = await fetch(url);
      const data = await res.json();
      setFiltered(data);
    } catch (error) {
      console.error('Error fetching destinations:', error);
      setFiltered([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations(activeCategory);
  }, [activeCategory]);

  return (
    <div className="w-full px-4">
      {/* Category Buttons */}
      <div className="flex w-full overflow-x-auto justify-center">
        <div className="flex space-x-3 py-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-4 py-2 rounded-full border text-sm font-medium
                transition duration-200
                ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-green-400 to-green-600 text-white'
                    : 'bg-white border-green-400 text-green-600 hover:bg-green-50'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Optional Category Heading */}
      <div className="mt-4 text-center text-gray-700">
        Showing: <span className="font-semibold">{activeCategory}</span>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {filtered.map((dest) => (
            <div
              key={dest.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <img
                src={dest.image}
                alt={dest.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{dest.title}</h2>
                <p className="text-sm text-gray-500">{dest.location}</p>
                <p className="text-yellow-500 text-sm">
                  ⭐ {dest.rating} ({dest.reviews} reviews)
                </p>
                <p className="text-sm text-gray-400">{dest.duration}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Category;
