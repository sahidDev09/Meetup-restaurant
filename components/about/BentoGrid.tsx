"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageSquare, Utensils } from "lucide-react";

const BentoGrid = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 h-full md:h-[800px]"
    >
      {/* Our Story - Large Card */}
      <motion.div
        variants={item}
        className="md:col-span-2 md:row-span-2 bg-muted rounded-3xl p-8 flex flex-col justify-between overflow-hidden relative group"
      >
        <div className="z-10">
          <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 inline-block">
            Our Story
          </span>
          <h3 className="text-3xl font-bold mb-4">Crafting Culinary Memories Since 2010</h3>
          <p className="text-muted-foreground leading-relaxed">
            Meetup Restaurant began with a simple dream: to create a space where food brings people together. Our journey started in a small kitchen with big ideas, focusing on fresh ingredients and bold flavors. Today, we are proud to be a local favorite, serving thousands of happy guests every month.
          </p>
        </div>
        <div className="mt-8 flex items-center space-x-6 z-10">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-primary">15+</span>
            <span className="text-xs text-muted-foreground">Years Experience</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-primary">50k+</span>
            <span className="text-xs text-muted-foreground">Happy Clients</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-primary">25+</span>
            <span className="text-xs text-muted-foreground">Award Winning Chefs</span>
          </div>
        </div>
        {/* Decorative element */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors"></div>
      </motion.div>

      {/* Chef Card */}
      <motion.div
        variants={item}
        className="md:col-span-2 md:row-span-1 bg-card border border-border rounded-3xl p-6 flex items-center space-x-6 hover:shadow-xl transition-all duration-300"
      >
        <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 relative">
           <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent z-10"></div>
           <div className="w-full h-full bg-muted flex items-center justify-center text-4xl">👨‍🍳</div>
        </div>
        <div>
          <h4 className="text-xl font-bold">Chef Marco Rossi</h4>
          <p className="text-sm text-primary font-medium mb-1">Executive Head Chef</p>
          <p className="text-sm text-muted-foreground italic">&quot;Cooking is like love. It should be entered into with abandon or not at all.&quot;</p>
        </div>
      </motion.div>

      {/* Contact Us Card - Bento Style */}
      <motion.div
        variants={item}
        className="md:col-span-1 md:row-span-2 bg-primary text-white rounded-3xl p-8 flex flex-col justify-between"
      >
        <div>
          <h3 className="text-2xl font-bold mb-6">Contact Us</h3>
          <div className="space-y-6">
            <div className="flex items-start">
              <MapPin className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
              <p className="text-sm opacity-90">123 Culinary Ave, Foodie District, NY 10001</p>
            </div>
            <div className="flex items-start">
              <Phone className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
              <p className="text-sm opacity-90">+1 (555) 123-4567</p>
            </div>
            <div className="flex items-start">
              <Mail className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
              <p className="text-sm opacity-90">hello@meetuprestaurant.com</p>
            </div>
          </div>
        </div>
        <button className="w-full bg-white text-primary font-bold py-3 rounded-2xl hover:bg-opacity-90 transition-all mt-8">
          Visit Us Now
        </button>
      </motion.div>

      {/* Opening Hours */}
      <motion.div
        variants={item}
        className="md:col-span-1 md:row-span-2 bg-card border border-border rounded-3xl p-6 flex flex-col"
      >
        <div className="flex items-center mb-4 text-primary">
          <Clock className="w-5 h-5 mr-2" />
          <h4 className="font-bold">Opening Hours</h4>
        </div>
        <div className="space-y-3 flex-grow">
          {[
            { day: "Mon - Fri", time: "11:00 AM - 10:00 PM" },
            { day: "Saturday", time: "10:00 AM - 11:00 PM" },
            { day: "Sunday", time: "10:00 AM - 09:00 PM" },
          ].map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-sm border-b border-border pb-2 last:border-0">
              <span className="font-medium">{item.day}</span>
              <span className="text-muted-foreground">{item.time}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-muted rounded-xl text-center">
          <p className="text-xs text-muted-foreground">Reservations recommended for weekends</p>
        </div>
      </motion.div>

      {/* Philosophy Card - Small */}
      <motion.div
        variants={item}
        className="md:col-span-1 md:row-span-1 bg-gradient-to-br from-orange-500 to-primary text-white rounded-3xl p-6 flex flex-col justify-center overflow-hidden relative group cursor-pointer"
      >
        <div className="z-10">
          <h4 className="text-xl font-bold mb-2">Our Philosophy</h4>
          <p className="text-xs opacity-90 leading-relaxed line-clamp-2">
            Sustainability and local sourcing are at our heart.
          </p>
        </div>
        <Utensils className="absolute -bottom-4 -right-4 w-20 h-20 opacity-10 rotate-12 group-hover:rotate-0 transition-transform" />
      </motion.div>

      {/* FAQ Quick Link Card */}
      <motion.div
        variants={item}
        className="md:col-span-1 md:row-span-1 bg-muted border border-border rounded-3xl p-6 flex flex-col justify-center hover:bg-background transition-colors cursor-pointer group"
        onClick={() => document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <div className="flex items-center space-x-3">
          <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold">Got Questions?</h4>
            <p className="text-xs text-muted-foreground">Check our FAQs</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BentoGrid;
