"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, ShoppingCart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const PRESET_STYLES = [
  {
    gradient: "from-red-600 to-rose-700",
    bgGradient: "from-rose-500/10 to-red-600/10",
    border: "border-rose-500/20",
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
];

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  rating?: number;
  image: string;
  status: string;
}

export default function SignatureFoods() {
  const { addToCart } = useCart();
  const [foods, setFoods] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSignatureFoods() {
      try {
        const { data, error } = await supabase
          .from("menu_items")
          .select("*")
          .eq("status", "Available")
          .limit(3);

        if (error) throw error;
        setFoods(data || []);
      } catch (err) {
        console.error("Error fetching signature foods:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSignatureFoods();
  }, []);

  return (
    <section id="signature-foods" className="py-24 bg-background relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-secondary/10 rounded-full blur-[100px]" />
      </div>

      <div className="container-custom px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-semibold tracking-wider uppercase text-sm mb-4 block"
          >
            Customer Favorites
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6 font-display tracking-tight"
          >
            Our Most <span className="text-primary">Signature</span> Foods
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Taste the perfection in every bite with our chef&apos;s specially curated signature dishes.
          </motion.p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6">
            {foods.map((food, index) => {
              const style = PRESET_STYLES[index % PRESET_STYLES.length];
              return (
                <motion.div
                  key={food.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -12 }}
                  className={`group relative bg-gradient-to-br ${style.bgGradient} border ${style.border} rounded-[2.5rem] overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 backdrop-blur-sm flex flex-col h-full`}
                >
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={food.image}
                      alt={food.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-6 right-6 bg-background/90 dark:bg-muted/80 backdrop-blur-xl px-4 py-2 rounded-2xl flex items-center gap-2 border border-border/50 shadow-xl">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-bold">{food.rating || 5.0}</span>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-2xl font-bold font-display group-hover:text-primary transition-colors">
                        {food.name}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-6 line-clamp-2 leading-relaxed h-12">
                      {food.description}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-4">
                      <span className="text-2xl font-bold text-foreground tabular-nums">
                        ৳{food.price}
                      </span>
                      
                      <Button 
                        variant="ghost"
                        onClick={() => addToCart({
                          id: food.id,
                          name: food.name,
                          price: food.price,
                          image: food.image
                        })}
                        className={`relative overflow-hidden btn-primary-gradient text-white hover:text-black transition-all duration-500 rounded-full px-6 py-6 group/btn shadow-lg shadow-primary/20 border-none`}
                      >
                        <span className="relative z-10 flex items-center gap-2 font-bold transition-colors">
                          <ShoppingCart className="w-5 h-5" />
                          Order
                        </span>
                        {/* White overlay on hover */}
                        <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

