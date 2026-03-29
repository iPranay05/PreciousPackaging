"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { supabasePublic } from "@/lib/supabase";
import { Package, Clock, Truck, CheckCircle, ChevronDown, Plus, Trash2, Tag, Box, Hash, RefreshCw, ChevronLeft, Search, LayoutDashboard, ShoppingBag, ArrowUpRight } from "lucide-react";

type OrderStatus = "pending" | "processing" | "shipped" | "delivered";

interface Product {
  id: string;
  category: string;
  categorySlug: string;
  description: string;
  price: number;
  image: string;
  size: string;
  badge?: string;
  created_at: string;
}

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
  shipping_address: string | null;
  shipping_city: string | null;
  shipping_state: string | null;
  shipping_pincode: string | null;
  customer_name: string | null;
  profiles: { full_name: string | null; email: string | null; mobile: string | null } | null;
  products: { image: string } | null;
  payment_status: string | null;
  payment_method: string | null;
  transaction_id: string | null;
}

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  pending:    { label: "Pending",    color: "text-brand-brown", bg: "bg-[#f5f0eb] border-[#e1d5c9]", icon: <Clock size={12} /> },
  processing: { label: "Processing", color: "text-slate-600", bg: "bg-slate-100 border-slate-200", icon: <Package size={12} /> },
  shipped:    { label: "Shipped",    color: "text-slate-700", bg: "bg-slate-200 border-slate-300", icon: <Truck size={12} /> },
  delivered:  { label: "Delivered",  color: "text-[#3a352f]", bg: "bg-[#e1d5c9]/30 border-[#e1d5c9]", icon: <CheckCircle size={12} /> },
};

const ALL_STATUSES: OrderStatus[] = ["pending", "processing", "shipped", "delivered"];

export default function AdminDashboard() {
  const { user, profile, loading: authLoading, supabase } = useAuth();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState<"orders" | "products">("orders");
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [fetching, setFetching] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [newProduct, setNewProduct] = useState({
    id: "",
    category: "Top-bottom box",
    categorySlug: "top-bottom",
    description: "",
    price: "",
    image: "/images/placeholder.webp",
    size: "2.5x3x1.5",
    badge: ""
  });

  useEffect(() => {
    if (!authLoading && (!user || !profile)) return;
    if (!authLoading && profile && !profile.is_admin) router.push("/");
  }, [user, profile, authLoading, router]);

  const fetchOrders = useCallback(async () => {
    setFetching(true);
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*, profiles(full_name, email, mobile), products(image)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setOrders((data as AdminOrder[]) ?? []);
    } catch (err) {
      console.error("Admin: Error fetching orders:", err);
    } finally {
      setFetching(false);
    }
  }, [supabase]);

  const fetchProducts = useCallback(async () => {
    setFetching(true);
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setProducts((data as Product[]) ?? []);
    } catch (err) {
      console.error("Admin: Error fetching products:", err);
    } finally {
      setFetching(false);
    }
  }, [supabase]);

  useEffect(() => {
    if (profile?.is_admin) {
      if (activeTab === "orders") fetchOrders();
      else fetchProducts();
    }
  }, [profile, activeTab, fetchOrders, fetchProducts]);

  const updateStatus = async (orderId: string, newStatus: OrderStatus) => {
    setUpdating(orderId);
    await supabase.from("orders").update({ status: newStatus }).eq("id", orderId);
    setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, status: newStatus } : o));
    setUpdating(null);
  };

  const addProduct = async () => {
    if (!newProduct.id || !newProduct.description || !newProduct.price) return;
    setUpdating("new");
    const { error } = await supabase.from("products").insert({
      ...newProduct,
      price: parseFloat(newProduct.price)
    });
    if (!error) {
      setShowAddProduct(false);
      fetchProducts();
      setNewProduct({
        id: "",
        category: "Top-bottom box",
        categorySlug: "top-bottom",
        description: "",
        price: "",
        image: "/images/placeholder.webp",
        size: "2.5x3x1.5",
        badge: ""
      });
    }
    setUpdating(null);
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setUpdating(id);
    await supabase.from("products").delete().eq("id", id);
    setProducts(prev => prev.filter(p => p.id !== id));
    setUpdating(null);
  };

  if (authLoading || (user && !profile)) {
    return (
      <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-brand-brown border-t-transparent rounded-full animate-spin shadow-lg" />
        <div className="text-center">
          <p className="text-brand-charcoal font-serif font-medium text-lg">Authenticating Admin</p>
          <p className="text-brand-brown text-[10px] mt-1 italic uppercase tracking-widest">Secure Connection</p>
        </div>
      </div>
    );
  }

  if (!user || !profile?.is_admin) {
    return null; // Handled by useEffect redirect
  }

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    processing: orders.filter(o => o.status === "processing").length,
    shipped: orders.filter(o => o.status === "shipped").length,
    delivered: orders.filter(o => o.status === "delivered").length,
  };

  const filteredOrders = orders.filter(o => 
    o.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.profiles?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProducts = products.filter(p => 
    p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-brand-cream font-sans pb-24 text-brand-charcoal">
      
      {/* ── Premium Sticky Header ── */}
      <header className="sticky top-0 z-40 bg-brand-cream/90 backdrop-blur-xl border-b border-[#e1d5c9]/60 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <Link 
              href="/" 
              className="w-10 h-10 bg-[#f5f0eb] hover:bg-[#3a352f] hover:text-brand-cream rounded-full flex items-center justify-center text-brand-brown transition-all border border-[#e1d5c9]"
              title="Return to Website"
            >
              <ChevronLeft size={20} />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-serif font-medium text-brand-charcoal tracking-wide flex items-center gap-2 uppercase">
                Command Center <LayoutDashboard size={20} className="text-brand-brown hidden sm:block" />
              </h1>
              <p className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.2em] text-brand-brown mt-0.5">Precious Packaging Admin</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-4">
            <button 
              onClick={() => activeTab === "orders" ? fetchOrders() : fetchProducts()}
              disabled={fetching}
              className="w-10 h-10 bg-brand-cream border border-[#e1d5c9] hover:border-brand-brown rounded-full flex items-center justify-center text-brand-brown hover:bg-[#f5f0eb] transition-all shadow-sm group"
              title="Refresh Data"
            >
              <RefreshCw size={18} className={`${fetching ? "animate-spin text-brand-brown" : "group-hover:rotate-180 transition-transform duration-500"}`} />
            </button>
            <div className="w-10 h-10 rounded-full bg-brand-charcoal text-brand-cream flex items-center justify-center font-serif font-medium border border-brand-brown/40 shadow-md">
              {profile.full_name?.charAt(0).toUpperCase() || "A"}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* ── Status Metrics (Only for Orders) ── */}
        {activeTab === "orders" && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-8">
            {/* Total */}
            <div className="col-span-2 md:col-span-1 bg-brand-charcoal rounded-xl p-6 text-brand-cream shadow-lg relative border border-brand-brown/30">
              <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                <p className="text-[#e1d5c9] text-[10px] font-sans uppercase tracking-widest">Total Orders</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-4xl sm:text-5xl font-serif">{stats.total}</h3>
                  <ShoppingBag size={20} className="text-brand-brown" />
                </div>
              </div>
            </div>

            {/* Pending */}
            <div className="bg-[#f5f0eb] rounded-xl p-6 text-brand-charcoal shadow-sm relative border border-[#e1d5c9]">
              <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                <p className="text-brand-brown text-[10px] font-sans uppercase tracking-widest">Pending</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-3xl sm:text-4xl font-serif">{stats.pending}</h3>
                  <Clock size={20} className="text-brand-brown/60" />
                </div>
              </div>
            </div>

            {/* Processing */}
            <div className="bg-[#f5f0eb] rounded-xl p-6 text-brand-charcoal shadow-sm relative border border-[#e1d5c9]">
              <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                <p className="text-brand-brown text-[10px] font-sans uppercase tracking-widest">Processing</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-3xl sm:text-4xl font-serif">{stats.processing}</h3>
                  <Package size={20} className="text-brand-brown/60" />
                </div>
              </div>
            </div>

            {/* Shipped */}
            <div className="bg-[#f5f0eb] rounded-xl p-6 text-brand-charcoal shadow-sm relative border border-[#e1d5c9]">
              <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                <p className="text-brand-brown text-[10px] font-sans uppercase tracking-widest">Shipped</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-3xl sm:text-4xl font-serif">{stats.shipped}</h3>
                  <Truck size={20} className="text-brand-brown/60" />
                </div>
              </div>
            </div>

            {/* Delivered */}
            <div className="col-span-2 sm:col-span-1 bg-brand-charcoal rounded-xl p-6 text-brand-cream shadow-sm relative border border-brand-brown/30">
              <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                <p className="text-[#e1d5c9] text-[10px] font-sans uppercase tracking-widest">Delivered</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-3xl sm:text-4xl font-serif">{stats.delivered}</h3>
                  <CheckCircle size={20} className="text-brand-brown" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Main Content Area ── */}
        <div className="bg-brand-cream rounded-2xl shadow-sm border border-[#e1d5c9] overflow-hidden">
          
          {/* Toolbar (Tabs + Search) */}
          <div className="p-4 sm:p-6 border-b border-[#e1d5c9]/60 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-brand-cream/50">
            {/* iOS-style segmented control */}
            <div className="flex bg-[#f5f0eb] p-1.5 rounded-xl w-full md:w-fit border border-[#e1d5c9]/50">
              <button 
                onClick={() => setActiveTab("orders")}
                className={`flex-1 md:w-32 py-2.5 rounded-lg text-[11px] font-sans font-normal uppercase tracking-widest transition-all duration-300 ${activeTab === "orders" ? "bg-brand-cream text-brand-charcoal shadow-sm ring-1 ring-[#e1d5c9]" : "text-brand-brown hover:text-brand-charcoal"}`}
              >
                Orders
              </button>
              <button 
                onClick={() => setActiveTab("products")}
                className={`flex-1 md:w-32 py-2.5 rounded-lg text-[11px] font-sans font-normal uppercase tracking-widest transition-all duration-300 ${activeTab === "products" ? "bg-brand-cream text-brand-charcoal shadow-sm ring-1 ring-[#e1d5c9]" : "text-brand-brown hover:text-brand-charcoal"}`}
              >
                Products
              </button>
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              <div className="relative group w-full md:w-72">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-brown group-focus-within:text-brand-charcoal transition-colors" />
                <input 
                  type="text" 
                  placeholder={`Search ${activeTab}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-brand-cream border border-[#e1d5c9] focus:border-brand-brown focus:ring-2 focus:ring-brand-brown/10 rounded-xl pl-11 pr-4 py-3 text-sm text-brand-charcoal outline-none transition-all shadow-sm font-sans"
                />
              </div>
              {activeTab === "products" && (
                <button 
                  onClick={() => setShowAddProduct(true)}
                  className="bg-brand-charcoal hover:bg-[#3a352f] text-brand-cream text-[10px] font-sans font-normal px-5 py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md border border-brand-brown/20 uppercase tracking-widest flex-shrink-0"
                >
                  <Plus size={16} /> <span className="hidden sm:inline">Add Product</span>
                </button>
              )}
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            {activeTab === "orders" ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-brand-cream border-b border-[#e1d5c9] text-brand-brown uppercase text-[10px] items-center tracking-[0.15em] font-serif font-normal">
                    <th className="px-6 py-5 whitespace-nowrap">Customer Info</th>
                    <th className="px-6 py-5 whitespace-nowrap">Product Details</th>
                    <th className="px-6 py-5 whitespace-nowrap">Order Specs</th>
                    <th className="px-6 py-5 whitespace-nowrap">Value</th>
                    <th className="px-6 py-5 whitespace-nowrap">Payment</th>
                    <th className="px-6 py-5 whitespace-nowrap">Date</th>
                    <th className="px-6 py-5 whitespace-nowrap text-right">Fulfillment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e1d5c9]/40 bg-brand-cream">
                  {fetching ? (
                    <tr><td colSpan={7} className="py-32 text-center"><div className="w-10 h-10 border-4 border-brand-brown border-t-transparent rounded-full animate-spin mx-auto shadow-md" /></td></tr>
                  ) : filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-32 text-center">
                        <div className="w-20 h-20 bg-[#f5f0eb] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#e1d5c9]">
                          <Box size={32} className="text-brand-brown" />
                        </div>
                        <p className="text-brand-charcoal font-serif font-medium text-lg">{searchQuery ? "No matching orders" : "Your inbox is empty"}</p>
                        <p className="text-gray-500 text-sm mt-1">When customers place orders, they will appear here.</p>
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => {
                      const s = STATUS_CONFIG[order.status];
                      return (
                        <tr key={order.id} className="hover:bg-[#f5f0eb]/50 transition-colors group">
                          {/* Customer */}
                          <td className="px-6 py-5 align-top">
                            <div className="flex flex-col">
                              <span className="font-serif font-medium text-brand-charcoal text-sm">{order.profiles?.full_name || order.customer_name || "Unknown"}</span>
                              <span className="text-gray-500 text-xs mt-0.5">{order.profiles?.email ?? "No email"}</span>
                              <span className="text-gray-400 text-[11px] mt-0.5 font-medium">{order.profiles?.mobile ?? ""}</span>
                            </div>
                          </td>
                          {/* Product */}
                          <td className="px-6 py-5 align-top">
                            <div className="flex items-start gap-4">
                              <div className="w-14 h-14 rounded-xl bg-[#f5f0eb] flex items-center justify-center overflow-hidden flex-shrink-0 border border-[#e1d5c9] shadow-sm">
                                {order.products?.image ? (
                                  <img src={order.products.image} alt="" className="w-full h-full object-contain p-1" />
                                ) : (
                                  <Package size={20} className="text-gray-300" />
                                )}
                              </div>
                              <div className="flex flex-col">
                                <span className="font-serif font-medium text-brand-charcoal text-sm leading-tight max-w-[200px]">{order.product_name}</span>
                                <span className="text-gray-400 text-[10px] uppercase tracking-wider font-normal mt-2">ID: {order.id.slice(0, 8)}...</span>
                              </div>
                            </div>
                          </td>
                          {/* Specs */}
                          <td className="px-6 py-5 align-top text-gray-600 text-xs">
                            <div className="space-y-1">
                              {order.size && <div className="flex gap-2"><span className="text-gray-400 font-medium tracking-wide">Size:</span> <span className="font-normal">{order.size}</span></div>}
                              {order.color && <div className="flex gap-2"><span className="text-gray-400 font-medium tracking-wide">Color:</span> <span className="font-normal">{order.color}</span></div>}
                              <div className="flex gap-2"><span className="text-gray-400 font-medium tracking-wide">Qty:</span> <span className="font-semibold text-brand-brown">{order.quantity} units</span></div>
                              {(order.shipping_address || order.shipping_city) && (
                                <div className="mt-3 text-[11px] leading-relaxed text-gray-500 bg-[#f5f0eb] p-2 rounded-lg border border-[#e1d5c9] max-w-[200px]">
                                  {order.shipping_address}, {order.shipping_city}, {order.shipping_state} - <span className="font-normal">{order.shipping_pincode}</span>
                                </div>
                              )}
                              {order.notes && <div className="mt-2 text-brand-brown bg-[#f5f0eb] p-2 rounded-lg border border-[#e1d5c9] text-[11px] italic" title={order.notes}>Note: {order.notes}</div>}
                            </div>
                          </td>
                          {/* Total */}
                          <td className="px-6 py-5 align-top">
                            <span className="font-serif font-medium text-lg text-brand-charcoal">
                              {order.total_price ? `₹${order.total_price.toLocaleString()}` : "—"}
                            </span>
                          </td>
                          {/* Payment */}
                          <td className="px-6 py-5 align-top">
                            {order.payment_status === "paid" ? (
                              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0f5ef] text-[#6c8b55] text-[10px] font-normal uppercase tracking-widest border border-[#6c8b55]/30">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#6c8b55] animate-pulse" />
                                Paid
                              </div>
                            ) : (
                              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f5f0eb] text-gray-500 text-[10px] font-normal uppercase tracking-widest border border-[#e1d5c9]">
                                Pending
                              </div>
                            )}
                            {order.payment_method && (
                              <div className="text-[10px] text-gray-400 mt-2 font-normal uppercase tracking-wider flex items-center gap-1">
                                {order.payment_method} <ArrowUpRight size={10} />
                              </div>
                            )}
                          </td>
                          {/* Date */}
                          <td className="px-6 py-5 align-top text-gray-500 text-xs font-medium whitespace-nowrap">
                            {new Date(order.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: '2-digit', minute:'2-digit' })}
                          </td>
                          {/* Status / Actions */}
                          <td className="px-6 py-5 align-top text-right">
                            <div className="relative inline-block w-36">
                              <select
                                value={order.status}
                                disabled={updating === order.id}
                                onChange={(e) => updateStatus(order.id, e.target.value as OrderStatus)}
                                className={`w-full appearance-none pl-4 pr-8 py-2.5 rounded-xl border text-[10px] uppercase font-normal tracking-widest cursor-pointer transition-all outline-none focus:ring-2 focus:ring-brand-brown/20 ${s.bg} ${s.color} ${updating === order.id ? "opacity-50" : "hover:brightness-95"}`}
                              >
                                {ALL_STATUSES.map((st) => (
                                  <option key={st} value={st} className="text-brand-charcoal font-medium uppercase">{STATUS_CONFIG[st].label}</option>
                                ))}
                              </select>
                              <ChevronDown size={14} className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-60 ${s.color}`} />
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            ) : (
              // PRODUCTS TABLE
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-brand-cream border-b border-[#e1d5c9] text-brand-brown uppercase text-[10px] items-center tracking-[0.15em] font-serif font-normal">
                    <th className="px-6 py-5 w-24">Image</th>
                    <th className="px-6 py-5">Product Info</th>
                    <th className="px-6 py-5">Category & Size</th>
                    <th className="px-6 py-5">Price</th>
                    <th className="px-6 py-5">Added On</th>
                    <th className="px-6 py-5 text-right">Settings</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e1d5c9]/40 bg-brand-cream">
                  {fetching ? (
                    <tr><td colSpan={6} className="py-32 text-center"><div className="w-10 h-10 border-4 border-brand-brown border-t-transparent rounded-full animate-spin mx-auto shadow-md" /></td></tr>
                  ) : filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-32 text-center">
                        <div className="w-20 h-20 bg-[#f5f0eb] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#e1d5c9]">
                          <Package size={32} className="text-brand-brown" />
                        </div>
                        <p className="text-brand-charcoal font-serif font-medium text-lg">{searchQuery ? "No matching products" : "No products added"}</p>
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-[#f5f0eb]/50 transition-colors group">
                        <td className="px-6 py-4 align-middle">
                          <div className="w-16 h-16 rounded-2xl bg-[#f5f0eb] flex items-center justify-center overflow-hidden border border-[#e1d5c9] shadow-sm">
                            <img src={product.image} alt="" className="w-full h-full object-contain p-1 group-hover:scale-110 transition-transform duration-500" />
                          </div>
                        </td>
                        <td className="px-6 py-4 align-middle">
                          <p className="font-serif font-medium text-brand-charcoal tracking-wide">{product.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-normal bg-[#f5f0eb] px-2 py-0.5 rounded-md border border-[#e1d5c9]">{product.id}</p>
                            {product.badge && <span className="text-[10px] font-normal text-brand-brown bg-[#f5f0eb] px-2 py-0.5 rounded-md border border-[#e1d5c9]">{product.badge}</span>}
                          </div>
                        </td>
                        <td className="px-6 py-4 align-middle">
                          <span className="text-xs font-normal font-serif text-brand-charcoal bg-[#f5f0eb] border border-[#e1d5c9] px-3 py-1 rounded-lg tracking-wider uppercase">{product.category}</span>
                          <div className="text-[11px] text-gray-400 mt-2 font-medium flex items-center gap-1">
                            <Box size={12} /> {product.size}
                          </div>
                        </td>
                        <td className="px-6 py-4 align-middle">
                          <span className="font-serif font-medium text-lg text-brand-charcoal">₹{product.price.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4 align-middle text-gray-500 text-xs font-medium">
                          {new Date(product.created_at).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                        </td>
                        <td className="px-6 py-4 align-middle text-right">
                          <button 
                            onClick={() => deleteProduct(product.id)}
                            disabled={updating === product.id}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                            title="Delete Product"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>

      {/* ── Beautiful Add Product Modal ── */}
      {showAddProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => setShowAddProduct(false)} />
          <div className="relative w-full max-w-2xl bg-brand-cream rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-[#e1d5c9]">
            {/* Header */}
            <div className="px-8 py-6 border-b border-[#e1d5c9]/60 flex items-center justify-between bg-brand-cream">
              <div>
                <h2 className="text-2xl font-serif font-medium text-brand-charcoal tracking-wide">Add New Product</h2>
                <p className="text-[10px] text-brand-brown font-normal uppercase tracking-widest mt-1">Expand your catalog</p>
              </div>
              <button onClick={() => setShowAddProduct(false)} className="w-10 h-10 bg-[#f5f0eb] rounded-full hover:bg-[#e1d5c9] flex items-center justify-center transition-colors border border-[#e1d5c9]/60 shadow-sm group">
                <Plus size={20} className="text-brand-brown rotate-45 group-hover:text-brand-charcoal transition-colors" />
              </button>
            </div>

            <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar bg-brand-cream">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-[10px] font-normal uppercase tracking-widest text-brand-brown mb-2 ml-1">Product ID (Unique)</label>
                    <div className="relative">
                      <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-brown" size={16} />
                      <input 
                        type="text" placeholder="e.g. mb-1" 
                        value={newProduct.id} onChange={(e) => setNewProduct({...newProduct, id: e.target.value})}
                        className="w-full bg-brand-cream border border-[#e1d5c9] focus:border-brand-brown focus:ring-2 focus:ring-brand-brown/10 rounded-xl pl-12 pr-4 py-3.5 text-sm font-normal text-brand-charcoal outline-none transition-all"
                      />
                    </div>
                 </div>
                 <div>
                    <label className="block text-[10px] font-normal uppercase tracking-widest text-brand-brown mb-2 ml-1">Category</label>
                    <div className="relative">
                      <select 
                        value={newProduct.categorySlug} 
                        onChange={(e) => {
                          const slug = e.target.value;
                          const label = slug === "top-bottom" ? "Top-bottom box" : slug === "magnet" ? "Magnet box" : "Drawer box";
                          setNewProduct({...newProduct, categorySlug: slug, category: label});
                        }}
                        className="w-full bg-brand-cream border border-[#e1d5c9] focus:border-brand-brown focus:ring-2 focus:ring-brand-brown/10 rounded-xl pl-4 pr-10 py-3.5 text-sm font-normal text-brand-charcoal outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="top-bottom">Top-bottom box</option>
                        <option value="magnet">Magnet box</option>
                        <option value="drawer">Drawer box</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-brown pointer-events-none" />
                    </div>
                 </div>

                 <div className="sm:col-span-2">
                  <label className="block text-[10px] font-normal uppercase tracking-widest text-brand-brown mb-2 ml-1">Product Title</label>
                  <div className="relative">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-brown" size={16} />
                    <input 
                      type="text" placeholder="e.g. Premium Rigid Box for Jewellery" 
                      value={newProduct.description} onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                      className="w-full bg-brand-cream border border-[#e1d5c9] focus:border-brand-brown focus:ring-2 focus:ring-brand-brown/10 rounded-xl pl-12 pr-4 py-3.5 text-sm font-normal text-brand-charcoal outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-normal uppercase tracking-widest text-brand-brown mb-2 ml-1">Price (₹)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-brown font-serif font-normal">₹</span>
                    <input 
                      type="number" placeholder="50" 
                      value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      className="w-full bg-brand-cream border border-[#e1d5c9] focus:border-brand-brown focus:ring-2 focus:ring-brand-brown/10 rounded-xl pl-10 pr-4 py-3.5 text-sm font-serif font-medium text-brand-charcoal outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-normal uppercase tracking-widest text-brand-brown mb-2 ml-1">Dimensions / Size</label>
                  <div className="relative">
                    <Box className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-brown" size={16} />
                    <input 
                      type="text" placeholder="2.5x3x1.5" 
                      value={newProduct.size} onChange={(e) => setNewProduct({...newProduct, size: e.target.value})}
                      className="w-full bg-brand-cream border border-[#e1d5c9] focus:border-brand-brown focus:ring-2 focus:ring-brand-brown/10 rounded-xl pl-12 pr-4 py-3.5 text-sm font-medium text-brand-charcoal outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-normal uppercase tracking-widest text-brand-brown mb-2 ml-1">Image URL</label>
                  <input 
                    type="text" placeholder="https://example.com/image.jpg" 
                    value={newProduct.image} onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                    className="w-full bg-brand-cream border border-[#e1d5c9] focus:border-brand-brown focus:ring-2 focus:ring-brand-brown/10 rounded-xl px-4 py-3.5 text-sm font-medium text-brand-charcoal outline-none transition-all"
                  />
                  {/* Image Preview */}
                  {newProduct.image && (
                    <div className="mt-3 w-16 h-16 rounded-xl border border-[#e1d5c9] overflow-hidden bg-[#f5f0eb]">
                       <img src={newProduct.image} alt="Preview" className="w-full h-full object-contain p-1" onError={(e) => e.currentTarget.style.display = 'none'} />
                    </div>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-normal uppercase tracking-widest text-brand-brown mb-2 ml-1">Badge / Tag (Optional)</label>
                  <input 
                    type="text" placeholder="e.g. Best Seller, New Arrival" 
                    value={newProduct.badge} onChange={(e) => setNewProduct({...newProduct, badge: e.target.value})}
                    className="w-full bg-brand-cream border border-[#e1d5c9] focus:border-brand-brown focus:ring-2 focus:ring-brand-brown/10 rounded-xl px-4 py-3.5 text-sm font-medium text-brand-charcoal outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-[#e1d5c9]/60 bg-brand-cream">
              <button 
                onClick={addProduct}
                disabled={!newProduct.id || !newProduct.description || !newProduct.price || updating === "new"}
                className="w-full py-4 bg-brand-charcoal text-brand-cream rounded-xl font-normal uppercase tracking-widest text-[11px] hover:bg-[#3a352f] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
              >
                {updating === "new" ? <div className="w-4 h-4 border-2 border-[#e1d5c9]/40 border-t-[#e1d5c9] rounded-full animate-spin" /> : <Plus size={16} />} 
                {updating === "new" ? "Creating Product..." : "Launch Product"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
