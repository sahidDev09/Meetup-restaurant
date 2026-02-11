"use client";

import { Calendar } from "lucide-react";
import { useSyncExternalStore } from "react";

export default function ReservationsPage() {
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!isClient) return null;

  return (
    <div className="space-y-8 font-outfit">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-foreground">Reservations</h1>
          <p className="text-muted-foreground mt-1">Manage and view all table reservations.</p>
        </div>
      </div>

      <div className="p-8 bg-card rounded-[32px] border border-border shadow-sm flex flex-col items-center justify-center text-center min-h-[400px] transition-colors">
        <div className="w-16 h-16 bg-orange-50 dark:bg-orange-500/10 text-[#FF4D1C] rounded-2xl flex items-center justify-center mb-4">
          <Calendar size={32} />
        </div>
        <h3 className="text-xl font-black text-foreground mb-2">No Reservations Yet</h3>
        <p className="text-muted-foreground max-w-sm">
          Any table reservations made by customers will appear here for you to manage.
        </p>
      </div>
    </div>
  );
}
