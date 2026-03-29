import React from 'react';

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-brand-cream py-24 px-6">
      <div className="max-w-3xl mx-auto bg-brand-cream p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-semibold text-brand-dark-brown mb-6">Refund and Cancellation Policy</h1>
        <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
          <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
          <p>At PreciousPackaging, we take great pride in delivering premium quality boxes to our corporate clients. Due to the high volume and custom nature of physical manufacturing, our refund rules are strict.</p>
          
          <h2 className="text-xl font-normal text-brand-dark-brown mt-8 mb-4">1. Cancellations</h2>
          <p>Orders can only be cancelled within 24 hours of placement entirely free of charge. Once an order enters the manufacturing or dispatch phase, cancellations are strictly not accepted.</p>
          
          <h2 className="text-xl font-normal text-brand-dark-brown mt-8 mb-4">2. Returns</h2>
          <p>We do not accept returns for change of mind. Returns are only granted if the boxes delivered are materially defective, damaged in transit, or the wrong specification. You must report damages within 3 days of delivery with photographic evidence.</p>
          
          <h2 className="text-xl font-normal text-brand-dark-brown mt-8 mb-4">3. Refunds</h2>
          <p>If a return is approved for damaged goods, we will initiate a full replacement or a refund to your original method of payment. Please allow 5-7 business days for the refund to process to your bank account via Razorpay.</p>
          
          <h2 className="text-xl font-normal text-brand-dark-brown mt-8 mb-4">4. Process</h2>
          <p>To start a return or cancellation, you can contact us at hi@preciouspackaging.in. If your return is accepted, we'll send you a return shipping label, as well as instructions on how and where to send your package.</p>
        </div>
      </div>
    </div>
  );
}
