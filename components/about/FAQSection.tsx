"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, MessageSquare } from "lucide-react";

const faqs = [
  {
    question: "Do I need to make a reservation?",
    answer: "While we do accept walk-ins, we highly recommend making a reservation, especially on weekends and for large groups, to ensure you have a table waiting for you.",
  },
  {
    question: "What kind of cuisine do you serve?",
    answer: "We offer a modern fusion of seasonal ingredients, focusing on bold international flavors with a local twist. Our menu changes periodically to reflect the freshest ingredients available.",
  },
  {
    question: "Do you offer vegetarian or vegan options?",
    answer: "Absolutely! We pride ourselves on having a diverse menu that caters to various dietary needs. Many of our dishes can also be customized upon request.",
  },
  {
    question: "Is there parking available?",
    answer: "Yes, we have a dedicated parking area for our guests. There is also ample street parking nearby for busier periods.",
  },
  {
    question: "Do you host private events?",
    answer: "Yes, we have a private dining room perfect for corporate meetups, birthdays, and celebrations. Please contact our events team for more details.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div id="faq-section" className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-muted-foreground">Everything you need to know about dining with us.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-border rounded-2xl overflow-hidden bg-card transition-all duration-300 hover:shadow-md"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full text-left px-6 py-5 flex justify-between items-center transition-colors hover:bg-muted/50"
            >
              <span className="font-semibold text-lg">{faq.question}</span>
              <div className="flex-shrink-0 ml-4">
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-primary" />
                ) : (
                  <Plus className="w-5 h-5 text-primary" />
                )}
              </div>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center p-8 bg-muted rounded-3xl">
        <div className="flex justify-center mb-4">
          <div className="bg-primary/20 p-3 rounded-full">
            <MessageSquare className="w-6 h-6 text-primary" />
          </div>
        </div>
        <h4 className="text-xl font-bold mb-2">Still have questions?</h4>
        <p className="text-muted-foreground mb-6">
          Can&apos;t find the answer you&apos;re looking for? Please chat to our friendly team.
        </p>
        <button className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default FAQSection;
