import React from 'react';

const explore = () => {
  return (
    <div className="flex justify-center py-24">
      <div className="container max-w-screen-xl px-4">
        <h1 className="text-gray-500 font-bold mb-8 text-center sm:text-left">Explore the marketplace</h1>
        <div className="flex flex-wrap justify-center sm:justify-between">
          {[
            { src: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/graphics-design.d32a2f8.svg", label: "Graphics & Design" },
            { src: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/online-marketing.74e221b.svg", label: "Digital Marketing" },
            { src: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/writing-translation.32ebe2e.svg", label: "Writing & Translation" },
            { src: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/video-animation.f0d9d71.svg", label: "Video & Animation" },
            { src: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/music-audio.320af20.svg", label: "Music & Audio" },
            { src: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/programming.9362366.svg", label: "Programming & Tech" },
            { src: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/business.bbdf319.svg", label: "Business" },
            { src: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/lifestyle.745b575.svg", label: "Lifestyle" },
            { src: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/data.718910f.svg", label: "Data" },
            { src: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/photography.01cf943.svg", label: "Photography" },
          ].map((item, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 h-40 flex flex-col items-center justify-center cursor-pointer p-4">
              <img src={item.src} alt="" className="w-12 h-12 mb-2" />
              <div className="w-12 h-1 bg-gray-300 transition-all duration-300"></div>
              <span className="font-light mt-2">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default explore;
