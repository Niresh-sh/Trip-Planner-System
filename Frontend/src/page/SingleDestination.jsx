import { Link} from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DestinationMap from "../component/DestinationMap";


const SingleDestination = () => {
  const { id } = useParams();
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const GoogleMap = import.meta.env.VITE_GOOGLE_MAP
  

useEffect(() => {
   console.log("useParams id:", id);
  if (!id) return;

  fetch(`http://localhost:3000/api/destination/get-destination/${id}`)
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch destinations");
      return res.json();
    })
    .then(response => {
      if (!response.destination) throw new Error("Destination not found");
      setData(response.destination);
      setLoading(false);
    })
    .catch(err => {
      setError(err.message);
      setLoading(false);
    });
}, [id]);


if (loading) return <div className="p-10 flex items-center justify-center"><img src="/loading.svg" alt="Loading" className="h-45 w-45" /></div>;
if (error) return <div className="p-10 text-red-500">Error: {error}</div>;
if (!data) return <div className="p-10">Destination not found.</div>;
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <div
        className="relative h-[70vh] bg-cover bg-center flex items-end"
        style={{ backgroundImage: `url(${data.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="z-10 p-8 text-white max-w-4xl">
          <p className="text-sm bg-green-600 inline-block px-3 py-1 rounded-full mb-3">
            {data.location}
          </p>
          <h1 className="text-4xl font-bold mb-2">{data.title}</h1>
          <div className="flex items-center gap-4 text-sm">
            <span> {data.location}</span>
            {/* <span>⭐ {data.rating} ({data.reviews} reviews)</span> */}
            <span> {data.duration}</span>
          </div>
          <p className="mt-4 text-lg w-full max-w-xl">
            Experience breathtaking sunrise views over the Himalayas on this scenic hiking trail offering panoramic vistas of snow-capped peaks and traditional Nepalese villages.
          </p>
          <div className="mt-6 flex gap-3">
            {/* <button className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded text-white font-semibold">
              Book Now – ${data.cost}
            </button>
            <button className="bg-transparent border border-white px-5 py-2 rounded text-white">
              Save to Wishlist
            </button> */}
            <Link to="/PlanTrip" className="">
            <button className="bg-white text-black px-5 py-2 rounded">
              Plan Trip
            </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="grid md:grid-cols-3 gap-10 p-10 max-w-7xl mx-auto">
        {/* Left: About Section */}
        <div className="md:col-span-2 space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-3">About This Experience</h2>
            <p className="text-gray-700 mb-4">
              {data.description}
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <li className="bg-gray-100 p-4 rounded"> Himalayan Views</li>
              <li className="bg-gray-100 p-4 rounded"> Sunrise Experience</li>
              <li className="bg-gray-100 p-4 rounded"> {data?.duration}</li>
              <li className="bg-gray-100 p-4 rounded"> Cool Climate</li>
            </ul>
          </section>

          <section className="bg-gray-100 p-4 rounded">
            <h3 className="font-bold mb-2"> Quick Info</h3>
            <p>Duration: {data?.duration}</p>
            <p>Difficulty: Moderate</p>
            <p>Languages: English, Nepali</p>
            <p>Starting From: ${data.cost}</p>
          </section>

                    <section className="bg-gray-100 p-4 rounded">
            <h3 className="font-bold mb-2"> Best Time to Visit</h3>
            <p>Oct–Dec: {data.bestTime?.OctDec}</p>
            <p>Mar–May: {data.bestTime?.MarMay}</p>
            <p>Jun–Sep: {data.bestTime?.JunSep}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-6 mb-2">What's Included</h2>
            <ul className="list-disc pl-5 text-green-800">
            {data.included?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
            </ul>
            <h2 className="text-xl font-semibold mt-4 mb-2">Not Included</h2>
            <ul className="list-disc pl-5 text-red-800">
              {data.notIncluded?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <section className="bg-gray-100 p-2 rounded">
            <h3 className="font-bold mb-2"> Location & Route</h3>
            <p className="text-sm text-gray-600">{data?.location}</p>
            <p className="text-sm text-gray-600">Elevation: {data?.elevation}</p>
            <p className="text-sm text-gray-600">Distance: 32km from Kathmandu</p>
            {/* {data.latitude && data.longitude && (
  <DestinationMap lat={data.latitude} lng={data.longitude} />
)} */}



            <div className="mt-2 w-full h-100 bg-gray-300 rounded flex items-center justify-center text-gray-700">
                           {data.latitude && data.longitude && !isNaN(data.latitude) && !isNaN(data.longitude) && (  
                            <iframe
                width="100%"
                height="100%"
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps/embed/v1/place?key=${GoogleMap}&q=${data?.latitude},${data?.longitude}`}
              />
                           )}
            </div>
          </section>
      

          <section className="bg-gray-100 p-4 rounded">
            <h3 className="font-bold mb-2"> Nearby Attractions</h3>
            {data.nearbyAttractions?.map((attr, i) => (
              <p key={i}>• {attr?.name} – {attr?.distance} </p>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default SingleDestination;
