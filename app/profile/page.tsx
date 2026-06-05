'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Profile() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [tab, setTab] = useState('profile');

  useEffect(() => {
    const savedUser = localStorage.getItem('luxemart_user');
    if (!savedUser) { router.push('/login'); return; }
    const parsedUser = JSON.parse(savedUser);
    setName(parsedUser.name);
    setEmail(parsedUser.email);
  }, []);

  const handleUpdate = async () => {
    setMessage('✅ Profile updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  if (!user) return null;

  return (
    <main className="bg-black text-white min-h-screen">

      <div className="border-b border-yellow-600/30 py-10 px-6 text-center">
        <p className="text-yellow-500 tracking-widest text-sm mb-2">MY ACCOUNT</p>
        <h1 className="text-4xl font-bold">My <span className="text-yellow-500">Profile</span></h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-2">
            <div className="border border-yellow-600/30 bg-gray-900 p-6 text-center mb-4">
              <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-black font-bold text-3xl">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <p className="font-bold text-lg">{user.name}</p>
              <p className="text-gray-400 text-sm">{user.email}</p>
              {user.role === 'admin' && (
                <span className="inline-block bg-yellow-500 text-black text-xs font-bold px-3 py-1 mt-2 tracking-widest">
                  ADMIN
                </span>
              )}
            </div>

            {[
              { id: 'profile', label: '👤 My Profile' },
              { id: 'orders',  label: '📦 My Orders' },
              { id: 'security', label: '🔒 Security' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`w-full text-left px-4 py-3 text-sm font-bold tracking-wider border transition ${
                  tab === item.id
                    ? 'bg-yellow-500 text-black border-yellow-500'
                    : 'border-yellow-600/20 text-gray-400 hover:border-yellow-500 hover:text-yellow-500'
                }`}
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={() => { logout(); router.push('/'); }}
              className="w-full text-left px-4 py-3 text-sm font-bold tracking-wider border border-red-500/20 text-red-400 hover:bg-red-500/10 transition"
            >
              🚪 Logout
            </button>
          </div>

          {/* Content */}
          <div className="flex-1">

            {tab === 'profile' && (
              <div className="border border-yellow-600/30 bg-gray-900 p-6">
                <h2 className="text-xl font-bold mb-6">
                  Personal <span className="text-yellow-500">Information</span>
                </h2>
                {message && (
                  <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 mb-6 text-sm">
                    {message}
                  </div>
                )}
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-xs tracking-widest block mb-2">FULL NAME</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                      className="w-full bg-black border border-yellow-600/30 text-white px-4 py-3 focus:outline-none focus:border-yellow-500" />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs tracking-widest block mb-2">EMAIL</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black border border-yellow-600/30 text-white px-4 py-3 focus:outline-none focus:border-yellow-500" />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs tracking-widest block mb-2">ROLE</label>
                    <input type="text" value={user.role.toUpperCase()} disabled
                      className="w-full bg-black border border-yellow-600/10 text-gray-600 px-4 py-3 cursor-not-allowed" />
                  </div>
                  <button onClick={handleUpdate}
                    className="bg-yellow-500 text-black font-bold px-8 py-3 hover:bg-yellow-400 transition tracking-widest text-sm">
                    UPDATE PROFILE
                  </button>
                </div>
              </div>
            )}

            {tab === 'orders' && (
              <div className="border border-yellow-600/30 bg-gray-900 p-6">
                <h2 className="text-xl font-bold mb-6">
                  My <span className="text-yellow-500">Orders</span>
                </h2>
                <div className="text-center py-16">
                  <p className="text-5xl mb-4">📦</p>
                  <p className="text-gray-400 mb-6">No orders yet.</p>
                  <Link href="/products">
                    <button className="bg-yellow-500 text-black font-bold px-8 py-3 hover:bg-yellow-400 transition tracking-widest text-sm">
                      START SHOPPING →
                    </button>
                  </Link>
                </div>
              </div>
            )}

            {tab === 'security' && (
              <div className="border border-yellow-600/30 bg-gray-900 p-6">
                <h2 className="text-xl font-bold mb-6">
                  Account <span className="text-yellow-500">Security</span>
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-xs tracking-widest block mb-2">CURRENT PASSWORD</label>
                    <input type="password" placeholder="••••••••"
                      className="w-full bg-black border border-yellow-600/30 text-white px-4 py-3 focus:outline-none focus:border-yellow-500 placeholder-gray-600" />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs tracking-widest block mb-2">NEW PASSWORD</label>
                    <input type="password" placeholder="••••••••"
                      className="w-full bg-black border border-yellow-600/30 text-white px-4 py-3 focus:outline-none focus:border-yellow-500 placeholder-gray-600" />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs tracking-widest block mb-2">CONFIRM NEW PASSWORD</label>
                    <input type="password" placeholder="••••••••"
                      className="w-full bg-black border border-yellow-600/30 text-white px-4 py-3 focus:outline-none focus:border-yellow-500 placeholder-gray-600" />
                  </div>
                  <button className="bg-yellow-500 text-black font-bold px-8 py-3 hover:bg-yellow-400 transition tracking-widest text-sm">
                    UPDATE PASSWORD
                  </button>
                </div>
              </div>
            )}

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