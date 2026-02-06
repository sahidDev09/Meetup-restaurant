"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MenuContent from "@/components/menu/MenuContent";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import React, { useSyncExternalStore } from "react";

export default function MenuPage() {
  const { theme } = useTheme();
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen overflow-x-hidden pt-20">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={theme}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <MenuContent />
          <Footer />
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
