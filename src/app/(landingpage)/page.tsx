"use client"
import Featured from '@/components/landing-page/featured'
import Explore from '@/components/landing-page/explore'
import React from 'react'
import Image from 'next/image'



const Landing = () => {

   
  return (
    <>
     <Featured/>
     <Explore/>
     <div className="bg-green-100 flex justify-center py-24">
  <div className="container flex items-center gap-48">
    <div className="flex flex-col gap-4 flex-2">
      <h1 className="font-bold  mb-2">The best part? Everything.</h1>
      <div className="flex items-center gap-2 font-medium text-gray-600">
        <Image src="/img/check.png" alt="" className="w-6 h-6" width={6}
      height={6}/>
        Stick to your budget
      </div>
      <p className="text-gray-600 text-base font-light leading-7 tracking-wide">
        Find the right service for every price point. No hourly rates, just
        project-based pricing.
      </p>
      <div className="flex items-center gap-2 font-medium text-gray-600">
        <Image src="/img/check.png" alt="" className="w-6 h-6" width={6}
      height={6}/>
        Get quality work done quickly
      </div>
      <p className="text-gray-600 text-base font-light leading-7 tracking-wide">
        Hand your project over to a talented freelancer in minutes, get
        long-lasting results.
      </p>
      <div className="flex items-center gap-2 font-medium text-gray-600">
        <Image src="/img/check.png" alt="" className="w-6 h-6" width={6}
      height={6}/>
        Pay when you're happy
      </div>
      <p className="text-gray-600 text-base font-light leading-7 tracking-wide">
        AUpfront quotes mean no surprises. Payments only get released when you
        approve.
      </p>
      <div className="flex items-center gap-2 font-medium text-gray-600">
        <Image src="/img/check.png" alt="" className="w-6 h-6"   width={6}
      height={6}
/>
        Count on 24/7 support
      </div>
      <p className="text-gray-600 text-base font-light leading-7 tracking-wide">
        Our round-the-clock support team is available to help anytime, anywhere.
      </p>
    </div>
    <div className="flex-3">
      <video src="/video.mp4" controls className="w-[720px]" />
    </div>
  </div>
</div>



     </>
  )
}

export default Landing
