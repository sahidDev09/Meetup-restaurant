"use client";

import { motion } from "framer-motion";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSyncExternalStore } from "react";

const menuStats = [
  { label: "Total Items", value: "5" },
  { label: "Available", value: "4" },
  { label: "Unavailable", value: "1" },
  { label: "Categories", value: "5" },
];

const menuItems = [
  {
    id: 1,
    name: "Classic Cheeseburger",
    category: "Burgers",
    price: "৳350",
    status: "Available",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop",
    description: "Juicy beef patty with melted cheddar, lettuce, tomato, and our special sauce."
  },
  {
    id: 2,
    name: "Mediterranean Salad",
    category: "Salads",
    price: "৳280",
    status: "Available",
    image: "https://images.unsplash.com/photo-1540189567005-5b30d295ff9a?q=80&w=600&auto=format&fit=crop",
    description: "Fresh greens with grilled chicken, feta cheese, olives, and olive oil dressing."
  },
  {
    id: 3,
    name: "Crispy Golden Fries",
    category: "Sides",
    price: "৳120",
    status: "Available",
    image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?q=80&w=600&auto=format&fit=crop",
    description: "Hand-cut potatoes, perfectly salted and fried to golden perfection."
  }
];

export default function MenuPage() {
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!isClient) return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-foreground font-outfit">Menu Items</h1>
          <p className="text-muted-foreground mt-1 font-outfit">Manage your restaurant&apos;s menu.</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#FF4D1C] text-white rounded-2xl font-bold shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap">
          <Plus size={20} />
          Add Item
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {menuStats.map((stat) => (
          <div key={stat.label} className="p-6 bg-card rounded-3xl border border-border shadow-sm transition-colors">
            <p className="text-2xl font-black text-foreground">{stat.value}</p>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input 
            type="text" 
            placeholder="Search menu items..." 
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-2xl text-sm foreground outline-none focus:ring-2 focus:ring-[#FF4D1C]/20 transition-all shadow-sm placeholder:text-muted-foreground/60"
          />
        </div>
        
        <button className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-card border border-border rounded-2xl text-sm font-bold text-muted-foreground hover:text-foreground shadow-sm transition-all">
          <Filter size={18} />
          All Categories
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {menuItems.map((item) => (
          <motion.div 
            key={item.id}
            whileHover={{ y: -5 }}
            className="bg-card rounded-[32px] overflow-hidden border border-border shadow-sm hover:shadow-xl dark:hover:shadow-orange-500/5 transition-all group"
          >
            <div className="h-56 relative overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute top-4 right-4">
                <span className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg backdrop-blur-md",
                  item.status === "Available" ? "bg-green-500/90 text-white" : "bg-red-500/90 text-white"
                )}>
                  {item.status}
                </span>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-lg font-black text-foreground group-hover:text-[#FF4D1C] transition-colors">{item.name}</h4>
                  <span className="inline-block px-2 py-0.5 mt-1 bg-muted text-[10px] font-bold text-muted-foreground rounded-md uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
                <p className="text-xl font-black text-[#FF4D1C]">{item.price}</p>
              </div>
              
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                {item.description}
              </p>
              
              <div className="pt-4 flex items-center justify-between border-t border-border">
                <div className="flex items-center gap-2">
                   <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-[#FF4D1C]">
                    <span className="inline-block h-4 w-4 translate-x-6 transform rounded-full bg-white transition" />
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Available</span>
                </div>
                
                <div className="flex gap-2">
                  <button className="p-2.5 bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-card border border-transparent hover:border-border rounded-xl transition-all shadow-sm">
                    <Edit2 size={16} />
                  </button>
                  <button className="p-2.5 bg-muted/50 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 rounded-xl transition-all shadow-sm">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
