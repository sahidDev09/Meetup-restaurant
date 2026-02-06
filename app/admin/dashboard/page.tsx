"use client";

import React from "react";
import { 
  TrendingUp, 
  ShoppingBag, 
  Clock, 
  ChefHat, 
  Truck, 
  CheckCircle2, 
  XCircle, 
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download
} from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { label: "Period Sales", value: "৳0", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50" },
  { label: "Period Revenue", value: "৳0", icon: ShoppingBag, color: "text-orange-500", bg: "bg-orange-50" },
  { label: "Pending Orders", value: "0", icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
  { label: "Preparing", value: "0", icon: ChefHat, color: "text-rose-500", bg: "bg-rose-50" },
  { label: "Out for Delivery", value: "0", icon: Truck, color: "text-blue-500", bg: "bg-blue-50" },
  { label: "Delivered", value: "0", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-50" },
  { label: "Cancelled", value: "0", icon: XCircle, color: "text-red-500", bg: "bg-red-50" },
  { label: "Total Orders", value: "0", icon: Package, color: "text-purple-500", bg: "bg-purple-50" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900 font-outfit">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's what's happening.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-200">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Jan 30 - Feb 06, 2026</span>
          </div>
          <div className="flex bg-white rounded-xl border border-gray-200 p-1">
            {["Today", "7 Days", "30 Days"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  tab === "7 Days" ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
            <h3 className="text-2xl font-black text-gray-900 mt-1">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Chart Placeholder */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-gray-900">Last 7 Days Sales</h3>
            <div className="flex items-center gap-2 text-emerald-500 text-sm font-bold bg-emerald-50 px-2 py-1 rounded-lg">
              <ArrowUpRight className="w-4 h-4" />
              +12.5%
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-2 px-2">
            {[30, 45, 25, 60, 40, 75, 50].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                <div className="w-full relative">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    className="w-full bg-orange-100 group-hover:bg-orange-500 transition-colors rounded-t-lg rounded-b-md cursor-pointer"
                  />
                </div>
                <span className="text-[10px] font-bold text-gray-400">01/0{i+1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Order Status Distribution Placeholder */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-8">Order Status Distribution</h3>
          <div className="flex items-center justify-center py-10">
            <div className="relative w-48 h-48 rounded-full border-[16px] border-gray-100 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-[16px] border-orange-500 border-t-transparent border-l-transparent -rotate-45" />
              <div className="text-center">
                <p className="text-3xl font-black text-gray-900">0</p>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Orders</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <span className="text-xs font-medium text-gray-600">Completed (0%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-200" />
              <span className="text-xs font-medium text-gray-600">Pending (0%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
