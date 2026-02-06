"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, ArrowRight, Loader2, X } from "lucide-react";

export function AdminLoginModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    await new Promise(resolve => setTimeout(resolve, 800));

    if (email === "iamsahidofficial99@gmail.com" && password === "meetup#2026") {
      document.cookie = "admin_session=true; path=/";
      router.push("/admin/dashboard");
      router.refresh();
    } else {
      setError("Invalid administrative credentials");
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-0">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-background/20 backdrop-blur-md"
      />

      {/* Modal */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[420px] bg-card rounded-[40px] shadow-[0_32px_64px_rgba(0,0,0,0.1)] p-10 relative z-10 border border-border"
      >
        <div className="absolute top-6 right-6">
           <button onClick={() => router.push('/')} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
            <X size={20} />
           </button>
        </div>

        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-orange-500/10 text-[#FF4D1C] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock size={30} />
          </div>
          <h2 className="text-2xl font-black text-foreground tracking-tight">Admin Portal</h2>
          <p className="text-muted-foreground text-sm mt-2 font-medium">Please sign in to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-muted/50 border-none rounded-2xl text-sm font-medium foreground focus:ring-2 focus:ring-orange-500/20 outline-none transition-all placeholder:text-muted-foreground/40"
                placeholder="admin@meetup.com"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-muted/50 border-none rounded-2xl text-sm font-medium foreground focus:ring-2 focus:ring-orange-500/20 outline-none transition-all placeholder:text-muted-foreground/40"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-[10px] font-bold text-center py-2"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-[#FF4D1C] text-white font-black rounded-2xl hover:shadow-lg hover:shadow-orange-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 mt-4"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <>
                Sign In
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
