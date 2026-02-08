"use client";

import { motion, AnimatePresence } from "framer-motion";
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
  Eye,
  X,
  Key,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState, useCallback, useRef } from "react";
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
  { key: "pending", label: "Pending", icon: Clock, iconColor: "text-amber-500", color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
  { key: "preparing", label: "Preparing", icon: ChefHat, iconColor: "text-rose-500", color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-500/10" },
  { key: "prepared", label: "Prepared", icon: Package, iconColor: "text-blue-500", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
  { key: "out_for_delivery", label: "Out for Delivery", icon: Truck, iconColor: "text-sky-500", color: "text-sky-500", bg: "bg-sky-50 dark:bg-sky-500/10" },
  { key: "delivered", label: "Delivered", icon: CheckCircle2, iconColor: "text-green-500", color: "text-green-500", bg: "bg-green-50 dark:bg-green-500/10" },
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

function generateOTP(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// Order Details Modal Component
function OrderDetailsModal({ 
  order, 
  isOpen, 
  onClose 
}: { 
  order: Order | null; 
  isOpen: boolean; 
  onClose: () => void;
}) {
  if (!order) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-card border border-border rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden"
            style={{ backgroundColor: 'var(--card)' }}
          >
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-foreground">Order Details</h2>
                <p className="text-sm text-muted-foreground mt-0.5">{order.order_number}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-xl transition-colors"
              >
                <X size={20} className="text-muted-foreground" />
              </button>
            </div>
            
            <div className="p-6 space-y-6 overflow-y-auto max-h-[60vh]">
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-muted-foreground uppercase">Customer Info</h3>
                <div className="bg-muted/50 rounded-2xl p-4 space-y-2">
                  <p className="text-foreground font-bold">{order.customer_name}</p>
                  <p className="text-sm text-muted-foreground">{order.customer_phone}</p>
                  <p className="text-sm text-muted-foreground">{order.customer_address}</p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-muted-foreground uppercase">Order Items</h3>
                <div className="bg-muted/50 rounded-2xl p-4 space-y-3">
                  {order.items?.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold">
                          {item.quantity}
                        </span>
                        <span className="text-foreground font-medium">{item.name}</span>
                      </div>
                      <span className="text-foreground font-bold">৳{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-muted-foreground uppercase">Payment Summary</h3>
                <div className="bg-muted/50 rounded-2xl p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">৳{order.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="text-foreground">৳{order.tax}</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between">
                    <span className="font-bold text-foreground">Total</span>
                    <span className="font-black text-foreground">৳{order.total}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// OTP Verification Modal Component
function OTPVerificationModal({ 
  order, 
  isOpen, 
  onClose,
  onVerify 
}: { 
  order: Order | null; 
  isOpen: boolean; 
  onClose: () => void;
  onVerify: (orderId: string) => void;
}) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [verifying, setVerifying] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 4) {
      setError('Please enter all 4 digits');
      return;
    }

    if (enteredOtp !== order?.delivery_otp) {
      setError('Invalid OTP. Please try again.');
      return;
    }

    setVerifying(true);
    await onVerify(order.id);
    setVerifying(false);
    setOtp(['', '', '', '']);
    onClose();
  };

  const handleClose = () => {
    setOtp(['', '', '', '']);
    setError('');
    onClose();
  };

  if (!order) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-card border border-border rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
            style={{ backgroundColor: 'var(--card)' }}
          >
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-foreground">Verify Delivery OTP</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Enter the 4-digit OTP provided by the customer
                </p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-muted rounded-xl transition-colors"
              >
                <X size={20} className="text-muted-foreground" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Customer: <span className="text-foreground font-bold">{order.customer_name}</span>
                </p>
              </div>

              <div className="flex justify-center gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={cn(
                      "w-14 h-14 text-center text-2xl font-black bg-muted/50 border-2 rounded-xl outline-none transition-all",
                      error ? "border-red-500" : "border-border focus:border-primary"
                    )}
                  />
                ))}
              </div>

              {error && (
                <p className="text-center text-sm text-red-500 font-medium">{error}</p>
              )}

              <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
                <ShieldCheck size={14} />
                Review notification will be sent 2 min after delivery
              </p>

              <div className="flex gap-3">
                <button
                  onClick={handleClose}
                  className="flex-1 px-4 py-3 bg-muted text-foreground font-bold rounded-xl hover:bg-muted/80 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleVerify}
                  disabled={verifying}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {verifying ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <CheckCircle2 size={18} />
                  )}
                  Verify & Complete Delivery
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Action Dropdown Component
function ActionDropdown({ 
  order, 
  onUpdateStatus, 
  onViewDetails,
  onVerifyOTP 
}: { 
  order: Order;
  onUpdateStatus: (orderId: string, newStatus: string, otp?: string) => void;
  onViewDetails: (order: Order) => void;
  onVerifyOTP: (order: Order) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getActionButtons = () => {
    const status = order.status?.toLowerCase();
    const actions: { label: string; icon: React.ReactNode; onClick: () => void; variant?: string }[] = [];

    // Always show View Details
    actions.push({
      label: 'View Details',
      icon: <Eye size={16} />,
      onClick: () => {
        onViewDetails(order);
        setIsOpen(false);
      }
    });

    switch (status) {
      case 'pending':
        actions.push({
          label: 'Start Preparing',
          icon: <ChefHat size={16} />,
          onClick: () => {
            onUpdateStatus(order.id, 'preparing');
            setIsOpen(false);
          }
        });
        actions.push({
          label: 'Cancel Order',
          icon: <X size={16} />,
          onClick: () => {
            onUpdateStatus(order.id, 'cancelled');
            setIsOpen(false);
          },
          variant: 'danger'
        });
        break;
      case 'preparing':
        actions.push({
          label: 'Mark as Prepared',
          icon: <Package size={16} />,
          onClick: () => {
            onUpdateStatus(order.id, 'prepared');
            setIsOpen(false);
          }
        });
        break;
      case 'prepared':
        actions.push({
          label: 'Out for Delivery',
          icon: <Truck size={16} />,
          onClick: () => {
            const otp = generateOTP();
            onUpdateStatus(order.id, 'out_for_delivery', otp);
            setIsOpen(false);
          }
        });
        break;
      case 'out_for_delivery':
        actions.push({
          label: 'Verify OTP & Deliver',
          icon: <Key size={16} />,
          onClick: () => {
            onVerifyOTP(order);
            setIsOpen(false);
          }
        });
        break;
    }

    return actions;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all"
      >
        <MoreVertical size={16} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-56 border border-border rounded-2xl shadow-xl overflow-hidden z-50"
            style={{ backgroundColor: 'var(--card)' }}
          >
            <div className="p-2 space-y-1">
              {getActionButtons().map((action, index) => (
                <button
                  key={index}
                  onClick={action.onClick}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                    action.variant === 'primary' && "text-primary hover:bg-primary/10",
                    action.variant === 'danger' && "text-red-500 hover:bg-red-500/10",
                    action.variant === 'success' && "text-green-500 hover:bg-green-500/10",
                    !action.variant && "text-foreground hover:bg-muted"
                  )}
                >
                  {action.icon}
                  {action.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
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
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);

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

  const handleUpdateStatus = async (orderId: string, newStatus: string, otp?: string) => {
    try {
      const updateData: { status: string; delivery_otp?: string } = { status: newStatus };
      
      // If going out for delivery, add the OTP
      if (newStatus === 'out_for_delivery' && otp) {
        updateData.delivery_otp = otp;
      }

      const { error } = await supabase
        .from('orders')
        .update(updateData)
        .eq('id', orderId);

      if (error) {
        console.error('Error updating order status:', error);
        return;
      }

      // Refresh orders after update
      fetchOrders();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleVerifyOTP = async (orderId: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ 
          status: 'delivered',
          otp_verified: true 
        })
        .eq('id', orderId);

      if (error) {
        console.error('Error verifying OTP:', error);
        return;
      }

      // Refresh orders after update
      fetchOrders();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsModalOpen(true);
  };

  const handleOpenOTPModal = (order: Order) => {
    setSelectedOrder(order);
    setIsOTPModalOpen(true);
  };

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
    <>
      <div className="h-full flex flex-col gap-8 animate-in fade-in duration-500">
        <div className="flex items-end justify-between flex-shrink-0">
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 flex-shrink-0">
          {statusConfig.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-4 p-4 bg-card dark:bg-muted/40 rounded-2xl border border-border shadow-sm"
            >
              <div className={cn("p-3 rounded-xl", stat.bg, stat.color)}>
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-xl font-black text-foreground">{stats[stat.key as keyof OrderStats]}</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex-1 min-h-0 bg-card rounded-[32px] border border-border shadow-sm overflow-hidden transition-colors flex flex-col">
          <div className="p-6 border-b border-border flex flex-col md:flex-row gap-4 items-center justify-between flex-shrink-0">
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
              <div className="relative">
                <div className="flex items-center gap-2">
                  <Filter size={16} className="text-muted-foreground" />
                  <select
                    value={statusFilter || ""}
                    onChange={(e) => setStatusFilter(e.target.value || null)}
                    className="appearance-none bg-card border border-border rounded-xl px-4 py-2 pr-8 text-sm font-medium text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                  >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="preparing">Preparing</option>
                    <option value="prepared">Prepared</option>
                    <option value="out_for_delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
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
                          "px-3 py-1 rounded-full text-sm",
                          order.status === "delivered" ? "bg-green-50 dark:bg-green-500/10 text-green-600" :
                          order.status === "out_for_delivery" ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600" : 
                          order.status === "preparing" ? "bg-rose-50 dark:bg-rose-500/10 text-rose-600" :
                          order.status === "prepared" ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600" :
                          order.status === "cancelled" ? "bg-red-50 dark:bg-red-500/10 text-red-600" :
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
                        <ActionDropdown 
                          order={order}
                          onUpdateStatus={handleUpdateStatus}
                          onViewDetails={handleViewDetails}
                          onVerifyOTP={handleOpenOTPModal}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedOrder(null);
        }}
      />

      {/* OTP Verification Modal */}
      <OTPVerificationModal
        order={selectedOrder}
        isOpen={isOTPModalOpen}
        onClose={() => {
          setIsOTPModalOpen(false);
          setSelectedOrder(null);
        }}
        onVerify={handleVerifyOTP}
      />
    </>
  );
}
