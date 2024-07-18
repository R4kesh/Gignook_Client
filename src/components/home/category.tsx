import React from 'react';
import Link from 'next/link';

const Category = () => {
  return (
    <div>
      <div className="bg-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <Link href="/category/graphics-design">
                <span  className="text-gray-600 hover:text-gray-800 cursor-pointer">
                  Graphics & Design
                </span >
              </Link>
              <Link href="/category/programming-tech">
                <span  className="text-gray-600 hover:text-gray-800 cursor-pointer">
                  Programming & Tech
                </span >
              </Link>
              <Link href="/category/digital-marketing">
                <span  className="text-gray-600 hover:text-gray-800 cursor-pointer">
                  Digital Marketing
                </span >
              </Link>
              <Link href="/category/video-animation">
                <span  className="text-gray-600 hover:text-gray-800 cursor-pointer">
                  Video & Animation
                </span >
              </Link>
              <Link href="/category/writing-translation">
                <span  className="text-gray-600 hover:text-gray-800 cursor-pointer">
                  Writing & Translation
                </span >
              </Link>
              <Link href="/category/music-audio">
                <span  className="text-gray-600 hover:text-gray-800 cursor-pointer">
                  Music & Audio
                </span >
              </Link>
              <Link href="/category/business-consulting">
                <span  className="text-gray-600 hover:text-gray-800 cursor-pointer">
                  Business Consulting
                </span >
              </Link>
              <Link href="/category/data-ai-service">
                <span className="text-gray-600 hover:text-gray-800 cursor-pointer">
                  Data AI Service
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
