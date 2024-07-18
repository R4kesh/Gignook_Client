"use client"
import React, { useEffect, useState } from 'react';
import LeftProfile from '@/components/freelancer/home/left';
import Card from '@/components/freelancer/dashboard/card';
import axios from 'axios';
import { AreaChart, BarChart } from '@/components/freelancer/dashboard/areaChart';
const id=localStorage.getItem('userid')

const Dashboard = () => {
  const [orderStats, setOrderStats] = useState({
    completedOrdersCount: 0,
    pendingOrdersCount: 0,
    totalPayments: 0
  });

  useEffect(() => {
    const fetchOrderStats = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/freelancer/order-stats/${id}`);
        setOrderStats(response.data);
      } catch (error) {
        console.error('Error fetching order stats:', error);
      }
    };

    fetchOrderStats();
  }, [id]);

  return (
    <div className="flex h-screen p-4 bg-gray-100">
      <LeftProfile />

      <div className="w-3/4 h-screen overflow-y-scroll p-4">
        <h1 className="text-2xl font-bold">Order Chart</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <Card color="blue" title={`Order Done: ${orderStats.completedOrdersCount}`} linkText="View Details" />
          <Card color="red" title={`Order Pending: ${orderStats.pendingOrdersCount}`} linkText="View Details" />
          <Card color="green" title={`Total Payments: ${orderStats.totalPayments}`} linkText="View Details" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-2">Daily orders Chart</h2>
            <AreaChart />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-2">Total orders Chart</h2>
            <BarChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
