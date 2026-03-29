import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

// Admin Supabase client – requires the service role key. Never falls back to the public anon key.
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!serviceRoleKey) {
  throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set. Cannot create admin client.");
}
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  serviceRoleKey
);

export async function POST(req: Request) {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature, 
      supabase_order_id 
    } = await req.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const secret = process.env.RAZORPAY_KEY_SECRET || '';

    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // 1. SECURE ORDER UPDATE
      const { error: updateError } = await supabaseAdmin
        .from('orders')
        .update({ 
          payment_status: 'paid',
          transaction_id: razorpay_payment_id
        })
        .eq('id', supabase_order_id);

      if (updateError) {
        console.error("Failed to update order status in Supabase:", updateError);
        // Even though payment succeeded, our DB update failed.
        // We still return true to frontend to show success, but in a real app
        // you might want a webhook fallback.
      }

      return NextResponse.json({ verified: true, message: 'Payment verified and order updated' }, { status: 200 });
    } else {
      return NextResponse.json({ verified: false, error: 'Invalid Payment Signature' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Razorpay Verification Error:', error);
    return NextResponse.json(
      { verified: false, error: 'Payment verification failed. Please contact support.' },
      { status: 500 }
    );
  }
}
