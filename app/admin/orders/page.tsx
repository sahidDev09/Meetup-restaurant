"use client";

import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Clock, 
  ChefHat, 
  Package, 
  Truck, 
  CheckCircle2,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";

const orderStats = [
  { label: "Pending", value: "0", icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
  { label: "Preparing", value: "0", icon: ChefHat, color: "text-rose-500", bg: "bg-rose-50" },
  { label: "Prepared", value: "0", icon: Package, color: "text-blue-500", bg: "bg-blue-50" },
  { label: "Out for Delivery", value: "2", icon: Truck, color: "text-sky-500", bg: "bg-sky-50" },
  { label: "Delivered", value: "6", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-50" },
];

const orders = [
  { id: "ORD-ZM97Z3", customer: "Faysal", phone: "01601321789", items: "1 Items", total: "৳378", status: "Delivered", otp: "Verified", date: "Jan 11 at 05:18 PM" },
  { id: "ORD-M3HN2G", customer: "Fahima Fahi", phone: "01784321789", items: "1 Items", total: "৳302", status: "Out for Delivery", otp: "8655", date: "Jan 11 at 01:05 AM" },
  { id: "ORD-XS9JTV", customer: "sahid", phone: "02389473853", items: "1 Items", total: "৳378", status: "Out for Delivery", otp: "8414", date: "Jan 11 at 12:43 AM" },
  { id: "ORD-1005", customer: "Arif Hossain", phone: "01512-789012", items: "1 Items", total: "৳1134", status: "Delivered", otp: "Verified", date: "Jan 10 at 07:53 PM" },
  { id: "ORD-1004", customer: "Sabrina Akter", phone: "01512-578901", items: "2 Items", total: "৳778", status: "Delivered", otp: "Verified", date: "Jan 10 at 07:53 PM" },
  { id: "ORD-1003", customer: "Kamal Uddin", phone: "01912-567890", items: "1 Items", total: "৳302", status: "Delivered", otp: "Verified", date: "Jan 10 at 07:53 PM" },
  { id: "ORD-1001", customer: "Rahim Ahmed", phone: "01812-456789", items: "2 Items", total: "৳886", status: "Delivered", otp: "Verified", date: "Jan 10 at 07:53 PM" },
];

export default function OrdersPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Orders</h1>
          <p className="text-gray-500 mt-1">Manage and track all customer orders with OTP verification.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {orderStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm"
          >
            <div className={cn("p-3 rounded-xl", stat.bg, stat.color)}>
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-xl font-black text-gray-900">{stat.value}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search orders..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm outline-none ring-1 ring-transparent focus:ring-[#FF4D1C]/20 transition-all"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
             <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm font-bold text-gray-600 hover:text-gray-900 transition-all">
              <Filter size={16} />
              All Status
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] border-b border-gray-100">
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Items</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">OTP</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4 text-xs font-bold text-gray-900">{order.id}</td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-bold text-gray-900">{order.customer}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{order.phone}</div>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-gray-600">{order.items}</td>
                  <td className="px-6 py-4 text-xs font-bold text-gray-900">{order.total}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                      order.status === "Delivered" ? "bg-green-50 text-green-600" :
                      order.status === "Out for Delivery" ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-600"
                    )}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider w-fit",
                      order.otp === "Verified" ? "bg-green-500 text-white shadow-sm" : "bg-gray-100 text-gray-600"
                    )}>
                      {order.otp === "Verified" && <CheckCircle2 size={10} />}
                      {order.otp}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[10px] font-medium text-gray-500 whitespace-nowrap">{order.date}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-white rounded-lg transition-all opacity-0 group-hover:opacity-100">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
