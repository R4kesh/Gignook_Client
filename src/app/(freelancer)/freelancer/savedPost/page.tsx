"use client"
import { Edit, Bookmark, MessageSquare } from 'lucide-react';

import LeftProfile from '@/components/freelancer/home/left'
import React, { useEffect, useState } from 'react';
import { toast } from "sonner"
import axios from 'axios';
import Image from 'next/image';

interface Post {
    _id: string;
    userId: { _id: string; firstname: string; email: string;profile:any,profilePicture:any };
    title: string;
    description: string;
    category: string;
    budget: number;
    isBudgetFlexible: boolean;
    isListed: boolean;
    date: string;
    created: string;
    images: string[];
    interestedUsers: string[];
    savedBy: string[]; 
  }

const SavedPost = () => {

    const [savedPosts, setSavedPosts] = useState<Post[]>([]);
    const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const userId = localStorage.getItem('userid'); 
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/freelancer/saved/posts/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        setSavedPosts(response.data.savedPosts);
      } catch (error) {
        console.error('Error fetching saved posts:', error);
      }
    };

    fetchSavedPosts();
  }, []);


  const unsavePost = async (postId: string) => {
    try {
      const userId = localStorage.getItem('userid'); 
      await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/freelancer/unsave/posts/${userId}/${postId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      toast("Post unsaved Successfully")
      setSavedPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error('Error unsaving post:', error);
    }
  };


  return (
   <div className="flex h-screen p-4 bg-gray-100">
    <LeftProfile/>
  
      <div className="w-3/4 h-screen overflow-y-scroll p-4">
        <div className="sticky top-0 bg-gray-100 py-2 shadow-md">
          <h1 className="text-2xl font-bold">Saved Posts</h1>
        </div>
        <div className="mt-4">
          {savedPosts.length > 0 ? (
            savedPosts.map((post) => (
              <div key={post._id} className="p-4 border shadow-lg rounded-lg bg-white mb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Image
                      src={post.userId.profilePicture || '/default-profile-pic.jpg'}
                      alt="Profile"
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">{post.userId.firstname}</h3>
                      <p className="text-gray-600 text-sm">{new Date(post.created).toLocaleString()}</p>
                    </div>
                  </div>
                  <button className="bg-gray-200 p-2 rounded-full">
                  <MessageSquare className="text-gray-600" />

                  </button>
                </div>
                <div className="mt-4">
                  <p>Expected Delivery Date: <span className="font-semibold">{new Date(post.date).toLocaleDateString()}</span></p>
                  <p>Budget: <span className="font-semibold">${post.budget}</span></p>
                  <h3 className="text-xl font-semibold mt-2">{post.title}</h3>
                  <p className="mt-2">{post.description}</p>
                </div>
                <div className="mt-4">
                  <Image
                    src={post.images[0]}
                    alt="Bid Photo"
                    width={800}
                    height={300}
                    className="rounded-lg"
                  />
                </div>
                <div className="mt-4 border-t pt-4 flex justify-between">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Interested</button>
                  <button
                className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md"
                onClick={() => unsavePost(post._id)}
              >
                Unsave
              </button>
                  {/* <button className="px-4 py-2 bg-green-500 text-white rounded-md">Save</button> */}
                </div>
              </div>
            ))
          ) : (
            <p>No saved posts found.</p>
          )}
        </div>
      </div>




      
    </div>
  )
}

export default SavedPost
