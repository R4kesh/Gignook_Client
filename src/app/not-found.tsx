// pages/404.js
import React from 'react';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg text-center">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mt-4">Oops! Page Not Found</h2>
        <p className="text-gray-500 mt-2">
  Sorry, but the page you were looking for doesn&apos;t exist.
</p>

        <Link href="/home">
         
            Go Back to Home
          
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
