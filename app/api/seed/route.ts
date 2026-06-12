import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/mongodb';

const ProductSchema = new mongoose.Schema({
  name: String, price: Number, category: String,
  image: String, description: String, stock: Number,
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const products = [
  { name: 'Premium Watch', price: 15000, category: 'Accessories', stock: 10, description: 'Luxury premium watch.', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&fit=crop' },
  { name: 'Wireless Headphones', price: 8500, category: 'Electronics', stock: 15, description: 'Noise cancelling headphones.', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&fit=crop' },
  { name: 'Designer Handbag', price: 12000, category: 'Fashion', stock: 8, description: 'Elegant leather handbag.', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&fit=crop' },
  { name: 'Sunglasses', price: 4500, category: 'Accessories', stock: 20, description: 'UV400 polarized sunglasses.', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&fit=crop' },
  { name: 'Smartphone', price: 45000, category: 'Electronics', stock: 12, description: 'Latest flagship smartphone.', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&fit=crop' },
  { name: 'Running Shoes', price: 6500, category: 'Fashion', stock: 25, description: 'Lightweight running shoes.', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&fit=crop' },
  { name: 'Coffee Maker', price: 9500, category: 'Kitchen', stock: 10, description: 'Brew perfect coffee.', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&fit=crop' },
  { name: 'Yoga Mat', price: 3500, category: 'Sports', stock: 30, description: 'Non-slip yoga mat.', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&fit=crop' },
  { name: 'Perfume', price: 7500, category: 'Beauty', stock: 18, description: 'Long lasting fragrance.', image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=400&fit=crop' },
  { name: 'Laptop', price: 85000, category: 'Electronics', stock: 7, description: 'High performance laptop.', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&fit=crop' },
  { name: 'Leather Wallet', price: 2500, category: 'Accessories', stock: 40, description: 'Slim leather wallet.', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&fit=crop' },
  { name: 'Face Cream', price: 1800, category: 'Beauty', stock: 35, description: 'Moisturizing face cream.', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&fit=crop' },
  { name: 'Smart TV 4K', price: 95000, category: 'Electronics', stock: 5, description: '55 inch 4K Smart TV.', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=400&fit=crop' },
  { name: 'Winter Jacket', price: 8900, category: 'Fashion', stock: 14, description: 'Warm winter jacket.', image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&fit=crop' },
  { name: 'Gold Bracelet', price: 18000, category: 'Accessories', stock: 6, description: '18K gold bracelet.', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&fit=crop' },
  { name: 'Air Fryer', price: 12500, category: 'Kitchen', stock: 9, description: 'Healthy cooking fryer.', image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&fit=crop' },
  { name: 'Dumbbells Set', price: 5500, category: 'Sports', stock: 20, description: 'Adjustable dumbbells.', image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&fit=crop' },
  { name: 'Lipstick Set', price: 2200, category: 'Beauty', stock: 28, description: '6 long lasting lipsticks.', image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&fit=crop' },
  { name: 'Bluetooth Speaker', price: 6800, category: 'Electronics', stock: 16, description: 'Portable waterproof speaker.', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&fit=crop' },
  { name: 'Formal Shoes', price: 7200, category: 'Fashion', stock: 22, description: 'Genuine leather shoes.', image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&fit=crop' },
  { name: 'Gaming Mouse', price: 4200, category: 'Electronics', stock: 22, description: 'High precision gaming mouse.', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&fit=crop' },
  { name: 'Blender', price: 4800, category: 'Kitchen', stock: 16, description: 'Powerful kitchen blender.', image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&fit=crop' },
  { name: 'Football', price: 3800, category: 'Sports', stock: 25, description: 'Official match football.', image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&fit=crop' },
  { name: 'Moisturizer', price: 1500, category: 'Beauty', stock: 45, description: 'Daily moisturizer.', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&fit=crop' },
  { name: 'iPad', price: 120000, category: 'Electronics', stock: 8, description: 'Powerful iPad.', image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&fit=crop' },
  { name: 'Summer Dress', price: 5500, category: 'Fashion', stock: 12, description: 'Beautiful summer dress.', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&fit=crop' },
  { name: 'Necklace', price: 9500, category: 'Accessories', stock: 15, description: 'Elegant silver necklace.', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&fit=crop' },
  { name: 'Non-stick Pan', price: 3200, category: 'Kitchen', stock: 20, description: 'Ceramic non-stick pan.', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&fit=crop' },
  { name: 'Tennis Racket', price: 4500, category: 'Sports', stock: 18, description: 'Carbon fiber racket.', image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&fit=crop' },
  { name: 'Shampoo Set', price: 1200, category: 'Beauty', stock: 50, description: 'Argan oil shampoo set.', image: 'https://images.unsplash.com/photo-1585232350744-dc2ea9c0e814?w=400&fit=crop' },
  { name: 'Smart Watch', price: 25000, category: 'Electronics', stock: 10, description: 'Smart watch with GPS.', image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&fit=crop' },
  { name: 'Leather Belt', price: 1800, category: 'Accessories', stock: 30, description: 'Genuine leather belt.', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&fit=crop' },
  { name: 'Keyboard', price: 8500, category: 'Electronics', stock: 14, description: 'Mechanical keyboard.', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&fit=crop' },
  { name: 'Jeans', price: 4500, category: 'Fashion', stock: 20, description: 'Classic slim fit jeans.', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&fit=crop' },
  { name: 'Ring', price: 6500, category: 'Accessories', stock: 12, description: 'Sterling silver ring.', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&fit=crop' },
];

export async function GET() {
  try {
    await connectDB();
    await Product.deleteMany({});
    await Product.insertMany(products);
    return NextResponse.json({ message: `Database seeded with ${products.length} products!` });
  } catch (error) {
    return NextResponse.json({ error: 'Seed failed' }, { status: 500 });
  }
}