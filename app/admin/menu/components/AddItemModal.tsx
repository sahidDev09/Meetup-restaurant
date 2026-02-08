"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Plus, Upload, Image as ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

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

    if (uploadError) {
      throw uploadError;
    }

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
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[200]"
          />

          <div className="fixed inset-0 flex items-center justify-center z-[201] p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-background border border-border w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden pointer-events-auto max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-3xl font-black font-display tracking-tight">Add New Item</h2>
                    <p className="text-muted-foreground mt-1">Fill in the details for your new menu item</p>
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
                    <div className="grid gap-5">
                      <div className="space-y-4">
                        <label className="text-sm font-black uppercase tracking-wider text-muted-foreground ml-1">Item Image</label>
                        
                        <div 
                          onClick={() => fileInputRef.current?.click()}
                          className="relative group cursor-pointer"
                        >
                          <div className="w-full h-48 bg-muted/50 border-2 border-dashed border-border rounded-3xl flex flex-col items-center justify-center overflow-hidden transition-all group-hover:border-primary/50 group-hover:bg-primary/5">
                            {previewUrl ? (
                              <>
                                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <Upload className="text-white w-8 h-8" />
                                </div>
                              </>
                            ) : (
                              <div className="flex flex-col items-center gap-2 text-muted-foreground transition-colors group-hover:text-primary">
                                <ImageIcon className="w-12 h-12" />
                                <span className="font-bold text-sm">Click to upload image</span>
                                <span className="text-[10px] uppercase tracking-widest">Supports PNG, JPG up to 5MB</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <input 
                          type="file" 
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept="image/*"
                          className="hidden"
                        />
                        
                        <div className="flex items-center gap-4">
                          <div className="h-px flex-1 bg-border" />
                          <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Or provide URL</span>
                          <div className="h-px flex-1 bg-border" />
                        </div>

                        <input
                          type="url"
                          placeholder="https://images.unsplash.com/..."
                          className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          value={formData.image}
                          onChange={(e) => {
                            setFormData({ ...formData, image: e.target.value });
                            setPreviewUrl(e.target.value || null);
                          }}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-black uppercase tracking-wider text-muted-foreground ml-1">Item Name</label>
                        <input
                          required
                          type="text"
                          placeholder="Ex: Juicy Beef Burger"
                          className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-black uppercase tracking-wider text-muted-foreground ml-1">Category</label>
                          <input
                            required
                            type="text"
                            placeholder="Ex: Burgers"
                            className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-black uppercase tracking-wider text-muted-foreground ml-1">Price (৳)</label>
                          <input
                            required
                            type="text"
                            placeholder="Ex: 350"
                            className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-black uppercase tracking-wider text-muted-foreground ml-1">Description</label>
                        <textarea
                          required
                          placeholder="Write a tasty description..."
                          rows={3}
                          className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                          <Loader2 className="w-5 h-5 animate-spin" />
                          {selectedFile ? "Uploading..." : "Adding..."}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Plus size={20} />
                          Add to Menu
                        </div>
                      )}
                    </Button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 flex flex-col items-center text-center space-y-6"
                  >
                    <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-12 h-12 text-green-500" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black mb-2">Item Added!</h3>
                      <p className="text-muted-foreground">
                        <span className="font-bold text-foreground">{formData.name}</span> has been successfully added to the menu.
                      </p>
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
