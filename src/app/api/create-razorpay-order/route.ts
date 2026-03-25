import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { createClient } from '@supabase/supabase-js';

// Use environment variables for sensitive keys
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

// Admin Supabase client to bypass RLS for secure inserts
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      product_id, quantity, color, size, notes, checkoutData, user_id, user_email
    } = body;

    // 1. SECURE PRICE LOOKUP: Fetch real price from database
    const { data: product, error: productError } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('id', product_id)
      .single();

    if (productError || !product) {
      throw new Error("Invalid product ID or product not found.");
    }

    // 2. SECURE CALCULATION: Price * Quantity * GST
    const baseTotal = product.price * quantity;
    const finalAmount = Math.ceil(baseTotal * 1.12); // Round up GST

    // 3. CREATE RAZORPAY ORDER
    const options = {
      amount: Math.round(finalAmount * 100), // Razorpay expects amount in paise (1 INR = 100 paise)
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`,
    };
    const razorpayOrder = await razorpay.orders.create(options);
    
    // 4. SECURE ORDER INSERTION (PENDING STATE)
    const { data: supabaseOrder, error: insertError } = await supabaseAdmin
      .from("orders")
      .insert({
        user_id: user_id,
        product_id: product.id,
        product_name: product.description,
        size: size,
        color: color,
        quantity: quantity,
        total_price: finalAmount,
        notes: notes ? notes : null,
        customer_name: checkoutData.name,
        shipping_address: checkoutData.address,
        shipping_city: checkoutData.city,
        shipping_state: checkoutData.state,
        shipping_pincode: checkoutData.pincode,
        payment_method: "Razorpay",
        payment_status: "pending", 
        transaction_id: razorpayOrder.id, // Temporary until verfied
      })
      .select('id')
      .single();

    if (insertError || !supabaseOrder) {
      console.error("Supabase Insert Error:", insertError);
      throw new Error("Failed to create pending order record.");
    }

    return NextResponse.json({
      id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      supabase_order_id: supabaseOrder.id
    });
  } catch (error: any) {
    console.error('Secure Order Creation Error:', error);
    return NextResponse.json(
      { error: 'Failed to create secure order', details: error.message },
      { status: 500 }
    );
  }
}
