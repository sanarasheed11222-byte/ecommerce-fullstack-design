'use client';
import { useState, useEffect } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 z-50 group flex items-center gap-2 bg-black border border-[#c9a84c]/50text-yellow-500 px-4 py-3 hover:bg-yellow-500 hover:text-black transition-all duration-300 shadow-lg shadow-yellow-500/10"
      title="Back to top"
    >
      <span className="text-sm font-bold tracking-widest">TOP</span>
      <span className="text-lg">↑</span>
    </button>
  );
}