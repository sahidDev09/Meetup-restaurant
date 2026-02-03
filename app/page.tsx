"use client";

import Navbar from "@/components/Navbar";
import { Hero, Features } from "@/components/landing";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { useSyncExternalStore } from "react";

export default function Home() {
  const { theme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

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
          
          <Features />
          
          {/* Spacer for other sections */}
          <section id="menu" className="py-20">
            <div className="container-custom">
              {/* Add more sections here */}
            </div>
          </section>
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
