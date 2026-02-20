"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import * as React from "react";
import { cn } from "@/lib/utils";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { resolvedTheme } = useTheme();
  const isClient = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  return (
    <footer className="bg-card border-t border-border pt-20 pb-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
              <Image 
                src="/assests/meetu-plogo.png" 
                alt="navlogo" 
                width={100} 
                height={100}
                className={cn("transition-all duration-300", isClient && resolvedTheme === "dark" && "invert")}
              />
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Experience the finest culinary delights at Meetup. We bring together fresh ingredients, expert chefs, and a warm atmosphere to create unforgettable dining moments.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full bg-muted hover:bg-primary hover:text-white transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-2 rounded-full bg-muted hover:bg-primary hover:text-white transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 rounded-full bg-muted hover:bg-primary hover:text-white transition-all">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-foreground">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <Link href="#home" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link href="#menu" className="text-muted-foreground hover:text-primary transition-colors">Our Menu</Link>
              </li>
              <li>
                <Link href="#about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/book-table" className="text-muted-foreground hover:text-primary transition-colors">Book a Table</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-foreground">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin size={20} className="text-primary mt-1 flex-shrink-0" />
                <span>123 Culinary Ave, Food City, FC 56789</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone size={20} className="text-primary flex-shrink-0" />
                <span>+1 (234) 567-890</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail size={20} className="text-primary flex-shrink-0" />
                <span>hello@meetup-restaurant.com</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-foreground">Opening Hours</h4>
            <ul className="space-y-4">
              <li className="flex justify-between text-muted-foreground">
                <span>Mon - Thu:</span>
                <span>11:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between text-muted-foreground">
                <span>Fri - Sat:</span>
                <span>11:00 AM - 11:00 PM</span>
              </li>
              <li className="flex justify-between text-muted-foreground">
                <span>Sunday:</span>
                <span>10:00 AM - 9:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} Meetup Restaurant. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
