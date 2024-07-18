"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const PaymentFailurePage: React.FC = () => {
  const router = useRouter();

  const handleRetryPayment = () => {
   
    router.back();
  };

  const handleBack=()=>{
    router.push('/home')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <Image
        width={16}
        height={16}
  
          src="/img/failure.png"
          alt="Failure"
          className="w-16 h-16 mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold mb-2 text-red-500">Payment Failed</h1>
        <p className="text-gray-700 mb-4">We&apos;re sorry, but your transaction could not be completed at this time.</p>
<p className="text-gray-700 mb-8">Please try again or contact customer support for assistance.</p>

        <button
          onClick={handleRetryPayment}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
        >
          Retry Payment
        </button>
        <br />
        <br />
        <button
          onClick={handleBack}
          className="bg-green-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Back to Home
        </button>
        <p className="mt-4">
          <Link href="/contact">
          
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PaymentFailurePage;
