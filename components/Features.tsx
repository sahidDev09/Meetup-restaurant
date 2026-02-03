"use client";

import { motion } from "framer-motion";
import { Truck, Clock, Award, Headset } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Get your food delivered hot and fresh within 30 minutes",
  },
  {
    icon: Clock,
    title: "Open 7 Days",
    description: "We are open every day from 10 AM to 11 PM",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Only the freshest ingredients make it to your plate",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description: "Our support team is always here to help you",
  },
];

export default function Features() {
  return (
    <section className="py-16 md:py-24 bg-muted/30 dark:bg-muted/10 transition-colors duration-300">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.6, 
                ease: [0.21, 0.47, 0.32, 0.98] 
              }}
              whileHover={{ y: -5 }}
              className="bg-card p-10 rounded-[2.5rem] border border-border/50 shadow-[0_8px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.2)] flex flex-col items-center text-center group transition-all duration-300"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                <feature.icon className="w-8 h-8 text-primary" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground font-display tracking-tight">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-[210px]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
