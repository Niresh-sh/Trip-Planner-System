import React from 'react';
import { FaMapMarkerAlt, FaRegClock, FaStar } from 'react-icons/fa';

const HeroSection = ({ destination }) => {
  return (
    <section
      className="relative h-[85vh] w-full bg-cover bg-center rounded-b-3xl overflow-hidden"
      style={{ backgroundImage: `url(${destination.image})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 p-8 md:p-16 text-white max-w-4xl">
        <span className="bg-green-600 text-white px-3 py-1 text-sm rounded-full inline-block mb-4 shadow-lg">
          #{destination.rank} Attraction in {destination.location}
        </span>

        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
          {destination.title}
        </h1>

        <div className="flex items-center text-sm mb-2">
          <FaMapMarkerAlt className="mr-1" />
          {destination.location}
          <FaStar className="ml-4 mr-1 text-yellow-400" />
          {destination.rating} <span className="ml-1 text-gray-200">({destination.reviews} reviews)</span>
          <FaRegClock className="ml-4 mr-1" />
          {destination.duration}
        </div>

        <p className="text-sm md:text-base max-w-2xl mb-6">{destination.description}</p>

        <div className="flex gap-4 flex-wrap">
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold">
            Book Now - ${destination.price}
          </button>
          <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-5 py-2 rounded-lg">
            Save to Wishlist
          </button>
          <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-5 py-2 rounded-lg">
            Share Experience
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
