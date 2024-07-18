"use client";
import Sidebar from '@/components/admin/dashboard/sidebar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import Image from 'next/image';

interface User {
  _id: string;
  firstname: string;
  lastname: string;
  profilePicture: string;
  email: string;
  skills: string[];
}

function Approval() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [token,setToken]=useState<string | null>()
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

useEffect(()=>{
  setToken(localStorage.getItem("admin_access_token"))
},[token])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
      
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/freelancer`,{
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (Array.isArray(response.data.freelancer)) {
          setUsers(response.data.freelancer);
        } else {
          console.error('Unexpected response data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      const token = localStorage.getItem("admin_access_token");

      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/freelancer/approve/${id}`,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setUsers(users.map(user => user._id === id ? { ...user, isApproved: true } : user));
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      const token = localStorage.getItem("admin_access_token");

      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/freelancer/reject/${id}`,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setUsers(users.map(user => user._id === id ? { ...user, isApproved: false } : user));
    } catch (error) {
      console.error('Error rejecting user:', error);
    }
  };

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6">User Approvals</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="text-center">
                  <th className="py-2 px-4 border-b">Full Name</th>
                  <th className="py-2 px-4 border-b">Photo</th>
                  <th className="py-2 px-4 border-b">Email ID</th>
                  <th className="py-2 px-4 border-b">Skills</th>
                  <th className="py-2 px-4 border-b">Details</th>
                  <th className="py-2 px-4 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, index) => (
                  <tr key={index} className="text-center">
                    <td className="py-2 px-4 border-b">{`${user.firstname} ${user.lastname}`}</td>
                    <td className="py-2 px-4 border-b">
                      <Image
                        src={user.profilePicture}
                        alt={`${user.firstname}'s photo`}
                        width={300}
                        height={300}
                  
                        className="h-16 w-16 rounded-full object-cover mx-auto"
                      />
                    </td>
                    <td className="py-2 px-4 border-b">{user.email}</td>
                    <td className="py-2 px-4 border-b">{user.skills.join(', ')}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() => router.push(`/admin/freelancer/${user._id}`)}
                      >
                        More
                      </button>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2" variant="outline" 
                          onClick={() => handleApprove(user._id)}>Approve</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              You Want to approve the User to a Freelancer
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Continue</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      {/* reject button */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" variant="outline" 
                          onClick={() => handleReject(user._id)}>Reject</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                            You want to reject the Freelancer Permanently
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Continue</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
              <button
                className="bg-gray-200 px-4 py-2 rounded-md"
                disabled={currentPage === 1}
                onClick={() => paginate(currentPage - 1)}
              >
                Previous
              </button>
              <span>Page {currentPage}</span>
              <button
                className="bg-gray-200 px-4 py-2 rounded-md"
                disabled={indexOfLastUser >= users.length}
                onClick={() => paginate(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Approval;
