"use client";

import { motion } from "framer-motion";
import { 
  DollarSign, 
  ShoppingBag, 
  Users, 
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Download,
  Calendar
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const stats = [
  { label: "Total Revenue", value: "৳4,82,900", trend: "+12.5%", isUp: true, icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
  { label: "Total Orders", value: "1,847", trend: "+8.2%", isUp: true, icon: ShoppingBag, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-500/10" },
  { label: "New Customers", value: "324", trend: "+15.3%", isUp: true, icon: Users, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
  { label: "Repeat Rate", value: "42.5%", trend: "-2.1%", isUp: false, icon: RefreshCw, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-500/10" },
];

const trendData = [
  { name: "Jan 1", revenue: 4000 },
  { name: "Jan 5", revenue: 4500 },
  { name: "Jan 10", revenue: 4200 },
  { name: "Jan 15", revenue: 5200 },
  { name: "Jan 20", revenue: 5000 },
  { name: "Jan 25", revenue: 5800 },
  { name: "Jan 30", revenue: 5500 },
];

export default function AnalyticsPage() {
  const { resolvedTheme } = useTheme();
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!isClient) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Analytics</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Track your restaurant&apos;s performance.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 shadow-sm transition-colors">
            <Calendar size={16} />
            Last 30 days
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
            className="p-6 bg-white dark:bg-slate-900 rounded-[32px] border border-gray-100 dark:border-slate-800 shadow-sm relative group transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter ${stat.isUp ? "text-green-500" : "text-red-500"}`}>
                {stat.isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {stat.trend}
              </div>
            </div>
            <div className="mt-4 space-y-1">
              <p className="text-2xl font-black text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-8 font-outfit">Revenue & Orders Trend</h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF4D1C" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#FF4D1C" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#1e293b" : "#f1f1f1"} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                dy={15}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '20px', 
                  backgroundColor: isDark ? '#0f172a' : '#ffffff',
                  border: 'none', 
                  boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
                  padding: '12px 16px',
                  color: isDark ? '#f8fafc' : '#0f172a'
                }}
                itemStyle={{ color: isDark ? '#f8fafc' : '#0f172a' }}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#FF4D1C" 
                strokeWidth={4}
                fillOpacity={1} 
                fill="url(#colorRev)" 
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center mt-6">
           <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF4D1C]" />
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Revenue (৳)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-gray-100 dark:border-slate-800 shadow-sm h-64 flex items-center justify-center relative transition-colors">
          <h3 className="absolute top-8 left-8 text-lg font-black text-gray-900 dark:text-white font-outfit">Peak Order Hours</h3>
          <p className="text-sm font-medium text-gray-400 dark:text-gray-500 italic">Chart loading or data unavailable</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-gray-100 dark:border-slate-800 shadow-sm h-64 flex items-center justify-center relative transition-colors">
          <h3 className="absolute top-8 left-8 text-lg font-black text-gray-900 dark:text-white font-outfit">Online vs Offline Orders</h3>
          <p className="text-sm font-medium text-gray-400 dark:text-gray-500 italic">Chart loading or data unavailable</p>
        </div>
      </div>
    </div>
  );
}
