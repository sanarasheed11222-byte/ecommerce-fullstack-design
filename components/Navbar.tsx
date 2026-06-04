'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

export default function Navbar() {
  const { cartCount } = useCart();
  const { user, logout, isAdmin } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
    setMenuOpen(false);
  };

  const links = [
    { href: '/',         label: 'HOME' },
    { href: '/products', label: 'PRODUCTS' },
    { href: '/cart',     label: 'CART' },
    ...(isAdmin ? [{ href: '/admin', label: 'ADMIN' }] : []),
  ];

  return (
    <nav className="bg-black border-b border-yellow-600/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link href="/" onClick={() => setMenuOpen(false)}>
          <span className="text-2xl font-bold tracking-widest cursor-pointer">
            <span className="text-yellow-500">LUXE</span>MART
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <span className={`text-sm font-bold tracking-widest transition cursor-pointer ${
                pathname === link.href
                  ? 'text-yellow-500'
                  : 'text-gray-400 hover:text-yellow-500'
              }`}>
                {link.label}
              </span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link href="/cart">
            <button className="relative border border-yellow-600/30 text-yellow-500 px-3 py-2 hover:bg-yellow-500 hover:text-black transition text-sm font-bold">
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </Link>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link href="/profile">
                  <button className="border border-yellow-600/30 text-yellow-500 px-4 py-2 hover:bg-yellow-500 hover:text-black transition text-sm font-bold">
                    👤 {user.name.split(' ')[0].toUpperCase()}
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="border border-yellow-600/30 text-gray-400 px-4 py-2 hover:border-red-500 hover:text-red-400 transition text-sm font-bold"
                >
                  LOGOUT
                </button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <button className="border border-yellow-600/30 text-gray-400 px-4 py-2 hover:border-yellow-500 hover:text-yellow-500 transition text-sm font-bold">
                    LOGIN
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="bg-yellow-500 text-black px-4 py-2 hover:bg-yellow-400 transition text-sm font-bold">
                    SIGN UP
                  </button>
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden border border-yellow-600/30 text-yellow-500 px-3 py-2 hover:bg-yellow-500/10 transition"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-yellow-600/20 bg-black">
          <div className="px-6 py-4 space-y-1">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
                <div className={`py-3 px-4 font-bold tracking-widest text-sm border-b border-yellow-600/10 ${
                  pathname === link.href ? 'text-yellow-500' : 'text-gray-400'
                }`}>
                  {link.label}
                </div>
              </Link>
            ))}
            <div className="pt-3">
              {user ? (
                <div>
                  <Link href="/profile" onClick={() => setMenuOpen(false)}>
                    <p className="text-gray-500 text-sm px-4 mb-3 hover:text-yellow-500 cursor-pointer">
                      👤 <span className="text-yellow-500 font-bold">{user.name}</span>
                    </p>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full border border-red-500/30 text-red-400 py-3 font-bold tracking-widest text-sm hover:bg-red-500/10 transition"
                  >
                    LOGOUT
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Link href="/login" onClick={() => setMenuOpen(false)} className="flex-1">
                    <button className="w-full border border-yellow-600/30 text-gray-400 py-3 font-bold tracking-widest text-sm">
                      LOGIN
                    </button>
                  </Link>
                  <Link href="/signup" onClick={() => setMenuOpen(false)} className="flex-1">
                    <button className="w-full bg-yellow-500 text-black py-3 font-bold tracking-widest text-sm">
                      SIGN UP
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}