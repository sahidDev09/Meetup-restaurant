"use client";

import { Plus, Search, MoreVertical, Mail, Phone } from "lucide-react";
import { useSyncExternalStore } from "react";

const staff = [
  { id: 1, name: "Sahid Ahmed", role: "Owner", email: "sahid@meetup.com", phone: "+880 123456789", avatar: "S" },
  { id: 2, name: "Faysal Hossain", role: "Manager", email: "faysal@meetup.com", phone: "+880 987654321", avatar: "F" },
];

export default function StaffPage() {
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!isClient) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white font-outfit">Staff Management</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 font-outfit">Manage your restaurant team and permissions.</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#FF4D1C] text-white rounded-2xl font-bold shadow-lg shadow-orange-500/20 hover:scale-[1.02] transition-all whitespace-nowrap">
          <Plus size={20} />
          Add Staff
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
        <div className="p-6 border-b border-gray-50 dark:border-slate-800/50">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search staff..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-800/50 border-none rounded-xl text-sm dark:text-gray-200 outline-none focus:ring-2 focus:ring-[#FF4D1C]/20 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600" 
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 dark:bg-slate-800/50 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest border-b border-gray-100 dark:border-slate-800 transition-colors">
                <th className="px-8 py-4">Name</th>
                <th className="px-8 py-4">Role</th>
                <th className="px-8 py-4">Contact</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-800/50">
              {staff.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold text-sm">
                        {member.avatar}
                      </div>
                      <div className="text-xs font-bold text-gray-900 dark:text-gray-100">{member.name}</div>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <span className="px-3 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-wider">
                      {member.role}
                    </span>
                  </td>
                  <td className="px-8 py-4 space-y-1">
                    <div className="flex items-center gap-2 text-[10px] text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">
                      <Mail size={12} /> {member.email}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">
                      <Phone size={12} /> {member.phone}
                    </div>
                  </td>
                  <td className="px-8 py-4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-gray-100 dark:hover:border-slate-700 rounded-lg transition-all">
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
