import React from 'react'
import Footer from '../landing-page/footer'

const Showall = () => {
  return (
    <div>
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center">
          <div className="text-gray-800 font-bold text-xl">
            Explore popular FREELANCERS on GigNook
          </div>
          <div className="flex items-center">
            <button className="bg-gray-200 p-1 rounded-full">
              <svg
                className="h-6 w-6 text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button className=" text-black underline px-2 py-1 ml-4">
              Show All
            </button>
            <button className="bg-gray-200 p-1 rounded-full ml-4">
              <svg
                className="h-6 w-6 text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
    </div>
    
  )
}

export default Showall
