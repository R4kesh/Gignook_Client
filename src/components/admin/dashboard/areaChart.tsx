"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AreaChart: React.FC = () => {
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: 'Daily Payments',
        data: [] as number[],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/payment_totals`);
        const data = res.data.dailyPayments;

        

      
        const today = new Date();
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(today.getDate() - i);
          return date;
        }).reverse();

        const labels = last7Days.map(date => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));

       
        const amounts = last7Days.map(date => {
          const dateStr = date.toISOString().split('T')[0];
          const payment = data.find((item: any) => new Date(item._id).toISOString().split('T')[0] === dateStr);
          const totalAmount = payment ? payment.totalAmount : 0;
          return Math.max(totalAmount, 0); 
        });

   
        setChartData({
          labels,
          datasets: [
            {
              label: 'Daily Payments',
              data: amounts,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching payment data:', error);
      }
    };

    fetchPaymentData();
  }, []);

  return <Line data={chartData} />;
};

const BarChart: React.FC = () => {
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: 'Total Payments',
        data: [] as number[],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/payment_totals`);
        const data = res.data.monthlyPayments;

        console.log('Fetched data:', data); // Debug: Check the fetched data

        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];

        const monthlyData = new Array(12).fill(0);
        data.forEach((item: any) => {
          monthlyData[item._id - 1] = item.totalAmount; // Assuming _id is month number (1-12)
        });; // Debug: Check the processed amounts

        setChartData({
          labels: monthNames,
          datasets: [
            {
              label: 'Total Payments',
              data: monthlyData,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching payment data:', error);
      }
    };

    fetchPaymentData();
  }, []);

  return <Bar data={chartData} />;
};

export { AreaChart, BarChart };
