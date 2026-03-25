"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { supabasePublic } from "@/lib/supabase";
import { Package, Clock, Truck, CheckCircle } from "lucide-react";

type OrderStatus = "pending" | "processing" | "shipped" | "delivered";

interface Order {
  id: string;
  product_name: string;
  size: string | null;
  color: string | null;
  quantity: number;
  total_price: number | null;
  status: OrderStatus;
  created_at: string;
  notes: string | null;
  payment_status: string | null;
}

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; icon: React.ReactNode }> = {
  pending:    { label: "Pending",    color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",   icon: <Clock size={13} /> },
  processing: { label: "Processing", color: "bg-blue-500/20 text-blue-300 border-blue-500/30",         icon: <Package size={13} /> },
  shipped:    { label: "Shipped",    color: "bg-purple-500/20 text-purple-300 border-purple-500/30",   icon: <Truck size={13} /> },
  delivered:  { label: "Delivered",  color: "bg-green-500/20 text-green-300 border-green-500/30",      icon: <CheckCircle size={13} /> },
};

export default function OrdersPage() {
  const { user, loading: authLoading, supabase } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) router.push("/auth/login");
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }: { data: any }) => { setOrders(data ?? []); setFetching(false); });
  }, [user, supabase]);

  if (authLoading || !user) return null;

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">← Back to Home</Link>
          <h1 className="text-3xl font-black text-[#0A2540] mt-2 tracking-tighter">My Orders</h1>
          <p className="text-gray-500 text-sm mt-1">Track all your packaging orders</p>
        </div>

        {fetching ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-4 border-[#0A2540] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-gray-100">
            <Package size={48} className="mx-auto text-gray-200 mb-4" />
            <p className="text-gray-400 font-medium">No orders yet</p>
            <Link href="/products" className="inline-block mt-4 px-6 py-2 bg-[#0A2540] text-white text-sm font-bold rounded-full">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const s = STATUS_CONFIG[order.status];
              return (
                <div key={order.id} className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-[#0A2540] text-base">{order.product_name}</h3>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-semibold ${s.color}`}>
                        {s.icon} {s.label}
                      </span>
                      {order.payment_status === "paid" && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-green-100 bg-green-50 text-green-700 text-[10px] font-black uppercase tracking-widest">
                          <CheckCircle size={10} /> Paid
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 mt-1 space-x-3">
                      {order.size && <span>Size: {order.size}</span>}
                      {order.color && <span>Color: {order.color}</span>}
                      <span>Qty: {order.quantity}</span>
                    </div>
                    {order.notes && <p className="text-xs text-gray-500 mt-1 italic">Note: {order.notes}</p>}
                    <p className="text-xs text-gray-400 mt-1">{new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                  </div>
                  {order.total_price && (
                    <div className="text-right">
                      <p className="text-lg font-black text-[#0A2540]">₹{order.total_price.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">Total</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
