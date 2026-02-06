"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, MapPin } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md transition-colors duration-300">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Occupies left space */}
          <div className="flex-1 flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              Meetup
            </Link>
          </div>

          {/* Navigation Links - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1 space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative text-foreground/80 hover:text-primary transition-colors font-medium py-2 px-1",
                    isActive && "text-primary"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side actions - Occupies right space */}
          <div className="flex-1 flex items-center justify-end space-x-4">
            <ThemeToggle />
            <button className="hidden lg:flex items-center bg-primary text-white px-5 py-2.5 rounded-full font-medium hover:opacity-90 transition-all shadow-lg shadow-primary/20">
              <MapPin className="w-4 h-4 mr-2" />
              Track Order
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2.5 text-foreground/80 hover:bg-muted rounded-full transition-all relative group"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-1.5 right-1.5 w-5 h-5 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-background"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
