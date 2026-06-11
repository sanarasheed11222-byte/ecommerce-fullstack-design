'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

const categoryFallbacks: Record<string, string> = {
  Electronics: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=80',
  Fashion:     'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&auto=format&fit=crop&q=80',
  Accessories: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400&auto=format&fit=crop&q=80',
  Kitchen:     'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&auto=format&fit=crop&q=80',
  Sports:      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&auto=format&fit=crop&q=80',
  Beauty:      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&auto=format&fit=crop&q=80',
};

const categories = ['All', 'Electronics', 'Fashion', 'Accessories', 'Kitchen', 'Sports', 'Beauty'];

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  stock: number;
}

export default function Products() {
  const { addToCart, cartCount } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [addedId, setAddedId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  let filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  if (sortBy === 'low') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === 'high') filtered = [...filtered].sort((a, b) => b.price - a.price);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    addToCart(product);
    setAddedId(product._id);
    setTimeout(() => setAddedId(null), 1500);
  };

  if (loading) return (
    <main className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-yellow-500 tracking-widest">LOADING PRODUCTS...</p>
      </div>
    </main>
  );

  return (
    <main className="bg-black text-white min-h-screen">
      <div className="border-b border-yellow-600/30 py-10 px-6 text-center">
        <p className="text-yellow-500 tracking-widest text-sm mb-2">EXPLORE</p>
        <h1 className="text-4xl font-bold">All <span className="text-yellow-500">Products</span></h1>
        <p className="text-gray-400 mt-2">Discover our complete luxury collection</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex justify-end mb-4">
          <Link href="/cart">
            <button className="border border-yellow-600/30 text-yellow-500 px-4 py-2 hover:bg-yellow-500 hover:text-black transition text-sm font-bold">
              🛒 CART ({cartCount})
            </button>
          </Link>
        </div>

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
                  <div className="overflow-hidden relative h-56 bg-gray-800">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = categoryFallbacks[product.category] || '';
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-yellow-500 text-xs tracking-widest mb-1">{product.category}</p>
                    <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                    <div className="flex justify-between items-center">
                      <p className="text-yellow-500 font-bold text-xl">Rs. {product.price.toLocaleString()}</p>
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className={`text-xs font-bold px-3 py-2 transition ${
                          addedId === product._id
                            ? 'bg-green-500 text-white'
                            : 'bg-yellow-500 text-black hover:bg-yellow-400'
                        }`}
                      >
                        {addedId === product._id ? '✓ ADDED!' : 'ADD TO CART'}
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