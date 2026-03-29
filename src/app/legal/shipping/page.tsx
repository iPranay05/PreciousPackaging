import React from 'react';

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-brand-cream py-24 px-6">
      <div className="max-w-3xl mx-auto bg-brand-cream p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-semibold text-brand-dark-brown mb-6">Shipping Policy</h1>
        <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
          <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
          <p>This shipping policy explains how PreciousPackaging handles the delivery of our premium boxes to our corporate clients across India.</p>
          
          <h2 className="text-xl font-normal text-brand-dark-brown mt-8 mb-4">1. Processing Time</h2>
          <p>All standard orders are processed within 2 to 3 business days (excluding weekends and holidays) after receiving your order confirmation email. Custom orders will receive an estimated timeline upon quotation approval.</p>
          
          <h2 className="text-xl font-normal text-brand-dark-brown mt-8 mb-4">2. Shipping Rates and Estimates</h2>
          <p>Shipping charges for your order will be calculated and displayed at checkout. We utilize leading logistics providers to ensure safe delivery. Standard shipping generally takes 5-7 business days depending on your location in India.</p>
          
          <h2 className="text-xl font-normal text-brand-dark-brown mt-8 mb-4">3. Order Tracking</h2>
          <p>When your order has shipped, you will receive an email notification from us which will include a tracking number you can use to check its status. Please allow 48 hours for the tracking information to become available.</p>
          
          <h2 className="text-xl font-normal text-brand-dark-brown mt-8 mb-4">4. Domestic Shipping Only</h2>
          <p>Currently, PreciousPackaging only ships within India. We do not offer international shipping at this moment.</p>
        </div>
      </div>
    </div>
  );
}
