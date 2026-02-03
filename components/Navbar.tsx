"use client";

import Link from "next/link";
import { ShoppingBag, Phone, MapPin } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800">
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
            <Link href="/" className="text-zinc-300 hover:text-primary transition-colors font-medium">Home</Link>
            <Link href="/menu" className="text-zinc-300 hover:text-primary transition-colors font-medium">Menu</Link>
            <Link href="/about" className="text-zinc-300 hover:text-primary transition-colors font-medium">About</Link>
            <Link href="/contact" className="text-zinc-300 hover:text-primary transition-colors font-medium">Contact</Link>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-6">
            <button className="hidden lg:flex items-center bg-primary text-white px-5 py-2.5 rounded-full font-medium hover:opacity-90 transition-all shadow-lg shadow-primary/20">
              <MapPin className="w-4 h-4 mr-2" />
              Track Order
            </button>
            <div className="hidden sm:flex items-center text-zinc-300">
              <Phone className="w-5 h-5 mr-2 text-primary" />
              <span className="font-medium font-mono text-sm">(123) 456-7890</span>
            </div>
            <button className="p-2 text-zinc-300 hover:bg-zinc-900 rounded-full transition-all relative">
              <ShoppingBag className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
