import React from 'react';

const experiences = [
  {
    title: 'Sunrise Hiking Experience',
    price: 25,
    duration: '4 hours',
    capacity: 'Up to 12 people',
    tags: ['Professional guide', 'Transportation from Kathmandu', 'Light breakfast', 'Photography assistance'],
    popular: true,
  },
  {
    title: 'Private Guided Tour',
    price: 75,
    duration: '6 hours',
    capacity: 'Up to 6 people',
    tags: ['Private guide', 'Hotel pickup/drop-off', 'Lunch included', 'Flexible timing', 'Cultural insights'],
  },
  {
    title: 'Photography Workshop',
    price: 45,
    duration: '5 hours',
    capacity: 'Up to 8 people',
    tags: ['Photography expert', 'Equipment rental', 'Sunrise shooting', 'Post-processing tips'],
  },
];

const BookExperience = () => {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 py-10">

      {/* Left Content */}
      <div className="lg:col-span-2 space-y-6">

        {/* Experience Cards */}
        <div className="space-y-4">
          {experiences.map((exp, idx) => (
            <div key={idx} className={`border ${exp.popular ? 'border-green-600' : 'border-gray-200'} rounded-md p-4 shadow-sm`}>
              {exp.popular && (
                <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full mb-2 inline-block">
                  ★ Most Popular
                </span>
              )}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-md">{exp.title}</h3>
                  <p className="text-sm text-gray-500">{exp.duration} • {exp.capacity}</p>
                </div>
                <div className="text-right">
                  <p className="text-green-700 font-bold text-lg">${exp.price}<span className="text-sm text-gray-500">/person</span></p>
                  <button className="mt-2 bg-green-600 text-white px-4 py-1 text-sm rounded hover:bg-green-700">
                    Book Now
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap mt-3 gap-2">
                {exp.tags.map((tag, i) => (
                  <span key={i} className="bg-gray-100 text-xs text-gray-700 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* What's Included Section */}
        <div className="border rounded-md p-5 bg-gray-50">
          <h3 className="font-semibold text-md mb-3">What's Included</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="font-semibold text-green-700 mb-2">Included:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Professional English-speaking guide</li>
                <li>Transportation from meeting point</li>
                <li>Light refreshments</li>
                <li>Trail permits and fees</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-red-600 mb-2">Not Included:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Personal expenses</li>
                <li>Travel insurance</li>
                <li>Additional meals</li>
                <li>Accommodation (unless specified)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="space-y-6">

        {/* Check Availability */}
        <div className="p-4 border rounded-md shadow-sm space-y-3">
          <button className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700">
            Check Availability
          </button>
          <div className="flex justify-between">
            <button className="text-sm text-gray-600 hover:underline">♡ Save</button>
            <button className="text-sm text-gray-600 hover:underline">↗ Share</button>
          </div>
        </div>

        {/* Quick Info */}
        <div className="border rounded-md p-4 bg-gray-50">
          <h3 className="font-semibold text-md mb-2">Quick Info</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li><strong>Duration:</strong> 3–6 hours</li>
            <li><strong>Difficulty:</strong> Moderate</li>
            <li><strong>Best time:</strong> Early morning</li>
            <li><strong>Languages:</strong> English, Nepali</li>
          </ul>
          <p className="mt-3 text-sm"><strong>Starting from:</strong> <span className="text-green-700 font-bold">$25</span></p>
        </div>

        {/* Nearby Attractions */}
        <div className="border rounded-md p-4 bg-gray-50">
          <h3 className="font-semibold text-md mb-2">Nearby Attractions</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex justify-between">
              Bhaktapur Durbar Square <span className="text-yellow-500">4.6 ★</span>
            </li>
            <li className="flex justify-between">
              Chang Narayan Temple <span className="text-yellow-500">4.5 ★</span>
            </li>
            <li className="flex justify-between">
              Sankhu Village Trek <span className="text-yellow-500">4.3 ★</span>
            </li>
            <li className="flex justify-between">
              Dhulikhel Viewpoint <span className="text-yellow-500">4.4 ★</span>
            </li>
          </ul>
          <button className="text-green-700 text-sm mt-3 hover:underline">View All Nearby</button>
        </div>
      </div>
    </div>
  );
};

export default BookExperience;
