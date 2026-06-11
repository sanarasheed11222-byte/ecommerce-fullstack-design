import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/mongodb';
const ProductSchema = new mongoose.Schema({ name: String, price: Number, category: String, image: String, description: String, stock: Number });
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
const products = [
  { name: 'Premium Watch', price: 15000, category: 'Accessories', stock: 10, description: 'Luxury premium watch.', image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg' },
  { name: 'Wireless Headphones', price: 8500, category: 'Electronics', stock: 15, description: 'Noise cancelling headphones.', image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg' },
  { name: 'Designer Handbag', price: 12000, category: 'Fashion', stock: 8, description: 'Elegant leather handbag.', image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg' },
  { name: 'Sunglasses', price: 4500, category: 'Accessories', stock: 20, description: 'UV400 polarized sunglasses.', image: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg' },
  { name: 'Smartphone', price: 45000, category: 'Electronics', stock: 12, description: 'Latest flagship smartphone.', image: 'https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg' },
  { name: 'Running Shoes', price: 6500, category: 'Fashion', stock: 25, description: 'Lightweight running shoes.', image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg' },
  { name: 'Coffee Maker', price: 9500, category: 'Kitchen', stock: 10, description: 'Brew perfect coffee.', image: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg' },
  { name: 'Yoga Mat', price: 3500, category: 'Sports', stock: 30, description: 'Non-slip yoga mat.', image: 'https://images.pexels.com/photos/4325467/pexels-photo-4325467.jpeg' },
  { name: 'Perfume', price: 7500, category: 'Beauty', stock: 18, description: 'Long lasting fragrance.', image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg' },
  { name: 'Laptop', price: 85000, category: 'Electronics', stock: 7, description: 'High performance laptop.', image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg' },
  { name: 'Leather Wallet', price: 2500, category: 'Accessories', stock: 40, description: 'Slim leather wallet.', image: 'https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg' },
  { name: 'Face Cream', price: 1800, category: 'Beauty', stock: 35, description: 'Moisturizing face cream.', image: 'https://images.pexels.com/photos/3321416/pexels-photo-3321416.jpeg' },
  { name: 'Smart TV 4K', price: 95000, category: 'Electronics', stock: 5, description: '55 inch 4K Smart TV.', image: 'https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg' },
  { name: 'Winter Jacket', price: 8900, category: 'Fashion', stock: 14, description: 'Warm winter jacket.', image: 'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg' },
  { name: 'Gold Bracelet', price: 18000, category: 'Accessories', stock: 6, description: '18K gold bracelet.', image: 'https://images.pexels.com/photos/10984714/pexels-photo-10984714.jpeg' },
  { name: 'Air Fryer', price: 12500, category: 'Kitchen', stock: 9, description: 'Healthy cooking fryer.', image: 'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg' },
  { name: 'Dumbbells Set', price: 5500, category: 'Sports', stock: 20, description: 'Adjustable dumbbells.', image: 'https://images.pexels.com/photos/416717/pexels-photo-416717.jpeg' },
  { name: 'Lipstick Set', price: 2200, category: 'Beauty', stock: 28, description: '6 long lasting lipsticks.', image: 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg' },
  { name: 'Bluetooth Speaker', price: 6800, category: 'Electronics', stock: 16, description: 'Portable waterproof speaker.', image: 'https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg' },
  { name: 'Formal Shoes', price: 7200, category: 'Fashion', stock: 22, description: 'Genuine leather shoes.', image: 'https://images.pexels.com/photos/293405/pexels-photo-293405.jpeg' },
  { name: 'Gaming Mouse', price: 4200, category: 'Electronics', stock: 22, description: 'High precision gaming mouse.', image: 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg' },
  { name: 'Blender', price: 4800, category: 'Kitchen', stock: 16, description: 'Powerful kitchen blender.', image: 'https://images.pexels.com/photos/3682217/pexels-photo-3682217.jpeg' },
  { name: 'Football', price: 3800, category: 'Sports', stock: 25, description: 'Official match football.', image: 'https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg' },
  { name: 'Moisturizer', price: 1500, category: 'Beauty', stock: 45, description: 'Daily moisturizer with SPF.', image: 'https://images.pexels.com/photos/3321416/pexels-photo-3321416.jpeg' },
  { name: 'iPad', price: 120000, category: 'Electronics', stock: 8, description: 'Powerful iPad with Retina display.', image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg' },
  { name: 'Summer Dress', price: 5500, category: 'Fashion', stock: 12, description: 'Beautiful floral summer dress.', image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg' },
  { name: 'Necklace', price: 9500, category: 'Accessories', stock: 15, description: 'Elegant silver necklace.', image: 'https://images.pexels.com/photos/10984714/pexels-photo-10984714.jpeg' },
  { name: 'Non-stick Pan', price: 3200, category: 'Kitchen', stock: 20, description: 'Premium ceramic non-stick pan.', image: 'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg' },
  { name: 'Tennis Racket', price: 4500, category: 'Sports', stock: 18, description: 'Carbon fiber tennis racket.', image: 'https://images.pexels.com/photos/1432039/pexels-photo-1432039.jpeg' },
  { name: 'Shampoo Set', price: 1200, category: 'Beauty', stock: 50, description: 'Argan oil shampoo set.', image: 'https://images.pexels.com/photos/3735657/pexels-photo-3735657.jpeg' },
  { name: 'Smart Watch', price: 25000, category: 'Electronics', stock: 10, description: 'Smart watch with GPS.', image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg' },
  { name: 'Leather Belt', price: 1800, category: 'Accessories', stock: 30, description: 'Genuine leather belt.', image: 'https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg' },
  { name: 'Keyboard', price: 8500, category: 'Electronics', stock: 14, description: 'Mechanical gaming keyboard.', image: 'https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg' },
  { name: 'Jeans', price: 4500, category: 'Fashion', stock: 20, description: 'Classic slim fit jeans.', image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg' },
  { name: 'Ring', price: 6500, category: 'Accessories', stock: 12, description: 'Sterling silver ring.', image: 'https://images.pexels.com/photos/10984714/pexels-photo-10984714.jpeg' },
  { name: 'Microwave', price: 18000, category: 'Kitchen', stock: 8, description: '30L microwave with grill.', image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg' },
  { name: 'Cycling Helmet', price: 3500, category: 'Sports', stock: 15, description: 'Aerodynamic cycling helmet.', image: 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg' },
  { name: 'Eye Shadow Kit', price: 2800, category: 'Beauty', stock: 25, description: '24 color eyeshadow palette.', image: 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg' },
  { name: 'Earbuds', price: 5500, category: 'Electronics', stock: 20, description: 'True wireless earbuds.', image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg' },
  { name: 'Sneakers', price: 8900, category: 'Fashion', stock: 18, description: 'Trendy memory foam sneakers.', image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg' },
];
export async function GET() {
  try {
    await connectDB();
    await Product.deleteMany({});
    await Product.insertMany(products);
    return NextResponse.json({ message: `Seeded ${products.length} products with pexels images!` });
  } catch (error) {
    return NextResponse.json({ error: 'Seed failed' }, { status: 500 });
  }
}
