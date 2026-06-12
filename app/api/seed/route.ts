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
    const res = await fetch('https://dummyjson.com/products?limit=35');
    const data = await res.json();

    const categoryMap: Record<string, string> = {
      'smartphones': 'Electronics',
      'laptops': 'Electronics',
      'fragrances': 'Beauty',
      'skincare': 'Beauty',
      'groceries': 'Kitchen',
      'home-decoration': 'Kitchen',
      'furniture': 'Kitchen',
      'tops': 'Fashion',
      'womens-dresses': 'Fashion',
      'womens-shoes': 'Fashion',
      'mens-shirts': 'Fashion',
      'mens-shoes': 'Fashion',
      'mens-watches': 'Accessories',
      'womens-watches': 'Accessories',
      'womens-bags': 'Accessories',
      'womens-jewellery': 'Accessories',
      'sunglasses': 'Accessories',
      'automotive': 'Accessories',
      'motorcycle': 'Sports',
      'lighting': 'Kitchen',
      'sports-accessories': 'Sports',
    };

    const products = data.products.map((p: any) => ({
      name: p.title,
      price: Math.round(p.price * 280),
      category: categoryMap[p.category] || 'Electronics',
      image: p.thumbnail,
      description: p.description,
      stock: p.stock,
    }));

    await Product.deleteMany({});
    await Product.insertMany(products);

    return NextResponse.json({ message: `Seeded ${products.length} real products!` });
  } catch (error) {
    return NextResponse.json({ error: 'Seed failed' }, { status: 500 });
  }
}