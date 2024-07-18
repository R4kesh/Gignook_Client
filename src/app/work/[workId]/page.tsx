"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/home/navbar';
import Category from '@/components/home/category';
import {loadStripe} from '@stripe/stripe-js';
import { useFeedbackStore } from '@/store/feedback';

interface Freelancer {
  _id: string;
  name: string;
  title: string;
  description: string;
  firstname: string;
  lastname:string
  userId: {
    profilePicture: string;
    firstname: string;
    service:string[];
    description:String
  };
  cost: number;
  images: string[];
  link: string;
}

interface Review {
  _id: string;
  workId:{
    images:any
    title:string
    cost:number
  }
  freelancerId: string;
  userId: Freelancer;
  rating: number;
  feedback: string;
  date: string;
  __v: number;
}

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const FreelancerDetailsPage = ({ params }: { params: { workId: string } }) => {
  const router = useRouter();
  const id = params.workId
  const userId = localStorage.getItem('userid');
  const token = localStorage.getItem('token');
  const [freelancer, setFreelancer] = useState<Freelancer>();
  const [fdata,setFdata]=useState('')
  const [price, setPrice] = useState<number | undefined>();
  const [feedback,setFeedback]=useState<Review[]>([])

  useEffect(() => {
    if (freelancer) {
      setPrice(freelancer.cost);
    }else{
      setPrice(undefined);
    }
  }, [freelancer]);

  useEffect(()=>{
    const fetchData=async()=>{
try {

  const res=await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/freelancer/workFeedback/${id}`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  setFeedback(res.data)
  
 
} catch (error) {
  
}
    }
    fetchData();
  },[id])

  

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/freelancer/workDetails/${id}`,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });;
        console.log('dae',res.data);
        setFreelancer(res.data);
        setFdata(res.data.userId._id)
      

      useFeedbackStore.getState().setFreelancerId(fdata)
      useFeedbackStore.getState().setWorkId(id)
      localStorage.setItem('frId', fdata); 
      localStorage.setItem('woId', id); 

        
        
      } catch (error) {
        console.error('Failed to fetch freelancer details:', error);
      }
    };

    fetchData();
  }, [id,fdata]);

  const handleSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    
    if (freelancer) {
      setPrice(freelancer.cost);
    } else {
      setPrice(undefined);
    }
  
    const data={
      amount:price,
      title:freelancer?.title,
      image:freelancer?.images,
      workId:id,
      userId:userId,
      Fname:fdata,

    }
    
    try {
     
      
      const res=await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/payment`,data,{
        headers:{
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      console.log(res.data)
      
      
      if(res.data){
        
        router.push(res.data.session.url)
      }else{
        
        router.push(res.data.session.url)
      }
      
    } catch (error:any) {
       console.log(error);
    }

  }

  if (!id || !freelancer) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <Category />
      <div className="flex justify-center">
        <div className="w-[1400px] p-6 flex gap-12">
          <div className="w-2/3 flex flex-col gap-5">
            <h1 className="text-xl font-bold">{freelancer.title}</h1>
            <div className="flex items-center gap-2.5">
              <img src={freelancer.userId.profilePicture} alt="" className="w-8 h-8 rounded-full object-cover" />
              <span className="font-bold">{freelancer.userId.firstname}</span>

            </div>
            <div className="bg-gray-200 py-12">
              <Carousel>
                <CarouselContent>
                {freelancer.images.map((image, index) => (
        <CarouselItem key={index}>
          <img src={image} alt={`Freelancer work ${index + 1}`} className="w-full h-auto object-cover" />
        </CarouselItem>
      ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
            <h1 className="text-lg font-semibold mb-2"> Gig Link: <a className="text-blue-800" href={freelancer.link || "#"}>{freelancer.link}</a></h1>
            {/* <a className="text-blue-800" href={freelancer.link }></a> */}
            <h2 className="text-lg font-semibold mb-2">About This Gig</h2>
            <p className="text-base">Welcome to my Gig <br />{"I'm"} an energetic , adept at crafting stunning, functional websites from design concepts. <br />
            My expertise includes:</p>
            <h1 className="text-lg font-semibold mb-2"> {freelancer.userId.service.join(',')} </h1>
            {/* <ul className="list-disc ml-5 text-base">
              <li>Front-end Web Dev: Specializing in ReactJS, I excel in HTML5, CSS3, and JavaScript. Crafting responsive web and mobile templates for seamless cross-device experiences.</li>
              <li>Design Conversion: Skilled in PSD, XD, Sketch, or Figma design-to-code conversion. Meticulously ensuring pixel-perfect results.</li>
            </ul> */}
            <p className="text-base">Why Me?</p>
            <h1 className="text-lg font-semibold mb-2">{freelancer.userId.description} 🚀</h1>

            <h2 className="text-lg font-semibold mb-2">About The Seller</h2>
            <div className="flex items-center gap-4">
              <img src={freelancer.userId.profilePicture} alt="" className="w-12 h-12 rounded-full" />
              <div className="flex flex-col">
                <span className="font-semibold text-lg">{freelancer.userId.firstname}</span>
                {/* <div className="flex items-center gap-1">
                  <img src="/img/star.png" alt="" className="w-4 h-4" />
                  <img src="/img/star.png" alt="" className="w-4 h-4" />
                  <img src="/img/star.png" alt="" className="w-4 h-4" />
                  <img src="/img/star.png" alt="" className="w-4 h-4" />
                  <img src="/img/star.png" alt="" className="w-4 h-4" />
                  <span className="ml-1">5</span>
                </div> */}
                <Link href="https://vikas-parmar.github.io/" target="_blank">
                  <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Contact Me</button>
                </Link>
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="font-semibold">Reviews</span>
                  <span>Rating</span>
                </div>
              
              </div>
              <hr className="my-4" />
              <div className="w-full md:w-1/2">
        {feedback.map((review, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                {review.userId.firstname.charAt(0).toUpperCase()}
              </div>
              <div className="ml-3">
                <h2 className="font-bold">{review.userId.firstname} {review.userId.lastname}</h2>
                {/* Assuming the user's country is part of userId */}
                {/* <p className="text-sm text-gray-600">{review.userId.country}</p> */}
              </div>
            </div>
            <div className="flex items-center mb-2">
              {Array(review.rating)
                .fill(0)
                .map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927C9.198 2.39 9.802 2.39 9.951 2.927l1.563 4.974a1 1 0 00.95.69h5.17c.513 0 .724.656.326.988l-4.18 3.309a1 1 0 00-.364 1.118l1.563 4.974c.15.536-.448.98-.898.68l-4.18-3.309a1 1 0 00-1.174 0l-4.18 3.309c-.45.301-1.048-.144-.898-.68l1.563-4.974a1 1 0 00-.364-1.118L.934 8.579c-.398-.332-.187-.988.326-.988h5.17a1 1 0 00.95-.69l1.563-4.974z" />
                  </svg>
                ))}
              <p className="ml-2 text-sm text-gray-600">{new Date(review.date).toLocaleDateString()}</p>
            </div>
            <p className="text-gray-800 mb-4">{review.feedback}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={review.workId.images[0]} // Placeholder for the logo image
                  alt={review.workId.images[0]}
                  className="w-10 h-10 mr-2"
                />
                <div>
                  <p className="font-bold">{review.workId.title}</p>
                  <p className="text-sm text-gray-600">₹{review.workId.cost}</p>
                </div>
              </div>
              <div className="text-right">
                {/* <button className="bg-blue-500 text-white px-3 py-1 rounded-md">
                  Helpful
                </button> */}
              </div>
            </div>
          </div>
        ))}
      </div>
            </div>
          </div>

          <div className="w-1/3">
            <form onSubmit={handleSubmit}>
            <div className="sticky top-6 bg-white shadow p-6 rounded-lg">
              <h3 className="text-xl font-semibold">💎 Work Payment ✨</h3>
              <h2 className="text-2xl font-bold text-blue-600">₹{freelancer.cost}</h2>
              <p className="mt-4 text-base">{freelancer.description}</p>
              <div className="flex flex-col gap-3 mt-4">
                
                <div className="flex items-center gap-2">
                  <img src="/img/greencheck.png" alt="" className="w-5 h-5" />
                  <span>3-day delivery</span>
                </div>
                <span>An Email with the Document and include all source file will be sent</span>

              </div>
              <button type='submit' className="mt-6 px-4 py-2 bg-blue-500 text-white rounded">Pay</button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FreelancerDetailsPage;
