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

// Register Chart.js components
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
        label: 'Daily Orders Count',
        data: [] as number[],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const id = localStorage.getItem('userid');
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/freelancer/order_totals/${id}`);
        const data = res.data.dailyOrdersCount;

        const today = new Date();
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(today.getDate() - i);
          return date;
        }).reverse();

        const labels = last7Days.map(date => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));

        const counts = last7Days.map(date => {
          const dateStr = date.toISOString().split('T')[0];
          const order = data.find((item: any) => item._id === dateStr);
          return order ? order.count : 0;
        });

        setChartData({
          labels ,
          datasets: [
            {
              label: 'Daily Orders Count',
              data: counts,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

    fetchOrderData();
  }, []);

  return <Line data={chartData} />;
};

const BarChart: React.FC = () => {
  const [chartData, setChartData] = useState({
    labels: [] as string [],
    datasets: [
      {
        label: 'Monthly Orders Count',
        data: [] as number [],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const id = localStorage.getItem('userid');
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/freelancer/order_totals/${id}`);
        const data = res.data.monthlyOrdersCount;

        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];

        const monthlyData = new Array(12).fill(0);
        data.forEach((item: any) => {
          monthlyData[item._id - 1] = item.count;
        });

        setChartData({
          labels: monthNames,
          datasets: [
            {
              label: 'Monthly Orders Count',
              data: monthlyData,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

    fetchOrderData();
  }, []);

  return <Bar data={chartData} />;
};

export { AreaChart, BarChart };
