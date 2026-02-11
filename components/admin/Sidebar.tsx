"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  UtensilsCrossed, 
  BarChart3, 
  Users, 
  Settings,
  ArrowLeft,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: ShoppingBag, label: "Orders", href: "/admin/orders" },
  { icon: Calendar, label: "Reservation", href: "/admin/reservations" },
  { icon: UtensilsCrossed, label: "Menu Items", href: "/admin/menu" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Users, label: "Staff", href: "/admin/staff" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    localStorage.removeItem("admin_token");
    window.location.href = "/admin";
  };

  return (
    <div className="w-64 h-screen bg-background border-r border-border flex flex-col fixed left-0 top-0 z-50 transition-colors duration-300">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-[#FF4D1C]">Meetup</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-[#FF4D1C] text-white shadow-lg shadow-orange-500/20" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 mt-auto space-y-2">
        <Link 
          href="/"
          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground truncate transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors truncate"
        >
          <ArrowLeft size={18} className="rotate-180" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
