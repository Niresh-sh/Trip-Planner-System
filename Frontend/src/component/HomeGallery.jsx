import React, { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const categories = [
  "All",
  "Nature",
  "Culture",
  "Adventure",
  "Food",
  "Hidden Gems",
];

function HomeGallery() {
  const [images, setImages] = useState([]);
  const [filter, setFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch("https://api-trip-destination.vercel.app/api/destination")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((item) => ({
          src: item.image,
          category: item.category || "Uncategorized",
          width: 800,
          height: 600,
        }));
        setImages(formatted);
      })
      .catch(console.error);
  }, []);

  const filtered =
    filter === "All"
      ? images
      : images.filter((img) => img.category === filter);

  const visibleImages = filtered.slice(0, visibleCount);

  const trackFilter = (cat) => {
    setFilter(cat);
    setVisibleCount(6); // Reset to 6 when changing filters
    console.log("Filter selected:", cat); // For analytics
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-2">Inspiration Gallery</h2>
        <p className="text-gray-500 mb-8">
          Get inspired by stunning visuals from travelers around the world
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => trackFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm transition ${
                filter === cat
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {visibleImages.map((img, i) => (
            <img
              key={i}
              src={img.src}
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
              className="w-full h-60 object-cover rounded-lg shadow-lg hover:opacity-90 cursor-pointer transition-opacity"
              alt=""
            />
          ))}
        </div>

        {/* Lightbox */}
        {open && (
          <Lightbox
            open={open}
            close={() => setOpen(false)}
            index={index}
            slides={visibleImages.map((img) => ({ src: img.src }))}
          />
        )}

        {/* Load More Button */}
        {visibleCount < filtered.length && (
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-white border rounded-md text-sm hover:bg-gray-100"
          >
            Load More Inspiration
          </button>
        )}
      </div>
    </section>
  );
}

export default HomeGallery;
