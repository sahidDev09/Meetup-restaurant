"use client";

import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Clock, 
  ChefHat, 
  Package, 
  Truck, 
  CheckCircle2,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";

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
  subtotal: number;
  tax: number;
  total: number;
  status: string;
  delivery_otp: string | null;
  otp_verified: boolean;
  created_at: string;
}

interface OrderStats {
  pending: number;
  preparing: number;
  prepared: number;
  out_for_delivery: number;
  delivered: number;
}

const statusConfig = [
  { key: "pending", label: "Pending", icon: Clock, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
  { key: "preparing", label: "Preparing", icon: ChefHat, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-500/10" },
  { key: "prepared", label: "Prepared", icon: Package, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
  { key: "out_for_delivery", label: "Out for Delivery", icon: Truck, color: "text-sky-500", bg: "bg-sky-50 dark:bg-sky-500/10" },
  { key: "delivered", label: "Delivered", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-50 dark:bg-green-500/10" },
];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  }) + ' at ' + date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

function formatStatus(status: string): string {
  return status.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

function getItemsCount(items: OrderItem[]): string {
  if (!items || !Array.isArray(items)) return "0 Items";
  const total = items.reduce((acc, item) => acc + (item.quantity || 1), 0);
  return `${total} ${total === 1 ? 'Item' : 'Items'}`;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<OrderStats>({
    pending: 0,
    preparing: 0,
    prepared: 0,
    out_for_delivery: 0,
    delivered: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
        return;
      }

      if (data) {
        setOrders(data as Order[]);
        
        // Calculate stats
        const newStats: OrderStats = {
          pending: 0,
          preparing: 0,
          prepared: 0,
          out_for_delivery: 0,
          delivered: 0,
        };
        
        data.forEach((order: Order) => {
          const status = order.status?.toLowerCase().replace(/ /g, '_') as keyof OrderStats;
          if (status in newStats) {
            newStats[status]++;
          }
        });
        
        setStats(newStats);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();

    // Set up realtime subscription
    const channel = supabase
      .channel('orders-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        () => {
          fetchOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchOrders]);

  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.order_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer_phone?.includes(searchQuery);
    
    const matchesStatus = !statusFilter || order.status?.toLowerCase().replace(/ /g, '_') === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-black text-foreground">Orders</h1>
          <p className="text-muted-foreground mt-1">Manage and track all customer orders with OTP verification.</p>
        </div>
        <button 
          onClick={fetchOrders}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl text-sm font-bold transition-all disabled:opacity-50"
        >
          <RefreshCw size={16} className={cn(loading && "animate-spin")} />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {statusConfig.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setStatusFilter(statusFilter === stat.key ? null : stat.key)}
            className={cn(
              "flex items-center gap-4 p-4 bg-card rounded-2xl border shadow-sm transition-all cursor-pointer hover:shadow-md",
              statusFilter === stat.key ? "border-primary ring-2 ring-primary/20" : "border-border"
            )}
          >
            <div className={cn("p-3 rounded-xl transition-colors", stat.bg, stat.color)}>
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-xl font-black text-foreground">{stats[stat.key as keyof OrderStats]}</p>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-card rounded-[32px] border border-border shadow-sm overflow-hidden transition-colors">
        <div className="p-6 border-b border-border flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input 
              type="text" 
              placeholder="Search orders..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-muted/50 border-none rounded-xl text-sm foreground outline-none ring-1 ring-transparent focus:ring-[#FF4D1C]/20 transition-all placeholder:text-muted-foreground/60"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button 
              onClick={() => setStatusFilter(null)}
              className={cn(
                "flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-card border rounded-xl text-sm font-bold transition-all",
                !statusFilter 
                  ? "border-primary text-primary" 
                  : "border-border text-muted-foreground hover:text-foreground"
              )}
            >
              <Filter size={16} />
              {statusFilter ? formatStatus(statusFilter) : "All Status"}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Package className="w-12 h-12 text-muted-foreground/50 mb-4" />
              <p className="text-lg font-bold text-foreground">No orders found</p>
              <p className="text-sm text-muted-foreground mt-1">
                {searchQuery || statusFilter 
                  ? "Try adjusting your search or filter"
                  : "Orders will appear here when customers place them"}
              </p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-muted/50 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] border-b border-border">
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Items</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">OTP</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-muted/50 transition-colors group">
                    <td className="px-6 py-4 text-sm font-bold text-foreground">{order.order_number}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-foreground">{order.customer_name}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{order.customer_phone}</div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-muted-foreground">
                      {getItemsCount(order.items)}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-foreground">৳{order.total}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-sm tracking-wider",
                        order.status === "delivered" ? "bg-green-50 dark:bg-green-500/10 text-green-600" :
                        order.status === "out_for_delivery" ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600" : 
                        order.status === "preparing" ? "bg-rose-50 dark:bg-rose-500/10 text-rose-600" :
                        order.status === "prepared" ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600" :
                        "bg-amber-50 dark:bg-amber-500/10 text-amber-600"
                      )}>
                        {formatStatus(order.status || 'pending')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "flex items-center gap-1.5 px-3 py-1 rounded-full text-sm w-fit",
                        order.otp_verified 
                          ? "bg-green-400/40 text-white shadow-sm" 
                          : order.delivery_otp 
                            ? "bg-muted text-foreground font-mono"
                            : "bg-muted text-muted-foreground"
                      )}>
                        {order.otp_verified && <CheckCircle2 size={10} />}
                        {order.otp_verified ? "Verified" : order.delivery_otp || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground whitespace-nowrap">
                      {formatDate(order.created_at)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
