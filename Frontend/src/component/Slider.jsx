import React, { useEffect, useState } from "react";

const ImageSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    {
      image:
        "https://stafir.com/files/slider/1744888224_kathmandu-summit-adventure-bouddhanath-tour-in-nepal.jpg",
      title: "Echoes of Enlightenment",
      subtitle: "Walk the sacred paths of ancient temples.",
    },
    {
      image:
        "https://media.cntraveler.com/photos/53ea87e3976f8f2d44d52081/master/pass/durbar-palace-square-bhaktapur-nepal.jpg",
      title: "Explore Hidden Gems",
      subtitle: "Uncover authentic experiences and create memories",
    },
    {
      image:
        "https://www.gokitetours.com/wp-content/uploads/2024/12/2.-Pokhara-%E2%80%93-A-Tranquil-Lakeside-Escape.webp",
      title: "Breathe the Mountain Air",
      subtitle: "Escape the ordinary in nature’s grandest cathedral",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer); // cleanup on unmount
  }, [slides.length]);

  

  return (
    <section className="bg-gray-100 p-8 h-[70vh] ">
      <div className="max-w-full mx-auto relative group h-[70vh]">
        {/* Slider Wrapper */}
        <div className="relative overflow-hidden rounded-lg shadow-xl ">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="min-w-full h-96 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                {(slide.title || slide.subtitle) && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-center text-white px-4">
                      {slide.title && (
                        <h2 className="text-4xl font-bold mb-2">
                          {slide.title}
                        </h2>
                      )}
                      {slide.subtitle && (
                        <p className="text-lg">{slide.subtitle}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Prev Button */}
        <button
          onClick={() =>
            setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)
          }
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2.5 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        {/* Next Button */}
        <button
          onClick={() => setActiveSlide((prev) => (prev + 1) % slides.length)}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2.5 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className={`w-3 h-3 rounded-full transition-colors ${
                activeSlide === i ? "bg-white" : "bg-white/50"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageSlider;
