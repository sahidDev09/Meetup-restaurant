"use client";

import { motion } from "framer-motion";
import { Plus, Search, MoreVertical, Mail, Phone, Shield } from "lucide-react";

const staff = [
  { id: 1, name: "Sahid Ahmed", role: "Owner", email: "sahid@meetup.com", phone: "+880 123456789", avatar: "S" },
  { id: 2, name: "Faysal Hossain", role: "Manager", email: "faysal@meetup.com", phone: "+880 987654321", avatar: "F" },
];

export default function StaffPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900 font-outfit">Staff Management</h1>
          <p className="text-gray-500 mt-1 font-outfit">Manage your restaurant team and permissions.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#FF4D1C] text-white rounded-2xl font-bold shadow-lg shadow-orange-500/20 hover:scale-[1.02] transition-all">
          <Plus size={20} />
          Add Staff
        </button>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Search staff..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm outline-none" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                <th className="px-8 py-4">Name</th>
                <th className="px-8 py-4">Role</th>
                <th className="px-8 py-4">Contact</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {staff.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">
                        {member.avatar}
                      </div>
                      <div className="text-xs font-bold text-gray-900">{member.name}</div>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-wider">
                      {member.role}
                    </span>
                  </td>
                  <td className="px-8 py-4 space-y-1">
                    <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium">
                      <Mail size={12} /> {member.email}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium">
                      <Phone size={12} /> {member.phone}
                    </div>
                  </td>
                  <td className="px-8 py-4 text-right hover:opacity-100 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-gray-400 hover:text-gray-900 border border-transparent hover:border-gray-100 rounded-lg">
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
