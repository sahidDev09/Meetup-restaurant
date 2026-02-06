"use client";

import { motion } from "framer-motion";
import { 
  DollarSign, 
  TrendingUp, 
  Clock, 
  ChefHat, 
  Truck, 
  CheckCircle2, 
  XCircle, 
  ShoppingBag,
  Calendar,
  Download
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

const stats = [
  { label: "Period Sales", value: "৳0", icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-50" },
  { label: "Period Revenue", value: "৳0", icon: TrendingUp, color: "text-orange-500", bg: "bg-orange-50" },
  { label: "Pending Orders", value: "0", icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
  { label: "Preparing", value: "0", icon: ChefHat, color: "text-rose-500", bg: "bg-rose-50" },
  { label: "Out for Delivery", value: "0", icon: Truck, color: "text-blue-500", bg: "bg-blue-50" },
  { label: "Delivered", value: "0", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-50" },
  { label: "Cancelled", value: "0", icon: XCircle, color: "text-red-500", bg: "bg-red-50" },
  { label: "Total Orders", value: "0", icon: ShoppingBag, color: "text-purple-500", bg: "bg-purple-50" },
];

const data = [
  { name: "01/31", sales: 0 },
  { name: "02/01", sales: 0 },
  { name: "02/02", sales: 0 },
  { name: "02/03", sales: 0 },
  { name: "02/04", sales: 0 },
  { name: "02/05", sales: 0 },
  { name: "02/06", sales: 0 },
  { name: "02/07", sales: 0 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 font-outfit">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's what's happening.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm font-medium text-gray-600 shadow-sm">
            <Calendar size={16} />
            Jan 31 - Feb 07, 2026
          </div>
          <div className="flex bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
            {["Today", "7 Days", "30 Days"].map((period) => (
              <button key={period} className="px-4 py-2.5 text-xs font-bold text-gray-400 hover:text-gray-900 transition-colors border-r last:border-r-0 border-gray-100">
                {period}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm font-bold text-gray-600 hover:text-gray-900 shadow-sm transition-all">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
              <stat.icon size={24} />
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-black text-gray-900">{stat.value}</p>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-8 bg-white rounded-[32px] border border-gray-100 shadow-sm">
          <h3 className="text-lg font-black text-gray-900 mb-8">Last 7 Days Sales</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF4D1C" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#FF4D1C" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#FF4D1C" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorSales)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-8 bg-white rounded-[32px] border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
          <h3 className="text-lg font-black text-gray-900 mb-4 self-start">Order Status Distribution</h3>
          <div className="flex-1 flex flex-col items-center justify-center space-y-4">
            <div className="w-48 h-48 rounded-full border-8 border-gray-50 flex items-center justify-center relative">
               <div className="text-center">
                <p className="text-3xl font-black text-gray-900">0</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total</p>
               </div>
            </div>
            <p className="text-sm text-gray-400 font-medium italic">No data available for the selected period.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
