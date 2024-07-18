"use client";
import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/admin/dashboard/sidebar';
import axios from 'axios';
import Image from 'next/image';

interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  isVerified: boolean;
  isBlocked: boolean;
  profilePicture: string;
  isFreelancer: boolean;
}

const Freelancers = () => {
  const [freelancers, setFreelancers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [freelancersPerPage] = useState(5); // Set the number of freelancers per page

  const handleAction = async (userId: string, isFreelancer: boolean) => {
    try {
    const token = localStorage.getItem("admin_access_token");

      const action = isFreelancer ? 'unblock' : 'block';
      await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/freelancers/${userId}/${action}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setFreelancers(prevUsers =>
        prevUsers.map(user =>
          user._id === userId ? { ...user, isFreelancer: !isFreelancer } : user
        )
      );
    } catch (error) {
      console.error(`${isFreelancer ? 'Unblock' : 'Block'} action failed for user ${userId}:`, error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
    const token = localStorage.getItem("admin_access_token");

        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/freelancers`, {
          headers: {
          'Authorization': `Bearer ${token}`,

            'Content-Type': 'application/json',
          },
        });
        setFreelancers(response.data.freelancers);
      } catch (error) {
        console.error('Error fetching freelancers:', error);
      }
    };
    fetchUsers();
  }, []);


  const indexOfLastFreelancer = currentPage * freelancersPerPage;
  const indexOfFirstFreelancer = indexOfLastFreelancer - freelancersPerPage;
  const currentFreelancers = freelancers.slice(indexOfFirstFreelancer, indexOfLastFreelancer);


  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6">Freelancers</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-800 text-white text-center">
                <th className="py-2 px-4 border-b">Full Name</th>
                <th className="py-2 px-4 border-b">Profile</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Phone Number</th>
                <th className="py-2 px-4 border-b">Industry</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentFreelancers.map((user, index) => (
                <tr key={user._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}>
                  <td className="border px-4 py-2 text-center">{`${user.firstname} ${user.lastname}`}</td>
                  <td className="border px-4 py-2 text-center">
                    <Image
                     width={75}
                     height={75}               
                      src={user.profilePicture}
                      alt={`${user.firstname}'s profile`}
                      className="h-16 w-16 rounded-full object-cover mx-auto"
                    />
                  </td>
                  <td className="border px-4 py-2 text-center">{user.email}</td>
                  <td className="border px-4 py-2 text-center">
                    {user.phoneNumber ? user.phoneNumber : 'Not added'}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {user.isFreelancer ? 'Freelancer' : 'Not a Freelancer'}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => handleAction(user._id, user.isFreelancer)}
                      className={`bg-${user.isFreelancer ? 'red' : 'blue'}-500 text-white font-bold py-2 px-4 rounded`}
                    >
                      {user.isFreelancer ? 'Block' : 'Unblock'}
                    </button>
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
              disabled={indexOfLastFreelancer >= freelancers.length}
              onClick={() => paginate(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Freelancers;
