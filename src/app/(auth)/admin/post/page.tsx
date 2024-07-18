"use client";
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/admin/dashboard/sidebar';
import axios from 'axios';
import Header  from '@/components/admin/dashboard/header'

interface Post {
  _id: string;
  userId:{
    firstname:string
    email:string
  };
  title: string;
  description: string;
  images: string[];
  name: string;
  email: string;
  isListed: boolean;

}

const Post: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10); 
  const [token,setToken]=useState<string | null>()

  useEffect(()=>{
    setToken(localStorage.getItem("admin_access_token"))
  },[token])
  

  const handleAction = async (postId: string, isListed: boolean) => {
    try {
      
      const action = isListed ? 'unlist' : 'unlist';
      await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/posts/${postId}/${action}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,

          'Content-Type': 'application/json',
        },
      });
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === postId ? { ...post, isListed: !isListed } : post
        )
      );
    } catch (error) {
      console.error(`${isListed ? 'List' : 'Unlist'} action failed for post ${postId}:`, error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/posts`, {
          headers: {
          'Authorization': `Bearer ${token}`,

            'Content-Type': 'application/json',
          },
        });
  
        
        if (response.data && Array.isArray(response.data.posts)) {
            setPosts(response.data.posts);
          } else {
            console.error('Invalid response format:', response.data);
          }

      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, [token]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full">
       
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-800 text-white">
              {/* <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th> */}
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Post</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((post, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}>
                {/* <td className="border px-4 py-2 text-center">{post.name}</td>
                <td className="border px-4 py-2 text-center">{post.email}</td> */}
                <td className="border px-4 py-2 text-center">{post.title}</td>
                <td className="border px-4 py-2 text-center">{post.userId.firstname}</td>
                <td className="border px-4 py-2 text-center">{post.userId.email}</td>
                <td className="border px-4 py-2 text-center">{post.description}</td>
                <td className="border px-4 py-2 text-center">
          
                  {post.images.map((document:any, index:any) => (
                    <a key={index}
  className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg text-center mr-2 mb-2"
  href={document}
  target="_blank"
  rel="noopener noreferrer"
>{`Link ${index + 1}`}</a>))}
                </td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleAction(post._id, post.isListed)}
                    className={`bg-${post.isListed ? 'red' : 'blue'}-500 text-white font-bold py-2 px-4 rounded`}
                  >
                    {post.isListed ? 'Unlist' : 'List'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <nav aria-label="Page navigation">
            <ul className="inline-flex">
              {/* Previous Button */}
              <li>
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </button>
              </li>

              {/* Page Numbers */}
              {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, i) => (
                <li key={i}>
                  <button
                    onClick={() => paginate(i + 1)}
                    className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                      currentPage === i + 1
                        ? 'bg-blue-500 text-black hover:bg-blue-600'
                        : ''
                    }`}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}

              {/* Next Button */}
              <li>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === Math.ceil(posts.length / postsPerPage)}
                  className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Post;
