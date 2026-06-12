'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

const categoryFallbacks: Record<string, string> = {
  Electronics: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=80',
  Fashion:     'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&auto=format&fit=crop&q=80',
  Accessories: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400&auto=format&fit=crop&q=80',
  Kitchen:     'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&auto=format&fit=crop&q=80',
  Sports:      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&auto=format&fit=crop&q=80',
  Beauty:      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&auto=format&fit=crop&q=80',
};

const PROMO_CODES: Record<string, number> = {
  LUXEMART10: 10,
  SAVE20: 20,
  VIP30:  30,
};

function getEstimatedDate() {
  const d = new Date();
  d.setDate(d.getDate() + 5);
  return d.toLocaleDateString('en-PK', { weekday: 'long', month: 'long', day: 'numeric' });
}

const recommended = [
  { _id: 'r1', name: 'Silver Ring',      price: 4200,  category: 'Accessories', image: 'https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compresshttps://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&auto=format&fit=crop&q=80cs=tinysrgbhttps://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&auto=format&fit=crop&q=80w=400' },
  { _id: 'r2', name: 'Wireless Earbuds', price: 7800,  category: 'Electronics', image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compresshttps://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&auto=format&fit=crop&q=80cs=tinysrgbhttps://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&auto=format&fit=crop&q=80w=400' },
  { _id: 'r3', name: 'Silk Scarf',       price: 3500,  category: 'Fashion',     image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compresshttps://images.unsplash.com/photo-1601924638867-3a6de6b7a500?w=400&auto=format&fit=crop&q=80cs=tinysrgbhttps://images.unsplash.com/photo-1601924638867-3a6de6b7a500?w=400&auto=format&fit=crop&q=80w=400' },
  { _id: 'r4', name: 'Aroma Diffuser',   price: 2900,  category: 'Beauty',      image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compresshttps://images.unsplash.com/photo-1608181831718-c9e5e8b7a9e8?w=400&auto=format&fit=crop&q=80cs=tinysrgbhttps://images.unsplash.com/photo-1608181831718-c9e5e8b7a9e8?w=400&auto=format&fit=crop&q=80w=400' },
];

export default function CartPage() {
  const router = useRouter();
  const { cartItems, savedItems, removeFromCart, updateQuantity, saveForLater, moveToCart, removeSaved, addToCart, cartTotal } = useCart();
  const [promoInput, setPromoInput] = useState('');
  const [promoApplied, setPromoApplied] = useState('');
  const [promoError, setPromoError] = useState('');
  const [discount, setDiscount] = useState(0);

  const shipping = cartTotal > 5000 ? 0 : 299;
  const discountAmt = Math.round((cartTotal * discount) / 100);
  const grandTotal = cartTotal - discountAmt + shipping;

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setDiscount(PROMO_CODES[code]);
      setPromoApplied(code);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try LUXEMART10, SAVE20 or VIP30.');
      setDiscount(0);
      setPromoApplied('');
    }
  };

  const removePromo = () => {
    setDiscount(0);
    setPromoApplied('');
    setPromoInput('');
    setPromoError('');
  };

  if (cartItems.length === 0 && savedItems.length === 0) {
    return (
      <main className="bg-black text-white min-h-screen flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-8xl mb-6 opacity-20">🛒</div>
          <h2 className="text-3xl font-bold mb-3">Your cart is <span className="text-yellow-500">empty</span></h2>
          <p className="text-gray-400 mb-8">Looks like you haven't added anything yet.</p>
          <Link href="/products">
            <button className="bg-yellow-500 text-black font-bold px-8 py-4 hover:bg-yellow-400 transition tracking-widest text-sm">
              SHOP NOW
            </button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-black text-white min-h-screen">
      <div className="border-b border-yellow-600/30 py-10 px-6 text-center">
        <p className="text-yellow-500 tracking-widest text-sm mb-2">REVIEW & CHECKOUT</p>
        <h1 className="text-4xl font-bold">Your <span className="text-yellow-500">Cart</span></h1>
        <p className="text-gray-400 mt-2">{cartItems.reduce((s, i) => s + i.quantity, 0)} item(s) in your bag</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* LEFT */}
          <div className="flex-1 space-y-4">

            {cartTotal < 5000 && (
              <div className="border border-yellow-600/40 bg-yellow-500/5 px-5 py-3 flex items-center gap-3">
                <span className="text-yellow-500 text-lg">🚚</span>
                <p className="text-sm text-gray-300">Add <span className="text-yellow-400 font-bold">Rs. {(5000 - cartTotal).toLocaleString()}</span> more for <span className="text-yellow-400 font-bold">FREE shipping</span></p>
              </div>
            )}
            {cartTotal >= 5000 && (
              <div className="border border-green-600/40 bg-green-500/5 px-5 py-3 flex items-center gap-3">
                <span className="text-green-400 text-lg">✓</span>
                <p className="text-sm text-green-400 font-bold">You've unlocked FREE shipping!</p>
              </div>
            )}

            {cartItems.map((item) => (
              <div key={item._id} className="border border-yellow-600/20 bg-gray-900 p-4 flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-28 h-28 flex-shrink-0 overflow-hidden">
                  <img
                    src={`${item.image}&w=200&q=80`}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = categoryFallbacks[item.category] || ''; }}
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between gap-3">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <p className="text-yellow-500 text-xs tracking-widest">{item.category}</p>
                      <h3 className="font-bold text-lg">{item.name}</h3>
                    </div>
                    <p className="text-yellow-500 font-bold text-lg">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center border border-yellow-600/30">
                      <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="px-3 py-1 text-yellow-500 hover:bg-yellow-500/10 transition text-lg font-bold">−</button>
                      <span className="px-4 py-1 border-x border-yellow-600/30 min-w-[2.5rem] text-center font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="px-3 py-1 text-yellow-500 hover:bg-yellow-500/10 transition text-lg font-bold">+</button>
                    </div>
                    <div className="flex gap-3 text-xs font-bold tracking-wider">
                      <button onClick={() => saveForLater(item._id)} className="text-gray-400 hover:text-yellow-500 transition">SAVE FOR LATER</button>
                      <span className="text-gray-700">|</span>
                      <button onClick={() => removeFromCart(item._id)} className="text-gray-400 hover:text-red-400 transition">REMOVE</button>
                    </div>
                  </div>
                  <p className="text-gray-600 text-xs">Unit price: Rs. {item.price.toLocaleString()}</p>
                </div>
              </div>
            ))}

            {savedItems.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-bold text-gray-400 tracking-widest mb-4 border-b border-yellow-600/20 pb-3">
                  SAVED FOR LATER ({savedItems.length})
                </h2>
                <div className="space-y-3">
                  {savedItems.map((item) => (
                    <div key={item._id} className="border border-gray-800 bg-gray-900/50 p-4 flex flex-col sm:flex-row gap-4">
                      <div className="w-full sm:w-20 h-20 flex-shrink-0 overflow-hidden opacity-70">
                        <img src={`${item.image}&w=200&q=80`} alt={item.name} className="w-full h-full object-cover"
                          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = categoryFallbacks[item.category] || ''; }} />
                      </div>
                      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <p className="text-yellow-500/60 text-xs tracking-widest">{item.category}</p>
                          <h3 className="font-bold text-gray-300">{item.name}</h3>
                          <p className="text-yellow-500/80 font-bold">Rs. {item.price.toLocaleString()}</p>
                        </div>
                        <div className="flex gap-3 text-xs font-bold tracking-wider">
                          <button onClick={() => moveToCart(item._id)} className="border border-yellow-500/50 text-yellow-500 px-3 py-2 hover:bg-yellow-500 hover:text-black transition">MOVE TO CART</button>
                          <button onClick={() => removeSaved(item._id)} className="text-gray-600 hover:text-red-400 transition">REMOVE</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommended */}
            <div className="mt-10">
              <h2 className="text-lg font-bold tracking-widest mb-4 border-b border-yellow-600/20 pb-3">
                YOU MIGHT ALSO <span className="text-yellow-500">LIKE</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {recommended.map((p) => (
                  <div key={p._id} className="border border-yellow-600/20 bg-gray-900 hover:border-yellow-500/50 transition group">
                    <div className="h-32 overflow-hidden">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = categoryFallbacks[p.category] || ''; }} />
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-gray-500 truncate">{p.name}</p>
                      <p className="text-yellow-500 font-bold text-sm">Rs. {p.price.toLocaleString()}</p>
                      <button onClick={() => addToCart(p)} className="mt-2 w-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-xs font-bold py-1.5 hover:bg-yellow-500 hover:text-black transition">+ ADD</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full lg:w-96 space-y-4">

            <div className="border border-yellow-600/30 bg-gray-900 p-5">
              <p className="text-xs text-yellow-500 tracking-widest font-bold mb-1">ESTIMATED DELIVERY</p>
              <p className="text-white font-bold text-lg">{getEstimatedDate()}</p>
              <p className="text-gray-500 text-xs mt-1">Standard delivery · 5 business days</p>
            </div>

            <div className="border border-yellow-600/30 bg-gray-900 p-5">
              <p className="text-xs text-yellow-500 tracking-widest font-bold mb-3">PROMO CODE</p>
              {!promoApplied ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code..."
                    value={promoInput}
                    onChange={(e) => { setPromoInput(e.target.value); setPromoError(''); }}
                    onKeyDown={(e) => e.key === 'Enter' && applyPromo()}
                    className="flex-1 bg-black border border-yellow-600/30 text-white px-3 py-2 text-sm focus:outline-none focus:border-yellow-500 placeholder-gray-600 uppercase"
                  />
                  <button onClick={applyPromo} className="bg-yellow-500 text-black font-bold px-4 py-2 text-sm hover:bg-yellow-400 transition">APPLY</button>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-green-500/10 border border-green-500/30 px-4 py-3">
                  <div>
                    <p className="text-green-400 font-bold text-sm">{promoApplied} applied!</p>
                    <p className="text-green-400/70 text-xs">{discount}% discount</p>
                  </div>
                  <button onClick={removePromo} className="text-gray-500 hover:text-red-400 transition text-xs font-bold">REMOVE</button>
                </div>
              )}
              {promoError && <p className="text-red-400 text-xs mt-2">{promoError}</p>}
              {!promoApplied && <p className="text-gray-600 text-xs mt-2">Try: LUXEMART10 · SAVE20 · VIP30</p>}
            </div>

            <div className="border border-yellow-600/30 bg-gray-900 p-5 space-y-3">
              <p className="text-xs text-yellow-500 tracking-widest font-bold mb-4">ORDER SUMMARY</p>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="text-white">Rs. {cartTotal.toLocaleString()}</span>
              </div>
              {discountAmt > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-400">Discount ({discount}%)</span>
                  <span className="text-green-400">− Rs. {discountAmt.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-gray-400">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-green-400 font-bold' : 'text-white'}>
                  {shipping === 0 ? 'FREE' : `Rs. ${shipping.toLocaleString()}`}
                </span>
              </div>
              <div className="border-t border-yellow-600/20 pt-3 flex justify-between items-center">
                <span className="font-bold text-lg">Total</span>
                <span className="text-yellow-500 font-bold text-2xl">Rs. {grandTotal.toLocaleString()}</span>
              </div>
              <button onClick={() => router.push('/checkout')} className="w-full bg-yellow-500 text-black font-bold py-4 hover:bg-yellow-400 transition tracking-widest text-sm mt-2">
                PROCEED TO CHECKOUT →
              </button>
              <Link href="/products">
                <button className="w-full border border-yellow-600/30 text-gray-400 py-3 hover:border-yellow-500 hover:text-yellow-500 transition text-sm font-bold tracking-wider mt-1">
                  ← CONTINUE SHOPPING
                </button>
              </Link>
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-yellow-600/10">
                {[{ icon: '🔒', label: 'Secure\nPayment' }, { icon: '↩️', label: 'Easy\nReturns' }, { icon: '⭐', label: 'Premium\nQuality' }].map((b) => (
                  <div key={b.label} className="text-center">
                    <p className="text-lg">{b.icon}</p>
                    <p className="text-gray-600 text-xs leading-tight mt-1 whitespace-pre-line">{b.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-yellow-600/30 py-10 px-6 text-center mt-10">
        <p className="text-2xl font-bold mb-2"><span className="text-yellow-500">LUXEMART</span>MART</p>
        <p className="text-gray-500 text-sm">© 2026 LuxeMart. All rights reserved.</p>
      </footer>
    </main>
  );
}