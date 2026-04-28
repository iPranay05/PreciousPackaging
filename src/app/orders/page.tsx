"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Package, Clock, Truck, CheckCircle, ArrowLeft, ChevronRight, Box, IndianRupee } from "lucide-react";

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

const STEPS: { key: OrderStatus; label: string; Icon: React.ElementType }[] = [
  { key: "pending",    label: "Ordered",    Icon: Box },
  { key: "processing", label: "Processing", Icon: Package },
  { key: "shipped",    label: "Shipped",    Icon: Truck },
  { key: "delivered",  label: "Delivered",  Icon: CheckCircle },
];

const STATUS_STEP: Record<OrderStatus, number> = {
  pending: 0, processing: 1, shipped: 2, delivered: 3,
};

const PAYMENT_COLORS: Record<string, string> = {
  paid:    "bg-emerald-50 text-emerald-700 border-emerald-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  failed:  "bg-red-50 text-red-700 border-red-200",
};

function OrderCard({ order }: { order: Order }) {
  const step = STATUS_STEP[order.status];
  const date = new Date(order.created_at);

  return (
    <article className="bg-white rounded-2xl border border-[#e8ddd4] overflow-hidden shadow-[0_2px_16px_-4px_rgba(44,30,22,0.08)] hover:shadow-[0_4px_24px_-4px_rgba(44,30,22,0.14)] transition-shadow duration-300">

      {/* ── Card header ── */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#f0e8e0] bg-[#faf6f2]">
        <div className="flex items-center gap-3">
          {/* Icon box */}
          <div className="w-9 h-9 rounded-xl bg-brand-beige flex items-center justify-center flex-shrink-0">
            <Package size={16} className="text-brand-brown" />
          </div>
          <div>
            <p className="text-[10px] font-normal uppercase tracking-[0.15em] text-brand-brown/60">
              {date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </p>
            <p className="text-[10px] text-brand-charcoal/30 font-mono mt-0.5 truncate max-w-[160px]">
              #{order.id.slice(0, 8).toUpperCase()}
            </p>
          </div>
        </div>

        {/* Payment badge */}
        {order.payment_status && (
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-semibold uppercase tracking-widest ${PAYMENT_COLORS[order.payment_status] ?? "bg-gray-50 text-gray-500 border-gray-200"}`}>
            {order.payment_status === "paid" && <CheckCircle size={10} />}
            {order.payment_status}
          </span>
        )}
      </div>

      {/* ── Card body ── */}
      <div className="px-5 py-5">
        <div className="flex flex-col sm:flex-row sm:items-start gap-5">

          {/* Left: product info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-brand-dark-brown text-lg tracking-tight leading-snug">
              {order.product_name}
            </h3>

            {/* Specs row */}
            <div className="flex flex-wrap items-center gap-3 mt-2">
              {order.size && (
                <span className="text-xs bg-brand-beige/60 text-brand-charcoal font-semibold px-2.5 py-1 rounded-lg">
                  📐 {order.size} cm
                </span>
              )}
              {order.color && (
                <span className="inline-flex items-center gap-1.5 text-xs bg-brand-beige/60 text-brand-charcoal font-semibold px-2.5 py-1 rounded-lg">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/10 flex-shrink-0"
                    style={{ backgroundColor: order.color }}
                  />
                  {order.color}
                </span>
              )}
              <span className="text-xs bg-brand-beige/60 text-brand-charcoal font-semibold px-2.5 py-1 rounded-lg">
                🗂️ Qty {order.quantity}
              </span>
            </div>

            {order.notes && (
              <p className="mt-3 text-xs text-brand-charcoal/50 italic leading-relaxed border-l-2 border-brand-beige pl-3">
                "{order.notes}"
              </p>
            )}
          </div>

          {/* Right: price */}
          {order.total_price != null && (
            <div className="flex-shrink-0 text-right sm:text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-1">
              <div className="bg-brand-beige/40 rounded-xl px-4 py-2.5 inline-block">
                <p className="text-2xl font-semibold text-brand-dark-brown leading-none tracking-tight">
                  ₹{order.total_price.toLocaleString("en-IN")}
                </p>
                <p className="text-[9px] uppercase tracking-widest font-normal text-brand-charcoal/40 mt-0.5">
                  incl. 5% GST
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ── Progress stepper ── */}
        <div className="mt-6 pt-5 border-t border-[#f0e8e0]">
          <p className="text-[9px] uppercase tracking-[0.2em] font-normal text-brand-charcoal/30 mb-3">Order Progress</p>
          <div className="flex items-center">
            {STEPS.map((s, i) => {
              const done = step >= i;
              const active = step === i;
              const Icon = s.Icon;
              return (
                <div key={s.key} className="flex items-center flex-1 last:flex-none">
                  {/* Step dot */}
                  <div className={`flex flex-col items-center gap-1.5 flex-shrink-0 transition-all ${i < STEPS.length ? "min-w-[40px]" : ""}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300
                      ${done
                        ? "bg-brand-dark-brown border-brand-dark-brown text-brand-cream shadow-sm"
                        : "bg-white border-[#e8ddd4] text-brand-charcoal/25"
                      }
                      ${active ? "ring-4 ring-brand-brown/20" : ""}
                    `}>
                      <Icon size={13} />
                    </div>
                    <p className={`text-[9px] font-normal uppercase tracking-wider leading-none text-center
                      ${done ? "text-brand-dark-brown" : "text-brand-charcoal/25"}`
                    }>
                      {s.label}
                    </p>
                  </div>
                  {/* Connector */}
                  {i < STEPS.length - 1 && (
                    <div className={`flex-1 h-[2px] mx-2 rounded-full mb-4 transition-colors duration-500
                      ${step > i ? "bg-brand-dark-brown" : "bg-[#e8ddd4]"}`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </article>
  );
}

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
      .then(({ data }: { data: any }) => {
        setOrders(data ?? []);
        setFetching(false);
      });
  }, [user, supabase]);

  if (authLoading || !user) return null;

  return (
    <div className="min-h-screen bg-brand-cream">

      {/* ══ Sticky Header ══ */}
      <header className="sticky top-0 z-40 bg-brand-cream/90 backdrop-blur-lg border-b border-[#e8ddd4]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-brand-charcoal/60 hover:text-brand-dark-brown transition-colors group"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-semibold">Home</span>
          </Link>

          <Link href="/" className="font-serif text-lg font-medium text-brand-dark-brown tracking-wide">
            Precious<span className="text-brand-brown">Packaging</span>
          </Link>

          <Link
            href="/products"
            className="flex items-center gap-1 text-sm font-semibold text-brand-brown hover:text-brand-dark-brown transition-colors"
          >
            Shop <ChevronRight size={14} />
          </Link>
        </div>
      </header>

      {/* ══ Main ══ */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

          {/* ══ LEFT SIDEBAR ══ */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            {/* Account card */}
            <div className="bg-white rounded-2xl border border-[#e8ddd4] shadow-sm overflow-hidden mb-5">
              <div className="h-1.5 bg-gradient-to-r from-brand-brown to-brand-dark-brown" />
              <div className="p-6">
                <div className="w-14 h-14 rounded-2xl bg-brand-beige flex items-center justify-center mb-4">
                  <span className="text-2xl font-semibold text-brand-brown">
                    {user.email?.[0]?.toUpperCase() ?? "U"}
                  </span>
                </div>
                <p className="font-semibold text-brand-dark-brown text-lg tracking-tight leading-tight truncate">{user.email}</p>
                <p className="text-xs text-brand-charcoal/40 font-medium mt-1 uppercase tracking-widest">Customer</p>
              </div>
            </div>

            {/* Stats */}
            {!fetching && orders.length > 0 && (
              <div className="bg-white rounded-2xl border border-[#e8ddd4] shadow-sm p-5 mb-5 space-y-4">
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-brand-charcoal/30">Summary</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-brand-charcoal/60 font-medium">Total Orders</span>
                  <span className="font-semibold text-brand-dark-brown">{orders.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-brand-charcoal/60 font-medium">Total Spent</span>
                  <span className="font-semibold text-brand-dark-brown">
                    ₹{orders.reduce((s, o) => s + (o.total_price ?? 0), 0).toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-brand-charcoal/60 font-medium">Delivered</span>
                  <span className="font-semibold text-brand-dark-brown">
                    {orders.filter(o => o.status === "delivered").length}
                  </span>
                </div>
              </div>
            )}

            {/* Nav links */}
            <div className="bg-white rounded-2xl border border-[#e8ddd4] shadow-sm overflow-hidden">
              <Link href="/products" className="flex items-center justify-between px-5 py-3.5 hover:bg-brand-beige/30 transition-colors border-b border-[#f0e8e0] group">
                <span className="text-sm font-semibold text-brand-charcoal/70 group-hover:text-brand-dark-brown">Browse Products</span>
                <ChevronRight size={14} className="text-brand-charcoal/30 group-hover:text-brand-brown" />
              </Link>
              <Link href="/" className="flex items-center justify-between px-5 py-3.5 hover:bg-brand-beige/30 transition-colors group">
                <span className="text-sm font-semibold text-brand-charcoal/70 group-hover:text-brand-dark-brown">Back to Home</span>
                <ChevronRight size={14} className="text-brand-charcoal/30 group-hover:text-brand-brown" />
              </Link>
            </div>
          </aside>

          {/* ══ RIGHT: ORDERS ══ */}
          <div className="flex-1 min-w-0">
            {/* Heading */}
            <div className="mb-7">
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-brown/50">My Account</span>
              <h1 className="text-4xl sm:text-5xl font-semibold text-brand-dark-brown tracking-tighter mt-1">Orders</h1>
              {!fetching && orders.length > 0 && (
                <p className="text-sm text-brand-charcoal/50 font-medium mt-1.5">
                  {orders.length} order{orders.length !== 1 ? "s" : ""} placed
                </p>
              )}
            </div>

            {/* Loading */}
            {fetching && (
              <div className="flex flex-col items-center justify-center py-40 gap-4">
                <div className="w-10 h-10 relative">
                  <div className="absolute inset-0 rounded-full border-4 border-brand-beige" />
                  <div className="absolute inset-0 rounded-full border-4 border-t-brand-brown animate-spin" />
                </div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-brown/50">Loading…</p>
              </div>
            )}

            {/* Empty */}
            {!fetching && orders.length === 0 && (
              <div className="flex flex-col items-center justify-center py-32 gap-6 text-center bg-white rounded-3xl border border-[#e8ddd4] shadow-sm">
                <div className="w-24 h-24 bg-brand-beige/60 rounded-full flex items-center justify-center">
                  <Package size={40} className="text-brand-brown/30" />
                </div>
                <div>
                  <p className="font-semibold text-brand-dark-brown text-xl tracking-tight">No orders yet</p>
                  <p className="text-brand-charcoal/40 text-sm mt-1.5 max-w-xs mx-auto">
                    Your orders will appear here after you make a purchase.
                  </p>
                </div>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-7 py-3 bg-brand-dark-brown text-brand-cream text-sm font-semibold rounded-xl tracking-wide hover:bg-brand-brown transition-colors shadow-sm"
                >
                  Browse Products <ChevronRight size={14} />
                </Link>
              </div>
            )}

            {/* Orders list */}
            {!fetching && orders.length > 0 && (
              <div className="space-y-5">
                {orders.map((order) => <OrderCard key={order.id} order={order} />)}
              </div>
            )}

            {/* Footer CTA */}
            {!fetching && orders.length > 0 && (
              <div className="mt-10 py-8 border-t border-[#e8ddd4] text-center">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-7 py-3 bg-brand-dark-brown text-brand-cream text-sm font-semibold rounded-xl tracking-wide hover:bg-brand-brown transition-colors shadow-sm"
                >
                  Place Another Order <ChevronRight size={14} />
                </Link>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}

