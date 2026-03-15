"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { createClient } from "@/lib/supabase";
import { Package, Clock, Truck, CheckCircle, ChevronDown } from "lucide-react";

type OrderStatus = "pending" | "processing" | "shipped" | "delivered";

interface AdminOrder {
  id: string;
  product_name: string;
  size: string | null;
  color: string | null;
  quantity: number;
  total_price: number | null;
  status: OrderStatus;
  created_at: string;
  notes: string | null;
  user_id: string;
  profiles: { full_name: string | null; email: string | null } | null;
}

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; icon: React.ReactNode }> = {
  pending:    { label: "Pending",    color: "bg-yellow-100 text-yellow-800 border-yellow-200",   icon: <Clock size={12} /> },
  processing: { label: "Processing", color: "bg-blue-100 text-blue-800 border-blue-200",         icon: <Package size={12} /> },
  shipped:    { label: "Shipped",    color: "bg-purple-100 text-purple-800 border-purple-200",   icon: <Truck size={12} /> },
  delivered:  { label: "Delivered",  color: "bg-green-100 text-green-800 border-green-200",      icon: <CheckCircle size={12} /> },
};

const ALL_STATUSES: OrderStatus[] = ["pending", "processing", "shipped", "delivered"];

export default function AdminPage() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const supabase = createClient();
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [fetching, setFetching] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && (!user || !profile)) return;
    if (!loading && profile && !profile.is_admin) router.push("/");
  }, [user, profile, loading, router]);

  const fetchOrders = useCallback(async () => {
    const { data } = await supabase
      .from("orders")
      .select("*, profiles(full_name, email)")
      .order("created_at", { ascending: false });
    setOrders((data as AdminOrder[]) ?? []);
    setFetching(false);
  }, [supabase]);

  useEffect(() => {
    if (profile?.is_admin) fetchOrders();
  }, [profile, fetchOrders]);

  const updateStatus = async (orderId: string, newStatus: OrderStatus) => {
    setUpdating(orderId);
    await supabase.from("orders").update({ status: newStatus }).eq("id", orderId);
    setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, status: newStatus } : o));
    setUpdating(null);
  };

  // 1. Still loading auth/profile — show spinner
  if (loading || (user && !profile)) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#0A2540] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // 2. Not logged in → go to login
  if (!user) {
    router.push("/auth/login");
    return null;
  }

  // 3. Logged in but not admin → go home
  if (!profile?.is_admin) {
    router.push("/");
    return null;
  }

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    processing: orders.filter(o => o.status === "processing").length,
    shipped: orders.filter(o => o.status === "shipped").length,
    delivered: orders.filter(o => o.status === "delivered").length,
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
          <div>
            <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">← Back to Site</Link>
            <h1 className="text-3xl font-black text-[#0A2540] mt-2 tracking-tighter">Admin Dashboard</h1>
            <p className="text-gray-500 text-sm">Manage all customer orders</p>
          </div>
          <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full border border-amber-200 uppercase tracking-widest">Admin</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
          {[
            { label: "Total", value: stats.total, color: "bg-white border-gray-100" },
            { label: "Pending", value: stats.pending, color: "bg-yellow-50 border-yellow-200" },
            { label: "Processing", value: stats.processing, color: "bg-blue-50 border-blue-200" },
            { label: "Shipped", value: stats.shipped, color: "bg-purple-50 border-purple-200" },
            { label: "Delivered", value: stats.delivered, color: "bg-green-50 border-green-200" },
          ].map((stat) => (
            <div key={stat.label} className={`${stat.color} border rounded-xl p-4 text-center`}>
              <p className="text-2xl font-black text-[#0A2540]">{stat.value}</p>
              <p className="text-xs text-gray-500 font-semibold mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Orders Table */}
        {fetching ? (
          <div className="flex justify-center py-24">
            <div className="w-8 h-8 border-4 border-[#0A2540] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-gray-100">
            <Package size={48} className="mx-auto text-gray-200 mb-4" />
            <p className="text-gray-400 font-medium">No orders yet</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#0A2540] text-white/80 text-left text-xs uppercase tracking-widest">
                    <th className="px-5 py-4 font-semibold">Customer</th>
                    <th className="px-5 py-4 font-semibold">Product</th>
                    <th className="px-5 py-4 font-semibold">Details</th>
                    <th className="px-5 py-4 font-semibold">Total</th>
                    <th className="px-5 py-4 font-semibold">Date</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {orders.map((order) => {
                    const s = STATUS_CONFIG[order.status];
                    return (
                      <tr key={order.id} className="hover:bg-gray-50/60 transition-colors">
                        <td className="px-5 py-4">
                          <p className="font-semibold text-[#0A2540]">{order.profiles?.full_name ?? "—"}</p>
                          <p className="text-gray-400 text-xs truncate max-w-[160px]">{order.profiles?.email ?? "—"}</p>
                        </td>
                        <td className="px-5 py-4 font-medium text-gray-800">{order.product_name}</td>
                        <td className="px-5 py-4 text-gray-500 text-xs">
                          {order.size && <div>Size: {order.size}</div>}
                          {order.color && <div>Color: {order.color}</div>}
                          <div>Qty: {order.quantity}</div>
                        </td>
                        <td className="px-5 py-4 font-bold text-[#0A2540]">
                          {order.total_price ? `₹${order.total_price.toLocaleString()}` : "—"}
                        </td>
                        <td className="px-5 py-4 text-gray-500 text-xs whitespace-nowrap">
                          {new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </td>
                        <td className="px-5 py-4">
                          <div className="relative inline-block">
                            <select
                              value={order.status}
                              disabled={updating === order.id}
                              onChange={(e) => updateStatus(order.id, e.target.value as OrderStatus)}
                              className={`appearance-none pl-2 pr-7 py-1 rounded-full border text-xs font-semibold cursor-pointer ${s.color} ${updating === order.id ? "opacity-50" : ""}`}
                            >
                              {ALL_STATUSES.map((st) => (
                                <option key={st} value={st}>{STATUS_CONFIG[st].label}</option>
                              ))}
                            </select>
                            <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
