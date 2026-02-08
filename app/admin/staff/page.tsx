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
          <h1 className="text-3xl font-black text-foreground font-outfit">Staff Management</h1>
          <p className="text-muted-foreground mt-1 font-outfit">Manage your restaurant team and permissions.</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#FF4D1C] text-white rounded-2xl font-bold shadow-lg shadow-orange-500/20 hover:scale-[1.02] transition-all whitespace-nowrap">
          <Plus size={20} />
          Add Staff
        </button>
      </div>

      <div className="bg-card rounded-[32px] border border-border shadow-sm overflow-hidden transition-colors">
        <div className="p-6 border-b border-border">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input 
              type="text" 
              placeholder="Search staff..." 
              className="w-full pl-10 pr-4 py-2 bg-muted/50 border-none rounded-xl text-sm foreground outline-none focus:ring-2 focus:ring-[#FF4D1C]/20 transition-all placeholder:text-muted-foreground/60" 
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-muted/50 text-[10px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border transition-colors">
                <th className="px-8 py-4">Name</th>
                <th className="px-8 py-4">Role</th>
                <th className="px-8 py-4">Contact</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {staff.map((member) => (
                <tr key={member.id} className="hover:bg-muted/50 transition-colors group">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold text-sm">
                        {member.avatar}
                      </div>
                      <div className="text-xs font-bold text-foreground">{member.name}</div>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <span className="px-3 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-wider">
                      {member.role}
                    </span>
                  </td>
                  <td className="px-8 py-4 space-y-1">
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-medium whitespace-nowrap">
                      <Mail size={12} /> {member.email}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-medium whitespace-nowrap">
                      <Phone size={12} /> {member.phone}
                    </div>
                  </td>
                  <td className="px-8 py-4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all">
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
