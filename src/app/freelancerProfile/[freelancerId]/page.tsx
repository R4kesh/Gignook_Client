"use client"
import React,{useState,useEffect} from 'react';

import Navbar from '@/components/home/navbar';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { IoChatbubbleEllipsesOutline } from "react-icons/io5"; import { IoReceipt } from "react-icons/io5";
import { IoLocation } from "react-icons/io5"; import { IoAtCircle } from "react-icons/io5";
import TextsmsIcon from '@mui/icons-material/Textsms';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import Image from 'next/image';

interface Freelancer{
  _id: string;
  firstname: string;
  lastname: string;
  title: string;
  description: string;
  email:string;
  cost: number;
  images: string[];
  link: string;
  profilePicture:string;
  languages:string[];
  skills:string[]
  service:string[]
  rating:any
}

interface Work {
  _id: string;
  userId: string;
  images: string[];
  cost: number;
  description: string;
  link: string;
  title: string;
}

interface Review {
  _id: string;
  workId: Work;
  freelancerId: string;
  userId: Freelancer;
  rating: number;
  feedback: string;
  date: string;
  __v: number;
}


const FreelancerProfilePage = ({params}:{params:{freelancerId:string}}) => {
  const router=useRouter()
  const id=params.freelancerId
  const [freelancer, setFreelancer] = useState<Freelancer>();
  const [work,setWork]=useState<Work[]>([]);
  const [feedback,setFeedback]=useState<Review[]>([])
  const value = freelancer?.rating;
  const token = localStorage.getItem('token');
  


  const handleViewMore = (id:String) => {
    
    router.push(`/work/${id}`);
  };

  useEffect(()=>{
    const fetchData=async()=>{
      try {
        const res=await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/freelancer/freelancerDetails/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }})
      
        
        
        setFreelancer(res.data);

      } catch (error) {
        console.log(error);
        
      }

    }
    fetchData();
  },[value,id,token])

  useEffect(()=>{
    try {
      const fetchData=async()=>{
        try {
          const res=await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/freelancer/freelancerWorks/${id}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }})
         
          
          setWork(res.data);
  
        } catch (error) {
          console.log(error);
          
        }
  
      }
      fetchData();
    
      
    } catch (error) {
      
    }
  },[id,token])

  useEffect(()=>{
    const fetchData=async()=>{
try {

  const res=await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/freelancer/feedback/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }})
    console.log('fee',res.data);
  setFeedback(res.data)
  
 
} catch (error) {
  
}
    }
    fetchData();
  },[id,token])

  const handleChat =async () => {
   
    const senderId = localStorage.getItem('userid');
    const recipientId = id;
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/chat-session`, { senderId, recipientId }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }});
      router.push(`/message/${recipientId}`);
  } catch (error) {
      console.error('Error initiating chat session', error);
  }
    
  };




  return (
    <div className="bg-white shadow-md">
     <Navbar/>
    <div className="container mx-auto p-6">
      <div className="flex gap-6">
        {/* Left Section */}
        <div className="w-2/3">
          <div className="flex items-center gap-4 mb-4">
          <div className="w-32 h-32 rounded-full border-4 border-green-500">
  <Image
    src={freelancer?.profilePicture!} // Replace with actual path
    alt="Profile Picture"
    className="w-full h-full rounded-full"
    width={300}
    height={200}

  />
</div>


<div>
      <h1 className="text-3xl font-bold">{freelancer?.firstname}</h1>

      <div className="flex items-center  text-gray-500">
      <span className="text-yellow-500">★ {value}</span>
 
      </div>
      
      <div className="flex items-center  text-gray-500">
        <IoAtCircle className="mr-2" />
        <span className="text-xl">{freelancer?.email}</span>
      </div>

      <div className="flex items-center text-gray-500">
        <IoChatbubbleEllipsesOutline className="mr-2" />
        <span className="text-xl">{freelancer?.languages.join(', ')}</span>
      </div>

      <div className="flex items-center text-gray-500">
        <IoLocation className="mr-2" />
        <span className="text-xl">India</span>
      </div>

      <div className="flex items-center text-gray-500">
        <IoReceipt className="mr-2" />
        <span className="text-xl">{freelancer?.service.join(', ')}</span>
      </div>
    </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">About me</h2>
            <p className="text-gray-700 mb-4 text-xl">
              {freelancer?.description}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">Skills</h2>
            <div className="flex gap-2 flex-wrap">
  {freelancer?.skills.map((skill, index) => (
    <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xl">
      {skill}
    </span>
  ))}
</div>

          </div>

          <div>
            <h2 className="text-xl font-bold mb-2 mt-6">My Gigs</h2>
            <div className="grid grid-cols-2 gap-4">

            {work.length > 0 ? (
        work.map((data) => (
          <div key={data._id} className="bg-white shadow-md rounded p-4 w-64">
            <Image
              src={data.images[0]}
              alt={data.title}
              className="w-full h-32 object-cover mb-2 rounded"
              width={200}
              height={80}
        
            />
            <h3 className="text-lg font-bold mb-1">{data.title}</h3>
            <p className="text-gray-700 mb-2">{data.description}</p>
            <p className="text-gray-600">Cost: ₹{data.cost}</p>
            <a  target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline" onClick={() => handleViewMore(data._id)}>
              View More
            </a>
          </div>
        ))
      ) : (
        <p>No works found.</p>
      )}
              

            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-lg sticky top-6">
            <div className="flex items-center gap-4 mb-4">
              <Image
                width={200}
                height={200}
          
                src={freelancer?.profilePicture!} 
                alt="Profile Picture"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h2 className="text-xl font-bold">{freelancer?.firstname}</h2>
                <p className="text-gray-500">Language:{freelancer?.languages}</p>
              </div>
            </div>
            <div className="flex gap-4 mb-4">
          <button onClick={handleChat} className="bg-black text-white py-2 px-4 rounded-full flex items-center">
          <TextsmsIcon/>
            Chat
          </button>
          <button className="bg-black text-white py-2 px-4 rounded-full flex items-center">
          
            <VideoCallIcon/>
            
          </button>
        </div>
            <p className="text-gray-500">Average response time: 1 hour</p>
          </div>
        </div>
      </div>


      <div className="border-b-2 border-gray-300 mb-4">
        <h2 className="text-2xl font-bold">Reviews</h2>
      </div>
      
      <div className="flex justify-start">
      <div className="w-full md:w-1/2">
        {feedback.map((review, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                {review.userId.firstname.charAt(0).toUpperCase()}
              </div>
              <div className="ml-3">
                <h2 className="font-bold">{review.userId.firstname} {review.userId.lastname}</h2>
               
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
                <Image
                  width={100}
                  height={40}
            
                  src={review?.workId?.images ? review.workId.images[0] : '/placeholder.png'} // Fallback to a placeholder image
                  alt={review?.workId?.images ? review.workId.images[0] : 'placeholder'}
                  className="w-10 h-10 mr-2"
                />
                <div>
                  <p className="font-bold">{review?.workId?.title}</p>
                  <p className="text-sm text-gray-600">₹{review?.workId?.cost}</p>
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
    </div>
  );
};

export default FreelancerProfilePage;
