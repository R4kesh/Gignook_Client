"use client";
import LeftProfile from '@/components/freelancer/home/left';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface User {
  firstname: string;
  email: string;
  profilePicture: string;
}

interface Work {
  title: string;
}

interface Payment {
  id: string;
  userId: User;
  workId: Work;
  date: string;
  amount: number;
}

const Payment = () => {
  const [paymentHistory, setPaymentHistory] = useState<Payment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchPaymentHistory = async () => {
      const id = localStorage.getItem('userid');
      if (id) {
        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/freelancer/paymentHistory/${id}`,{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          });;
          setPaymentHistory(res.data);
        } catch (error) {
          console.error('Error fetching payment history:', error);
        }
      }
    };

    fetchPaymentHistory();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = paymentHistory ? paymentHistory.slice(startIndex, endIndex) : [];
  const totalPages = Math.ceil(paymentHistory.length / itemsPerPage);

  return (
    <div className="flex h-screen p-4 bg-gray-100">
      <LeftProfile />
      <div className="w-3/4 h-screen overflow-y-scroll p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Payment History</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-center">Username</th>
              <th className="py-2 px-4 border-b text-center">Email</th>
              <th className="py-2 px-4 border-b text-center">Date</th>
              <th className="py-2 px-4 border-b text-center">Amount</th>
              <th className="py-2 px-4 border-b text-center">Work</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((payment) => (
                <tr key={payment.id}>
                  <td className="py-2 px-4 border-b text-center flex items-center justify-center">
                    <Image
                    width={75}
                    height={75}
              
                      src={payment.userId.profilePicture}
                      alt="Profile"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    {payment.userId.firstname}
                  </td>
                  <td className="py-2 px-4 border-b text-center">{payment.userId.email}</td>
                  <td className="py-2 px-4 border-b text-center">{new Date(payment.date).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b text-center">${payment.amount}</td>
                  <td className="py-2 px-4 border-b text-center">{payment.workId.title}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-2 px-4 border-b text-center">
                  No payment history available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          <button
            className={`py-2 px-4 mx-1 border rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-white'}`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`py-2 px-4 mx-1 border rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white'}`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className={`py-2 px-4 mx-1 border rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-white'}`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
