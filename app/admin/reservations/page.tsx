"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock, Users, Phone, Mail, MessageSquare, CheckCircle2, XCircle, Search } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

interface Booking {
  id: string;
  customer_name: string;
  email: string;
  phone: string;
  guests: number;
  booking_date: string;
  booking_time: string;
  special_request: string;
  status: string;
  created_at: string;
}

export default function ReservationsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('booking_date', { ascending: false })
        .order('booking_time', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredBookings = bookings.filter(b => 
    b.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.phone.includes(searchTerm) ||
    b.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 font-outfit pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-foreground">Reservations</h1>
          <p className="text-muted-foreground mt-1">Manage and view all table reservations.</p>
        </div>

        <div className="relative w-full md:w-80 group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search by name, phone..."
            className="w-full bg-card border border-border rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 rounded-3xl bg-card border border-border animate-pulse" />
          ))}
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="p-12 bg-card rounded-[32px] border border-border shadow-sm flex flex-col items-center justify-center text-center min-h-[400px]">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-4">
            <Calendar size={32} />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">No Reservations Found</h3>
          <p className="text-muted-foreground max-w-sm">
            {searchTerm ? "Try searching for something else." : "Any table reservations made by customers will appear here."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredBookings.map((booking) => (
              <motion.div
                layout
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-card border border-border rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all group overflow-hidden relative"
              >
                {/* Status Badge */}
                <div className={`absolute top-6 right-6 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  booking.status === 'confirmed' ? 'bg-green-500/10 text-green-500' : 
                  booking.status === 'cancelled' ? 'bg-red-500/10 text-red-500' : 
                  'bg-orange-500/10 text-orange-500'
                }`}>
                  {booking.status}
                </div>

                <div className="space-y-6">
                  {/* Header Info */}
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1 pr-16">{booking.customer_name}</h3>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-primary" />
                        {new Date(booking.booking_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} className="text-primary" />
                        {booking.booking_time}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users size={14} className="text-primary" />
                        {booking.guests} Pax
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-3 pt-4 border-t border-border">
                    <div className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                      <Phone size={16} className="text-muted-foreground" />
                      {booking.phone}
                    </div>
                    <div className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                      <Mail size={16} className="text-muted-foreground" />
                      {booking.email}
                    </div>
                  </div>

                  {/* Special Request */}
                  {booking.special_request && (
                    <div className="p-4 bg-muted/50 rounded-2xl flex gap-3 items-start">
                      <MessageSquare size={16} className="text-primary shrink-0 mt-0.5" />
                      <p className="text-xs text-muted-foreground italic">&ldquo;{booking.special_request}&rdquo;</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
                    {booking.status !== 'confirmed' && (
                      <button
                        onClick={() => updateStatus(booking.id, 'confirmed')}
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-500/10 hover:bg-green-500 text-green-600 hover:text-white rounded-xl text-xs font-bold transition-all"
                      >
                        <CheckCircle2 size={14} />
                        Confirm
                      </button>
                    )}
                    {booking.status !== 'cancelled' && (
                      <button
                        onClick={() => updateStatus(booking.id, 'cancelled')}
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-500/10 hover:bg-red-500 text-red-600 hover:text-white rounded-xl text-xs font-bold transition-all"
                      >
                        <XCircle size={14} />
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
