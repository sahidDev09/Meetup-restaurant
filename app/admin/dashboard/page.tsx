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
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const stats = [
  { label: "Period Sales", value: "৳0", icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
  { label: "Period Revenue", value: "৳0", icon: TrendingUp, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-500/10" },
  { label: "Pending Orders", value: "0", icon: Clock, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
  { label: "Preparing", value: "0", icon: ChefHat, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-500/10" },
  { label: "Out for Delivery", value: "0", icon: Truck, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
  { label: "Delivered", value: "0", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-50 dark:bg-green-500/10" },
  { label: "Cancelled", value: "0", icon: XCircle, color: "text-red-500", bg: "bg-red-50 dark:bg-red-500/10" },
  { label: "Total Orders", value: "0", icon: ShoppingBag, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-500/10" },
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
  const { theme } = useTheme();
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!isClient) return null;

  const isDark = theme === "dark";

  return (
    <div className="space-y-8 font-outfit">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back! Here&apos;s what&apos;s happening.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 shadow-sm transition-colors">
            <Calendar size={16} />
            Jan 31 - Feb 07, 2026
          </div>
          <div className="flex bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden transition-colors">
            {["Today", "7 Days", "30 Days"].map((period) => (
              <button key={period} className="px-4 py-2.5 text-xs font-bold text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors border-r last:border-r-0 border-gray-100 dark:border-slate-800">
                {period}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 shadow-sm transition-all">
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
            className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
          >
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
              <stat.icon size={24} />
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-black text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-8 bg-white dark:bg-slate-900 rounded-[32px] border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
          <h3 className="text-lg font-black text-gray-900 dark:text-white mb-8">Last 7 Days Sales</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF4D1C" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#FF4D1C" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#1e293b" : "#f1f1f1"} />
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
                  contentStyle={{ 
                    borderRadius: '16px', 
                    backgroundColor: isDark ? '#0f172a' : '#ffffff',
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    color: isDark ? '#f8fafc' : '#0f172a'
                  }}
                  itemStyle={{ color: isDark ? '#f8fafc' : '#0f172a' }}
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

        <div className="p-8 bg-white dark:bg-slate-900 rounded-[32px] border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center transition-colors">
          <h3 className="text-lg font-black text-gray-900 dark:text-white mb-4 self-start">Order Status Distribution</h3>
          <div className="flex-1 flex flex-col items-center justify-center space-y-4">
            <div className="w-48 h-48 rounded-full border-8 border-gray-50 dark:border-slate-800 flex items-center justify-center relative transition-colors">
               <div className="text-center">
                <p className="text-3xl font-black text-gray-900 dark:text-white">0</p>
                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Total</p>
               </div>
            </div>
            <p className="text-sm text-gray-400 dark:text-gray-500 font-medium italic">No data available for the selected period.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
