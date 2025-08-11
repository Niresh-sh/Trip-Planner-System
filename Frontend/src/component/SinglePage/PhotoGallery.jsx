import React from 'react';

const PhotoGallery = ({ photos }) => {
  return (
    <section className="my-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Photo Gallery</h2>
        <button className="text-sm text-green-600 hover:underline">View All Photos</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left large photo */}
        <div className="md:row-span-2">
          <img
            src={photos[0].url}
            alt={photos[0].label}
            className="rounded-lg h-full object-cover w-full"
          />
          <p className="text-sm mt-1 text-white bg-black bg-opacity-50 px-2 py-1 rounded w-fit">
            {photos[0].label}
          </p>
        </div>

        {/* Right small grid */}
        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
          {photos.slice(1).map((photo, index) => (
            <div key={index}>
              <img
                src={photo.url}
                alt={photo.label}
                className="rounded-lg w-full h-[120px] md:h-[130px] object-cover"
              />
              <p className="text-xs mt-1 text-white bg-black bg-opacity-50 px-2 py-1 rounded w-fit">
                {photo.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;
