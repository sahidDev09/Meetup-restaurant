"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={theme}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "circOut" }}
        >
          <Hero />
          
          {/* Spacer for other sections */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              {/* Add more sections here */}
            </div>
          </section>
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
