'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const success = await login(email, password);
    if (success) {
      router.push('/products');
    } else {
      setError('Invalid email or password. Please try again.');
    }
    setLoading(false);
  };

  return (
    <main className="bg-black text-white min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/">
            <h1 className="text-4xl font-bold cursor-pointer">
              <span className="text-yellow-500">LUXEMART</span>MART
            </h1>
          </Link>
          <p className="text-gray-400 mt-2">Sign in to your account</p>
        </div>

        <div className="border border-yellow-600/30 bg-gray-900 p-8">
          <h2 className="text-2xl font-bold mb-6">
            Welcome <span className="text-yellow-500">Back</span>
          </h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 mb-6 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="text-gray-400 text-sm tracking-widest block mb-2">EMAIL</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-black border border-yellow-600/30 text-white px-4 py-3 focus:outline-none focus:border-yellow-500 placeholder-gray-600"
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm tracking-widest block mb-2">PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black border border-yellow-600/30 text-white px-4 py-3 focus:outline-none focus:border-yellow-500 placeholder-gray-600"
              />
            </div>
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-yellow-500 text-black font-bold py-4 hover:bg-yellow-400 transition tracking-widest text-sm disabled:opacity-50"
            >
              {loading ? 'SIGNING IN...' : 'SIGN IN'}
            </button>
          </div>

          <p className="text-gray-500 text-sm text-center mt-6">
            Don't have an account?{' '}
            <Link href="/signup" className="text-yellow-500 hover:text-yellow-400 font-bold">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}