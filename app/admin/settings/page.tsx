"use client";

import { motion } from "framer-motion";
import { 
  Building2, 
  Clock, 
  Settings2, 
  Bell, 
  Save,
  ChevronRight
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-black text-gray-900 font-outfit">Settings</h1>
        <p className="text-gray-500 mt-1 font-outfit">Manage your restaurant settings.</p>
      </div>

      <div className="space-y-6">
        {/* Restaurant Information */}
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-orange-50 text-orange-500 rounded-lg">
                <Building2 size={20} />
             </div>
             <h3 className="text-lg font-black text-gray-900">Restaurant Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Restaurant Name</label>
              <input type="text" defaultValue="Meetup" className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-[#FF4D1C]/20 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Phone Number</label>
              <input type="text" defaultValue="(123) 456-7890" className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-[#FF4D1C]/20 transition-all" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Email Address</label>
              <input type="email" defaultValue="hello@meetup.com" className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-[#FF4D1C]/20 transition-all" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Address</label>
              <textarea rows={3} defaultValue="123 Foodie Street, Culinary City, CC 12345" className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-[#FF4D1C]/20 transition-all resize-none" />
            </div>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-blue-50 text-blue-500 rounded-lg">
                <Clock size={20} />
             </div>
             <h3 className="text-lg font-black text-gray-900">Operating Hours</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Weekday Opening</label>
              <input type="text" defaultValue="10:00 AM" className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-[#FF4D1C]/20 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Weekday Closing</label>
              <input type="text" defaultValue="11:00 PM" className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-[#FF4D1C]/20 transition-all" />
            </div>
          </div>
        </div>

        {/* Order Settings */}
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-purple-50 text-purple-500 rounded-lg">
                <Settings2 size={20} />
             </div>
             <h3 className="text-lg font-black text-gray-900">Order Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-bold text-gray-900">Accept Online Orders</p>
                <p className="text-[10px] text-gray-400 font-medium">Allow customers to order online</p>
              </div>
              <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-[#FF4D1C]">
                <span className="inline-block h-4 w-4 translate-x-6 transform rounded-full bg-white transition" />
              </div>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-bold text-gray-900">Enable Delivery</p>
                <p className="text-[10px] text-gray-400 font-medium">Offer delivery service to customers</p>
              </div>
              <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-[#FF4D1C]">
                <span className="inline-block h-4 w-4 translate-x-6 transform rounded-full bg-white transition" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button className="flex items-center gap-2 px-8 py-4 bg-[#FF4D1C] text-white rounded-[20px] font-black shadow-lg shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all">
            <Save size={20} />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
