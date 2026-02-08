"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, ShoppingCart, Filter, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/lib/supabase";

const PRESET_STYLES = [
  {
    gradient: "from-red-600 to-rose-700",
    bgGradient: "from-rose-500/10 to-red-600/10",
    border: "border-rose-500/20",
  },
  {
    gradient: "from-amber-500 to-orange-600",
    bgGradient: "from-amber-500/10 to-orange-600/10",
    border: "border-amber-500/20",
  },
  {
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-500/10 to-teal-500/10",
    border: "border-emerald-500/20",
  },
  {
    gradient: "from-orange-500 to-rose-500",
    bgGradient: "from-orange-500/10 to-rose-500/10",
    border: "border-orange-500/20",
  },
  {
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
    border: "border-blue-500/20",
  },
  {
    gradient: "from-purple-500 to-indigo-600",
    bgGradient: "from-purple-500/10 to-indigo-600/10",
    border: "border-purple-500/20",
  },
];

interface MenuItem {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  rating?: number;
  image: string;
}

export default function MenuContent() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchMenu() {
      try {
        const { data, error } = await supabase
          .from("menu_items")
          .select("*")
          .order("id", { ascending: true });

        if (error) throw error;
        setMenuItems(data || []);
      } catch (err) {
        console.error("Error fetching menu:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();
  }, []);

  const categories = ["All", ...Array.from(new Set(menuItems.map(item => item.category)))];

  const filteredItems = activeCategory === "All" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="py-10">
      <div className="container mx-auto">
        {/* Categories Section */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 px-4">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setActiveCategory(category)}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 border-2 ${
                activeCategory === category
                  ? "bg-primary border-primary text-white shadow-lg shadow-primary/30 scale-105"
                  : "bg-background border-border text-foreground hover:border-primary/50"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Grid Section */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => {
                const style = PRESET_STYLES[index % PRESET_STYLES.length];
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className={`group relative bg-gradient-to-br ${style.bgGradient} border ${style.border} rounded-[2.5rem] overflow-hidden hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] transition-all duration-500 backdrop-blur-sm flex flex-col h-full`}
                  >
                    {/* Image Container */}
                    <div className="relative h-72 w-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-6 right-6 bg-background/90 backdrop-blur-xl px-4 py-2 rounded-2xl flex items-center gap-2 border border-border/50 shadow-xl">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-bold text-sm tracking-tighter">{item.rating || 5.0}</span>
                      </div>
                      <div className="absolute top-6 left-6 bg-primary/90 backdrop-blur-xl px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white border border-white/20">
                        {item.category}
                      </div>
                    </div>

                    {/* Content Container */}
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="mb-4">
                        <h3 className="text-2xl font-black font-display group-hover:text-primary transition-colors leading-tight mb-2">
                          {item.name}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 h-10">
                          {item.description}
                        </p>
                      </div>

                      <div className="mt-auto pt-6 flex items-center justify-between border-t border-border/10">
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-black">Price</span>
                          <span className="text-3xl font-black text-foreground tabular-nums">
                            ৳{item.price}
                          </span>
                        </div>
                        
                        <Button 
                          onClick={() => addToCart({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            image: item.image
                          })}
                          className={`relative overflow-hidden bg-gradient-to-r ${style.gradient} text-white hover:text-black transition-all duration-500 rounded-2xl px-4 py-2 group/btn shadow-xl shadow-primary/10 border-none h-auto`}
                        >
                          <span className="relative z-10 flex items-center gap-2 font-black text-sm uppercase tracking-wider">
                            <ShoppingCart className="w-5 h-5 transition-transform group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1" />
                            Order
                          </span>
                          <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out" />
                        </Button>
                      </div>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className={`absolute -inset-[2px] bg-gradient-to-br ${style.gradient} blur-2xl opacity-10 rounded-[2.5rem]`} />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && filteredItems.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Filter className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-20" />
            <h3 className="text-2xl font-bold text-muted-foreground">No dishes found in this category</h3>
            <p className="text-muted-foreground/60">Try exploring our other culinary delights!</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

