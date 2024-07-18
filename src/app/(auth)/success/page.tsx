import React from 'react';
import successImage from '../../../../public/img/success.png';
import Image from 'next/image';

const Success = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <Image src={successImage} alt="Success" className="mx-auto mb-6" />
        <h1 className="text-2xl font-bold">Check your email for verification</h1>
      </div>
    </div>
  );
};

export default Success;