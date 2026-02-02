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
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500" />
        <div className="absolute inset-0 bg-[url('/public/hero-mountain.jpg')] bg-cover bg-center mix-blend-overlay opacity-35" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <div className="flex flex-col items-center">
            <svg
              className="w-14 h-14 mb-4 text-white/80"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 17l6-6 4 4L21 7"
              />
            </svg>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white drop-shadow">
              Trip Planner
            </h1>
            <p className="max-w-xl text-sm md:text-base text-white/90 leading-relaxed">
              Your trusted companion for discovering the breathtaking beauty and
              rich culture of Nepal. We're passionate about creating authentic
              travel experiences that connect you with the heart of the
              Himalayas.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-100 to-transparent" />
      </section>

      {/* Stats Section */}
      <section className="bg-gray-100">
        <div className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6 text-center border border-transparent hover:border-green-100"
              >
                <div className="text-green-600 text-xl md:text-2xl font-bold">
                  {stat.number}
                </div>
                <div className="mt-2 text-gray-600 text-xs md:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Title */}
      <section className="bg-gray-100 text-center py-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Why Choose Trip Planner?
        </h1>
      </section>

      {/* Main Content */}
      <div className="bg-gray-100 px-5 md:px-14 pb-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[340px_1fr_320px] gap-10">
          
          <div className="hidden lg:flex flex-col gap-6">
            <img
            type="image/svg+xml"
              src="/public/journey.svg"
              alt="Journey Illustration"
              className="w-full h-auto bg-gray p-4"
            />
            <img
            type="image/svg+xml"
              src="/public/Rio.svg"
              alt="Travelers"
              className="w-full h-auto bg-gray p-4"
            />
          </div>

          
          <div className="space-y-6">
           
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3 bg-white shadow-sm rounded-lg p-5">
                <FaMountain className="text-green-600 text-2xl mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800">Expert Local Guides</h4>
                  <p className="text-gray-600 text-sm">
                    Experience Nepal with knowledgeable local guides who know
                    every hidden gem.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 bg-white shadow-sm rounded-lg p-5">
                <FaLeaf className="text-green-600 text-2xl mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800">Sustainable Tourism</h4>
                  <p className="text-gray-600 text-sm">
                    We're committed to responsible travel that benefits local
                    communities.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 bg-white shadow-sm rounded-lg p-5">
                <FaStar className="text-green-600 text-2xl mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800">Curated Experiences</h4>
                  <p className="text-gray-600 text-sm">
                    Hand-picked destinations and activities for unforgettable
                    adventures.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 bg-white shadow-sm rounded-lg p-5">
                <FaUserCircle className="text-green-600 text-2xl mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800">Personalized Service</h4>
                  <p className="text-gray-600 text-sm">
                    Tailored itineraries designed to match your travel
                    preferences.
                  </p>
                </div>
              </div>
            </div>

           
            <div className="bg-white shadow-sm rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-3">
                <FaHeart className="text-green-600 text-xl" />
                <h3 className="text-lg font-semibold text-gray-800">Our Mission</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                To make the wonders of Nepal accessible to every traveler while
                preserving its natural beauty and supporting local communities.
              </p>
            </div>

            
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FaMapMarkerAlt className="text-green-600 text-lg mt-1" />
                  <div>
                    <p className="font-semibold text-sm text-gray-700">
                      Office Location
                    </p>
                    <p className="text-sm text-gray-600">
                      Thamel, Kathmandu, Nepal
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FaPhoneAlt className="text-green-600 text-lg mt-1" />
                  <div>
                    <p className="font-semibold text-sm text-gray-700">Phone</p>
                    <p className="text-sm text-gray-600">+977-5412343</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FaEnvelope className="text-green-600 text-lg mt-1" />
                  <div>
                    <p className="font-semibold text-sm text-gray-700">Email</p>
                    <p className="text-sm text-gray-600">hello@tripplanner.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FaGlobe className="text-green-600 text-lg mt-1" />
                  <div>
                    <p className="font-semibold text-sm text-gray-700">Website</p>
                    <a
                      href="https://www.tripplanner.com"
                      className="text-green-600 hover:underline text-sm"
                      target="_blank"
                      rel="noreferrer"
                    >
                      www.TripPlanner.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Decorative Image Column */}
          <div className="hidden md:flex flex-col justify-between gap-6">
            <img
            type="image/svg+xml"  
              src="/public/journey1.svg"
              alt="Scenic Illustration"
              className="w-full h-auto bg-gray p-4"
            />
            <img
              type="image/svg+xml"
              src="/public/travelers.svg"
              alt="Adventure"
              className="w-full h-auto bg-gray p-4"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
