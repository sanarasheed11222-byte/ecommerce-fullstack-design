const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

const searches = [
  { name: 'Premium Watch', price: 15000, category: 'Accessories', query: 'luxury watch' },
  { name: 'Wireless Headphones', price: 8500, category: 'Electronics', query: 'wireless headphones' },
  { name: 'Designer Handbag', price: 12000, category: 'Fashion', query: 'designer handbag' },
  { name: 'Sunglasses', price: 4500, category: 'Accessories', query: 'sunglasses' },
  { name: 'Smartphone', price: 45000, category: 'Electronics', query: 'smartphone' },
  { name: 'Running Shoes', price: 6500, category: 'Fashion', query: 'running shoes' },
  { name: 'Coffee Maker', price: 9500, category: 'Kitchen', query: 'coffee maker' },
  { name: 'Yoga Mat', price: 3500, category: 'Sports', query: 'yoga mat' },
  { name: 'Perfume', price: 7500, category: 'Beauty', query: 'perfume bottle' },
  { name: 'Laptop', price: 85000, category: 'Electronics', query: 'laptop computer' },
  { name: 'Leather Wallet', price: 2500, category: 'Accessories', query: 'leather wallet' },
  { name: 'Face Cream', price: 1800, category: 'Beauty', query: 'face cream skincare' },
  { name: 'Smart TV 4K', price: 95000, category: 'Electronics', query: 'smart tv' },
  { name: 'Winter Jacket', price: 8900, category: 'Fashion', query: 'winter jacket' },
  { name: 'Gold Bracelet', price: 18000, category: 'Accessories', query: 'gold bracelet' },
  { name: 'Air Fryer', price: 12500, category: 'Kitchen', query: 'air fryer' },
  { name: 'Dumbbells Set', price: 5500, category: 'Sports', query: 'dumbbells gym' },
  { name: 'Lipstick Set', price: 2200, category: 'Beauty', query: 'lipstick makeup' },
  { name: 'Bluetooth Speaker', price: 6800, category: 'Electronics', query: 'bluetooth speaker' },
  { name: 'Formal Shoes', price: 7200, category: 'Fashion', query: 'formal shoes' },
  { name: 'Gaming Mouse', price: 4200, category: 'Electronics', query: 'gaming mouse' },
  { name: 'Blender', price: 4800, category: 'Kitchen', query: 'blender kitchen' },
  { name: 'Football', price: 3800, category: 'Sports', query: 'football soccer ball' },
  { name: 'Moisturizer', price: 1500, category: 'Beauty', query: 'moisturizer skincare' },
  { name: 'iPad', price: 120000, category: 'Electronics', query: 'ipad tablet' },
  { name: 'Dress', price: 5500, category: 'Fashion', query: 'elegant dress' },
  { name: 'Necklace', price: 9500, category: 'Accessories', query: 'gold necklace jewelry' },
  { name: 'Non-stick Pan', price: 3200, category: 'Kitchen', query: 'frying pan kitchen' },
  { name: 'Tennis Racket', price: 4500, category: 'Sports', query: 'tennis racket' },
  { name: 'Shampoo Set', price: 1200, category: 'Beauty', query: 'shampoo hair care' },
  { name: 'Smart Watch', price: 25000, category: 'Electronics', query: 'smart watch' },
  { name: 'Leather Belt', price: 1800, category: 'Accessories', query: 'leather belt' },
];

const descriptions = {
  'Premium Watch': 'A timeless premium watch crafted with precision engineering and elegant design.',
  'Wireless Headphones': 'Immersive sound quality with active noise cancellation. Up to 30 hours battery life.',
  'Designer Handbag': 'Luxury designer handbag made from genuine leather with spacious interior.',
  'Sunglasses': 'UV400 protection polarized lenses with lightweight frame.',
  'Smartphone': 'Flagship smartphone with stunning display and pro-grade camera system.',
  'Running Shoes': 'Lightweight and breathable running shoes with superior cushioning.',
  'Coffee Maker': 'Brew barista-quality coffee at home with programmable settings.',
  'Yoga Mat': 'Non-slip premium yoga mat with alignment lines for joint support.',
  'Perfume': 'Exquisite fragrance blending floral and woody notes for all day freshness.',
  'Laptop': 'High-performance laptop with stunning display and fast SSD storage.',
  'Leather Wallet': 'Slim genuine leather wallet with RFID blocking technology.',
  'Face Cream': 'Deeply hydrating face cream with SPF protection and natural extracts.',
  'Smart TV 4K': 'Crystal clear 4K display with HDR support and built-in streaming apps.',
  'Winter Jacket': 'Premium insulated winter jacket with water-resistant outer shell.',
  'Gold Bracelet': '18K gold plated bracelet with intricate detailing for special occasions.',
  'Air Fryer': 'Cook crispy meals with up to 80% less oil. Large capacity with multiple presets.',
  'Dumbbells Set': 'Adjustable dumbbell set with non-slip grip for home workouts.',
  'Lipstick Set': 'Set of 6 long-lasting matte lipsticks in trending shades.',
  'Bluetooth Speaker': '360 surround sound with deep bass. Waterproof for indoor and outdoor use.',
  'Formal Shoes': 'Handcrafted genuine leather formal shoes with cushioned insole.',
  'Gaming Mouse': 'High-precision gaming mouse with adjustable DPI and RGB lighting.',
  'Blender': 'Powerful motor blender perfect for smoothies soups and sauces.',
  'Football': 'FIFA approved match football with durable synthetic leather.',
  'Moisturizer': 'Lightweight daily moisturizer with hyaluronic acid for all day hydration.',
  'iPad': 'Stunning Liquid Retina display with Apple Pencil support for work and creativity.',
  'Dress': 'Elegant evening dress with flattering silhouette and premium fabric.',
  'Necklace': 'Delicate sterling silver necklace with gemstone pendant.',
  'Non-stick Pan': 'Premium non-stick frying pan with ceramic coating for all cooktops.',
  'Tennis Racket': 'Lightweight carbon fiber tennis racket with excellent control and power.',
  'Shampoo Set': 'Nourishing shampoo and conditioner set with argan oil for smooth hair.',
  'Smart Watch': 'Track fitness and health metrics. Always-on display with GPS.',
  'Leather Belt': 'Classic genuine leather belt with brushed metal buckle.',
};

const stocks = {
  'Premium Watch': 10, 'Wireless Headphones': 15, 'Designer Handbag': 8,
  'Sunglasses': 20, 'Smartphone': 12, 'Running Shoes': 25,
  'Coffee Maker': 10, 'Yoga Mat': 30, 'Perfume': 18, 'Laptop': 7,
  'Leather Wallet': 35, 'Face Cream': 40, 'Smart TV 4K': 5,
  'Winter Jacket': 15, 'Gold Bracelet': 12, 'Air Fryer': 10,
  'Dumbbells Set': 20, 'Lipstick Set': 30, 'Bluetooth Speaker': 18,
  'Formal Shoes': 14, 'Gaming Mouse': 22, 'Blender': 16,
  'Football': 25, 'Moisturizer': 45, 'iPad': 8, 'Dress': 12,
  'Necklace': 15, 'Non-stick Pan': 20, 'Tennis Racket': 18,
  'Shampoo Set': 50, 'Smart Watch': 10, 'Leather Belt': 30,
};

async function fetchImage(query) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&client_id=${process.env.UNSPLASH_ACCESS_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.results && data.results.length > 0) {
    return data.results[0].urls.regular;
  }
  return 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=600&fit=crop&q=80';
}

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    await Product.deleteMany();
    console.log('🗑️ Cleared old products');

    const products = [];
    for (const item of searches) {
      console.log(`📸 Fetching image for ${item.name}...`);
      const image = await fetchImage(item.query);
      products.push({
        name: item.name,
        price: item.price,
        category: item.category,
        image: image,
        description: descriptions[item.name],
        stock: stocks[item.name],
      });
    }

    await Product.insertMany(products);
    console.log('✅ All 32 products added with real images!');
    mongoose.connection.close();
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

seedDB();