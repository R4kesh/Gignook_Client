"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/admin/dashboard/sidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

interface User {
  _id: string;
  firstname: string;
  lastname: string;
  profilePicture: string;
  email: string;
  skills: string[];
  displayName: string;
  joinedate: string;
  description: string;
  languages: string[];
  service: string[];
  education: string[];
  personalWebsite: string;
  phoneNumber: string;
  occupation: string;
  document:string[]
}

const Details = ({ params }: { params: { freelancerid: string } }) => {
  const router = useRouter();
  const id = params.freelancerid;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);


  useEffect(() => {
    const token = localStorage.getItem("admin_access_token");

    const fetchUser = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/freelancer/details/${id}`,{
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setUser(response.data.freelancer);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  
  const handleApprove = async (id: string) => {
    const token = localStorage.getItem("admin_access_token");

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/freelancer/approve/${id}`,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setUsers(users.map(user => user._id === id ? { ...user, isApproved: true } : user));
      router.push('/admin/freelancer')
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  const handleReject = async (id: string) => {
    const token = localStorage.getItem("admin_access_token");

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/freelancer/reject/${id}`,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setUsers(users.map(user => user._id === id ? { ...user, isApproved: false } : user));
      router.push('/admin/freelancer')

    } catch (error) {
      console.error('Error rejecting user:', error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-8 flex-1">
        <div className="flex justify-center">
          <div className="mr-8">

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <Image
                src={user.profilePicture || '/default-profile-pic.jpg'}
                alt={`${user.firstname}'s photo`}
                className="h-64 w-64 object-cover mx-auto"
                width={400}
      height={400}

              />
              <div className="p-4 flex justify-center">
                <button onClick={() => handleApprove(user._id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
                  Approve
                </button>
                <button onClick={() => handleReject(user._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Reject
                </button>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden justify-center">
  <span className="font-bold text-gray-700 justify-center">Links of the documents</span>
  <div className="p-4">
    {user.document && user.document.length > 0 ? (
      user.document.map((document, index) => (
        <div key={index} className="flex justify-center mb-2">
          <a 
  className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg text-center mr-2 mb-2"
  href={document}
  target="_blank"
  rel="noopener noreferrer"
>
  {`Link ${index + 1}`}
</a>

        </div>
      ))
    ) : (
      <div className="flex justify-center">
        <span className="text-gray-500">No documents available</span>
      </div>
    )}
  </div>
</div>


          </div>
          <div className="flex-1">
            <div className="bg-white shadow-md rounded-lg p-8 w-full">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Personal Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-bold text-gray-700">Full Name:</span>
                    <p className="border-b-2 border-gray-300 pb-2">
                      {user.firstname} {user.lastname}
                    </p>
                  </div>
                  <div>
                    <span className="font-bold text-gray-700">Display Name:</span>
                    <p className="border-b-2 border-gray-300 pb-2">{user.displayName}</p>
                  </div>
                  <div>
                    <span className="font-bold text-gray-700">Email:</span>
                    <p className="border-b-2 border-gray-300 pb-2">{user.email}</p>
                  </div>
                  <div>
                    <span className="font-bold text-gray-700">Date Joined:</span>
                    <p className="border-b-2 border-gray-300 pb-2">{user.joinedate}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="font-bold text-gray-700">Description:</span>
                    <p className="border-b-2 border-gray-300 pb-2">{user.description}</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Additional Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-bold text-gray-700">Languages:</span>
                    <p className="border-b-2 border-gray-300 pb-2">
                      {user.languages?.join(', ') || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <span className="font-bold text-gray-700">Services:</span>
                    <p className="border-b-2 border-gray-300 pb-2">
                      {user.service?.join(', ') || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <span className="font-bold text-gray-700">Skills:</span>
                    <p className="border-b-2 border-gray-300 pb-2">
                      {user.skills?.join(', ') || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <span className="font-bold text-gray-700">Education:</span>
                    <p className="border-b-2 border-gray-300 pb-2">
                      {user.education?.join(', ') || 'N/A'}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <span className="font-bold text-gray-700">Personal Website:</span>
                    <p className="border-b-2 border-gray-300 pb-2">
                      {user.personalWebsite || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <span className="font-bold text-gray-700">Phone Number:</span>
                    <p className="border-b-2 border-gray-300 pb-2">
                      {user.phoneNumber || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <span className="font-bold text-gray-700">Occupation:</span>
                    <p className="border-b-2 border-gray-300 pb-2">
                      {user.occupation || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;