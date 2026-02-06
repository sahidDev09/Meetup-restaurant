"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BentoGrid from "@/components/about/BentoGrid";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { useSyncExternalStore } from "react";
import FAQSection from "@/components/about/FAQSection";

export default function AboutPage() {
  const { theme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted) return null;

  return (
    <div className="min-h-screen overflow-x-hidden mb-5">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={theme}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "circOut" }}
          className="pt-28 pb-20"
        >
          <div className="container-custom mb-5">
            <div className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
                About Meetup Restaurant
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                A fusion of passion, flavor, and community. Discover the story behind your favorite dining destination.
              </p>
            </div>

            {/* Bento Grid Section */} 
            <BentoGrid />

            {/* FAQ Section */}
            <div className="mt-24">
              <FAQSection />
            </div>
          </div>
          <Footer />
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
