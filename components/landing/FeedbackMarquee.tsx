"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

const feedbacks = [
  {
    id: 1,
    name: "Alex Thompson",
    role: "Food Enthusiast",
    image: "https://i.pravatar.cc/150?u=alex",
    content: "The best dining experience I've had in years! The steak was cooked to perfection and the ambiance is unmatched.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Local Guide",
    image: "https://i.pravatar.cc/150?u=sarah",
    content: "A hidden gem! Their signature risotto is a must-try. The service was impeccable and very attentive.",
    rating: 5,
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Chef & Critic",
    image: "https://i.pravatar.cc/150?u=michael",
    content: "Incredible attention to detail. Every dish we ordered was a masterpiece of flavors and presentation.",
    rating: 4,
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    role: "Regular Customer",
    image: "https://i.pravatar.cc/150?u=emily",
    content: "I come here every week and they never disappoint. The seasonal menu always has something exciting and delicious.",
    rating: 5,
  },
  {
    id: 5,
    name: "David Wilson",
    role: "Travel Blogger",
    image: "https://i.pravatar.cc/150?u=david",
    content: "If you're in the city, this is the place to be. Great vibes, great food, and even better people.",
    rating: 5,
  },
  {
    id: 6,
    name: "Jessica Taylor",
    role: "Food Blogger",
    image: "https://i.pravatar.cc/150?u=jessica",
    content: "The dessert selection is divine! I'm still dreaming about that chocolate fondant. Highly recommended!",
    rating: 5,
  },
];

const FeedbackCard = ({ feedback }: { feedback: typeof feedbacks[0] }) => (
  <div className="flex-shrink-0 w-[350px] mx-4 p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors group">
    <div className="flex items-center gap-4 mb-4">
      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
        <Image
          src={feedback.image}
          alt={feedback.name}
          fill
          className="object-cover"
        />
      </div>
      <div>
        <h4 className="font-bold text-foreground">{feedback.name}</h4>
        <p className="text-xs text-muted-foreground">{feedback.role}</p>
      </div>
    </div>
    <div className="flex gap-1 mb-3">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className={`${
            i < feedback.rating ? "fill-primary text-primary" : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
    <p className="text-sm text-foreground/80 leading-relaxed italic">
      &ldquo;{feedback.content}&rdquo;
    </p>
  </div>
);

const FeedbackMarquee = () => {
  return (
    <section className="py-14 bg-background overflow-hidden">
      <div className="container-custom mb-16">
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-medium tracking-wider uppercase text-sm mb-3 block"
          >
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            Why They <span className="text-gradient">Love Us</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Don&apos;t just take our word for it. Here&apos;s what our wonderful guests have to say about their experience at our restaurant.
          </motion.p>
        </div>
      </div>

      <div className="relative">
        <div className="space-y-4">
          {/* Row 1: Forward */}
          <div className="flex overflow-hidden group">
            <motion.div
              className="flex py-2"
              animate={{
                x: [0, "-50%"],
              }}
              transition={{
                duration: 50,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...feedbacks, ...feedbacks].map((feedback, index) => (
                <FeedbackCard key={`row1-${index}`} feedback={feedback} />
              ))}
            </motion.div>
          </div>

          {/* Row 2: Reverse */}
          <div className="flex overflow-hidden group">
            <motion.div
              className="flex py-2"
              animate={{
                x: ["-50%", 0],
              }}
              transition={{
                duration: 60,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...feedbacks, ...feedbacks].map((feedback, index) => (
                <FeedbackCard key={`row2-${index}`} feedback={feedback} />
              ))}
            </motion.div>
          </div>
        </div>
        
        {/* Gradient Overlays */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
};

export default FeedbackMarquee;
