import React, { useEffect, useState } from "react";
import Slider from "./Slider";
import FadeInSection from "./FadeInSection";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaPalette,
  FaFileAlt,
  FaShareAlt,
  FaEye,
  FaMagic,
  FaUsers,
  FaShieldAlt,
  FaSearchLocation,
} from "react-icons/fa";
import HomeGallery from "./HomeGallery";

function Body() {
  const [allDestinations, setAllDestinations] = useState([]); 

  const [recommendedDestinations, setRecommendedDestinations] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const token = localStorage.getItem("token");


  useEffect(() => {
    fetch("http://localhost:3000/api/destination/get-destination")
      .then((res) => res.json())
      .then((data) => {
        setAllDestinations(data?.destinations || []); 
        setDestinations(data?.destinations?.slice(0, 4)); 
      })
      .catch(console.error);
  }, []);

  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (query.length === 0) {
      setFiltered([]);
      return;
    }
    
    const results = destinations.filter((dest) =>
      
      [dest.name, dest.title, dest.location].some((field) =>
        field?.toLowerCase().includes(query.toLowerCase())
      )
    );

    setFiltered(results.slice(0, 5));
  }, [query, destinations]);

  function onSelect(dest) {
    setQuery(dest.name || dest.title || dest.location);
    setFiltered([]);
   
    navigate(`/destination/${dest._id}`);
  }
  useEffect(() => {
    if (query.length === 0) {
      setFiltered([]);
      return;
    }

    const results = allDestinations.filter((dest) =>
      [dest.name, dest.title, dest.location].some((field) =>
        field?.toLowerCase().includes(query.toLowerCase())
      )
    );

    setFiltered(results.slice(0, 5));
  }, [query, allDestinations]);

  function onSelect(dest) {
    if (!dest?._id) {
      console.error("Destination _id missing:", dest);
      return;
    }
    setQuery(dest.name || dest.title || dest.location);
    setFiltered([]);
    navigate(`/destination/${dest._id}`);
  }
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const userId = localStorage.getItem("id"); // correct key
        console.log("USER ID FROM LOCALSTORAGE:", userId);

        // or from auth context
        const res = await fetch(
          `http://localhost:3000/api/recommend/recommendations/${userId}`
        );
        if (!res.ok) throw new Error("Failed to fetch recommendations");
        const data = await res.json();
        setRecommendedDestinations(data.recommendedDestinations || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecommendations();
  }, []);

  return (
    <>
      {/* <FadeInSection> */}
      <section className="relative z-[99]  text-center bg-gray-100 pt-3 pb-12">
        <h1 className="text-4xl p-4 font-bold justify-center">Where To?</h1>

        <div className="relative w-full max-w-xl mx-auto">
          <input
            placeholder="e.g. kathmandu"
            className="rounded-full w-full h-16 bg-transparent py-2 pl-8 pr-32 outline-none border-2 border-white shadow-xl hover:outline-none focus:ring-green-500 focus:border-green-400"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div
            className="absolute inline-flex items-center justify-center h-16 w-16 text-green-500 
             transition duration-150 ease-in-out rounded-full outline-none right-3  
              focus:outline-none focus:ring-2 
             focus:ring-offset-2 focus:ring-green-500 "
            onClick={() => {
              if (filtered.length > 0) onSelect(filtered[0]);
            }}
          >
            <FaSearchLocation />
          </div>
          {filtered.length > 0 && (
            <ul className="absolute z-[1000] w-full bg-white border rounded-md mt-1 max-h-60 overflow-auto shadow-lg">
              {filtered.map((dest) => {
                const displayText = dest.name || dest.title || dest.location;
                const regex = new RegExp(`(${query})`, "gi"); 
                const parts = displayText.split(regex); 
                return (
                  <li
                    key={dest._id}
                    onClick={() => onSelect(dest)}
                    className="cursor-pointer px-4 py-2 hover:bg-green-100"
                  >
                    {parts.map((part, i) =>
                      regex.test(part) ? (
                        <span key={i} className="bg-yellow-200">
                          {part}
                        </span>
                      ) : (
                        <span key={i}>{part}</span>
                      )
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
      {/* </FadeInSection> */}

      {/* <FadeInSection> */}
      <Slider />
      {/* </FadeInSection> */}

     {token && (
  <section className="max-w-7xl mx-auto px-4 py-12">
    <h2 className="text-3xl font-bold text-gray-800 mb-2">
      Recommended Destinations
    </h2>
    <p className="text-gray-600 mb-6">
      Based on your interests and past trips
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {recommendedDestinations?.map((dest) => (
        <div
          key={dest._id}
          className="bg-white rounded-lg shadow-lg overflow-hidden relative transition-transform duration-300 hover:scale-105 cursor-pointer"
          onClick={() => navigate(`/destination/${dest._id}`)}
        >
          {/* Image & Badges */}
          <div className="relative">
            <img
              src={dest.image}
              alt={dest.title}
              className="w-full h-56 object-cover"
            />

            {/* Rating Badge */}
            {/* <span className="absolute top-2 left-2 bg-white text-sm px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
              <span className="text-orange-500"></span>
              <span className="text-gray-800 font-medium text-xs">
                {dest.rating}
              </span>
            </span> */}

            {/* Price Badge */}
            <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full shadow">
              Rs.{dest.cost}
            </span>
          </div>

          {/* Card Content */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {dest.title}
            </h3>

            {/* Location */}
            <p className="text-sm text-green-600 flex items-center gap-1 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-green-500"
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
  </section>
)}


      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Featured Destinations
        </h2>
        <p className="text-gray-600 mb-6">
          Discover our most loved destinations from Nepal
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {destinations?.map((dest) => (
            <div
              key={dest._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden relative transition-transform duration-300 hover:scale-105 cursor-pointer"
              onClick={() => navigate(`/destination/${dest._id}`)}
            >
              {/* Image & Badges */}
              <div className="relative">
                <img
                  src={dest.image}
                  alt={dest.title}
                  className="w-full h-56 object-cover"
                />
                {/* Rating Badge */}
                {/* <span className="absolute top-2 left-2 bg-white text-sm px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                  <span className="text-orange-500">⭐</span>
                  <span className="text-gray-800 font-medium text-xs">
                    {dest.rating}
                  </span>
                </span> */}

                {/* Price Badge */}
                <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full shadow">
                  Rs.{dest.cost}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {dest.title}
                </h3>

                {/* Location */}
                <p className="text-sm text-green-600 flex items-center gap-1 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-green-500"
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
      </section>

      <section className="bg-gray-100 py-12 h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            How It Works
          </h2>
          <p className="text-gray-500 mb-10">
            Creating your perfect trip is easier than ever with our simple
            3-step process
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-gray-100 p-5 rounded-xl mb-4 shadow-sm">
                <FaMapMarkerAlt className="text-green-500 text-3xl" />
              </div>
              <div className="w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full text-sm font-bold mb-2">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                Choose a Destination
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Tell us where you want to go and when you plan to travel
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-gray-100 p-5 rounded-xl mb-4 shadow-sm">
                <FaPalette className="text-green-500 text-3xl" />
              </div>
              <div className="w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full text-sm font-bold mb-2">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                Set Your Travel Style
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Select your interests, budget, and preferred activities
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-gray-100 p-5 rounded-xl mb-4 shadow-sm">
                <FaFileAlt className="text-green-500 text-3xl" />
              </div>
              <div className="w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full text-sm font-bold mb-2">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                Get Your Trip Booked
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Receive a custom travel plan with visual recommendations
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="">
        <HomeGallery />
      </section>

      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Why Choose Trip Planner?
          </h2>
          <p className="text-center text-gray-500 mb-12">
            We’re revolutionizing travel planning with visual-first tools that
            put you in control of your adventure
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="mb-4">
                <FaEye className="text-green-400 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Visual Planning
              </h3>
              <p className="text-gray-600 mb-4">
                Plan your trip with stunning photos and interactive maps. See
                your journey before you travel.
              </p>
              <ul className="list-disc list-inside text-sm text-green-600 space-y-1">
                <li>HD destination photos</li>
                <li>Interactive route maps</li>
                <li>Virtual location tours</li>
                <li>360° previews</li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="mb-4">
                <FaMagic className="text-green-400 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Personalized Itineraries
              </h3>
              <p className="text-gray-600 mb-4">
                AI-powered recommendations tailored to your interests, budget,
                and travel style.
              </p>
              <ul className="list-disc list-inside text-sm text-green-600 space-y-1">
                <li>Smart recommendations</li>
                <li>Budget optimization</li>
                <li>Interest matching</li>
                <li>Flexible scheduling</li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="mb-4">
                <FaUsers className="text-green-400 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Community-Curated
              </h3>
              <p className="text-gray-600 mb-4">
                Access insights from real travelers and local experts who know
                the destinations best.
              </p>
              <ul className="list-disc list-inside text-sm text-black space-y-1">
                <li>Traveler reviews</li>
                <li>Local expert tips</li>
                <li>Hidden gem discoveries</li>
                <li>Community ratings</li>
              </ul>
            </div>

            {/* Card 4 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="mb-4">
                <FaShieldAlt className="text-green-400 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No Bookings Required
              </h3>
              <p className="text-gray-600 mb-4">
                Pure planning focus without pressure to book. Plan first, book
                when you're ready.
              </p>
              <ul className="list-disc list-inside text-sm text-black space-y-1">
                <li>No sales pressure</li>
                <li>Free planning tools</li>
                <li>Export to any platform</li>
                <li>Keep full control</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Body;
