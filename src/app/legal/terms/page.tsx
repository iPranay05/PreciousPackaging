import React from 'react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-brand-cream py-24 px-6">
      <div className="max-w-3xl mx-auto bg-brand-cream p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-semibold text-brand-dark-brown mb-6">Terms and Conditions</h1>
        <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
          <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
          <p>Welcome to PreciousPackaging. By accessing or using our website, you agree to be bound by these Terms and Conditions.</p>
          
          <h2 className="text-xl font-normal text-brand-dark-brown mt-8 mb-4">1. General Overview</h2>
          <p>PreciousPackaging provides premium, sustainable packaging solutions. By placing an order, you agree that you are legally capable of entering into binding contracts.</p>
          
          <h2 className="text-xl font-normal text-brand-dark-brown mt-8 mb-4">2. Products and Pricing</h2>
          <p>All descriptions of products or product pricing are subject to change at any time without notice, at our sole discretion. We reserve the right to discontinue any product at any time.</p>
          
          <h2 className="text-xl font-normal text-brand-dark-brown mt-8 mb-4">3. Payments</h2>
          <p>We use Razorpay for processing secure payments. You must provide current, complete, and accurate purchase and account information for all purchases made at our store.</p>
          
          <h2 className="text-xl font-normal text-brand-dark-brown mt-8 mb-4">4. Governing Law</h2>
          <p>These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of India.</p>
        </div>
      </div>
    </div>
  );
}
