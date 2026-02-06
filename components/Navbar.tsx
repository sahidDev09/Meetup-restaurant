"use client";

import Link from "next/link";
import { ShoppingBag, MapPin } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md transition-colors duration-300">
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              Meetup
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-foreground/80 hover:text-primary transition-colors font-medium">Home</Link>
            <Link href="/menu" className="text-foreground/80 hover:text-primary transition-colors font-medium">Menu</Link>
            <Link href="/about" className="text-foreground/80 hover:text-primary transition-colors font-medium">About</Link>
            
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button className="hidden lg:flex items-center bg-primary text-white px-5 py-2.5 rounded-full font-medium hover:opacity-90 transition-all shadow-lg shadow-primary/20">
              <MapPin className="w-4 h-4 mr-2" />
              Track Order
            </button>
           
            <button className="p-2.5 text-foreground/80 hover:bg-muted rounded-full transition-all relative">
              <ShoppingBag className="w-6 h-6" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
