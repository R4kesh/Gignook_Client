import Image from 'next/image';
import React from 'react';

const Featured = () => {
  return (
    <div className="featured h-[600px] flex justify-center bg-[#013914] text-white">
      <div className="container max-w-screen-xl px-4 flex flex-col md:flex-row items-center">
        <div className="left flex flex-col gap-8 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl">
            Find the perfect <span className="italic font-light">freelance</span> services for your business
          </h1>
          <div className="popular flex flex-wrap justify-center md:justify-start items-center gap-2">
            <span className="whitespace-nowrap">Popular:</span>
            <button className="px-2 py-1 text-white border border-white rounded-full bg-transparent text-sm">
              Web Design
            </button>
            <button className="px-2 py-1 text-white border border-white rounded-full bg-transparent text-sm">
              WordPress
            </button>
            <button className="px-2 py-1 text-white border border-white rounded-full bg-transparent text-sm">
              Logo Design
            </button>
            <button className="px-2 py-1 text-white border border-white rounded-full bg-transparent text-sm">
              AI Services
            </button>
          </div>
        </div>
        <div className="right h-80 mt-8 md:mt-0">
          <Image    width={75}
      height={75}
 src="/img/man.png" alt="" className="h-max w-full md:w-auto object-contain" />
        </div>
      </div>
    </div>
  );
};

export default Featured;
