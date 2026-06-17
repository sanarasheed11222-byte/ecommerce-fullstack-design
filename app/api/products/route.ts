import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/mongodb';
const ProductSchema = new mongoose.Schema({
  name: String, price: Number, category: String,
  image: String, description: String, stock: Number,
}, { timestamps: true });
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find();
    return NextResponse.json(products);
  } catch (error: any) {
    console.error('Products API Error:', error.message);
    return NextResponse.json({ error: 'Failed to fetch', details: error.message }, { status: 500 });
  }
}
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const product = await Product.create(body);
    return NextResponse.json(product);
  } catch (error: any) {
    console.error('Products POST Error:', error.message);
    return NextResponse.json({ error: 'Failed to create', details: error.message }, { status: 500 });
  }
}
