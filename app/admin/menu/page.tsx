"use client";

import { motion } from "framer-motion";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import AddItemModal from "./components/AddItemModal";

export default function MenuPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    
    try {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item.");
    }
  };

  const toggleStatus = async (item: any) => {
    const newStatus = item.status === "Available" ? "Unavailable" : "Available";
    try {
      const { error } = await supabase
        .from('menu_items')
        .update({ status: newStatus })
        .eq('id', item.id);

      if (error) throw error;
      setItems(items.map(i => i.id === item.id ? { ...i, status: newStatus } : i));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const stats = [
    { label: "Total Items", value: items.length.toString() },
    { label: "Available", value: items.filter(i => i.status === "Available").length.toString() },
    { label: "Unavailable", value: items.filter(i => i.status !== "Available").length.toString() },
    { label: "Categories", value: new Set(items.map(i => i.category)).size.toString() },
  ];

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-foreground font-outfit">Menu Items</h1>
          <p className="text-muted-foreground mt-1 font-outfit">Manage your restaurant&apos;s menu.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-[#FF4D1C] text-white rounded-2xl font-bold shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap"
        >
          <Plus size={20} />
          Add Item
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="p-6 bg-card rounded-3xl border border-border shadow-sm transition-colors">
            <p className="text-2xl font-black text-foreground">{loading ? "..." : stat.value}</p>
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <button className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-card border border-border rounded-2xl text-sm font-bold text-muted-foreground hover:text-foreground shadow-sm transition-all">
          <Filter size={18} />
          All Categories
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-muted-foreground font-medium">Loading your menu...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
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
                    <h4 className="text-lg font-black text-foreground group-hover:text-[#FF4D1C] transition-colors line-clamp-1">{item.name}</h4>
                    <span className="inline-block px-2 py-0.5 mt-1 bg-muted text-[10px] font-bold text-muted-foreground rounded-md uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xl font-black text-[#FF4D1C]">৳{item.price}</p>
                </div>
                
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 min-h-[32px]">
                  {item.description}
                </p>
                
                <div className="pt-4 flex items-center justify-between border-t border-border">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => toggleStatus(item)}
                      className={cn(
                        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none",
                        item.status === "Available" ? "bg-[#FF4D1C]" : "bg-muted"
                      )}
                    >
                      <span className={cn(
                        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                        item.status === "Available" ? "translate-x-6" : "translate-x-1"
                      )} />
                    </button>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      {item.status}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="p-2.5 bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-card border border-transparent hover:border-border rounded-xl transition-all shadow-sm">
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-2.5 bg-muted/50 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 rounded-xl transition-all shadow-sm"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {filteredItems.length === 0 && !loading && (
            <div className="col-span-full flex flex-col items-center justify-center py-20 bg-card rounded-[32px] border-2 border-dashed border-border">
              <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mb-4">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold">No items found</h3>
              <p className="text-muted-foreground">Try adjusting your search or add a new item.</p>
            </div>
          )}
        </div>
      )}

      <AddItemModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchItems}
      />
    </div>
  );
}
