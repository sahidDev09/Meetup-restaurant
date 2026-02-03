"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, MapPin, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const { theme } = useTheme();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden" ref={containerRef}>
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
      </div>

      <div className="container-custom relative z-10 w-full">
        <AnimatePresence mode="wait">
          <div className="grid lg:grid-cols-2 gap-12 items-center px-4 md:px-8 py-12 md:py-20">
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
                  className="px-8 py-6 text-base rounded-full border-border text-foreground hover:bg-muted transition-all duration-300"
                >
                  View Menu
                </Button>
              </div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-6 pt-4"
              >
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="text-sm">30 min delivery</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-sm">Free delivery over ৳500</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right side - empty for background image visibility */}
            <div className="hidden lg:block" />
          </div>
        </AnimatePresence>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center"
        >
          <motion.div className="w-1.5 h-3 bg-primary rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>
  );
}

