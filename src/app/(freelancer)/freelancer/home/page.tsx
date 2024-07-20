"use client";
import React, { useState, useEffect,useCallback } from 'react';
import { Edit, Bookmark, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';

import { ScaleLoader } from 'react-spinners';
import PostShare from '@/components/freelancer/home/postShare';
import io from 'socket.io-client'
import VideoCallIcon from '@mui/icons-material/VideoCall';
import Image from 'next/image';
import dynamic from 'next/dynamic'
const LeftProfile=dynamic(()=>import('@/components/freelancer/home/left'),{
  ssr:false,
})

const socket = io(`${process.env.NEXT_PUBLIC_BASE_URL}`);

interface Post {
  _id: string;
  userId: { _id: string; firstname: string; email: string; profilePicture: any };
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

const FreelancerHome = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [openShare, setOpenShare] = useState<{ isOpen: boolean, postId: string | null }>({ isOpen: false, postId: null });
  const [userid,setUserid]=useState<string|null>()


  const router = useRouter();

useEffect(()=>{
  setUserid(localStorage.getItem("userid"))
},[])

  const fetchPosts = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
  
    try {
      if (typeof window !== 'undefined') {
  const token = localStorage.getItem('token');

      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/freelancer/posts?page=${page}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
  
      if (response.data && Array.isArray(response.data.posts)) {
        const newPosts = response.data.posts.filter(
          (newPost:any) => !posts.some(existingPost => existingPost._id === newPost._id)
        );
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setTotalPosts(response.data.totalPosts);
        setHasMore(posts.length + newPosts.length < response.data.totalPosts);
        setPage((prevPage) => prevPage + 1);
      } else {
        console.error('Invalid response format:', response.data);
        setHasMore(false);
      }
    }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, page, posts]);
  
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleInterest = async (postId: string,userId:string) => {
    if (!userid) return;
    try {
     
  
        await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/freelancer/posts/${postId}/interest`, { userid });
      const names=localStorage.getItem('name')
        socket.emit('likePost', { postId, userId,names });
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId
              ? {
                ...post,
                interestedUsers: post.interestedUsers.includes(userid)
                  ? post.interestedUsers.filter(id => id !== userid)
                  : [...post.interestedUsers, userid],
              }
              : post
          )
        );
      
      
    } catch (error) {
      console.error('Error registering interest:', error);
    }
  };

  const handleSave = async (postId: string) => {
    if (!userid) return;
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/freelancer/posts/${postId}/save`, { userid });
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
              ...post,
              savedBy: post.savedBy.includes(userid)
                ? post.savedBy.filter(id => id !== userid)
                : [...post.savedBy, userid],
            }
            : post
        )
      );
    } catch (error) {
      console.error('Error updating save status:', error);
    }
  };

  return (
    <div className="flex h-screen p-4 bg-gray-100">
      <LeftProfile />
      <div className="w-3/4 h-screen overflow-y-scroll p-4">
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchPosts}
          hasMore={hasMore}
          loader={<div className='w-full flex justify-center'><ScaleLoader color="#3688d6" /></div>}
          endMessage={
            <p style={{ textAlign: 'center', color: 'purple' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {posts.map(post => (
            <div key={post._id} className="p-4 border shadow-lg rounded-lg bg-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Image
                    src={post?.userId?.profilePicture || '/default-profile-pic.jpg'}
                    alt="Profile"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">{post?.userId?.firstname || 'username'}</h3>
                    <p className="text-gray-600 text-sm">{new Date(post.created).toLocaleString()} hr ago</p>
                  </div>
                </div>
                <button className="bg-gray-200 p-2 rounded-full">
                  
                  < VideoCallIcon className="text-gray-600" />
                </button>
              </div>
              <div className="mt-4">
                <p>Expected Delivery Date: <span className="font-semibold">{new Date(post.date).toLocaleDateString()}</span></p>
                <p>Budget: <span className="font-semibold">₹{post.budget}</span></p>
                <h3 className="text-xl font-semibold mt-2">{post.title}</h3>
                <p className="mt-2">{post.description}</p>
              </div>
              <div className="mt-4">
                <Image
                  src={post.images[0] || '/default-profile-pic.jpg'}
                  alt="Bid Photo"
                  width={800}
                  height={300}
                  className="rounded-lg"
                />
              </div>
              <div className="mt-4 border-t pt-4 flex justify-between">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  onClick={() => handleInterest(post._id,post.userId._id)}
                  disabled={!userid}
                >
                  
                  {post?.interestedUsers.includes(userid!) ? 'Interested' : 'Show Interest'}
                </button>
                
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                  onClick={() => handleSave(post._id)}
                  disabled={!userid}
                >
                  {post.savedBy.includes(userid!) ? 'Saved' : 'Save'}
                </button>
                <button onClick={() => setOpenShare({ isOpen: true, postId: post._id })} className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md">Share</button>
              </div>
            </div>
          ))}
          {openShare.isOpen &&
            <PostShare postId={openShare.postId} setOpenShare={setOpenShare} />
          }
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default FreelancerHome;
