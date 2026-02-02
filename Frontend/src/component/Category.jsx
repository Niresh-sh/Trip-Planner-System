import React, { useState, useEffect } from 'react';

function Category() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [filtered, setFiltered] = useState([]);
  const [allDest, setAllDest] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [loading, setLoading] = useState(false);
  const backendURL = import.meta.env.VITE_API_URL;
  // Fetch categories from backend
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${backendURL}/api/category`);
        const data = await res.json();
        const list = (data?.categories || []).map(c => c.name).filter(Boolean);
        setCategories(['All', ...list]);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    })();
  }, []);

  // Fetch all destinations once
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${backendURL}/api/destination`);
        const data = await res.json();
        const dests = Array.isArray(data) ? data : (data?.destinations || []);
        setAllDest(dests);
      } catch (err) {
        console.error('Error fetching destinations:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Filter on activeCategory change
  useEffect(() => {
    if (activeCategory === 'All') {
      setFiltered(allDest);
    } else {
      const cat = activeCategory.toLowerCase().trim();
      setFiltered(
        allDest.filter(d => {
          const dCat =
            typeof d.category === 'string'
              ? d.category.toLowerCase().trim()
              : (d.category?.name || d.category?.title || '').toLowerCase().trim();
          return dCat === cat;
        })
      );
    }
  }, [activeCategory, allDest]);

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
              key={dest._id || dest.id}
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
                  ⭐ {dest.rating} {dest.reviews ? `(${dest.reviews} reviews)` : ''}
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
