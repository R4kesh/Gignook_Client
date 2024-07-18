"use client";
import axios from 'axios';
import Sidebar from '@/components/admin/dashboard/sidebar';
import React, { useState, useEffect } from 'react';

interface Payment {
  _id: string;
  date: string;
  userId: {
    firstname: string;
    lastname: string;
  };
  freelancer: {
    firstname:string
  } ;
  workId: {
    title: string;
  };
  amount: number;
  title: string;
}

const Payment = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentsPerPage] = useState(10); // Set the number of payments per page

  useEffect(() => {
    const fetchPayment = async () => {
      try {
    const token = localStorage.getItem("admin_access_token");

        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/payments`, {
          headers: {
          'Authorization': `Bearer ${token}`,

            'Content-Type': 'application/json',
          },
        });
        setPayments(res.data.payment || []);
      } catch (error) {
        console.error('Error fetching payments:', error);
        setPayments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPayment();
  }, []);

  // Get current payments
  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = payments.slice(indexOfFirstPayment, indexOfLastPayment);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6">Payments</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-800 text-white text-center">
                <th className="py-2 px-4 border-b">Date&Time</th>
                <th className="py-2 px-4 border-b">Payment By</th>
                <th className="py-2 px-4 border-b">Freelancer</th>
                <th className="py-2 px-4 border-b">Work</th>
                <th className="py-2 px-4 border-b">Amount</th>
                <th className="py-2 px-4 border-b">Title</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="border px-4 py-2 text-center">
                    Loading...
                  </td>
                </tr>
              ) : currentPayments.length > 0 ? (
                currentPayments.map((payment, index) => (
                  <tr key={payment._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}>
                    <td className="border px-4 py-2 text-center">{new Date(payment.date).toLocaleString()}</td>
                    <td className="border px-4 py-2 text-center">
                      {payment.userId.firstname} {payment.userId.lastname}
                    </td>
                    <td className="border px-4 py-2 text-center">{payment.freelancer.firstname}</td>
                    <td className="border px-4 py-2 text-center">{payment.workId.title}</td>
                    <td className="border px-4 py-2 text-center">₹{payment.amount}</td>
                    <td className="border px-4 py-2 text-center">{payment.title}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="border px-4 py-2 text-center">
                    No payments found.
                  </td>
                </tr>
              )}
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
              disabled={indexOfLastPayment >= payments.length}
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

export default Payment;
