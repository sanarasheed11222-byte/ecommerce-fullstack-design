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
    await Product.deleteMany({});
    const products = [
      { name: 'Premium Watch', price: 15000, category: 'Accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600', description: 'A timeless premium watch.', stock: 10 },
      { name: 'Wireless Headphones', price: 8500, category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600', description: 'Immersive sound quality.', stock: 15 },
      { name: 'Designer Handbag', price: 12000, category: 'Fashion', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600', description: 'Luxury genuine leather handbag.', stock: 8 },
      { name: 'Sunglasses', price: 4500, category: 'Accessories', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600', description: 'UV400 polarized lenses.', stock: 20 },
      { name: 'Smartphone', price: 45000, category: 'Electronics', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600', description: 'Flagship smartphone.', stock: 12 },
      { name: 'Running Shoes', price: 6500, category: 'Fashion', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600', description: 'Lightweight breathable shoes.', stock: 25 },
      { name: 'Coffee Maker', price: 9500, category: 'Kitchen', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600', description: 'Brew barista-quality coffee.', stock: 10 },
      { name: 'Yoga Mat', price: 3500, category: 'Sports', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600', description: 'Non-slip premium mat.', stock: 30 },
      { name: 'Perfume', price: 7500, category: 'Beauty', image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=600', description: 'Exquisite fragrance.', stock: 18 },
      { name: 'Laptop', price: 85000, category: 'Electronics', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600', description: 'High-performance laptop.', stock: 7 },
      { name: 'Leather Wallet', price: 2500, category: 'Accessories', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600', description: 'Slim RFID blocking wallet.', stock: 35 },
      { name: 'Face Cream', price: 1800, category: 'Beauty', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600', description: 'Hydrating face cream.', stock: 40 },
      { name: 'Smart TV 4K', price: 95000, category: 'Electronics', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600', description: '4K HDR smart TV.', stock: 5 },
      { name: 'Winter Jacket', price: 8900, category: 'Fashion', image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600', description: 'Insulated winter jacket.', stock: 15 },
      { name: 'Smart Watch', price: 25000, category: 'Electronics', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600', description: 'Track fitness with GPS.', stock: 10 },
      { name: 'Air Fryer', price: 12500, category: 'Kitchen', image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=600', description: 'Crispy meals with less oil.', stock: 10 },
      { name: 'Dumbbells Set', price: 5500, category: 'Sports', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600', description: 'Adjustable dumbbell set.', stock: 20 },
      { name: 'Bluetooth Speaker', price: 6800, category: 'Electronics', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600', description: '360 surround waterproof speaker.', stock: 18 },
      { name: 'Gold Bracelet', price: 18000, category: 'Accessories', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600', description: '18K gold plated bracelet.', stock: 12 },
      { name: 'Lipstick Set', price: 2200, category: 'Beauty', image: 'https://images.unsplash.com/photo-1586495777744-4e6232bf5f0a?w=600', description: '6 long-lasting matte lipsticks.', stock: 30 },
    ];
    await Product.insertMany(products);
    return NextResponse.json({ success: true, count: products.length });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
