"use client";

import { motion } from "framer-motion";
import { Truck, Clock, Award, Headset } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Get your food delivered hot and fresh within 30 minutes",
    gradient: "from-orange-500/10 to-rose-500/10",
    border: "border-orange-500/20",
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-500",
    glow: "group-hover:shadow-orange-500/20"
  },
  {
    icon: Clock,
    title: "Open 7 Days",
    description: "We are open every day from 10 AM to 11 PM",
    gradient: "from-emerald-500/10 to-teal-500/10",
    border: "border-emerald-500/20",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
    glow: "group-hover:shadow-emerald-500/20"
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Only the freshest ingredients make it to your plate",
    gradient: "from-amber-500/10 to-yellow-500/10",
    border: "border-amber-500/20",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-500",
    glow: "group-hover:shadow-amber-500/20"
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description: "Our support team is always here to help you",
    gradient: "from-blue-500/10 to-indigo-500/10",
    border: "border-blue-500/20",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
    glow: "group-hover:shadow-blue-500/20"
  },
];

export default function Features() {
  return (
    <section className="relative py-4 md:py- overflow-hidden bg-background">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="container-custom relative px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 font-display tracking-tight"
          >
            Why Choose Our <span className="text-primary">Restaurant</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            Experience the finest dining with our exceptional services and commitment to quality.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.7, 
                ease: [0.21, 0.47, 0.32, 0.98] 
              }}
              whileHover={{ y: -10 }}
              className={`group relative p-10 rounded-[2.5rem] bg-gradient-to-br ${feature.gradient} border ${feature.border} backdrop-blur-xl dark:bg-muted/40 transition-all duration-500 hover:shadow-2xl ${feature.glow}`}
            >
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className={`w-20 h-20 ${feature.iconBg} rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-inner`}>
                  <feature.icon className={`w-10 h-10 ${feature.iconColor}`} strokeWidth={1.5} />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-foreground font-display tracking-tight group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed max-w-[210px]">
                  {feature.description}
                </p>
              </div>

              {/* Decorative accent */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
