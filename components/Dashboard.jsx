// app/dashboard/page.jsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  BellIcon,
  ChevronDownIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  CogIcon,
} from "@heroicons/react/24/outline";
import {
  AreaChart,
  BarChart,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Link from "next/link";

const data = [
  { name: "Jan", uv: 4000, pv: 2400 },
  { name: "Feb", uv: 3000, pv: 1398 },
  { name: "Mar", uv: 2000, pv: 9800 },
  { name: "Apr", uv: 2780, pv: 3908 },
  { name: "May", uv: 1890, pv: 4800 },
  { name: "Jun", uv: 2390, pv: 3800 },
];

const recentActivities = [
  {
    id: 1,
    title: "New project created",
    time: "5 min ago",
    status: "completed",
  },
  {
    id: 2,
    title: "User meeting scheduled",
    time: "2 hours ago",
    status: "pending",
  },
  {
    id: 3,
    title: "Monthly report generated",
    time: "1 day ago",
    status: "in-progress",
  },
];

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-slate-800">
      {/* Sidebar */}
      <motion.div
        animate={{ width: isSidebarOpen ? 260 : 0 }}
        className="fixed h-full bg-slate-800/50 backdrop-blur-lg border-r border-slate-700/50 overflow-hidden"
      >
        <div className="p-6 space-y-8">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg" />
            <Link href={"/dashboard"}>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Bhakari
              </span>
            </Link>
          </div>

          <nav className="space-y-4">
            {[
              { name: "Home", icon: HomeIcon, href: "/home" },
              { name: "Analytics", icon: ChartBarIcon, href: "#" },
              { name: "Projects", icon: FolderIcon, href: "#" },
              { name: "Team", icon: UsersIcon, href: "#" },
              { name: "Settings", icon: CogIcon, href: "/setting" },
            ].map((item) => (
              <Link href={item.href} key={item.name}>
                <div className="flex items-center space-x-3 p-3 text-slate-300 hover:bg-slate-700/30 rounded-lg transition-all">
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </div>
              </Link>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className={`transition-all ${isSidebarOpen ? "pl-64" : "pl-0"}`}>
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-700/30 rounded-lg text-slate-300"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-slate-700/30 rounded-full text-slate-300">
                <BellIcon className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full" />
                <span className="text-slate-300">John Doe</span>
                <ChevronDownIcon className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                title: "Total Revenue",
                value: "$45,231",
                trend: "+20.1%",
                color: "from-green-400 to-cyan-500",
              },
              {
                title: "Active Users",
                value: "2,342",
                trend: "+15.2%",
                color: "from-blue-400 to-purple-500",
              },
              {
                title: "New Projects",
                value: "12",
                trend: "+5.3%",
                color: "from-orange-400 to-red-500",
              },
              {
                title: "Pending Tasks",
                value: "8",
                trend: "-2.1%",
                color: "from-purple-400 to-pink-500",
              },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="bg-slate-800/50 backdrop-blur-lg p-6 rounded-xl border border-slate-700/50"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-slate-400 text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold text-slate-200 mt-2">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`bg-gradient-to-r ${stat.color} p-3 rounded-lg`}
                  >
                    <span className="text-white text-sm font-medium">
                      {stat.trend}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-800/50 backdrop-blur-lg p-6 rounded-xl border border-slate-700/50">
              <h3 className="text-slate-200 text-lg font-semibold mb-4">
                Revenue Overview
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#60a5fa"
                          stopOpacity={0.4}
                        />
                        <stop
                          offset="95%"
                          stopColor="#60a5fa"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="uv"
                      stroke="#60a5fa"
                      fillOpacity={1}
                      fill="url(#colorUv)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-lg p-6 rounded-xl border border-slate-700/50">
              <h3 className="text-slate-200 text-lg font-semibold mb-4">
                Performance Metrics
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <XAxis dataKey="name" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <Tooltip />
                    <Bar dataKey="pv" fill="#60a5fa" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-slate-800/50 backdrop-blur-lg p-6 rounded-xl border border-slate-700/50">
            <h3 className="text-slate-200 text-lg font-semibold mb-4">
              Recent Activities
            </h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-4 hover:bg-slate-700/30 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-8 w-8 bg-slate-700/50 rounded-full flex items-center justify-center">
                      <div className="h-2 w-2 bg-blue-400 rounded-full animate-pulse" />
                    </div>
                    <div>
                      <p className="text-slate-200">{activity.title}</p>
                      <p className="text-slate-400 text-sm">{activity.time}</p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 text-sm rounded-full ${
                      activity.status === "completed"
                        ? "bg-green-400/20 text-green-400"
                        : activity.status === "pending"
                        ? "bg-yellow-400/20 text-yellow-400"
                        : "bg-blue-400/20 text-blue-400"
                    }`}
                  >
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
