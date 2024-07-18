import React from 'react';
import { useSession } from 'next-auth/react';
import { useUserStore } from '@/store/userDetails';
import { useRouter } from 'next/navigation';

const Brief = () => {
  const router = useRouter();
  const { status, data: session } = useSession();
  const firstName = useUserStore((state) => state.firstName);

  const handleSubmit = () => {
    router.push('/post');
  };

  return (
    <div className="bg-green-700 py-10 sm:py-20 mx-4 sm:mx-20 rounded-3xl relative">
      <div className="absolute inset-0 bg-gradient-to-r from-green-800 to-green-600 rounded-3xl opacity-25"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start">
          <div className="flex flex-col items-start">
            <div className="text-white font-bold text-xl sm:text-2xl mb-2">
              Welcome to GigNook,{' '}
              {session?.user?.name ? (
                <span className="italic">{session.user.name}</span>
              ) : (
                <span className="italic">{firstName}</span>
              )}
            </div>
            <div className="text-white font-semibold text-lg mb-2">
              Get matched with freelancers
            </div>
            <div className="text-white font-normal text-base mb-6">
              Create a brief and get started
            </div>
          </div>
          <div className="bg-green-600 px-4 py-2 rounded-md flex items-center mt-4 sm:mt-0">
            <div className="text-white font-bold mr-4">Create a brief</div>
            <button
              onClick={handleSubmit}
              className="bg-white text-green-700 px-4 py-2 rounded-md"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brief;
