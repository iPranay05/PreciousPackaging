import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f9f9f9] py-24 px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-black text-[#0A2540] mb-6">Privacy Policy</h1>
        <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
          <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
          <p>Your privacy is important to us. This Privacy Policy outlines how your personal information is collected, used, and shared when you visit or make a purchase from PreciousPackaging.</p>
          
          <h2 className="text-xl font-bold text-[#0A2540] mt-8 mb-4">1. Personal Information We Collect</h2>
          <p>When you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information, email address, and phone number. We refer to this information as "Order Information".</p>
          
          <h2 className="text-xl font-bold text-[#0A2540] mt-8 mb-4">2. How We Use Your Personal Information</h2>
          <p>We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations).</p>
          
          <h2 className="text-xl font-bold text-[#0A2540] mt-8 mb-4">3. Data Retention</h2>
          <p>When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.</p>
          
          <h2 className="text-xl font-bold text-[#0A2540] mt-8 mb-4">4. Contact Us</h2>
          <p>For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at hi@preciouspackaging.in.</p>
        </div>
      </div>
    </div>
  );
}
