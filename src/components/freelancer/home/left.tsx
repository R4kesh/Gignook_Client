"use client"
import React, { useEffect,useState } from 'react'
import { Edit, Bookmark, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';


const LeftProfile = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedProfileImage = localStorage.getItem("profileImage");
      const storedEmail = localStorage.getItem("email");
      const storedName = localStorage.getItem("name");

      if (storedProfileImage) {
        setProfileImage(storedProfileImage);
      }
      if (storedEmail) {
        setEmail(storedEmail);
      }
      if (storedName) {
        setName(storedName);
      }
    }
  }, []);

  const router=useRouter()


  return (
   
    <div className="w-1/4 h-1/2 p-4 border shadow-lg rounded-lg flex flex-col items-center sticky top-4 bg-white">
    <Image
      src={profileImage!}
      alt="Profile Icon"
      width={100}
      height={100}
      className="rounded-full"
    />
    <h2 className="text-xl font-semibold mt-4">{name}</h2>
    <p className="text-gray-600">@{email}</p>
    <div className="mt-4 flex flex-col items-center space-y-4 w-full">
      <button
        onClick={() => router.push('/freelancer/profile')}
        className="w-full px-4 py-2 bg-gray-200 text-black rounded-md flex items-center justify-center hover:bg-gray-300 transition-colors duration-200"
      >
        <Edit className="mr-2" />
        Profile
      </button>
      <button
        onClick={() => router.push('/freelancer/savedPost')}
        className="w-full px-4 py-2 bg-gray-200 text-black rounded-md flex items-center justify-center hover:bg-gray-300 transition-colors duration-200"
      >
        <Bookmark className="mr-2" />
        Saved Posts
      </button>
      <button
        onClick={() => router.push('/freelancer/dashboard')}
        className="w-full px-4 py-2 bg-gray-200 text-black rounded-md flex items-center justify-center hover:bg-gray-300 transition-colors duration-200"
      >
        <MessageSquare className="mr-2" />
        Dashboard
      </button>
    </div>
  </div>
      
   
  )
}

export default LeftProfile
