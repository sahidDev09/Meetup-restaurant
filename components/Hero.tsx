"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, MapPin, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/hero-bg.jpg" 
          alt="Delicious food spread" 
          fill
          className="object-cover"
          priority 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/40" />
      </div>

      <div className="container-custom relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center px-4 md:px-8 py-12 md:py-20">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white">
              Fresh & Delicious
              <span className="block text-gradient">Food Awaits</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-zinc-400 max-w-lg">
              Experience the finest culinary delights delivered right to your doorstep. Fresh ingredients, crafted with
              love.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="btn-primary-gradient px-8 py-6 text-base group rounded-full"
                onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
              >
                Order Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-6 text-base rounded-full border-zinc-700 text-white hover:bg-zinc-800">
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
              <div className="flex items-center gap-2 text-zinc-400">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-sm">30 min delivery</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-sm">Free delivery over ৳500</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - empty for background image visibility */}
          <div className="hidden lg:block" />
        </div>
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
