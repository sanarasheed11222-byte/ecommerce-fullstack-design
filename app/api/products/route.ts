import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: String, price: Number, category: String,
  image: String, description: String, stock: Number,
});
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export async function GET() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const products = await Product.find({});
    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
