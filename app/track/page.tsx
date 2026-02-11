"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Clock, 
  ChefHat, 
  Package, 
  Truck, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  User,
  ShoppingBag,
  ArrowRight,
  Loader2,
  AlertCircle
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  items: OrderItem[];
  total: number;
  status: string;
  delivery_otp: string | null;
  otp_verified: boolean;
  created_at: string;
}

const statusSteps = [
  { id: "pending", label: "Ordered", description: "Order received", icon: Clock },
  { id: "preparing", label: "Cooking", description: "Chef is preparing", icon: ChefHat },
  { id: "prepared", label: "Ready", description: "Packed & ready", icon: Package },
  { id: "out_for_delivery", label: "On Way", description: "Out for delivery", icon: Truck },
  { id: "delivered", label: "Enjoy", description: "Delivered", icon: CheckCircle2 },
];

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const [orderIdInput, setOrderIdInput] = useState(searchParams.get("id") || "");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrder = useCallback(async (id: string) => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("order_number", id.trim().toUpperCase())
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          setError("Order not found. Please check your tracking ID.");
        } else {
          setError("Something went wrong. Please try again.");
        }
        setOrder(null);
      } else {
        setOrder(data as Order);
      }
    } catch {
      setError("Failed to fetch order details.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      fetchOrder(id);
    }
  }, [searchParams, fetchOrder]);

  useEffect(() => {
    if (!order) return;

    // Realtime subscription for this specific order
    const channel = supabase
      .channel(`order-${order.order_number}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
          filter: `order_number=eq.${order.order_number}`,
        },
        (payload) => {
          setOrder(payload.new as Order);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [order?.order_number, order]);

  const getCurrentStepIndex = () => {
    if (!order) return -1;
    const status = order.status?.toLowerCase() || "pending";
    if (status === "cancelled") return -2;
    return statusSteps.findIndex(step => step.id === status);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderIdInput.trim()) {
      fetchOrder(orderIdInput);
    }
  };

  const currentStepIndex = getCurrentStepIndex();

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black mb-4"
          >
            Track Your <span className="text-primary">Order</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            Enter your order ID to see realtime updates of your meal&apos;s journey.
          </motion.p>
        </div>

        {/* Search Bar */}
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSearch}
          className="relative max-w-2xl mx-auto mb-16"
        >
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Enter Order ID (e.g. ORD-1234)"
              value={orderIdInput}
              onChange={(e) => setOrderIdInput(e.target.value)}
              className="block w-full pl-16 pr-32 py-6 bg-card border-2 border-border rounded-[2rem] text-xl font-bold focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all shadow-xl shadow-black/5"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-3 inset-y-3 px-8 bg-primary text-white rounded-[1.5rem] font-black hover:opacity-90 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Track"}
            </button>
          </div>
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute top-full left-0 right-0 mt-4 flex items-center justify-center gap-2 text-red-500 font-bold"
              >
                <AlertCircle className="w-5 h-5" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>

        {/* Order Details Display */}
        <AnimatePresence mode="wait">
          {order && (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-8"
            >
              {/* Status Stepper */}
              <div className="bg-card border border-border rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8">
                   <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-black">
                     {order.order_number}
                   </div>
                </div>

                {currentStepIndex === -2 ? (
                  <div className="text-center py-10">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
                      <AlertCircle size={40} />
                    </div>
                    <h2 className="text-3xl font-black text-red-500 mb-2">Order Cancelled</h2>
                    <p className="text-muted-foreground">We&apos;re sorry, this order has been cancelled.</p>
                  </div>
                ) : (
                  <div className="relative">
                    {/* Stepper Line */}
                    <div className="hidden md:block absolute top-[28px] left-[40px] right-[40px] h-1 bg-muted rounded-full overflow-hidden">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}
                         className="h-full bg-primary"
                       />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-0 relative">
                      {statusSteps.map((step, index) => {
                        const isCompleted = index <= currentStepIndex;
                        const isCurrent = index === currentStepIndex;
                        
                        return (
                          <div key={step.id} className="flex flex-col items-center text-center group">
                            <div className={cn(
                              "w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 relative z-10",
                              isCompleted ? "bg-primary text-white scale-110 shadow-lg shadow-primary/20" : "bg-muted text-muted-foreground",
                              isCurrent && "ring-4 ring-primary/20 animate-pulse"
                            )}>
                              <step.icon size={24} />
                            </div>
                            <div className="space-y-1">
                              <p className={cn(
                                "font-black text-sm transition-colors",
                                isCompleted ? "text-foreground" : "text-muted-foreground"
                              )}>
                                {step.label}
                              </p>
                              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                                {step.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Order Info Cards */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Delivery Info */}
                <div className="md:col-span-2 space-y-6">
                  <div className="bg-card border border-border rounded-[2rem] p-8 shadow-xl">
                    <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                       <MapPin className="text-primary" /> Delivery Details
                    </h3>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                          <User size={18} className="text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-muted-foreground text-xs uppercase tracking-widest">Customer</p>
                          <p className="text-lg font-black">{order.customer_name}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                          <Phone size={18} className="text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-muted-foreground text-xs uppercase tracking-widest">Phone</p>
                          <p className="text-lg font-black">{order.customer_phone}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                          <MapPin size={18} className="text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-muted-foreground text-xs uppercase tracking-widest">Address</p>
                          <p className="text-lg font-black">{order.customer_address}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* OTP Card (Only if out for delivery) */}
                  {order.status === 'out_for_delivery' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-primary/5 border-2 border-primary/30 rounded-[2rem] p-8 flex items-center justify-between"
                    >
                      <div className="space-y-1">
                        <h3 className="text-lg font-black text-primary">Delivery OTP</h3>
                        <p className="text-sm text-primary/70">Share this with the rider when they arrive</p>
                      </div>
                      <div className="bg-primary px-8 py-4 rounded-2xl flex items-center gap-3 shadow-lg shadow-primary/30">
                        <span className="text-3xl font-black text-white tracking-[0.2em] font-mono">
                          {order.delivery_otp || "----"}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Items Summary */}
                <div className="space-y-6">
                   <div className="bg-card border border-border rounded-[2rem] p-8 shadow-xl h-full">
                    <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                       <ShoppingBag className="text-primary" /> Order Summary
                    </h3>
                    <div className="space-y-4">
                      {order.items?.map((item, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <div className="flex gap-2 items-center">
                            <span className="font-bold text-primary">{item.quantity}x</span>
                            <span className="font-medium">{item.name}</span>
                          </div>
                          <span className="font-bold">৳{item.price * item.quantity}</span>
                        </div>
                      ))}
                      <div className="pt-4 border-t border-border mt-4">
                        <div className="flex justify-between items-center mb-2">
                           <span className="text-sm text-muted-foreground">Original Total</span>
                           <span className="text-sm font-bold">৳{order.total - 60}</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                           <span className="text-sm text-muted-foreground">Delivery Fee</span>
                           <span className="text-sm font-bold">+৳60</span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-lg font-black tracking-tight">Total Payment</span>
                           <span className="text-2xl font-black text-primary">৳{order.total}</span>
                        </div>
                      </div>
                      <div className="pt-6">
                        <div className="bg-muted/50 rounded-xl p-3 text-[10px] text-center text-muted-foreground uppercase tracking-widest font-black">
                           Pay on delivery
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Back to Home Link */}
              <div className="text-center pt-8">
                <button 
                  onClick={() => window.location.href = '/'}
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary font-bold transition-colors"
                >
                  <ArrowRight className="rotate-180 w-4 h-4" /> Keep Browsing
                </button>
              </div>
            </motion.div>
          )}

          {!order && !loading && !error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center mx-auto mb-8 text-muted-foreground/30">
                <ShoppingBag size={64} />
              </div>
              <p className="text-xl font-medium text-muted-foreground">Enter your order ID above to see status</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    }>
      <TrackOrderContent />
    </Suspense>
  );
}
