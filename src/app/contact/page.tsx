"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";

function ContactContent() {
  const searchParams = useSearchParams();
  const subjectParam = searchParams.get("subject") || "General Inquiry";
  const detailsParam = searchParams.get("details") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      subject: subjectParam,
      message: detailsParam ? `I would like to request a quote for the following items in my cart:\n\n${detailsParam}` : "",
    }));
  }, [subjectParam, detailsParam]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API request to save/send enquiry
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        mobile: "",
        subject: "General Inquiry",
        message: "",
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-brand-cream flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-sans text-xs font-semibold tracking-widest text-brand-brown uppercase">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-brand-charcoal mt-3 mb-6 tracking-wide uppercase">
            Let's Craft Your Brand's First Impression
          </h1>
          <div className="w-12 h-0.5 bg-brand-brown mx-auto mb-6" />
          <p className="text-brand-charcoal/70 font-light text-sm sm:text-base leading-relaxed">
            Have questions about our custom jewelry boxes, premium printing options, or bulk order pricing? Reach out to our design consultants.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Contact Details (Left side) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-10">
            <div className="space-y-8">
              <h2 className="text-xl sm:text-2xl font-serif text-brand-charcoal tracking-wide">
                Direct Channels
              </h2>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-[#f5f0eb] border border-[#e1d5c9] rounded-xl flex items-center justify-center text-brand-brown flex-shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-brand-charcoal/50 font-bold mb-1">
                    Email Consultation
                  </h4>
                  <a href="mailto:Preciouspack1@gmail.com" className="text-brand-dark-brown hover:text-brand-brown font-semibold text-sm sm:text-base transition-colors">
                    Preciouspack1@gmail.com
                  </a>
                  <p className="text-[11px] text-brand-charcoal/60 mt-1">Our team replies within 1 business day.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-[#f5f0eb] border border-[#e1d5c9] rounded-xl flex items-center justify-center text-brand-brown flex-shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-brand-charcoal/50 font-bold mb-1">
                    WhatsApp / Call Support
                  </h4>
                  <a href="https://wa.me/919082289062" target="_blank" rel="noopener noreferrer" className="text-brand-dark-brown hover:text-brand-brown font-semibold text-sm sm:text-base transition-colors">
                    +91 90822 89062
                  </a>
                  <p className="text-[11px] text-brand-charcoal/60 mt-1">Available Mon-Sat: 10:00 AM - 7:00 PM IST.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-[#f5f0eb] border border-[#e1d5c9] rounded-xl flex items-center justify-center text-brand-brown flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-brand-charcoal/50 font-bold mb-1">
                    Corporate Office
                  </h4>
                  <p className="text-brand-charcoal text-sm sm:text-base font-semibold">
                    Precious Packaging Co.
                  </p>
                  <p className="text-brand-charcoal/70 text-xs sm:text-sm mt-0.5">
                    Mumbai, Maharashtra, India
                  </p>
                </div>
              </div>
            </div>

            {/* Premium Notice Box */}
            <div className="bg-[#fcfaf7] border border-[#e1d5c9] rounded-2xl p-6 shadow-sm">
              <h3 className="font-serif text-sm text-brand-charcoal font-semibold mb-2">Looking for a Sample Kit?</h3>
              <p className="text-xs text-brand-charcoal/70 leading-relaxed">
                Order our sample tactile kit to test the texture of premium papers, soft velvet inserts, and hot foil colors before placing a production order.
              </p>
              <Link 
                href="/products"
                className="inline-flex items-center gap-1.5 mt-3 text-[10px] uppercase font-bold tracking-widest text-[#8b7355] hover:text-brand-charcoal transition-colors border-b border-[#8b7355]/30 hover:border-brand-charcoal pb-px"
              >
                Explore Sample Box →
              </Link>
            </div>
          </div>

          {/* Contact Inquiry Form (Right side) */}
          <div className="lg:col-span-7 bg-brand-cream border border-[#e5e0d8] rounded-3xl p-6 sm:p-10 shadow-[0_4px_30px_-10px_rgba(0,0,0,0.04)] relative overflow-hidden">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4 gap-4 animate-in fade-in duration-500">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-serif text-brand-charcoal font-medium">Inquiry Submitted Successfully</h3>
                <p className="text-brand-charcoal/70 text-sm max-w-sm">
                  Thank you for contacting Precious Packaging. A dedicated packaging consultant will reach out via email or phone shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-brand-brown hover:bg-brand-dark-brown text-white text-xs font-bold uppercase tracking-widest rounded-md transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif text-brand-charcoal tracking-wide mb-2">
                    Request an Inquiry
                  </h2>
                  <p className="text-xs text-brand-charcoal/60">
                    Fill out the options below, and our experts will customize a proposal for your brand.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-[10px] font-bold tracking-widest uppercase text-brand-charcoal/60">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sophia Loren"
                      className="w-full bg-[#fcfaf7] border border-[#e1d5c9] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-brown focus:ring-1 focus:ring-brand-brown transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-[10px] font-bold tracking-widest uppercase text-brand-charcoal/60">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. sophia@brand.com"
                      className="w-full bg-[#fcfaf7] border border-[#e1d5c9] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-brown focus:ring-1 focus:ring-brand-brown transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="mobile" className="text-[10px] font-bold tracking-widest uppercase text-brand-charcoal/60">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      required
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      placeholder="e.g. +91 90822 89062"
                      className="w-full bg-[#fcfaf7] border border-[#e1d5c9] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-brown focus:ring-1 focus:ring-brand-brown transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="subject" className="text-[10px] font-bold tracking-widest uppercase text-brand-charcoal/60">
                      Inquiry Category
                    </label>
                    <select
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#fcfaf7] border border-[#e1d5c9] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-brown focus:ring-1 focus:ring-brand-brown transition-all appearance-none cursor-pointer"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Quote">Request a Quote</option>
                      <option value="Checkout">Checkout Inquiry</option>
                      <option value="Customization">Custom Packaging Design</option>
                      <option value="Sample Kit Request">Sample Tactile Kit Request</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-[10px] font-bold tracking-widest uppercase text-brand-charcoal/60">
                    Message / Spec Details
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe box type, required dimensions, logo files, or quantity details..."
                    className="w-full bg-[#fcfaf7] border border-[#e1d5c9] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-brown focus:ring-1 focus:ring-brand-brown transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-brand-dark-brown text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-brand-brown active:bg-[#3d2a1f] disabled:bg-gray-400 transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={12} />
                      <span>SUBMIT INQUIRY</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-brand-cream flex items-center justify-center">
        <div className="w-8 h-8 border-[3px] border-brand-brown/20 border-t-[#8b7355] rounded-full animate-spin" />
      </div>
    }>
      <ContactContent />
    </Suspense>
  );
}
