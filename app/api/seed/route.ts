import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/mongodb';

const ProductSchema = new mongoose.Schema({
  name: String, price: Number, category: String,
  image: String, description: String, stock: Number,
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export async function GET() {
  try {
    await connectDB();

    // Fetch real products with real images from DummyJSON
    const res = await fetch('https://dummyjson.com/products?limit=35&skip=0');
    const data = await res.json();

    const products = data.products.map((p: any) => ({
      name: p.title,
      price: Math.round(p.price * 280), // Convert to PKR
      category: p.category.charAt(0).toUpperCase() + p.category.slice(1),
      image: p.thumbnail,
      description: p.description,
      stock: p.stock,
    }));

    await Product.deleteMany({});
    await Product.insertMany(products);

    return NextResponse.json({ message: `Seeded ${products.length} products with real images!` });
  } catch (error) {
    return NextResponse.json({ error: 'Seed failed' }, { status: 500 });
  }
}