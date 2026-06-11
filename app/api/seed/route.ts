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
  { name: 'Gaming Mouse', price: 4200, category: 'Electronics', stock: 22, description: 'High precision gaming mouse.', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&auto=format&fit=crop&q=80' },
  { name: 'Blender', price: 4800, category: 'Kitchen', stock: 16, description: 'Powerful kitchen blender.', image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&auto=format&fit=crop&q=80' },
  { name: 'Football', price: 3800, category: 'Sports', stock: 25, description: 'Official match football.', image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400&auto=format&fit=crop&q=80' },
  { name: 'Moisturizer', price: 1500, category: 'Beauty', stock: 45, description: 'Daily moisturizer with SPF.', image: 'https://images.unsplash.com/photo-1570194065650-d99fb4d8a609?w=400&auto=format&fit=crop&q=80' },
  { name: 'iPad', price: 120000, category: 'Electronics', stock: 8, description: 'Powerful iPad with Retina display.', image: 'https://images.unsplash.com/photo-1544244015-0df4592c8e62?w=400&auto=format&fit=crop&q=80' },
  { name: 'Summer Dress', price: 5500, category: 'Fashion', stock: 12, description: 'Beautiful floral summer dress.', image: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=400&auto=format&fit=crop&q=80' },
  { name: 'Necklace', price: 9500, category: 'Accessories', stock: 15, description: 'Elegant silver necklace.', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&auto=format&fit=crop&q=80' },
  { name: 'Non-stick Pan', price: 3200, category: 'Kitchen', stock: 20, description: 'Premium ceramic non-stick pan.', image: 'https://images.unsplash.com/photo-1584990347449-a2d4c2c044ba?w=400&auto=format&fit=crop&q=80' },
  { name: 'Tennis Racket', price: 4500, category: 'Sports', stock: 18, description: 'Carbon fiber tennis racket.', image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&auto=format&fit=crop&q=80' },
  { name: 'Shampoo Set', price: 1200, category: 'Beauty', stock: 50, description: 'Argan oil shampoo set.', image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400&auto=format&fit=crop&q=80' },
  { name: 'Smart Watch', price: 25000, category: 'Electronics', stock: 10, description: 'Smart watch with GPS.', image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&auto=format&fit=crop&q=80' },
  { name: 'Leather Belt', price: 1800, category: 'Accessories', stock: 30, description: 'Genuine leather belt.', image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400&auto=format&fit=crop&q=80' },
  { name: 'Keyboard', price: 8500, category: 'Electronics', stock: 14, description: 'Mechanical gaming keyboard.', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&auto=format&fit=crop&q=80' },
  { name: 'Jeans', price: 4500, category: 'Fashion', stock: 20, description: 'Classic slim fit jeans.', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&auto=format&fit=crop&q=80' },
  { name: 'Ring', price: 6500, category: 'Accessories', stock: 12, description: 'Sterling silver ring.', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&auto=format&fit=crop&q=80' },
  { name: 'Microwave', price: 18000, category: 'Kitchen', stock: 8, description: '30L microwave with grill.', image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&auto=format&fit=crop&q=80' },
  { name: 'Cycling Helmet', price: 3500, category: 'Sports', stock: 15, description: 'Aerodynamic cycling helmet.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop&q=80' },
  { name: 'Eye Shadow Kit', price: 2800, category: 'Beauty', stock: 25, description: '24 color eyeshadow palette.', image: 'https://images.unsplash.com/photo-1512207736890-6ffed8a84e8d?w=400&auto=format&fit=crop&q=80' },
  { name: 'Earbuds', price: 5500, category: 'Electronics', stock: 20, description: 'True wireless earbuds.', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&auto=format&fit=crop&q=80' },
  { name: 'Sneakers', price: 8900, category: 'Fashion', stock: 18, description: 'Trendy memory foam sneakers.', image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&auto=format&fit=crop&q=80' },
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