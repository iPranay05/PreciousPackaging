import React from 'react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-brand-cream py-24 px-6 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-brand-cream p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 text-center">
        <div className="w-16 h-16 bg-[#F4F7FB] text-[#4169E1] rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 className="text-3xl font-semibold text-brand-dark-brown mb-4">Contact Us</h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto text-sm leading-relaxed">
          Have a question about our packaging solutions? We're here to help. Reach out to our team during standard business hours (IST).
        </p>
        
        <div className="space-y-6 text-brand-dark-brown">
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
            <h3 className="font-normal text-lg mb-1">Email Support</h3>
            <a href="mailto:hi@preciouspackaging.in" className="text-[#4169E1] hover:underline font-medium">hi@preciouspackaging.in</a>
            <p className="text-xs text-gray-400 mt-2">Expect a response within 24 hours.</p>
          </div>
          
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
            <h3 className="font-normal text-lg mb-1">Office Address</h3>
            <p className="text-sm font-medium">Precious Packaging</p>
            <p className="text-sm">Mumbai, Maharashtra</p>
            <p className="text-sm">India</p>
          </div>
        </div>
      </div>
    </div>
  );
}
