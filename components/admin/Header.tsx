"use client";

import { Search, Bell } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <header className="h-20 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-40 transition-colors duration-300">
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 group-focus-within:text-[#FF4D1C] transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800/50 border-none rounded-xl text-sm dark:text-gray-200 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <ThemeToggle />
        
        <button className="relative p-2 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
          <Bell size={22} />
          <span className="absolute top-1 right-1 w-4 h-4 bg-[#FF4D1C] text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900">
            3
          </span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-gray-100 dark:border-slate-800">
          <div className="text-right">
            <p className="text-sm font-bold text-gray-900 dark:text-gray-100">Testing</p>
            <p className="text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">Admin</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
            T
          </div>
        </div>
      </div>
    </header>
  );
}
