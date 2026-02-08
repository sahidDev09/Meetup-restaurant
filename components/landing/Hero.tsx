"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, Clock, MapPin, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useRef, useSyncExternalStore } from "react";
import gsap from "gsap";
import { useState } from "react";
import BookingModal from "./BookingModal";


export default function Hero() {
  const { theme, resolvedTheme } = useTheme();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

 
  
  const heroImage = mounted && resolvedTheme === "dark" 
    ? "/assests/meetup_hero_black.png" 
    : "/assests/meetup_hero_white-2.png";

  useEffect(() => {
    if (headingRef.current) {
      const chars = headingRef.current.innerText.split("");
      headingRef.current.innerHTML = chars
        .map(char => `<span class="inline-block char">${char === " " ? "&nbsp;" : char}</span>`)
        .join("");

      gsap.fromTo(
        ".char",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.02,
          duration: 0.8,
          ease: "back.out(1.7)",
        }
      );
    }
  }, [theme]); // Re-run on theme change for wow effect

  return (
    <section id="home" className="relative h-screen flex items-center pt-10 overflow-hidden" ref={containerRef}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/hero-bg.jpg" 
          alt="Delicious food spread" 
          fill
          className="object-cover"
          priority 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent transition-colors duration-1000" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background via-background/50 to-transparent transition-colors duration-1000" />
      </div>

      <div className="container-custom relative z-10 w-full">
        <AnimatePresence mode="wait">
          <div className="grid lg:grid-cols-2 gap-12 items-center px-4 md:px-8 pt-12 md:pt-20 pb-0">
            {/* Content */}
            <motion.div
              key={theme} // Re-animate on theme change
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6 md:space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20"
              >
                <Star className="h-4 w-4 fill-primary" />
                <span>Rated #1 in the city</span>
              </motion.div>

              {/* Heading */}
              <h1 
                ref={headingRef}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-foreground transition-colors duration-300"
              >
                Fresh & Delicious Food Awaits
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg transition-colors duration-300">
                Experience the finest culinary delights delivered right to your doorstep. Fresh ingredients, crafted with
                love.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="btn-primary-gradient px-8 py-6 text-base group rounded-full border-none"
                  onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Order Now
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => setIsBookingModalOpen(true)}
                  className="px-8 py-6 text-base rounded-full border-border text-foreground hover:bg-muted transition-all duration-300"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Table
                </Button>
              </div>

              <BookingModal 
                isOpen={isBookingModalOpen} 
                onClose={() => setIsBookingModalOpen(false)} 
              />


              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <div className="flex items-center gap-3 bg-card/50 dark:bg-muted/50 backdrop-blur-sm px-5 py-3 rounded-2xl border border-border/50 hover:border-primary/30 transition-colors duration-300 group/stat">
                  <div className="p-2 bg-primary/10 rounded-xl group-hover/stat:bg-primary/20 transition-colors duration-300">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-foreground/90">30 min delivery</span>
                </div>
                <div className="flex items-center gap-3 bg-card/50 dark:bg-muted/50 backdrop-blur-sm px-5 py-3 rounded-2xl border border-border/50 hover:border-primary/30 transition-colors duration-300 group/stat">
                  <div className="p-2 bg-primary/10 rounded-xl group-hover/stat:bg-primary/20 transition-colors duration-300">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-foreground/90">Free delivery over ৳500</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right side - Food Image */}
            <motion.div
              key={heroImage}
              initial={{ opacity: 0, scale: 0.8, x: 50, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 50, rotate: 5 }}
              transition={{ 
                duration: 0.8, 
                ease: "circOut",
                layout: { duration: 0.3 }
              }}
              className="relative hidden lg:flex items-center justify-center p-4"
            >
              <div className="relative w-full aspect-square max-w-[500px]">
                {/* Decorative background glow */}
                <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full animate-pulse" />
                
                <Image
                  src={heroImage}
                  alt="Special Food Item"
                  width={600}
                  height={600}
                  className="object-contain relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:scale-105 transition-transform duration-500"
                  priority
                />

                {/* Floating Elements */}
                {/* Review Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0, 
                    y: [0, -10, 0],
                  }}
                  transition={{ 
                    delay: 1,
                    y: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                  className="absolute -left-12 top-10 z-20 bg-background/80 dark:bg-muted/80 backdrop-blur-md p-3 rounded-2xl border border-border shadow-xl flex items-center gap-3 min-w-[180px]"
                >
                  <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-primary/20">
                    <Image
                      src="/customer_avatar.png"
                      alt="Customer"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">Alex Johnson</p>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-2.5 w-2.5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-[10px] text-muted-foreground font-medium mt-0.5">&quot;Best food in town!&quot;</p>
                  </div>
                </motion.div>

                {/* Hungry Face Emoji */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, 15, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    delay: 1.2,
                    y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="absolute -right-4 top-20 z-20 bg-background/80 dark:bg-muted/80 backdrop-blur-md w-12 h-12 rounded-full border border-border shadow-lg flex items-center justify-center text-2xl"
                >
                  😋
                </motion.div>

                {/* Smiley Face Emoji */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -15, 0],
                    rotate: [0, -5, 0]
                  }}
                  transition={{ 
                    delay: 1.4,
                    y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="absolute left-10 bottom-10 z-20 bg-background/80 dark:bg-muted/80 backdrop-blur-md w-14 h-14 rounded-full border border-border shadow-lg flex items-center justify-center text-3xl"
                >
                  😊
                </motion.div>
              </div>
            </motion.div>
          </div>
        </AnimatePresence>
      </div>
    </section>
  );
}

