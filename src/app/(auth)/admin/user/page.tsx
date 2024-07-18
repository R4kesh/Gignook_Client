"use client"
import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '@/components/admin/dashboard/sidebar';
import axios from 'axios';
import Header from '@/components/admin/dashboard/header';

interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  isVerified: boolean;
  isBlocked: boolean;
}

const User: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10); 


  const handleAction = async (userId: string, isBlocked: boolean) => {
    try {
      const token = localStorage.getItem("admin_access_token");
      const action = isBlocked ? 'unblock' : 'block';
      await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/users/${userId}/${action}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user._id === userId ? { ...user, isBlocked: !isBlocked } : user
        )
      );
    } catch (error) {
      console.error(`${isBlocked ? 'Unblock' : 'Block'} action failed for user ${userId}:`, error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("admin_access_token");
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/users`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);


  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);


  const paginate = (pageNumber:number) => setCurrentPage(pageNumber);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        
      <table className="min-w-full divide-y divide-gray-200">
  <thead>
    <tr className="bg-gray-800 text-white">
      <th className="px-4 py-2">First Name</th>
      <th className="px-4 py-2">Last Name</th>
      <th className="px-4 py-2">Email</th>
      <th className="px-4 py-2">Phone Number</th>
      <th className="px-4 py-2">Verified</th>
      <th className="px-4 py-2">Action</th>
    </tr>
  </thead>
  <tbody>
    {currentUsers.map((user, index) => (
      <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}>
        <td className="border px-4 py-2 text-center">{user.firstname}</td>
        <td className="border px-4 py-2 text-center">{user.lastname}</td>
        <td className="border px-4 py-2 text-center">{user.email}</td>
        <td className="border px-4 py-2 text-center">
          {user.phoneNumber ? user.phoneNumber : 'Not added'}
        </td>
        <td className="border px-4 py-2 text-center">{user.isVerified ? 'Yes' : 'No'}</td>
        <td className="border px-4 py-2 text-center">
          <button
            onClick={() => handleAction(user._id, user.isBlocked)}
            className={`bg-${user.isBlocked ? 'blue' : 'red'}-500 text-white font-bold py-2 px-4 rounded`}
          >
            {user.isBlocked ?  'unBlock':'Block' }
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
              {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => (
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
                  disabled={currentPage === Math.ceil(users.length / usersPerPage)}
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

export default User;