"use client";

import { Sidebar } from "@/components/admin/Sidebar";
import { Header } from "@/components/admin/Header";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <div className="h-screen bg-background transition-colors duration-300 overflow-hidden">
        <div className="w-64 h-screen bg-card border-r border-border fixed left-0 top-0 z-50 transition-colors duration-300" />
        <div className="pl-64 h-screen flex flex-col">
          <header className="h-20 bg-card border-b border-border transition-colors duration-300 flex-shrink-0" />
          <main className="p-8 flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background transition-colors duration-300 overflow-hidden">
      <Sidebar />
      <div className="pl-64 flex flex-col h-screen">
        <Header />
        <AnimatePresence mode="wait">
          <motion.main
            key={theme}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="p-8 flex-1 overflow-auto"
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  );
}
