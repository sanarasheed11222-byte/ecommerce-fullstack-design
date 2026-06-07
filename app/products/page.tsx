'use client';
import { useState } from 'react';
import Link from 'next/link';

const allProducts = [
  { _id: '1',  name: 'Premium Watch',      price: 15000,  category: 'Accessories', image: 'https://picsum.photos/seed/watch/400/300' },
  { _id: '2',  name: 'Wireless Headphones',price: 8500,   category: 'Electronics', image: 'https://picsum.photos/seed/headphones/400/300' },
  { _id: '3',  name: 'Designer Handbag',   price: 12000,  category: 'Fashion',     image: 'https://picsum.photos/seed/handbag/400/300' },
  { _id: '4',  name: 'Sunglasses',         price: 4500,   category: 'Accessories', image: 'https://picsum.photos/seed/sunglasses/400/300' },
  { _id: '5',  name: 'Smartphone',         price: 45000,  category: 'Electronics', image: 'https://picsum.photos/seed/smartphone/400/300' },
  { _id: '6',  name: 'Running Shoes',      price: 6500,   category: 'Fashion',     image: 'https://picsum.photos/seed/shoes/400/300' },
  { _id: '7',  name: 'Coffee Maker',       price: 9500,   category: 'Kitchen',     image: 'https://picsum.photos/seed/coffee/400/300' },
  { _id: '8',  name: 'Yoga Mat',           price: 3500,   category: 'Sports',      image: 'https://picsum.photos/seed/yoga/400/300' },
  { _id: '9',  name: 'Perfume',            price: 7500,   category: 'Beauty',      image: 'https://picsum.photos/seed/perfume/400/300' },
  { _id: '10', name: 'Laptop',             price: 85000,  category: 'Electronics', image: 'https://picsum.photos/seed/laptop/400/300' },
  { _id: '11', name: 'Leather Wallet',     price: 2500,   category: 'Accessories', image: 'https://picsum.photos/seed/wallet/400/300' },
  { _id: '12', name: 'Face Cream',         price: 1800,   category: 'Beauty',      image: 'https://picsum.photos/seed/facecream/400/300' },
  { _id: '13', name: 'Smart TV 4K',        price: 95000,  category: 'Electronics', image: 'https://picsum.photos/seed/smarttv/400/300' },
  { _id: '14', name: 'Winter Jacket',      price: 8900,   category: 'Fashion',     image: 'https://picsum.photos/seed/jacket/400/300' },
  { _id: '15', name: 'Gold Bracelet',      price: 18000,  category: 'Accessories', image: 'https://picsum.photos/seed/bracelet/400/300' },
  { _id: '16', name: 'Air Fryer',          price: 12500,  category: 'Kitchen',     image: 'https://picsum.photos/seed/airfryer/400/300' },
  { _id: '17', name: 'Dumbbells Set',      price: 5500,   category: 'Sports',      image: 'https://picsum.photos/seed/dumbbells/400/300' },
  { _id: '18', name: 'Lipstick Set',       price: 2200,   category: 'Beauty',      image: 'https://picsum.photos/seed/lipstick/400/300' },
  { _id: '19', name: 'Bluetooth Speaker',  price: 6800,   category: 'Electronics', image: 'https://picsum.photos/seed/speaker/400/300' },
  { _id: '20', name: 'Formal Shoes',       price: 7200,   category: 'Fashion',     image: 'https://picsum.photos/seed/formalshoes/400/300' },
  { _id: '21', name: 'Gaming Mouse',       price: 4200,   category: 'Electronics', image: 'https://picsum.photos/seed/mouse/400/300' },
  { _id: '22', name: 'Blender',            price: 4800,   category: 'Kitchen',     image: 'https://picsum.photos/seed/blender/400/300' },
  { _id: '23', name: 'Football',           price: 3800,   category: 'Sports',      image: 'https://picsum.photos/seed/football/400/300' },
  { _id: '24', name: 'Moisturizer',        price: 1500,   category: 'Beauty',      image: 'https://picsum.photos/seed/moisturizer/400/300' },
  { _id: '25', name: 'iPad',               price: 120000, category: 'Electronics', image: 'https://picsum.photos/seed/ipad/400/300' },
  { _id: '26', name: 'Summer Dress',       price: 5500,   category: 'Fashion',     image: 'https://picsum.photos/seed/dress/400/300' },
  { _id: '27', name: 'Necklace',           price: 9500,   category: 'Accessories', image: 'https://picsum.photos/seed/necklace/400/300' },
  { _id: '28', name: 'Non-stick Pan',      price: 3200,   category: 'Kitchen',     image: 'https://picsum.photos/seed/pan/400/300' },
  { _id: '29', name: 'Tennis Racket',      price: 4500,   category: 'Sports',      image: 'https://picsum.photos/seed/tennis/400/300' },
  { _id: '30', name: 'Shampoo Set',        price: 1200,   category: 'Beauty',      image: 'https://picsum.photos/seed/shampoo/400/300' },
  { _id: '31', name: 'Smart Watch',        price: 25000,  category: 'Electronics', image: 'https://picsum.photos/seed/smartwatch/400/300' },
  { _id: '32', name: 'Leather Belt',       price: 1800,   category: 'Accessories', image: 'https://picsum.photos/seed/belt/400/300' },
  { _id: '33', name: 'Keyboard',           price: 8500,   category: 'Electronics', image: 'https://picsum.photos/seed/keyboard/400/300' },
  { _id: '34', name: 'Jeans',              price: 4500,   category: 'Fashion',     image: 'https://picsum.photos/seed/jeans/400/300' },
  { _id: '35', name: 'Ring',               price: 6500,   category: 'Accessories', image: 'https://picsum.photos/seed/ring/400/300' },
  { _id: '36', name: 'Microwave',          price: 18000,  category: 'Kitchen',     image: 'https://picsum.photos/seed/microwave/400/300' },
  { _id: '37', name: 'Cycling Helmet',     price: 3500,   category: 'Sports',      image: 'https://picsum.photos/seed/helmet/400/300' },
  { _id: '38', name: 'Eye Shadow Kit',     price: 2800,   category: 'Beauty',      image: 'https://picsum.photos/seed/eyeshadow/400/300' },
  { _id: '39', name: 'Earbuds',            price: 5500,   category: 'Electronics', image: 'https://picsum.photos/seed/earbuds/400/300' },
  { _id: '40', name: 'Sneakers',           price: 8900,   category: 'Fashion',     image: 'https://picsum.photos/seed/sneakers/400/300' },
];

const categories = ['All', 'Electronics', 'Fashion', 'Accessories', 'Kitchen', 'Sports', 'Beauty'];

export default function Products() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [addedId, setAddedId] = useState<string | null>(null);

  let filtered = allProducts.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  if (sortBy === 'low') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === 'high') filtered = [...filtered].sort((a, b) => b.price - a.price);

  const handleAddToCart = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setAddedId(id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <main className="bg-black text-white min-h-screen">

      <div className="border-b border-yellow-600/30 py-10 px-6 text-center">
        <p className="text-yellow-500 tracking-widest text-sm mb-2">EXPLORE</p>
        <h1 className="text-4xl font-bold">All <span className="text-yellow-500">Products</span></h1>
        <p className="text-gray-400 mt-2">{allProducts.length} premium items available</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-gray-900 border border-yellow-600/30 text-white px-4 py-3 focus:outline-none focus:border-yellow-500 placeholder-gray-500"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-900 border border-yellow-600/30 text-white px-4 py-3 focus:outline-none focus:border-yellow-500"
          >
            <option value="default">Sort By</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>

        <div className="flex gap-3 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-sm font-bold tracking-wider border transition ${
                selectedCategory === cat
                  ? 'bg-yellow-500 text-black border-yellow-500'
                  : 'border-yellow-600/30 text-gray-400 hover:border-yellow-500 hover:text-yellow-500'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        <p className="text-gray-500 text-sm mb-6">{filtered.length} products found</p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <Link href={`/products/${product._id}`} key={product._id}>
                <div className="border border-yellow-600/30 hover:border-yellow-500 bg-gray-900 hover:bg-gray-800 transition group cursor-pointer">
                  <div className="overflow-hidden h-56 bg-gray-800">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-yellow-500 text-xs tracking-widest mb-1">{product.category}</p>
                    <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                    <div className="flex justify-between items-center">
                      <p className="text-yellow-500 font-bold text-xl">Rs. {product.price.toLocaleString()}</p>
                      <button
                        onClick={(e) => handleAddToCart(e, product._id)}
                        className={`text-xs font-bold px-3 py-2 transition ${
                          addedId === product._id
                            ? 'bg-green-500 text-white'
                            : 'bg-yellow-500 text-black hover:bg-yellow-400'
                        }`}
                      >
                        {addedId === product._id ? 'ADDED!' : 'ADD TO CART'}
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">No products found.</p>
            <button
              onClick={() => { setSearch(''); setSelectedCategory('All'); }}
              className="mt-4 border border-yellow-500 text-yellow-500 px-6 py-3 hover:bg-yellow-500 hover:text-black transition"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      <footer className="border-t border-yellow-600/30 py-10 px-6 text-center mt-10">
        <p className="text-2xl font-bold mb-2"><span className="text-yellow-500">LUXE</span>MART</p>
        <p className="text-gray-500 text-sm">© 2026 LuxeMart. All rights reserved.</p>
      </footer>

    </main>
  );
}