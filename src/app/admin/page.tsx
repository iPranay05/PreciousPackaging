"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { supabasePublic } from "@/lib/supabase";
import { Package, Clock, Truck, CheckCircle, ChevronDown, Plus, Trash2, Tag, Box, Hash, RefreshCw } from "lucide-react";

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

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; icon: React.ReactNode }> = {
  pending:    { label: "Pending",    color: "bg-yellow-100 text-yellow-800 border-yellow-200",   icon: <Clock size={12} /> },
  processing: { label: "Processing", color: "bg-blue-100 text-blue-800 border-blue-200",         icon: <Package size={12} /> },
  shipped:    { label: "Shipped",    color: "bg-purple-100 text-purple-800 border-purple-200",   icon: <Truck size={12} /> },
  delivered:  { label: "Delivered",  color: "bg-green-100 text-green-800 border-green-200",      icon: <CheckCircle size={12} /> },
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
    console.log("Admin: Fetching orders...");
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*, profiles(full_name, email, mobile), products(image)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setOrders((data as AdminOrder[]) ?? []);
      console.log("Admin: Orders fetched successfully:", data?.length ?? 0);
    } catch (err) {
      console.error("Admin: Error fetching orders:", err);
    } finally {
      setFetching(false);
    }
  }, [supabase]);

  const fetchProducts = useCallback(async () => {
    setFetching(true);
    console.log("Admin: Fetching products...");
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setProducts((data as Product[]) ?? []);
      console.log("Admin: Products fetched successfully:", data?.length ?? 0);
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

  // 1. Still loading auth/profile — show spinner
  if (authLoading || (user && !profile)) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-[#0A2540] border-t-transparent rounded-full animate-spin" />
        <div className="text-center">
          <p className="text-[#0A2540] font-bold text-sm">Loading Dashboard...</p>
          <p className="text-gray-400 text-[10px] mt-1 italic uppercase tracking-widest">Checking Authorization</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 text-[10px] text-gray-400 underline hover:text-[#0A2540] transition-colors uppercase tracking-widest font-black"
          >
            Taking too long? Force Reload
          </button>
        </div>
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
    <div className="min-h-screen bg-[#f8f9fa] pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">← Back to Site</Link>
            <h1 className="text-3xl font-black text-[#0A2540] mt-2 tracking-tighter">Admin Dashboard</h1>
            <p className="text-gray-500 text-sm">Manage orders and product catalog</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button 
              onClick={() => activeTab === "orders" ? fetchOrders() : fetchProducts()}
              disabled={fetching}
              className="p-2.5 bg-white border-2 border-transparent hover:border-gray-200 rounded-xl text-gray-400 hover:text-[#0A2540] transition-all shadow-sm group"
              title="Refresh Data"
            >
              <RefreshCw size={18} className={`${fetching ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"}`} />
            </button>
            <div className="relative group">
              <input 
                type="text" 
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white border-2 border-transparent focus:border-[#0A2540] rounded-xl px-10 py-2.5 text-sm w-full md:w-64 outline-none transition-all shadow-sm group-hover:shadow-md"
              />
              <Tag size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0A2540] transition-colors" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <Plus size={16} className="rotate-45" />
                </button>
              )}
            </div>
            {activeTab === "products" && (
              <button 
                onClick={() => setShowAddProduct(true)}
                className="bg-[#0A2540] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-[#163a5f] transition-all shadow-lg shadow-[#0A2540]/10 uppercase tracking-widest"
              >
                <Plus size={14} /> Add Product
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-8 w-fit">
          <button 
            onClick={() => setActiveTab("orders")}
            className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === "orders" ? "bg-white text-[#0A2540] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            Orders
          </button>
          <button 
            onClick={() => setActiveTab("products")}
            className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === "products" ? "bg-white text-[#0A2540] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            Products
          </button>
        </div>

        {/* Stats */}
        {activeTab === "orders" && (
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
        )}

        {/* Table View */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            {activeTab === "orders" ? (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#0A2540] text-white uppercase text-[10px] tracking-[0.2em] font-bold">
                    <th className="px-5 py-4">Customer</th>
                    <th className="px-5 py-4">Product</th>
                    <th className="px-5 py-4">Details</th>
                    <th className="px-5 py-4">Total</th>
                    <th className="px-5 py-4">Payment</th>
                    <th className="px-5 py-4">Date</th>
                    <th className="px-5 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {fetching ? (
                    <tr><td colSpan={6} className="py-20 text-center"><div className="w-8 h-8 border-4 border-[#0A2540] border-t-transparent rounded-full animate-spin mx-auto" /></td></tr>
                  ) : filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-20 text-center">
                        <Box size={48} className="text-gray-200 mx-auto mb-4" />
                        <p className="text-gray-400 font-medium">{searchQuery ? "No results found" : "No orders yet"}</p>
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => {
                      const s = STATUS_CONFIG[order.status];
                      return (
                        <tr key={order.id} className="hover:bg-gray-50/60 transition-colors">
                          <td className="px-5 py-4">
                            <p className="font-semibold text-[#0A2540]">{order.profiles?.full_name ?? "—"}</p>
                            <p className="text-gray-400 text-xs truncate max-w-[160px]">{order.profiles?.email ?? "—"}</p>
                            <p className="text-gray-400 text-xs truncate max-w-[160px]">{order.profiles?.mobile ?? "—"}</p>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                                {order.products?.image ? (
                                  <img src={order.products.image} alt="" className="w-full h-full object-cover" />
                                ) : (
                                  <Package size={20} className="text-gray-300" />
                                )}
                              </div>
                              <span className="font-medium text-gray-800">{order.product_name}</span>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-gray-500 text-xs">
                            {order.size && <div>Size: {order.size}</div>}
                            {order.color && <div>Color: {order.color}</div>}
                            <div>Qty: {order.quantity}</div>
                            {order.customer_name && <div className="mt-1 font-bold text-[#0A2540]">For: {order.customer_name}</div>}
                            {(order.shipping_address || order.shipping_city) && (
                              <div className="mt-1 text-[10px] leading-tight text-gray-400">
                                {order.shipping_address}, {order.shipping_city}, {order.shipping_state} - {order.shipping_pincode}
                              </div>
                            )}
                            {order.notes && <div className="mt-1 italic truncate max-w-[150px]" title={order.notes}>Note: {order.notes}</div>}
                          </td>
                          <td className="px-5 py-4 font-bold text-[#0A2540]">
                            {order.total_price ? `₹${order.total_price.toLocaleString()}` : "—"}
                          </td>
                          <td className="px-5 py-4">
                            {order.payment_status === "paid" ? (
                              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-[10px] font-black uppercase tracking-widest border border-green-100">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                Paid
                              </div>
                            ) : (
                              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest border border-gray-100 italic">
                                Pending
                              </div>
                            )}
                            {order.payment_method && (
                              <div className="text-[9px] text-gray-400 mt-1 font-bold">{order.payment_method}</div>
                            )}
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
                    })
                  )}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#0A2540] text-white uppercase text-[10px] tracking-[0.2em] font-bold">
                    <th className="px-5 py-4 w-20">Image</th>
                    <th className="px-5 py-4">Product ID</th>
                    <th className="px-5 py-4">Description</th>
                    <th className="px-5 py-4">Category</th>
                    <th className="px-5 py-4">Price</th>
                    <th className="px-5 py-4">Date</th>
                    <th className="px-5 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {fetching ? (
                    <tr><td colSpan={7} className="py-20 text-center"><div className="w-8 h-8 border-4 border-[#0A2540] border-t-transparent rounded-full animate-spin mx-auto" /></td></tr>
                  ) : filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-20 text-center">
                        <Box size={48} className="text-gray-200 mx-auto mb-4" />
                        <p className="text-gray-400 font-medium">{searchQuery ? "No results found" : "No products found"}</p>
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50/60 transition-colors">
                        <td className="px-5 py-4">
                          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                            <img src={product.image} alt="" className="w-full h-full object-cover" />
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-bold text-[#0A2540]">{product.description}</p>
                          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-black">{product.id}</p>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-xs font-bold text-gray-500">{product.category}</span>
                          <div className="text-[10px] text-gray-400">Size: {product.size}</div>
                        </td>
                        <td className="px-5 py-4 font-bold text-[#0A2540]">₹{product.price.toLocaleString()}</td>
                        <td className="px-5 py-4 text-gray-400 text-xs">
                          {new Date(product.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-5 py-4 text-right">
                          <button 
                            onClick={() => deleteProduct(product.id)}
                            disabled={updating === product.id}
                            className="text-gray-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
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
      </div>

      {/* ── Add Product Modal ── */}
      {showAddProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0A2540]/60 backdrop-blur-sm" onClick={() => setShowAddProduct(false)} />
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-black text-[#0A2540] tracking-tight">Add New Product</h2>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Product Details</p>
                </div>
                <button onClick={() => setShowAddProduct(false)} className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                <div className="col-span-2 space-y-4">
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5 ml-1">Product ID (Unique)</label>
                        <div className="relative">
                          <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
                          <input 
                            type="text" placeholder="e.g. mb-1" 
                            value={newProduct.id} onChange={(e) => setNewProduct({...newProduct, id: e.target.value})}
                            className="w-full bg-gray-50 border-2 border-transparent focus:border-[#0A2540] focus:bg-white rounded-xl pl-9 pr-4 py-3 text-sm font-bold text-[#0A2540] outline-none transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5 ml-1">Category</label>
                        <select 
                          value={newProduct.categorySlug} 
                          onChange={(e) => {
                            const slug = e.target.value;
                            const label = slug === "top-bottom" ? "Top-bottom box" : slug === "magnet" ? "Magnet box" : "Drawer box";
                            setNewProduct({...newProduct, categorySlug: slug, category: label});
                          }}
                          className="w-full bg-gray-50 border-2 border-transparent focus:border-[#0A2540] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold text-[#0A2540] outline-none transition-all appearance-none"
                        >
                          <option value="top-bottom">Top-bottom box</option>
                          <option value="magnet">Magnet box</option>
                          <option value="drawer">Drawer box</option>
                        </select>
                      </div>
                   </div>

                   <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5 ml-1">Description / Name</label>
                    <div className="relative">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
                      <input 
                        type="text" placeholder="e.g. Rigid Box for Jewellery" 
                        value={newProduct.description} onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                        className="w-full bg-gray-50 border-2 border-transparent focus:border-[#0A2540] focus:bg-white rounded-xl pl-9 pr-4 py-3 text-sm font-bold text-[#0A2540] outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5 ml-1">Price (₹)</label>
                      <input 
                        type="number" placeholder="50.00" 
                        value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                        className="w-full bg-gray-50 border-2 border-transparent focus:border-[#0A2540] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold text-[#0A2540] outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5 ml-1">Standard Size</label>
                      <div className="relative">
                        <Box className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
                        <input 
                          type="text" placeholder="2.5x3x1.5" 
                          value={newProduct.size} onChange={(e) => setNewProduct({...newProduct, size: e.target.value})}
                          className="w-full bg-gray-50 border-2 border-transparent focus:border-[#0A2540] focus:bg-white rounded-xl pl-9 pr-4 py-3 text-sm font-bold text-[#0A2540] outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5 ml-1">Image URL</label>
                    <input 
                      type="text" placeholder="/images/products/example.webp" 
                      value={newProduct.image} onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-[#0A2540] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold text-[#0A2540] outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5 ml-1">Product Badge (Optional)</label>
                    <input 
                      type="text" placeholder="Premium, New, Sale..." 
                      value={newProduct.badge} onChange={(e) => setNewProduct({...newProduct, badge: e.target.value})}
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-[#0A2540] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold text-[#0A2540] outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <button 
                  onClick={addProduct}
                  disabled={!newProduct.id || !newProduct.description || !newProduct.price || updating === "new"}
                  className="w-full py-4 bg-[#0A2540] text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-[#163a5f] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xl shadow-[#0A2540]/20"
                >
                  {updating === "new" ? <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <Plus size={16} />} 
                  {updating === "new" ? "Creating..." : "Create Product"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
