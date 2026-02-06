"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

const signatureFoods = [
  {
    id: 1,
    name: "Prime Tomahawk Steak",
    description: "Dry-aged for 45 days, our signature steak is seasoned with sea salt and cracked pepper, served with roasted garlic.",
    price: 1250,
    rating: 5.0,
    image: "/assests/signature_steak.png",
    gradient: "from-red-600 to-rose-700",
    bgGradient: "from-rose-500/10 to-red-600/10",
    border: "border-rose-500/20",
  },
  {
    id: 3,
    name: "Honey Glazed Salmon",
    description: "Pan-seared Atlantic salmon glazed with organic honey and ginger, served with roasted seasonal vegetables.",
    price: 850,
    rating: 4.8,
    image: "/assests/signature_salmon.png",
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-500/10 to-teal-500/10",
    border: "border-emerald-500/20",
  },
  {
    id: 2,
    name: "Signature Truffle Burger",
    description: "Gourmet beef patty with black truffle aioli, melted aged cheddar, and fresh arugula on a toasted brioche bun.",
    price: 480,
    rating: 4.9,
    image: "/assests/signature_burger.png",
    gradient: "from-orange-500 to-rose-500",
    bgGradient: "from-orange-500/10 to-rose-500/10",
    border: "border-orange-500/20",
  },
  
];

export default function SignatureFoods() {
  const { addToCart } = useCart();

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6">
          {signatureFoods.map((food, index) => (
            <motion.div
              key={food.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -12 }}
              className={`group relative bg-gradient-to-br ${food.bgGradient} border ${food.border} rounded-[2.5rem] overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 backdrop-blur-sm flex flex-col h-full`}
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={food.image}
                  alt={food.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 border border-border/50">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-bold">{food.rating}</span>
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
                    className={`relative overflow-hidden bg-gradient-to-r ${food.gradient} text-white hover:text-black transition-all duration-500 rounded-full px-6 py-6 group/btn shadow-lg shadow-primary/20 border-none`}
                  >
                    <span className="relative z-10 flex items-center gap-2 font-bold transition-colors">
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </span>
                    {/* White overlay on hover */}
                    <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
