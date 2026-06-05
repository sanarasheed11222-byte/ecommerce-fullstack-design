'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

const categoryFallbacks: Record<string, string> = {
  Electronics: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
  Fashion:     'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop&q=80',
  Accessories: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&auto=format&fit=crop&q=80',
  Kitchen:     'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop&q=80',
  Sports:      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=80',
  Beauty:      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop&q=80',
};

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  stock: number;
}

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!params.id) return;
    fetch(`/api/products/${params.id}`)
      .then(res => {
        if (!res.ok) { setNotFound(true); setLoading(false); return null; }
        return res.json();
      })
      .then(data => {
        if (!data) return;
        setProduct(data);
        setLoading(false);
        fetch('/api/products')
          .then(res => res.json())
          .then(all => {
            const rel = all.filter((p: Product) =>
              p.category === data.category && p._id !== data._id
            ).slice(0, 4);
            setRelated(rel);
          });
      })
      .catch(() => { setNotFound(true); setLoading(false); });
  }, [params.id]);

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return (
    <main className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-yellow-500 tracking-widest">LOADING...</p>
      </div>
    </main>
  );

  if (notFound || !product) return (
    <main className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-yellow-500 text-6xl mb-6">404</p>
        <p className="text-gray-400 text-xl mb-6">Product not found.</p>
        <Link href="/products">
          <button className="bg-yellow-500 text-black font-bold px-8 py-4 hover:bg-yellow-400 transition tracking-widest">
            BACK TO PRODUCTS
          </button>
        </Link>
      </div>
    </main>
  );

  return (
    <main className="bg-black text-white min-h-screen">

      <div className="border-b border-yellow-600/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-yellow-500 transition">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-yellow-500 transition">Products</Link>
          <span>/</span>
          <span className="text-yellow-500">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">

          <div className="relative">
            <div className="border border-yellow-600/30 overflow-hidden bg-gray-900 h-96 lg:h-[500px]">
              <img
                src={`${product.image}&w=800&q=80`}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = categoryFallbacks[product.category] || '';
                }}
              />
            </div>
            <div className="absolute top-4 left-4 bg-yellow-500 text-black text-xs font-bold px-3 py-1 tracking-widest">
              {product.category.toUpperCase()}
            </div>
          </div>

          <div className="flex flex-col justify-center gap-6">
            <div>
              <p className="text-yellow-500 tracking-widest text-xs mb-2">{product.category.toUpperCase()}</p>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-yellow-500 font-bold text-4xl mb-4">Rs. {product.price.toLocaleString()}</p>
              <p className="text-gray-400 leading-relaxed">{product.description}</p>
              <p className={`text-sm mt-3 font-bold ${product.stock > 5 ? 'text-green-400' : 'text-red-400'}`}>
                {product.stock > 5 ? `✓ In Stock (${product.stock} available)` : `⚠ Only ${product.stock} left!`}
              </p>
            </div>

            <div className="border border-yellow-600/20 bg-gray-900/50 p-4 space-y-2">
              {['Free delivery on orders over Rs. 5,000', 'Easy 30-day returns', '100% authentic product', '1 year warranty included'].map((f) => (
                <div key={f} className="flex items-center gap-3 text-sm text-gray-300">
                  <span className="text-yellow-500 font-bold">✓</span>{f}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center border border-yellow-600/30">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-3 text-yellow-500 hover:bg-yellow-500/10 transition text-xl font-bold">−</button>
                <span className="px-6 py-3 border-x border-yellow-600/30 font-bold text-lg min-w-[4rem] text-center">{quantity}</span>
                <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} className="px-4 py-3 text-yellow-500 hover:bg-yellow-500/10 transition text-xl font-bold">+</button>
              </div>
              <button
                onClick={handleAddToCart}
                className={`flex-1 font-bold py-3 px-6 transition tracking-widest text-sm ${added ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black hover:bg-yellow-400'}`}
              >
                {added ? '✓ ADDED TO CART!' : 'ADD TO CART'}
              </button>
            </div>

            <Link href="/cart">
              <button className="w-full border border-yellow-600/30 text-yellow-500 py-3 hover:bg-yellow-500 hover:text-black transition font-bold tracking-widest text-sm">
                VIEW CART →
              </button>
            </Link>

            <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-400 transition text-sm text-left">
              ← Back to products
            </button>
          </div>
        </div>

        {related.length > 0 && (
          <div>
            <div className="border-b border-yellow-600/20 pb-4 mb-8">
              <h2 className="text-2xl font-bold">You May Also <span className="text-yellow-500">Like</span></h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <Link href={`/products/${p._id}`} key={p._id}>
                  <div className="border border-yellow-600/30 hover:border-yellow-500 bg-gray-900 hover:bg-gray-800 transition group cursor-pointer">
                    <div className="overflow-hidden h-48 bg-gray-800">
                      <img
                        src={`${p.image}&w=400&q=80`}
                        alt={p.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = categoryFallbacks[p.category] || ''; }}
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-yellow-500 text-xs tracking-widest mb-1">{p.category}</p>
                      <h3 className="font-bold mb-2">{p.name}</h3>
                      <p className="text-yellow-500 font-bold">Rs. {p.price.toLocaleString()}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
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