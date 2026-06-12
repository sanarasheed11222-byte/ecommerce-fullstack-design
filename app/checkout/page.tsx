'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function Checkout() {
  const router = useRouter();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formError, setFormError] = useState('');
  const [form, setForm] = useState({
    name: user?.name || '',
    email: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'cod',
  });

  const [savedTotal] = useState(cartTotal);
  const shipping = savedTotal > 5000 ? 0 : 299;
  const grandTotal = savedTotal + shipping;

  const handleOrder = async () => {
    if (!form.name || !form.email || !form.phone || !form.address || !form.city) {
      setFormError('Please fill all required fields!');
      return;
    }
    setFormError('');
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setOrderPlaced(true);
    clearCart();
    setLoading(false);
  };

  if (orderPlaced) return (
    <main className="bg-black text-white min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">🎉</div>
        <h2 className="text-4xl font-bold mb-4">Order <span className="text-yellow-500">Placed!</span></h2>
        <p className="text-gray-400 mb-4">Thank you for shopping with LuxeMart. Your order has been confirmed.</p>
        <div className="border border-yellow-600/30 bg-gray-900 p-6 mb-8 text-left">
          <p className="text-yellow-500 text-xs tracking-widest mb-4">ORDER DETAILS</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Name</span>
              <span>{form.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Delivery to</span>
              <span>{form.city}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Payment</span>
              <span>{form.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card'}</span>
            </div>
            <div className="flex justify-between font-bold text-yellow-500 border-t border-yellow-600/20 pt-2 mt-2">
              <span>Total</span>
              <span>Rs. {grandTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
        <Link href="/products">
          <button className="bg-yellow-500 text-black font-bold px-10 py-4 hover:bg-yellow-400 transition tracking-widest text-sm">
            CONTINUE SHOPPING →
          </button>
        </Link>
      </div>
    </main>
  );

  if (cartItems.length === 0) return (
    <main className="bg-black text-white min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-6xl mb-6">🛒</p>
        <h2 className="text-3xl font-bold mb-4">Your cart is <span className="text-yellow-500">empty</span></h2>
        <Link href="/products">
          <button className="bg-yellow-500 text-black font-bold px-8 py-4 hover:bg-yellow-400 transition tracking-widest text-sm">
            SHOP NOW
          </button>
        </Link>
      </div>
    </main>
  );

  return (
    <main className="bg-black text-white min-h-screen">
      <div className="border-b border-yellow-600/30 py-10 px-6 text-center">
        <p className="text-yellow-500 tracking-widest text-sm mb-2">FINAL STEP</p>
        <h1 className="text-4xl font-bold">Check<span className="text-yellow-500">out</span></h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* LEFT */}
          <div className="flex-1 space-y-6">
            <div className="border border-yellow-600/30 bg-gray-900 p-6">
              <h2 className="text-lg font-bold mb-6 tracking-widest">
                📦 DELIVERY <span className="text-yellow-500">INFORMATION</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-xs tracking-widest block mb-2">FULL NAME</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name"
                    className="w-full bg-black border border-yellow-600/30 text-white px-4 py-3 focus:outline-none focus:border-yellow-500 placeholder-gray-600" />
                </div>
                <div>
                  <label className="text-gray-400 text-xs tracking-widest block mb-2">EMAIL</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com"
                    className="w-full bg-black border border-yellow-600/30 text-white px-4 py-3 focus:outline-none focus:border-yellow-500 placeholder-gray-600" />
                </div>
                <div>
                  <label className="text-gray-400 text-xs tracking-widest block mb-2">PHONE</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="03XX-XXXXXXX"
                    className="w-full bg-black border border-yellow-600/30 text-white px-4 py-3 focus:outline-none focus:border-yellow-500 placeholder-gray-600" />
                </div>
                <div>
                  <label className="text-gray-400 text-xs tracking-widest block mb-2">CITY</label>
                  <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Lahore, Karachi..."
                    className="w-full bg-black border border-yellow-600/30 text-white px-4 py-3 focus:outline-none focus:border-yellow-500 placeholder-gray-600" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-gray-400 text-xs tracking-widest block mb-2">FULL ADDRESS</label>
                  <textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="House/Flat No, Street, Area..." rows={3}
                    className="w-full bg-black border border-yellow-600/30 text-white px-4 py-3 focus:outline-none focus:border-yellow-500 placeholder-gray-600 resize-none" />
                </div>
              </div>
            </div>

            <div className="border border-yellow-600/30 bg-gray-900 p-6">
              <h2 className="text-lg font-bold mb-6 tracking-widest">
                💳 PAYMENT <span className="text-yellow-500">METHOD</span>
              </h2>
              <div className="space-y-3">
                <label className={`flex items-center gap-4 p-4 border cursor-pointer transition ${form.paymentMethod === 'cod' ? 'border-yellow-500 bg-yellow-500/10' : 'border-yellow-600/20'}`}>
                  <input type="radio" value="cod" checked={form.paymentMethod === 'cod'} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })} className="accent-yellow-500" />
                  <div>
                    <p className="font-bold">Cash on Delivery</p>
                    <p className="text-gray-400 text-sm">Pay when your order arrives</p>
                  </div>
                </label>
                <label className={`flex items-center gap-4 p-4 border cursor-pointer transition ${form.paymentMethod === 'card' ? 'border-yellow-500 bg-yellow-500/10' : 'border-yellow-600/20'}`}>
                  <input type="radio" value="card" checked={form.paymentMethod === 'card'} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })} className="accent-yellow-500" />
                  <div>
                    <p className="font-bold">Credit / Debit Card</p>
                    <p className="text-gray-400 text-sm">Visa, Mastercard accepted</p>
                  </div>
                </label>
                {form.paymentMethod === 'card' && (
  <div className="mt-4 space-y-4 border border-yellow-600/30 p-4 bg-gray-900">
    <p className="text-yellow-500 text-xs tracking-widest font-bold">CARD DETAILS</p>
    <input type="text" placeholder="Card Number (1234 5678 9012 3456)" className="w-full bg-gray-800 border border-yellow-600/30 text-white px-4 py-3 focus:outline-none focus:border-yellow-500" />
    <div className="flex gap-4">
      <input type="text" placeholder="MM/YY" className="w-full bg-gray-800 border border-yellow-600/30 text-white px-4 py-3 focus:outline-none focus:border-yellow-500" />
      <input type="text" placeholder="CVV" className="w-full bg-gray-800 border border-yellow-600/30 text-white px-4 py-3 focus:outline-none focus:border-yellow-500" />
    </div>
  </div>
)}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full lg:w-96 space-y-4">
            <div className="border border-yellow-600/30 bg-gray-900 p-6">
              <h2 className="text-xs text-yellow-500 tracking-widest font-bold mb-4">ORDER SUMMARY ({cartItems.length} items)</h2>
              <div className="space-y-3 mb-4">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex gap-3 items-center">
                    <img src={`${item.image}&w=80&q=80`} alt={item.name} className="w-12 h-12 object-cover border border-yellow-600/20" />
                    <div className="flex-1">
                      <p className="text-sm font-bold truncate">{item.name}</p>
                      <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-yellow-500 text-sm font-bold">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-yellow-600/20 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white">Rs. {cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-400 font-bold' : 'text-white'}>
                    {shipping === 0 ? 'FREE' : `Rs. ${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-yellow-600/20 pt-3 mt-2">
                  <span>Total</span>
                  <span className="text-yellow-500">Rs. {grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {formError && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 text-sm font-bold">
                ⚠ {formError}
              </div>
            )}

            <button onClick={handleOrder} disabled={loading}
              className="w-full bg-yellow-500 text-black font-bold py-4 hover:bg-yellow-400 transition tracking-widest text-sm disabled:opacity-50">
              {loading ? 'PLACING ORDER...' : 'PLACE ORDER →'}
            </button>

            <Link href="/cart">
              <button className="w-full border border-yellow-600/30 text-gray-400 py-3 hover:border-yellow-500 hover:text-yellow-500 transition text-sm font-bold tracking-wider">
                ← BACK TO CART
              </button>
            </Link>

            <div className="grid grid-cols-3 gap-2 pt-2">
              {[{ icon: '🔒', label: 'Secure' }, { icon: '↩️', label: 'Returns' }, { icon: '⭐', label: 'Quality' }].map((b) => (
                <div key={b.label} className="text-center border border-yellow-600/10 p-3">
                  <p className="text-xl">{b.icon}</p>
                  <p className="text-gray-600 text-xs mt-1">{b.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-yellow-600/30 py-10 px-6 text-center mt-10">
        <p className="text-2xl font-bold mb-2"><span className="text-yellow-500">LUXE</span>MART</p>
        <p className="text-gray-500 text-sm">© 2026 LuxeMart. All rights reserved.</p>
      </footer>
    </main>
  );
}