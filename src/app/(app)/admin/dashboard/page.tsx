"use client";

import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Button } from "../../../shared/ui/Button";

const Dashboard = () => {
  // Data for Total Revenue (Line Chart)
  const lineChartData = [
    { month: "Jan", revenue: 24000, expenses: 12000 },
    { month: "Feb", revenue: 22000, expenses: 14000 },
    { month: "Mar", revenue: 30000, expenses: 18000 },
    { month: "Apr", revenue: 40000, expenses: 25000 },
    { month: "May", revenue: 50000, expenses: 30000 },
    { month: "Jun", revenue: 45000, expenses: 28000 },
    { month: "Jul", revenue: 60000, expenses: 40000 },
    { month: "Aug", revenue: 70000, expenses: 50000 },
    { month: "Sep", revenue: 80000, expenses: 55000 },
    { month: "Oct", revenue: 85000, expenses: 60000 },
    { month: "Nov", revenue: 90000, expenses: 70000 },
    { month: "Dec", revenue: 100000, expenses: 80000 },
  ];

  // Data for Total Profit (Bar Chart)
  const barChartData = [
    { time: "12AM", profit: 200 },
    { time: "6AM", profit: 400 },
    { time: "12PM", profit: 600 },
    { time: "6PM", profit: 800 },
    { time: "7AM", profit: 1100 },
    { time: "10AM", profit: 1200 },
    { time: "12AM", profit: 1300 },
    { time: "1AM", profit: 1400 },
    { time: "2AM", profit: 1800 },
  ];

  // Data for Users by Device (Pie Chart)
  const pieChartData = [
    { name: "Desktop Users", value: 15624 },
    { name: "Phone Users", value: 5546 },
    { name: "Laptop Users", value: 2478 },
  ];

  const COLORS = ["#6C63FF", "#00C9A7", "#FF6F61"];

  return (
    <div className="bg-bg-dash-board text-white min-h-screen p-10">
      {/* Header Section */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold bg-text-gradient bg-clip-text   text-transparent">Welcome back, Omar</h1>
        <Button theme="primary"> Creat Report</Button>
      </header>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-bg-dash-board-card p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-medium">Pageviews</h2>
          <p className="text-3xl  text-paragraph-color  font-bold mt-2">
            50.8K <span className="text-green-400 ml-3">+21.4%</span>
          </p>
        </div>
        <div className="bg-bg-dash-board-card p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-medium">Monthly Users</h2>
          <p className="text-3xl  text-paragraph-color   font-bold mt-2">
            23.6K <span className="text-red-400 ml-3">-10.2%</span>
          </p>
        </div>
        <div className="bg-bg-dash-board-card p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-medium">New Signups</h2>
          <p className="text-3xl  text-paragraph-color  font-bold mt-2">
            756 <span className="text-green-400 ml-3">+17.5%</span>
          </p>
        </div>
        <div className="bg-bg-dash-board-card p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-medium">Subscriptions</h2>
          <p className="text-3xl  text-paragraph-color  font-bold mt-2">
            2.3K <span className="text-green-400 ml-3">+18.3%</span>
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Line Chart */}
        <div className="bg-bg-dash-board-card p-8 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Total Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineChartData}>
                  <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#6C63FF" strokeWidth={2} />
              <Line type="monotone" dataKey="expenses" stroke="#00C9A7" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-bg-dash-board-card p-8 rounded-xl shadow-lg">
  <h2 className="text-xl font-semibold mb-6">Total Profit</h2>
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={barChartData} barSize={20}> {/* Set barSize to adjust the width */}
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="profit" fill="#CB3CFF" radius={[10, 10, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
</div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-bg-dash-board-card p-8 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Users Overview</h2>
          <ResponsiveContainer width="100%" height={450}>
            <PieChart>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={200}
                label
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-bg-dash-board-card p-8 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Recent Orders</h2>
          <ul>
            <li className="flex justify-between border-b border-gray-700 py-3">
              <span>#1024</span>
              <span>Dec 29, 2024</span>
              <span className="text-green-400">Complete</span>
              <span>$220.84</span>
            </li>
            <li className="flex justify-between border-b border-gray-700 py-3">
              <span>#1023</span>
              <span>Dec 28, 2024</span>
              <span className="text-yellow-400">Pending</span>
              <span>$104.65</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
