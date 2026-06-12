import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/mongodb';

const ProductSchema = new mongoose.Schema({ name: String, price: Number, category: String, image: String, description: String, stock: Number });
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const items = [
  { name: 'Premium Watch', price: 15000, category: 'Accessories', stock: 10, description: 'Luxury premium watch.', query: 'luxury watch' },
  { name: 'Wireless Headphones', price: 8500, category: 'Electronics', stock: 15, description: 'Noise cancelling headphones.', query: 'wireless headphones' },
  { name: 'Designer Handbag', price: 12000, category: 'Fashion', stock: 8, description: 'Elegant leather handbag.', query: 'designer handbag' },
  { name: 'Sunglasses', price: 4500, category: 'Accessories', stock: 20, description: 'UV400 polarized sunglasses.', query: 'sunglasses' },
  { name: 'Smartphone', price: 45000, category: 'Electronics', stock: 12, description: 'Latest flagship smartphone.', query: 'smartphone' },
  { name: 'Running Shoes', price: 6500, category: 'Fashion', stock: 25, description: 'Lightweight running shoes.', query: 'running shoes' },
  { name: 'Coffee Maker', price: 9500, category: 'Kitchen', stock: 10, description: 'Brew perfect coffee.', query: 'coffee maker' },
  { name: 'Yoga Mat', price: 3500, category: 'Sports', stock: 30, description: 'Non-slip yoga mat.', query: 'yoga mat' },
  { name: 'Perfume', price: 7500, category: 'Beauty', stock: 18, description: 'Long lasting fragrance.', query: 'perfume bottle' },
  { name: 'Laptop', price: 85000, category: 'Electronics', stock: 7, description: 'High performance laptop.', query: 'laptop computer' },
  { name: 'Leather Wallet', price: 2500, category: 'Accessories', stock: 40, description: 'Slim leather wallet.', query: 'leather wallet' },
  { name: 'Face Cream', price: 1800, category: 'Beauty', stock: 35, description: 'Moisturizing face cream.', query: 'face cream skincare' },
  { name: 'Smart TV 4K', price: 95000, category: 'Electronics', stock: 5, description: '55 inch 4K Smart TV.', query: 'smart tv' },
  { name: 'Winter Jacket', price: 8900, category: 'Fashion', stock: 14, description: 'Warm winter jacket.', query: 'winter jacket' },
  { name: 'Gold Bracelet', price: 18000, category: 'Accessories', stock: 6, description: '18K gold bracelet.', query: 'gold bracelet' },
  { name: 'Air Fryer', price: 12500, category: 'Kitchen', stock: 9, description: 'Healthy cooking fryer.', query: 'air fryer' },
  { name: 'Dumbbells Set', price: 5500, category: 'Sports', stock: 20, description: 'Adjustable dumbbells.', query: 'dumbbells gym' },
  { name: 'Lipstick Set', price: 2200, category: 'Beauty', stock: 28, description: '6 long lasting lipsticks.', query: 'lipstick makeup' },
  { name: 'Bluetooth Speaker', price: 6800, category: 'Electronics', stock: 16, description: 'Portable waterproof speaker.', query: 'bluetooth speaker' },
  { name: 'Formal Shoes', price: 7200, category: 'Fashion', stock: 22, description: 'Genuine leather shoes.', query: 'formal shoes' },
  { name: 'Gaming Mouse', price: 4200, category: 'Electronics', stock: 22, description: 'High precision gaming mouse.', query: 'gaming mouse' },
  { name: 'Blender', price: 4800, category: 'Kitchen', stock: 16, description: 'Powerful kitchen blender.', query: 'blender kitchen' },
  { name: 'Football', price: 3800, category: 'Sports', stock: 25, description: 'Official match football.', query: 'football soccer' },
  { name: 'Moisturizer', price: 1500, category: 'Beauty', stock: 45, description: 'Daily moisturizer with SPF.', query: 'moisturizer skincare' },
  { name: 'iPad', price: 120000, category: 'Electronics', stock: 8, description: 'Powerful iPad with Retina display.', query: 'ipad tablet' },
  { name: 'Summer Dress', price: 5500, category: 'Fashion', stock: 12, description: 'Beautiful floral summer dress.', query: 'summer dress' },
  { name: 'Necklace', price: 9500, category: 'Accessories', stock: 15, description: 'Elegant silver necklace.', query: 'silver necklace jewelry' },
  { name: 'Non-stick Pan', price: 3200, category: 'Kitchen', stock: 20, description: 'Premium ceramic non-stick pan.', query: 'frying pan kitchen' },
  { name: 'Tennis Racket', price: 4500, category: 'Sports', stock: 18, description: 'Carbon fiber tennis racket.', query: 'tennis racket' },
  { name: 'Shampoo Set', price: 1200, category: 'Beauty', stock: 50, description: 'Argan oil shampoo set.', query: 'shampoo hair care' },
  { name: 'Smart Watch', price: 25000, category: 'Electronics', stock: 10, description: 'Smart watch with GPS.', query: 'smart watch' },
  { name: 'Leather Belt', price: 1800, category: 'Accessories', stock: 30, description: 'Genuine leather belt.', query: 'leather belt' },
  { name: 'Keyboard', price: 8500, category: 'Electronics', stock: 14, description: 'Mechanical gaming keyboard.', query: 'mechanical keyboard' },
  { name: 'Jeans', price: 4500, category: 'Fashion', stock: 20, description: 'Classic slim fit jeans.', query: 'jeans denim' },
  { name: 'Microwave', price: 18000, category: 'Kitchen', stock: 8, description: '30L microwave with grill.', query: 'microwave oven' },
  { name: 'Cycling Helmet', price: 3500, category: 'Sports', stock: 15, description: 'Aerodynamic cycling helmet.', query: 'cycling helmet' },
  { name: 'Eye Shadow Kit', price: 2800, category: 'Beauty', stock: 25, description: '24 color eyeshadow palette.', query: 'eyeshadow makeup' },
  { name: 'Earbuds', price: 5500, category: 'Electronics', stock: 20, description: 'True wireless earbuds.', query: 'wireless earbuds' },
  { name: 'Sneakers', price: 8900, category: 'Fashion', stock: 18, description: 'Trendy memory foam sneakers.', query: 'sneakers shoes' },
  { name: 'Ring', price: 6500, category: 'Accessories', stock: 12, description: 'Sterling silver ring.', query: 'silver ring jewelry' },
];

async function fetchImage(query: string): Promise<string> {
  const res = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&client_id=${process.env.UNSPLASH_ACCESS_KEY}`);
  const data = await res.json();
  if (data.results && data.results.length > 0) {
    return data.results[0].urls.regular;
  }
  return 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400';
}

export async function GET() {
  try {
    await connectDB();
    await Product.deleteMany({});
    const products = [];
    for (const item of items) {
      const image = await fetchImage(item.query);
      products.push({ name: item.name, price: item.price, category: item.category, stock: item.stock, description: item.description, image });
    }
    await Product.insertMany(products);
    return NextResponse.json({ message: `Seeded ${products.length} products with real Unsplash images!` });
  } catch (error) {
    return NextResponse.json({ error: 'Seed failed' }, { status: 500 });
  }
}
