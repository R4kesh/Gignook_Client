
// pages/500.tsx
import Link from 'next/link';

const ServerError = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-9xl font-bold text-gray-800">500</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mt-4">Internal Server Error</h2>
        <p className="text-gray-500 mt-2">
          Sorry, something went wrong on our end. Please try again later.
        </p>
        <Link href="/">
          <a className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white text-lg rounded hover:bg-blue-700 transition duration-200">
            Go Back to Home
          </a>
        </Link>
      </div>
    </div>
  );
};

export default ServerError;
