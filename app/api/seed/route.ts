import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/mongodb';

const ProductSchema = new mongoose.Schema({
  name: String, price: Number, category: String,
  image: String, description: String, stock: Number,
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const products = [
  { name: 'Premium Watch', price: 15000, category: 'Accessories', stock: 10, description: 'Luxury premium watch.', image: 'https://cdn.dummyjson.com/products/images/mens-watches/Brown%20Leather%20Belt%20Watch/thumbnail.png' },
  { name: 'Wireless Headphones', price: 8500, category: 'Electronics', stock: 15, description: 'Noise cancelling headphones.', image: 'https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20AirPods/thumbnail.png' },
  { name: 'Smartphone', price: 45000, category: 'Electronics', stock: 12, description: 'Latest flagship smartphone.', image: 'https://cdn.dummyjson.com/products/images/smartphones/iPhone%2015/thumbnail.png' },
  { name: 'Laptop', price: 85000, category: 'Electronics', stock: 7, description: 'High performance laptop.', image: 'https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/thumbnail.png' },
  { name: 'Smart Watch', price: 25000, category: 'Electronics', stock: 10, description: 'Smart watch with GPS.', image: 'https://cdn.dummyjson.com/products/images/mens-watches/Fossil%20Gen%205E%20Smartwatch/thumbnail.png' },
  { name: 'Bluetooth Speaker', price: 6800, category: 'Electronics', stock: 16, description: 'Portable waterproof speaker.', image: 'https://cdn.dummyjson.com/products/images/mobile-accessories/Beats%20Flex%20Wireless%20Earphones/thumbnail.png' },
  { name: 'Gaming Mouse', price: 4200, category: 'Electronics', stock: 22, description: 'High precision gaming mouse.', image: 'https://cdn.dummyjson.com/products/images/laptops/Asus%20Zenbook%20Pro%20Duo/thumbnail.png' },
  { name: 'iPad', price: 120000, category: 'Electronics', stock: 8, description: 'Powerful iPad.', image: 'https://cdn.dummyjson.com/products/images/tablets/Apple%20iPad%209th%20Gen%20Wifi%208%20256%20GB%20Silver/thumbnail.png' },
  { name: 'Smart TV 4K', price: 95000, category: 'Electronics', stock: 5, description: '55 inch 4K Smart TV.', image: 'https://cdn.dummyjson.com/products/images/laptops/Lenovo%20IdeaPad%20Flex%205i/thumbnail.png' },
  { name: 'Keyboard', price: 8500, category: 'Electronics', stock: 14, description: 'Mechanical keyboard.', image: 'https://cdn.dummyjson.com/products/images/laptops/Huawei%20Matebook%20X%20Pro/thumbnail.png' },
  { name: 'Designer Handbag', price: 12000, category: 'Fashion', stock: 8, description: 'Elegant leather handbag.', image: 'https://cdn.dummyjson.com/products/images/womens-bags/Clutch%20Bag/thumbnail.png' },
  { name: 'Running Shoes', price: 6500, category: 'Fashion', stock: 25, description: 'Lightweight running shoes.', image: 'https://cdn.dummyjson.com/products/images/womens-shoes/Pointed%20Flat%20Ballerinas/thumbnail.png' },
  { name: 'Winter Jacket', price: 8900, category: 'Fashion', stock: 14, description: 'Warm winter jacket.', image: 'https://cdn.dummyjson.com/products/images/mens-shirts/Man%20Plaid%20Shirt/thumbnail.png' },
  { name: 'Summer Dress', price: 5500, category: 'Fashion', stock: 12, description: 'Beautiful summer dress.', image: 'https://cdn.dummyjson.com/products/images/womens-dresses/Knit%20Dress%20With%20Long%20Sleeves/thumbnail.png' },
  { name: 'Formal Shoes', price: 7200, category: 'Fashion', stock: 22, description: 'Genuine leather shoes.', image: 'https://cdn.dummyjson.com/products/images/mens-shoes/Nike%20Air%20Jordan%201%20Red%20And%20Black/thumbnail.png' },
  { name: 'Jeans', price: 4500, category: 'Fashion', stock: 20, description: 'Classic slim fit jeans.', image: 'https://cdn.dummyjson.com/products/images/mens-shirts/Slim%20Fit%20Shirt/thumbnail.png' },
  { name: 'Sneakers', price: 8900, category: 'Fashion', stock: 18, description: 'Trendy sneakers.', image: 'https://cdn.dummyjson.com/products/images/mens-shoes/Nike%20Air%20Jordan%204%20Retro%20Reimagined/thumbnail.png' },
  { name: 'Premium Watch', price: 15000, category: 'Accessories', stock: 10, description: 'Luxury premium watch.', image: 'https://cdn.dummyjson.com/products/images/mens-watches/Brown%20Leather%20Belt%20Watch/thumbnail.png' },
  { name: 'Sunglasses', price: 4500, category: 'Accessories', stock: 20, description: 'UV400 polarized sunglasses.', image: 'https://cdn.dummyjson.com/products/images/sunglasses/Versace%20Sunglasses/thumbnail.png' },
  { name: 'Gold Bracelet', price: 18000, category: 'Accessories', stock: 6, description: '18K gold bracelet.', image: 'https://cdn.dummyjson.com/products/images/womens-jewellery/Bangle/thumbnail.png' },
  { name: 'Leather Wallet', price: 2500, category: 'Accessories', stock: 40, description: 'Slim leather wallet.', image: 'https://cdn.dummyjson.com/products/images/mens-watches/Rolex%20Submariner%20Watch/thumbnail.png' },
  { name: 'Necklace', price: 9500, category: 'Accessories', stock: 15, description: 'Elegant silver necklace.', image: 'https://cdn.dummyjson.com/products/images/womens-jewellery/Necklace/thumbnail.png' },
  { name: 'Ring', price: 6500, category: 'Accessories', stock: 12, description: 'Sterling silver ring.', image: 'https://cdn.dummyjson.com/products/images/womens-jewellery/Diamond%20Ring/thumbnail.png' },
  { name: 'Leather Belt', price: 1800, category: 'Accessories', stock: 30, description: 'Genuine leather belt.', image: 'https://cdn.dummyjson.com/products/images/mens-watches/Brown%20Leather%20Belt%20Watch/1.png' },
  { name: 'Coffee Maker', price: 9500, category: 'Kitchen', stock: 10, description: 'Brew perfect coffee.', image: 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Bamboo%20Spatula/thumbnail.png' },
  { name: 'Air Fryer', price: 12500, category: 'Kitchen', stock: 9, description: 'Healthy cooking fryer.', image: 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Black%20Aluminium%20Cup/thumbnail.png' },
  { name: 'Blender', price: 4800, category: 'Kitchen', stock: 16, description: 'Powerful kitchen blender.', image: 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Boxed%20Blender/thumbnail.png' },
  { name: 'Non-stick Pan', price: 3200, category: 'Kitchen', stock: 20, description: 'Ceramic non-stick pan.', image: 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Frying%20Pan/thumbnail.png' },
  { name: 'Microwave', price: 18000, category: 'Kitchen', stock: 8, description: '30L microwave oven.', image: 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Electric%20Stove/thumbnail.png' },
  { name: 'Yoga Mat', price: 3500, category: 'Sports', stock: 30, description: 'Non-slip yoga mat.', image: 'https://cdn.dummyjson.com/products/images/sports-accessories/Cricket%20Helmet/thumbnail.png' },
  { name: 'Dumbbells Set', price: 5500, category: 'Sports', stock: 20, description: 'Adjustable dumbbells.', image: 'https://cdn.dummyjson.com/products/images/sports-accessories/Dumbbell/thumbnail.png' },
  { name: 'Football', price: 3800, category: 'Sports', stock: 25, description: 'Official match football.', image: 'https://cdn.dummyjson.com/products/images/sports-accessories/Football/thumbnail.png' },
  { name: 'Tennis Racket', price: 4500, category: 'Sports', stock: 18, description: 'Carbon fiber racket.', image: 'https://cdn.dummyjson.com/products/images/sports-accessories/Tennis%20Racket/thumbnail.png' },
  { name: 'Perfume', price: 7500, category: 'Beauty', stock: 18, description: 'Long lasting fragrance.', image: 'https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/thumbnail.png' },
  { name: 'Face Cream', price: 1800, category: 'Beauty', stock: 35, description: 'Moisturizing face cream.', image: 'https://cdn.dummyjson.com/products/images/skin-care/Essence%20Mascara%20Lash%20Princess/thumbnail.png' },
];

export async function GET() {
  try {
    await connectDB();
    await Product.deleteMany({});
    await Product.insertMany(products);
    return NextResponse.json({ message: `Seeded ${products.length} products with real images!` });
  } catch (error) {
    return NextResponse.json({ error: 'Seed failed' }, { status: 500 });
  }
}