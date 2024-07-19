"use client"

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import dynamic from 'next/dynamic'

const Navbar=dynamic(()=>import('@/components/home/navbar'),{
  ssr:false,
})

interface InterestedUser {
  _id: string;
  firstname: string;
  profilePicture: string;
}

interface Post {
  _id: string;
  content: string;
  title: string;
  images: string[];
  category: string;
  date: string;
  interestedUsers: InterestedUser[];
}

const Posts = () => {
  const id = typeof window !== 'undefined' ? localStorage.getItem("userid") : null;
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const router=useRouter()
  useEffect(() => {
    const fetchPosts = async () => {
      try {
  const token = localStorage.getItem('token');

        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/postList/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        if (response.data) {
          console.log('res', response.data.result);
          setPosts(response.data.result);
        } else {
          console.error('Invalid response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchPosts();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleProfile=(id:String)=>{
    router.push(`/freelancerProfile/${id}`)
  }

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-4">Posts</h1>
        <div className="grid grid-cols-1 gap-6">
          {posts.map((post) => (
            <div key={post._id} className="bg-white p-4 rounded-lg shadow-md flex">
              <Image
              width={24}
              height={24}
        
                src={post.images[0]}
                alt={post.title}
                className="w-24 h-24 object-cover rounded-md mr-4"
              />
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{post.title}</h2>
                  <p className="text-sm text-gray-600">{post.category}</p>
                  <p className="text-sm text-gray-600">
  {new Date(post.date).toLocaleDateString()}
</p>
                  <p className="mt-2">{post.content}</p>
                </div>
                <div>
                  <h3 className="font-semibold mt-4">Intrested by:</h3>
                  <div className="flex space-x-4 mt-2">
                    {Array.isArray(post.interestedUsers) && post.interestedUsers.map((person) => (
                      <div key={person._id} className="flex items-center space-x-2">
                        <Image
                        width={8}
                        height={8}
                  
                          src={person.profilePicture}
                          alt={person.firstname}
                          className="w-8 h-8 rounded-full"
                        />
                         <Stack direction="row" spacing={1}>
      <Button onClick={()=>handleProfile(person._id)} variant="outlined">{person.firstname}</Button>
                        <span></span>
                        </Stack>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
