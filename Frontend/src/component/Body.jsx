import React, { useEffect, useState } from 'react';
import Slider from './Slider'
import FadeInSection from './FadeInSection'
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPalette, FaFileAlt, FaShareAlt, FaEye, FaMagic, FaUsers, FaShieldAlt } from 'react-icons/fa';
import HomeGallery from './HomeGallery';



function Body() {
 const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    fetch('https://api-trip-destination.vercel.app/api/destination')
      .then(res => res.json())
      .then(data => {
        setDestinations(data.slice(0, 4)); // show top 3–4 only
      })
      .catch(console.error);
  }, []);
  return (
    <>
    <FadeInSection>
    <section className='text-center h-[30vh] bg-gray-100 pt-3'>
    <h1 className='text-4xl p-4 font-bold justify-center'>Where To?</h1>

    <div className="relative w-full max-w-xl mx-auto bg-white rounded-full">
      <input placeholder="e.g. kathmandu" className="rounded-full w-full h-16 bg-transparent py-2 pl-8 pr-32 outline-none border-2 border-gray-100 shadow-md hover:outline-none focus:ring-teal-200 focus:border-teal-200" type="text" name="query" id="query" />
      <button type="submit" className="absolute inline-flex items-center h-10 px-4 py-2 text-sm text-white transition duration-150 ease-in-out rounded-full outline-none right-3 top-3 bg-teal-600 sm:px-6 sm:text-base sm:font-medium hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
        <svg className="-ml-0.5 sm:-ml-1 mr-2 w-4 h-4 sm:h-5 sm:w-5" xmlns="http://www.w3.org/2000/svg" fillRule="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        Search
      </button>
    </div>
</section>
</FadeInSection>

<FadeInSection>
< Slider />
</FadeInSection>


    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Featured Destinations</h2>
      <p className="text-gray-600 mb-6">
        Discover our most loved destinations from Nepal
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {destinations.map((dest, idx) => (
          <div key={idx} className="relative rounded-lg overflow-hidden shadow-lg">
            <img
              src={dest.image || dest.image_url}
              alt={dest.name || dest.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-3 left-3 bg-green-500 text-white text-xs uppercase px-2 py-1 rounded">
              {dest.category || 'Adventure'}
            </div>
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent text-white p-4">
              <p className="text-sm">{dest.location || dest.country}</p>
              <h3 className="text-lg font-semibold">{dest.name || dest.title}</h3>
              {dest.rating && (
                <div className="flex items-center gap-1 text-yellow-300">
                  <span>★</span>
                  <span>{dest.rating.toFixed(1)}</span>
                </div>
              )}
              {dest.price_from && (
                <p className="mt-1 text-sm">From {dest.cost}</p>
              )}
              <Link
  to={`/destination/${dest.id}`}
  className="mt-2 block text-center w-full py-1 bg-white text-black text-sm font-medium rounded hover:bg-gray-200 transition"
>
  View Details
</Link>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="bg-gray-100 py-12 h-[60vh]">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">How It Works</h2>
        <p className="text-gray-500 mb-10">
          Creating your perfect trip is easier than ever with our simple 3-step process
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="bg-gray-100 p-5 rounded-xl mb-4 shadow-sm">
              <FaMapMarkerAlt className="text-blue-500 text-3xl" />
            </div>
            <div className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full text-sm font-bold mb-2">
              1
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Choose a Destination</h3>
            <p className="text-sm text-gray-500 mt-1">
              Tell us where you want to go and when you plan to travel
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="bg-gray-100 p-5 rounded-xl mb-4 shadow-sm">
              <FaPalette className="text-green-500 text-3xl" />
            </div>
            <div className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full text-sm font-bold mb-2">
              2
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Set Your Travel Style</h3>
            <p className="text-sm text-gray-500 mt-1">
              Select your interests, budget, and preferred activities
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="bg-gray-100 p-5 rounded-xl mb-4 shadow-sm">
              <FaFileAlt className="text-blue-500 text-3xl" />
            </div>
            <div className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full text-sm font-bold mb-2">
              3
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Get Your Trip Booked</h3>
            <p className="text-sm text-gray-500 mt-1">
              Receive a custom travel plan with visual recommendations
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className=''>
      <HomeGallery />
    </section>

     <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Why Choose Trip Planner?
        </h2>
        <p className="text-center text-gray-500 mb-12">
          We’re revolutionizing travel planning with visual-first tools that put you in control of your adventure
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition">
            <div className="mb-4">
              <FaEye className="text-sky-400 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Visual Planning</h3>
            <p className="text-gray-600 mb-4">
              Plan your trip with stunning photos and interactive maps. See your journey before you travel.
            </p>
            <ul className="list-disc list-inside text-sm text-teal-600 space-y-1">
              <li>HD destination photos</li>
              <li>Interactive route maps</li>
              <li>Virtual location tours</li>
              <li>360° previews</li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition">
            <div className="mb-4">
              <FaMagic className="text-sky-400 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Personalized Itineraries</h3>
            <p className="text-gray-600 mb-4">
              AI-powered recommendations tailored to your interests, budget, and travel style.
            </p>
            <ul className="list-disc list-inside text-sm text-teal-600 space-y-1">
              <li>Smart recommendations</li>
              <li>Budget optimization</li>
              <li>Interest matching</li>
              <li>Flexible scheduling</li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition">
            <div className="mb-4">
              <FaUsers className="text-sky-400 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Community-Curated</h3>
            <p className="text-gray-600 mb-4">
              Access insights from real travelers and local experts who know the destinations best.
            </p>
            <ul className="list-disc list-inside text-sm text-teal-600 space-y-1">
              <li>Traveler reviews</li>
              <li>Local expert tips</li>
              <li>Hidden gem discoveries</li>
              <li>Community ratings</li>
            </ul>
          </div>

          {/* Card 4 */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition">
            <div className="mb-4">
              <FaShieldAlt className="text-sky-400 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Bookings Required</h3>
            <p className="text-gray-600 mb-4">
              Pure planning focus without pressure to book. Plan first, book when you're ready.
            </p>
            <ul className="list-disc list-inside text-sm text-teal-600 space-y-1">
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
  )
}

export default Body
