"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminLoginModal } from "@/components/admin/AdminLoginModal";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = document.cookie.split('; ').find(row => row.startsWith('admin_session=true'));
      if (isAuth) {
        router.push("/admin/dashboard");
      }
      setIsAuthenticated(!!isAuth);
    };

    checkAuth();
  }, [router]);

  // If already authenticated, we redirect. While checking, show nothing.
  if (isAuthenticated === null || isAuthenticated === true) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  // If not authenticated, show the login modal
  return (
    <div className="min-h-screen bg-background">
      <AdminLoginModal />
    </div>
  );
}
