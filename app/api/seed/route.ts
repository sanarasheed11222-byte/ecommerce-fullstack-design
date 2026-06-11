import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/mongodb';

const ProductSchema = new mongoose.Schema({
  name: String, price: Number, category: String,
  image: String, description: String, stock: Number,
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const products = [
  { name: 'Premium Watch', price: 15000, category: 'Accessories', stock: 10, description: 'Luxury premium watch.', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=80' },
  { name: 'Wireless Headphones', price: 8500, category: 'Electronics', stock: 15, description: 'Noise cancelling headphones.', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80' },
  { name: 'Designer Handbag', price: 12000, category: 'Fashion', stock: 8, description: 'Elegant leather handbag.', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&auto=format&fit=crop&q=80' },
  { name: 'Sunglasses', price: 4500, category: 'Accessories', stock: 20, description: 'UV400 polarized sunglasses.', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&auto=format&fit=crop&q=80' },
  { name: 'Smartphone', price: 45000, category: 'Electronics', stock: 12, description: 'Latest flagship smartphone.', image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&auto=format&fit=crop&q=80' },
  { name: 'Running Shoes', price: 6500, category: 'Fashion', stock: 25, description: 'Lightweight running shoes.', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=80' },
  { name: 'Coffee Maker', price: 9500, category: 'Kitchen', stock: 10, description: 'Brew perfect coffee.', image: 'https://images.unsplash.com/photo-1517914070-a2c2f1e84967?w=400&auto=format&fit=crop&q=80' },
  { name: 'Yoga Mat', price: 3500, category: 'Sports', stock: 30, description: 'Non-slip yoga mat.', image: 'https://images.unsplash.com/photo-1601925228158-7e6a8b06c0e2?w=400&auto=format&fit=crop&q=80' },
  { name: 'Perfume', price: 7500, category: 'Beauty', stock: 18, description: 'Long lasting fragrance.', image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=400&auto=format&fit=crop&q=80' },
  { name: 'Laptop', price: 85000, category: 'Electronics', stock: 7, description: 'High performance laptop.', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&auto=format&fit=crop&q=80' },
  { name: 'Leather Wallet', price: 2500, category: 'Accessories', stock: 40, description: 'Slim leather wallet.', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400&auto=format&fit=crop&q=80' },
  { name: 'Face Cream', price: 1800, category: 'Beauty', stock: 35, description: 'Moisturizing face cream.', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&auto=format&fit=crop&q=80' },
  { name: 'Smart TV 4K', price: 95000, category: 'Electronics', stock: 5, description: '55 inch 4K Smart TV.', image: 'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=400&auto=format&fit=crop&q=80' },
  { name: 'Winter Jacket', price: 8900, category: 'Fashion', stock: 14, description: 'Warm winter jacket.', image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&auto=format&fit=crop&q=80' },
  { name: 'Gold Bracelet', price: 18000, category: 'Accessories', stock: 6, description: '18K gold bracelet.', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&auto=format&fit=crop&q=80' },
  { name: 'Air Fryer', price: 12500, category: 'Kitchen', stock: 9, description: 'Healthy cooking fryer.', image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&auto=format&fit=crop&q=80' },
  { name: 'Dumbbells Set', price: 5500, category: 'Sports', stock: 20, description: 'Adjustable dumbbells.', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&auto=format&fit=crop&q=80' },
  { name: 'Lipstick Set', price: 2200, category: 'Beauty', stock: 28, description: '6 long lasting lipsticks.', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&auto=format&fit=crop&q=80' },
  { name: 'Bluetooth Speaker', price: 6800, category: 'Electronics', stock: 16, description: 'Portable waterproof speaker.', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&auto=format&fit=crop&q=80' },
  { name: 'Formal Shoes', price: 7200, category: 'Fashion', stock: 22, description: 'Genuine leather shoes.', image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&auto=format&fit=crop&q=80' },
];

export async function GET() {
  try {
    await connectDB();
    await Product.deleteMany({});
    await Product.insertMany(products);
    return NextResponse.json({ message: 'Database seeded with 20 products!' });
  } catch (error) {
    return NextResponse.json({ error: 'Seed failed' }, { status: 500 });
  }
}