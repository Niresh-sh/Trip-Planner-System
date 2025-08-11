import React from "react";
import {
  FaMountain,
  FaLeaf,
  FaStar,
  FaUserCircle,
  FaHeart,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
} from "react-icons/fa";

function About() {
  const stats = [
    { number: "10,000+", label: "Happy Travelers" },
    { number: "20+", label: "Destinations" },
    { number: "5 Years", label: "Experience" },
    { number: "4.8/5", label: "Average Rating" },
  ];
  return (
    <>
      <section className="h-[33vh] bg-gradient-mountain">
        <div class=" bg-gradient-to-b from-green-500 to-gray-100 py-6 px-7 sm:px-6 lg:px-8 text-white p-15 text-center">
          <div class="flex flex-col items-center ">
            <svg
              class="w-12 h-12 mb-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 17l6-6 4 4L21 7"
              />
            </svg>
            <h1 class="text-2xl font-bold mb-2 text-black ">Trip Planner</h1>
            <p class="max-w-xl text-center  text-black">
              Your trusted companion for discovering the breathtaking beauty and
              rich culture of Nepal. We're passionate about creating authentic
              travel experiences that connect you with the heart of the
              Himalayas.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-100">
        <div className=" py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow p-6 text-center"
              >
                <div className="text-green-600 text-2xl font-bold">
                  {stat.number}
                </div>
                <div className="mt-2 text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="flex bg-gray-100 text-center justify-center h-20">
        <h1 className="p-4 text-2xl font-bold">Why Choose Trip Planner ?</h1>
      </section>

      <div className="bg-gray-100 h-[150vh] flex items-center justify-center px-6 pl-5 ">
        <div className="max-w-2xl w-full space-y-4 ml-18">
          {/* Feature 1 */}
          <div className="flex items-center space-x-3 bg-white shadow-sm rounded-lg p-6 max-w-xl w-full">
            <FaMountain className="text-green-600 text-2xl mt-1" />
            <div>
              <h4 className="font-semibold text-gray-800">
                Expert Local Guides
              </h4>
              <p className="text-gray-600 text-sm">
                Experience Nepal with knowledgeable local guides who know every
                hidden gem
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-center space-x-3 bg-white shadow-sm rounded-lg p-6 max-w-xl w-full">
            <FaLeaf className="text-green-600 text-2xl mt-1" />
            <div>
              <h4 className="font-semibold text-gray-800">
                Sustainable Tourism
              </h4>
              <p className="text-gray-600 text-sm">
                We're committed to responsible travel that benefits local
                communities
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-center space-x-3 bg-white shadow-sm rounded-lg p-6 max-w-xl w-full">
            <FaStar className="text-green-600 text-2xl mt-1" />
            <div>
              <h4 className="font-semibold text-gray-800">
                Curated Experiences
              </h4>
              <p className="text-gray-600 text-sm">
                Hand-picked destinations and activities for unforgettable
                adventures
              </p>
            </div>
          </div>


          <div className="flex items-center space-x-3 bg-white shadow-sm rounded-lg p-6 max-w-xl w-full">
            <FaUserCircle className="text-green-600 text-2xl mt-1" />
            <div>
              <h4 className="flex font-semibold text-gray-800">
                Personalized Service
              </h4>
              <p className="text-gray-600 text-sm">
                Tailored itineraries designed to match your travel preferences
              </p>
            </div>
          </div>

           <div className="bg-white shadow-sm rounded-lg p-6 max-w-xl w-full">
        <div className="flex items-center space-x-2 mb-3">
          <FaHeart className="text-green-600 text-xl" />
          <h3 className="text-lg font-semibold text-gray-800">Our Mission</h3>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">
          To make the wonders of Nepal accessible to every traveler while preserving its natural beauty and
          supporting local communities. We believe that travel should be transformative, sustainable, and deeply
          connected to the places and people you encounter.
        </p>
      </div>

      {/* Get in Touch Card */}
      <div className="bg-white shadow-sm rounded-lg p-6 max-w-xl w-full">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Get in Touch</h3>

        {/* Office Location */}
        <div className="flex items-start space-x-3 mb-3">
          <FaMapMarkerAlt className="text-green-600 text-lg mt-1" />
          <div>
            <p className="font-semibold text-sm text-gray-700">Office Location</p>
            <p className="text-sm text-gray-600">Thamel, Kathmandu, Nepal</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start space-x-3 mb-3">
          <FaPhoneAlt className="text-green-600 text-lg mt-1" />
          <div>
            <p className="font-semibold text-sm text-gray-700">Phone</p>
            <p className="text-sm text-gray-600">+977-5412343</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start space-x-3 mb-3">
          <FaEnvelope className="text-green-600 text-lg mt-1" />
          <div>
            <p className="font-semibold text-sm text-gray-700">Email</p>
            <p className="text-sm text-gray-600">hello@tripplanner.com</p>
          </div>
        </div>

        {/* Website */}
        <div className="flex items-start space-x-3">
          <FaGlobe className="text-green-600 text-lg mt-1" />
          <div>
            <p className="font-semibold text-sm text-gray-700">Website</p>
            <p className="text-sm text-gray-600">
              <a href="https://www.TripPlanner.com" className="text-green-600 hover:underline" target="_blank" rel="noreferrer">
                www.nepalexplorer.com
              </a>
            </p>
          </div>
        </div>
      </div>
        </div>
      </div>
    </>
  );
}

export default About;
