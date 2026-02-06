"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar as CalendarIcon, Clock, Users, Utensils, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialRequest: "",
  });

  const timeSlots = [
    "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
    "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM",
    "08:30 PM", "09:00 PM", "09:30 PM", "10:00 PM"
  ];

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const [isSubmitted, setIsSubmitted] = useState(false);

  // ... (previous useEffect remains)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('bookings')
        .insert({
          customer_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          guests: guests,
          booking_date: date.toISOString().split('T')[0],
          booking_time: time,
          special_request: formData.specialRequest,
        });

      if (error) throw error;

      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        // Reset form
        setStep(1);
        setFormData({ name: "", email: "", phone: "", specialRequest: "" });
      }, 3000);
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("There was an error making your reservation. Please try again.");
    }
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 mt-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-card border border-border rounded-3xl overflow-hidden shadow-2xl min-h-[500px]"
          >
            {/* Close Button */}
            {!isSubmitted && (
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-300 z-10"
              >
                <X className="h-5 w-5" />
              </button>
            )}

            <div className="flex flex-col md:flex-row h-full max-h-[90vh] overflow-y-auto md:overflow-hidden">
              {/* Left Sidebar - Info */}
              <div className="md:w-1/3 bg-primary p-8 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="relative z-10">
                  <Utensils className="h-10 w-10 mb-6 opacity-80" />
                  <h2 className="text-2xl font-bold mb-2">Book a Table</h2>
                  <p className="text-white/80 text-sm">Join us for an unforgettable culinary experience.</p>
                </div>

                <div className="mt-8 space-y-4 relative z-10">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                      <CalendarIcon className="h-4 w-4" />
                    </div>
                    <span>Instant confirmation</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                      <Clock className="h-4 w-4" />
                    </div>
                    <span>Flexible timing</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                      <Users className="h-4 w-4" />
                    </div>
                    <span>Group bookings</span>
                  </div>
                </div>

                {/* Decorative background circle */}
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
              </div>

              {/* Right Side - Form */}
              <div className="md:w-2/3 p-8 md:p-10 bg-card overflow-y-auto flex items-center justify-center min-h-[400px]">
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center space-y-4 py-10"
                    >
                      <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <motion.div
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">Table Reserved!</h3>
                      <p className="text-muted-foreground">
                        We&apos;ve sent the confirmation details to your email. See you soon at Meetup Restaurant!
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="w-full"
                    >
                      <form onSubmit={handleSubmit} className="space-y-8">
                        {step === 1 && (
                          <div className="space-y-8">
                            <div className="space-y-4">
                              <label className="text-xs font-bold uppercase tracking-widest text-primary block">Step 01. Reservation Details</label>
                              
                              <div className="grid gap-6">
                                <div>
                                  <label className="text-sm font-semibold mb-2 block text-foreground/70">Pick a Date</label>
                                  <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-primary/10 rounded-lg text-primary transition-colors group-focus-within:bg-primary group-focus-within:text-white">
                                      <CalendarIcon className="h-4 w-4" />
                                    </div>
                                    <input 
                                      type="date" 
                                      className="w-full bg-muted border-none rounded-2xl pl-14 pr-4 py-4 text-foreground font-medium focus:ring-2 focus:ring-primary/40 transition-all cursor-pointer appearance-none"
                                      value={date.toISOString().split('T')[0]}
                                      onChange={(e) => setDate(new Date(e.target.value))}
                                      min={new Date().toISOString().split('T')[0]}
                                    />
                                  </div>
                                </div>

                                <div>
                                  <label className="text-sm font-semibold mb-3 block text-foreground/70">Preferred Time</label>
                                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                    {timeSlots.map((t) => (
                                      <button
                                        key={t}
                                        type="button"
                                        onClick={() => setTime(t)}
                                        className={`py-3 px-1 text-xs font-bold rounded-xl border-2 transition-all duration-300 ${
                                          time === t
                                            ? "bg-primary border-primary text-white shadow-lg shadow-primary/30 scale-[1.02]"
                                            : "bg-muted border-transparent text-muted-foreground hover:border-primary/30 hover:text-foreground"
                                        }`}
                                      >
                                        {t}
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <label className="text-sm font-semibold mb-3 block text-foreground/70">Number of Guests</label>
                                  <div className="flex items-center justify-between bg-muted p-2 rounded-2xl w-full sm:w-48">
                                    <button
                                      type="button"
                                      onClick={() => setGuests(Math.max(1, guests - 1))}
                                      className="w-12 h-12 rounded-xl bg-background shadow-sm hover:bg-primary hover:text-white flex items-center justify-center transition-all active:scale-95"
                                    >
                                      <ChevronLeft className="h-5 w-5" />
                                    </button>
                                    <span className="text-xl font-bold text-foreground mx-4">{guests}</span>
                                    <button
                                      type="button"
                                      onClick={() => setGuests(Math.min(20, guests + 1))}
                                      className="w-12 h-12 rounded-xl bg-background shadow-sm hover:bg-primary hover:text-white flex items-center justify-center transition-all active:scale-95"
                                    >
                                      <ChevronRight className="h-5 w-5" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <Button
                              type="button"
                              disabled={!time}
                              onClick={nextStep}
                              className="w-full btn-primary-gradient rounded-2xl py-7 text-lg font-bold border-none shadow-xl shadow-primary/20 hover:shadow-primary/40 active:scale-[0.98] transition-all"
                            >
                              Continue Booking
                            </Button>
                          </div>
                        )}

                        {step === 2 && (
                          <div className="space-y-8">
                            <div className="space-y-4">
                              <label className="text-xs font-bold uppercase tracking-widest text-primary block">Step 02. Personal Information</label>
                              
                              <div className="p-6 bg-primary/5 rounded-[2rem] border-2 border-primary/10 flex flex-wrap gap-y-4">
                                <div className="w-full flex items-center justify-between pb-4 border-b border-primary/10">
                                  <span className="text-xs font-bold text-primary uppercase tracking-tighter">Your Selection</span>
                                  <div className="flex gap-2">
                                     <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                     <div className="w-2 h-2 rounded-full bg-primary/30" />
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 w-full gap-4 pt-2">
                                   <div className="space-y-1">
                                      <p className="text-[10px] text-muted-foreground font-bold uppercase">Date</p>
                                      <p className="text-sm font-bold text-foreground">{date.toLocaleDateString()}</p>
                                   </div>
                                   <div className="space-y-1">
                                      <p className="text-[10px] text-muted-foreground font-bold uppercase">Time</p>
                                      <p className="text-sm font-bold text-foreground">{time}</p>
                                   </div>
                                   <div className="space-y-1">
                                      <p className="text-[10px] text-muted-foreground font-bold uppercase">People</p>
                                      <p className="text-sm font-bold text-foreground">{guests} Pax</p>
                                   </div>
                                </div>
                              </div>

                              <div className="grid gap-4">
                                <div>
                                  <label className="text-sm font-semibold mb-2 block text-foreground/70">Full Name</label>
                                  <input
                                    type="text"
                                    required
                                    placeholder="e.g. Michael Jordan"
                                    className="w-full bg-muted border-none rounded-2xl px-6 py-4 text-foreground font-medium focus:ring-2 focus:ring-primary/40 transition-all"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                  />
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-semibold mb-2 block text-foreground/70">Email Address</label>
                                    <input
                                      type="email"
                                      required
                                      placeholder="michael@example.com"
                                      className="w-full bg-muted border-none rounded-2xl px-6 py-4 text-foreground font-medium focus:ring-2 focus:ring-primary/40 transition-all"
                                      value={formData.email}
                                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                  </div>
                                  <div>
                                    <label className="text-sm font-semibold mb-2 block text-foreground/70">Phone Number</label>
                                    <input
                                      type="tel"
                                      required
                                      placeholder="+880 1XXX-XXXXXX"
                                      className="w-full bg-muted border-none rounded-2xl px-6 py-4 text-foreground font-medium focus:ring-2 focus:ring-primary/40 transition-all"
                                      value={formData.phone}
                                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={prevStep}
                                className="flex-1 rounded-2xl py-7 bg-transparent border-2 border-muted hover:border-primary/50 text-foreground font-bold transition-all"
                              >
                                Modify
                              </Button>
                              <Button
                                type="submit"
                                className="flex-[2] btn-primary-gradient rounded-2xl py-7 text-lg font-bold border-none shadow-xl shadow-primary/20 hover:shadow-primary/40 active:scale-[0.98] transition-all"
                              >
                                Confirm Booking
                              </Button>
                            </div>
                          </div>
                        )}
                      </form>
                    </motion.div>

                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}


