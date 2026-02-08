"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Plus, Upload, Image as ImageIcon, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddItemModal({ isOpen, onClose, onSuccess }: AddItemModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    status: "Available",
    image: "",
    description: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('menu_item_image')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('menu_item_image')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      let imageUrl = formData.image;

      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile);
      } else if (!imageUrl) {
         throw new Error("Please select an image or provide a URL");
      }

      const { error } = await supabase
        .from('menu_items')
        .insert({
          name: formData.name,
          category: formData.category,
          price: formData.price,
          status: formData.status,
          image: imageUrl,
          description: formData.description,
        });

      if (error) throw error;

      setIsSuccess(true);
      onSuccess();
      setTimeout(() => {
        closeModal();
      }, 2000);
    } catch (error: unknown) {
      console.error("Error adding menu item:", error);
      const message = error instanceof Error ? error.message : "There was an error adding the item. Please try again.";
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    onClose();
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({
        name: "",
        category: "",
        price: "",
        status: "Available",
        image: "",
        description: "",
      });
      setSelectedFile(null);
      setPreviewUrl(null);
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/40 backdrop-blur-xl z-[200]"
          />

          <div className="fixed inset-0 flex items-center justify-center z-[201] p-4 pointer-events-none overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-background/80 dark:bg-card/80 backdrop-blur-2xl border border-white/20 dark:border-white/5 w-full max-w-4xl rounded-[40px] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.3)] overflow-hidden pointer-events-auto"
            >
              <div className="relative">
                {/* Header Decoration */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                
                <div className="p-8 md:p-10">
                  <div className="flex justify-between items-start mb-10">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="p-2 bg-primary/10 rounded-xl text-primary">
                          <Sparkles size={18} className="animate-pulse" />
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black font-outfit tracking-tight text-foreground">Create Masterpiece</h2>
                      </div>
                      <p className="text-muted-foreground font-outfit text-base">Add a new culinary delight to your premium menu.</p>
                    </div>
                    <button
                      onClick={closeModal}
                      className="p-3 bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground rounded-2xl transition-all active:scale-90"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {!isSuccess ? (
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                      {/* Left Side: Visuals */}
                      <div className="lg:col-span-5 space-y-6">
                        <div className="space-y-3">
                          <label className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground ml-2">Visual Showcase</label>
                          <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="relative aspect-square group cursor-pointer"
                          >
                            <div className={cn(
                              "w-full h-full bg-muted/30 border-2 border-dashed border-border rounded-[32px] flex flex-col items-center justify-center overflow-hidden transition-all duration-500",
                              "group-hover:border-primary/40 group-hover:bg-primary/5 group-hover:shadow-2xl group-hover:shadow-primary/5",
                              previewUrl && "border-solid border-primary/20"
                            )}>
                              {previewUrl ? (
                                <>
                                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-sm">
                                    <div className="flex flex-col items-center gap-2">
                                      <Upload className="text-white w-8 h-8 animate-bounce" />
                                      <span className="text-white font-bold text-sm">Change Image</span>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <div className="flex flex-col items-center gap-4 text-muted-foreground transition-all duration-300 group-hover:text-primary">
                                  <div className="p-5 bg-background rounded-3xl shadow-xl group-hover:scale-110 transition-transform">
                                    <ImageIcon className="w-10 h-10" />
                                  </div>
                                  <div className="text-center px-4">
                                    <span className="block font-black text-sm uppercase tracking-wider mb-1">Upload Photo</span>
                                    <span className="text-[10px] uppercase font-bold text-muted-foreground/60">Drag & Drop or Click</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <input 
                          type="file" 
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept="image/*"
                          className="hidden"
                        />
                        
                        <div className="space-y-4">
                          <div className="flex items-center gap-4 px-2">
                            <div className="h-px flex-1 bg-border/60" />
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">External Link</span>
                            <div className="h-px flex-1 bg-border/60" />
                          </div>

                          <div className="relative group">
                            <input
                              type="url"
                              placeholder="Paste high-quality image URL..."
                              className="w-full bg-muted/30 border border-border/60 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/40 transition-all placeholder:text-muted-foreground/40"
                              value={formData.image}
                              onChange={(e) => {
                                setFormData({ ...formData, image: e.target.value });
                                setPreviewUrl(e.target.value || null);
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Right Side: Details */}
                      <div className="lg:col-span-7 flex flex-col">
                        <div className="grid gap-6 flex-1">
                          <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground ml-2 text-primary">Dish Name</label>
                            <input
                              required
                              type="text"
                              placeholder="Ex: Signature Truffle Wagyu Burger"
                              className="w-full bg-muted/30 border border-border/60 rounded-[20px] px-6 py-4 font-bold text-lg focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/40 transition-all placeholder:text-muted-foreground/30"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground ml-2">Category</label>
                              <input
                                required
                                type="text"
                                placeholder="Burgers"
                                className="w-full bg-muted/30 border border-border/60 rounded-[20px] px-6 py-4 font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/40 transition-all"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground ml-2">Premium Price</label>
                              <div className="relative group">
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-primary group-focus-within:scale-110 transition-transform">৳</span>
                                <input
                                  required
                                  type="text"
                                  placeholder="0.00"
                                  className="w-full bg-muted/30 border border-border/60 rounded-[20px] pl-10 pr-6 py-4 font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/40 transition-all"
                                  value={formData.price}
                                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground ml-2">Culinary Description</label>
                            <textarea
                              required
                              placeholder="Describe the flavors, ingredients, and the experience..."
                              rows={4}
                              className="w-full bg-muted/30 border border-border/60 rounded-[24px] px-6 py-4 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/40 transition-all resize-none leading-relaxed placeholder:text-muted-foreground/30"
                              value={formData.description}
                              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="mt-10 flex gap-4">
                          <Button
                            type="button"
                            onClick={closeModal}
                            variant="ghost"
                            className="flex-1 py-4 h-auto rounded-[20px] font-black uppercase tracking-widest text-xs hover:bg-muted"
                          >
                            Cancel
                          </Button>
                          <Button
                            disabled={isSubmitting}
                            type="submit"
                            className="flex-[2] bg-primary hover:opacity-90 text-white py-4 h-auto rounded-[20px] font-black text-lg shadow-xl shadow-primary/20 transition-all active:scale-[0.98] group"
                          >
                            {isSubmitting ? (
                              <div className="flex items-center gap-3">
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Processing...</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                                <span>Add to Collection</span>
                              </div>
                            )}
                          </Button>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-20 flex flex-col items-center text-center space-y-8"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full animate-pulse" />
                        <div className="relative w-32 h-32 bg-green-500/10 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-16 h-16 text-green-500" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-4xl font-black font-outfit">Culinary Masterpiece Created!</h3>
                        <p className="text-muted-foreground text-lg max-w-md mx-auto">
                          <span className="font-bold text-foreground">{formData.name}</span> is now gracefully listed in your premium menu collection.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
