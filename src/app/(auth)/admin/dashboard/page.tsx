"use client"
import React,{useEffect, useState} from 'react'
import Header  from '@/components/admin/dashboard/header'
import Sidebar from '@/components/admin/dashboard/sidebar'
import Card from '@/components/admin/dashboard/card'
import { AreaChart,BarChart } from '@/components/admin/dashboard/areaChart'
import axios from 'axios'
const token = localStorage.getItem("admin_access_token");


const Dashboard = () => {

  const [userCount, setUserCount] = useState<number>(0);
  const [freelancerCount, setFreelancerCount] = useState<number>(0);
  const [totalPayments, setTotalPayments] = useState<number>(0);
  

  useEffect(()=>{
    const fetchUsers = async () => {
    try {
      const res=await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/count_display`,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      setUserCount(res.data.userCount);
      setFreelancerCount(res.data.freelancerCount);
      setTotalPayments(res.data.totalPayments);
      
      
    } catch (error) {
      
    }
  };
    fetchUsers();
  },[])

  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          

            <Card color="blue" title={`Users: ${userCount}`} linkText="View Details" />
            <Card color="red" title={`Freelancers: ${freelancerCount}`} linkText="View Details" />
            <Card color="green" title={`Total Payments: $${totalPayments}`} linkText="View Details" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold mb-2">Daily Payments Chart</h2>
              <AreaChart />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold mb-2">Total Payments Chart</h2>
              <BarChart />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
