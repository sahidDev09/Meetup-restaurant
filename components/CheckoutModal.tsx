"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ClipboardIcon } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export default function CheckoutModal() {
  const { isCheckoutOpen, setIsCheckoutOpen, clearCart, totalPrice, orderId, cart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Calculate tax and total (60 is delivery fee)
      const subtotal = totalPrice;
      const tax = 0;
      const total = subtotal + tax + 60;

      // Insert order into 'orders' table (OTP will be generated when status changes to out_for_delivery)
      const { error: orderError } = await supabase
        .from('orders')
        .insert({
          order_number: orderId,
          customer_name: formData.name,
          customer_phone: formData.phone,
          customer_address: formData.address,
          items: cart,
          subtotal: subtotal,
          tax: tax,
          total: total,
          payment_method: 'Cash on Delivery',
          status: 'pending',
          delivery_otp: null,
          otp_verified: false
        });

      if (orderError) throw orderError;

      setIsSuccess(true);
      clearCart();
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("There was an error placing your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsCheckoutOpen(false);
    // Use timeout to let the exit animation finish before state resets
    setTimeout(() => {
       if (isSuccess) {
        setIsSuccess(false);
        setFormData({ name: "", phone: "", address: "" });
      }
    }, 300);
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="checkout-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[200]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-[201] p-4 pointer-events-none">
            <motion.div
              key="checkout-modal"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-background border border-border w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden pointer-events-auto"
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-3xl font-black font-display tracking-tight">Checkout</h2>
                    <p className="text-muted-foreground mt-1">Complete your order details</p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="p-3 hover:bg-muted rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {!isSuccess ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Order ID Display */}
                    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <ClipboardIcon className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-[10px] uppercase tracking-widest font-black text-primary/60">Order ID</p>
                          <p className="font-mono font-bold text-primary">{orderId}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-widest font-black text-muted-foreground">Total Amount</p>
                        <p className="text-xl font-black">৳{totalPrice + 60}</p>
                      </div>
                    </div>

                    <div className="grid gap-5">
                      <div className="space-y-2">
                        <label className="text-sm font-black uppercase tracking-wider text-muted-foreground ml-1">Full Name</label>
                        <input
                          required
                          type="text"
                          placeholder="Ex: Sahid Ahmed"
                          className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-black uppercase tracking-wider text-muted-foreground ml-1">Phone Number</label>
                        <input
                          required
                          type="tel"
                          placeholder="Ex: 017XXXXXXXX"
                          className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-black uppercase tracking-wider text-muted-foreground ml-1">Delivery Address</label>
                        <textarea
                          required
                          placeholder="House, Street, Area..."
                          rows={3}
                          className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        />
                      </div>
                    </div>

                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      className="w-full bg-primary hover:opacity-90 text-white py-8 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 transition-all active:scale-[0.98] mt-4"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing...
                        </div>
                      ) : (
                        "Confirm Order"
                      )}
                    </Button>
                  </form>
                ) : (
                  <motion.div
                    key="success-state"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 flex flex-col items-center text-center space-y-6"
                  >
                    <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-12 h-12 text-green-500" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black mb-2">Order Confirmed!</h3>
                      <p className="text-muted-foreground">
                        Thank you for your order, <span className="font-bold text-foreground">{formData.name}</span>. 
                        Your delicious food will be there shortly!
                      </p>
                    </div>
                    <div className="bg-muted p-4 rounded-2xl w-full max-w-sm">
                      <p className="text-sm text-muted-foreground">Order Tracking ID</p>
                      <p className="text-xl font-mono font-bold text-primary">{orderId}</p>
                    </div>
                    <div className="flex flex-col gap-3 w-full max-w-sm">
                      <Button
                        onClick={() => {
                          closeModal();
                          window.location.href = `/track?id=${orderId}`;
                        }}
                        className="bg-primary hover:opacity-90 rounded-2xl py-6 text-lg font-bold w-full"
                      >
                        Track Your Order
                      </Button>
                      <Button
                        variant="outline"
                        onClick={closeModal}
                        className="rounded-2xl py-6 text-lg font-bold w-full border-border"
                      >
                        Browse More Food
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
