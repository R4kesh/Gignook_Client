"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic'
const LeftProfile=dynamic(()=>import('@/components/freelancer/home/left'),{
  ssr:false,
})
interface User {
  firstname: string;
  email: string;
  profilePicture: string;
}

interface Work {
  title: string;
}

interface Order {
  _id: string;
  userId: User;
  workId: Work;
  status: string;
  amount: number;
  date: string;
}

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


const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
 

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const id = localStorage.getItem('userid');
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/freelancer/orders/${id}`);
        setOrders(res.data);
      } catch (error) {
        console.error('Failed to fetch orders', error);
      }
    };

    fetchOrders();
  }, [orders]);

  const handleAction = async (orderId: string) => {
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/freelancer/orders/status/${orderId}`);
      const updatedOrder = res.data;
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
    } catch (error) {
      console.error('Failed to update order status', error);
    }
  };

  return (
    <div className="flex h-screen p-4 bg-gray-100">
      <LeftProfile />
      <div className="w-3/4 h-screen overflow-y-scroll p-4 bg-white rounded-lg shadow-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-center">Username</th>
              <th className="py-2 px-4 border-b text-center">Email</th>
              <th className="py-2 px-4 border-b text-center">Date</th>
              <th className="py-2 px-4 border-b text-center">Amount</th>
              <th className="py-2 px-4 border-b text-center">Work</th>
              <th className="py-2 px-4 border-b text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id}>
                  <td className="py-2 px-4 border-b text-center">
                    <div className="flex items-center justify-center">
                      
                      {order.userId.firstname}
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b text-center">{order.userId.email}</td>
                  <td className="py-2 px-4 border-b text-center">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b text-center">${order.amount}</td>
                  <td className="py-2 px-4 border-b text-center">{order.workId.title}</td>
                  <td className="py-2 px-4 border-b text-center">
                   
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                    <Button className={`px-4 py-2 rounded ${order.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'} text-white`}
                      onClick={() => handleAction(order._id)}
                      disabled={order.status === 'completed'}>
                      {order.status === 'completed' ? 'Completed' : 'Pending..'}

                    </Button>
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
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-2 px-4 border-b text-center">
                  No orders available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
