'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  stock: number;
}

// Hero slideshow images
const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop&q=80',
    title: 'Luxury Redefined',
    subtitle: 'Discover premium products crafted for those who demand nothing but the best',
  },
  {
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&auto=format&fit=crop&q=80',
    title: 'Exclusive Collection',
    subtitle: 'Shop the latest trends in fashion, electronics and accessories',
  },
  {
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600&auto=format&fit=crop&q=80',
    title: 'Premium Quality',
    subtitle: 'Every product verified and authenticated for your satisfaction',
  },
  {
    image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=1600&auto=format&fit=crop&q=80',
    title: 'Shop With Confidence',
    subtitle: 'Free delivery, easy returns and 24/7 customer support',
  },
];

export default function Home() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [addedId, setAddedId] = useState<string | null>(null);

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
   

fetch('https://ecommerce-fullstack-design-5atl.vercel.app/_/backend/api/products')

      .then(res => res.json())
      .then(data => setProducts(data.slice(0, 8)));
  }, []);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    addToCart(product);
    setAddedId(product._id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <main className="bg-black text-white min-h-screen">

      {/* ── Hero Slideshow ── */}
      <section className="relative h-screen overflow-hidden">

        {/* Slides */}
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60"></div>
            {/* Gold gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          </div>
        ))}

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center px-6 md:px-20">
          <div className="max-w-2xl">
            <p className="text-yellow-500 tracking-[0.5em] text-xs mb-4">
              WELCOME TO LUXEMART
            </p>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-gray-300 text-lg mb-10 leading-relaxed max-w-lg">
              {heroSlides[currentSlide].subtitle}
            </p>
            <Link href="/products">
              <button className="bg-yellow-500 text-black font-bold px-12 py-4 hover:bg-yellow-400 transition tracking-widest text-sm">
                SHOP NOW →
              </button>
            </Link>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? 'w-8 h-2 bg-yellow-500'
                  : 'w-2 h-2 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Slide arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10 border border-white/20 text-white w-12 h-12 flex items-center justify-center hover:border-yellow-500 hover:text-yellow-500 transition"
        >
          ←
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 z-10 border border-white/20 text-white w-12 h-12 flex items-center justify-center hover:border-yellow-500 hover:text-yellow-500 transition"
        >
          →
        </button>

      </section>

      {/* ── Stats Bar ── */}
      <section className="border-y border-yellow-600/20 py-10 px-6 bg-gray-900/50">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: '32+', label: 'Premium Products' },
            { number: '6', label: 'Categories' },
            { number: '100%', label: 'Authentic' },
            { number: '24/7', label: 'Support' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-yellow-500 font-bold text-4xl mb-1">{stat.number}</p>
              <p className="text-gray-400 text-xs tracking-widest">{stat.label.toUpperCase()}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-yellow-500 tracking-widest text-xs mb-3">BROWSE BY</p>
            <h2 className="text-4xl font-bold">Shop by <span className="text-yellow-500">Category</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Electronics', icon: '💻' },
              { name: 'Fashion', icon: '👗' },
              { name: 'Accessories', icon: '⌚' },
              { name: 'Kitchen', icon: '🍳' },
              { name: 'Sports', icon: '⚽' },
              { name: 'Beauty', icon: '💄' },
            ].map((cat) => (
              <Link href={`/products`} key={cat.name}>
                <div className="border border-yellow-600/20 bg-gray-900 hover:border-yellow-500 hover:bg-gray-800 transition p-6 text-center cursor-pointer group">
                  <p className="text-4xl mb-3">{cat.icon}</p>
                  <p className="text-xs font-bold tracking-widest group-hover:text-yellow-500 transition">{cat.name.toUpperCase()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── New Arrivals ── */}
      <section className="py-20 px-6 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-yellow-500 tracking-widest text-xs mb-3">JUST IN</p>
            <h2 className="text-4xl font-bold">New <span className="text-yellow-500">Arrivals</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link href={`/products/${product._id}`} key={product._id}>
                <div className="border border-yellow-600/20 hover:border-yellow-500 bg-black hover:bg-gray-900 transition group cursor-pointer">
                  <div className="overflow-hidden h-56 bg-gray-800 relative">
                    <img
                      src={`${product.image}&w=400&q=80`}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-yellow-500 text-black text-xs font-bold px-2 py-1">
                      NEW
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-yellow-500 text-xs tracking-widest mb-1">{product.category}</p>
                    <h3 className="font-bold text-lg mb-3">{product.name}</h3>
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
                        {addedId === product._id ? '✓' : 'ADD'}
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/products">
              <button className="border border-yellow-500 text-yellow-500 px-10 py-4 hover:bg-yellow-500 hover:text-black transition font-bold tracking-widest text-sm">
                VIEW ALL PRODUCTS →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why LuxeMart ── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-yellow-500 tracking-widest text-xs mb-3">WHY CHOOSE US</p>
            <h2 className="text-4xl font-bold">The <span className="text-yellow-500">LuxeMart</span> Promise</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🚚', title: 'Free Delivery', desc: 'Free shipping on all orders over Rs. 5,000. Fast and reliable delivery to your doorstep.' },
              { icon: '✅', title: '100% Authentic', desc: 'Every product is verified and authenticated. We guarantee premium quality always.' },
              { icon: '↩️', title: 'Easy Returns', desc: '30-day hassle-free return policy. Your satisfaction is our top priority.' },
            ].map((item) => (
              <div key={item.title} className="border border-yellow-600/20 bg-gray-900 p-8 text-center hover:border-yellow-500 transition">
                <p className="text-5xl mb-4">{item.icon}</p>
                <h3 className="font-bold text-xl mb-3 text-yellow-500">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-yellow-500/5 border-y border-yellow-600/20"></div>
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-yellow-500 tracking-widest text-xs mb-4">GET STARTED TODAY</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Experience <span className="text-yellow-500">Luxury?</span>
          </h2>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Join thousands of satisfied customers who trust LuxeMart for their premium shopping needs.
          </p>
          <Link href="/signup">
            <button className="bg-yellow-500 text-black font-bold px-12 py-5 hover:bg-yellow-400 transition tracking-widest text-sm">
              CREATE FREE ACCOUNT →
            </button>
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-yellow-600/30 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div>
            <h3 className="text-2xl font-bold mb-4"><span className="text-yellow-500">LUXEMART</span>MART</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Premium luxury shopping for those who demand the best.</p>
          </div>
          <div>
            <h4 className="font-bold tracking-widest mb-4 text-xs text-gray-400">SHOP</h4>
            <div className="space-y-2">
              {['Electronics', 'Fashion', 'Accessories', 'Kitchen', 'Sports', 'Beauty'].map(cat => (
                <Link key={cat} href="/products">
                  <p className="text-gray-500 text-sm hover:text-yellow-500 transition cursor-pointer">{cat}</p>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold tracking-widest mb-4 text-xs text-gray-400">ACCOUNT</h4>
            <div className="space-y-2">
              {[{label:'Login', href:'/login'}, {label:'Sign Up', href:'/signup'}, {label:'My Cart', href:'/cart'}].map(item => (
                <Link key={item.label} href={item.href}>
                  <p className="text-gray-500 text-sm hover:text-yellow-500 transition cursor-pointer">{item.label}</p>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold tracking-widest mb-4 text-xs text-gray-400">SUPPORT</h4>
            <div className="space-y-2">
              {['FAQ', 'Shipping Policy', 'Return Policy', 'Contact Us'].map(item => (
                <p key={item} className="text-gray-500 text-sm hover:text-yellow-500 transition cursor-pointer">{item}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-yellow-600/20 pt-8 text-center">
          <p className="text-gray-600 text-sm">© 2026 LuxeMart. All rights reserved. ⭐</p>
        </div>
      </footer>

    </main>
  );
}