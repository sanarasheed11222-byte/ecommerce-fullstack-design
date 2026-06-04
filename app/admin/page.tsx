'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  stock: number;
}

const emptyForm = {
  name: '', price: '', category: 'Electronics',
  image: '', description: '', stock: ''
};

const categories = ['Electronics', 'Fashion', 'Accessories', 'Kitchen', 'Sports', 'Beauty'];

export default function AdminPage() {
  const { user, token, isAdmin } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user) { router.push('/login'); return; }
    if (!isAdmin) { router.push('/'); return; }
    fetchProducts();
  }, [user, isAdmin]);

  const fetchProducts = async () => {
    const res = await fetch('http://localhost:5000/api/products');
    const data = await res.json();
    setProducts(data);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const url = editId
      ? `http://localhost:5000/api/products/${editId}`
      : 'http://localhost:5000/api/products';
    const method = editId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock)
      })
    });

    if (res.ok) {
      setMessage(editId ? '✅ Product updated!' : '✅ Product added!');
      setForm(emptyForm);
      setEditId(null);
      fetchProducts();
    } else {
      setMessage('❌ Something went wrong!');
    }
    setLoading(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleEdit = (product: Product) => {
    setForm({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      image: product.image,
      description: product.description,
      stock: product.stock.toString()
    });
    setEditId(product._id);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    const res = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) {
      setMessage('✅ Product deleted!');
      fetchProducts();
    }
    setTimeout(() => setMessage(''), 3000);
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditId(null);
  };

  return (
    <main className="bg-black text-white min-h-screen">

      <div className="border-b border-yellow-600/30 py-10 px-6 text-center">
        <p className="text-yellow-500 tracking-widest text-sm mb-2">DASHBOARD</p>
        <h1 className="text-4xl font-bold">Admin <span className="text-yellow-500">Panel</span></h1>
        <p className="text-gray-400 mt-2">Manage your products</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {message && (
          <div className={`mb-6 px-4 py-3 border text-sm font-bold ${
            message.includes('✅')
              ? 'bg-green-500/10 border-green-500/30 text-green-400'
              : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}>
            {message}
          </div>
        )}

        {/* Form */}
        <div className="border border-yellow-600/30 bg-gray-900 p-6 mb-10">
          <h2 className="text-xl font-bold mb-6">
            {editId ? '✏️ Edit Product' : '➕ Add New Product'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-xs tracking-widest block mb-2">PRODUCT NAME</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Product name"
                className="w-full bg-black border border-yellow-600/30 text-white px-4 py-3 focus:outline-none focus:border-yellow-500 placeholder-gray-600" />
            </div>
            <div>
              <label className="text-gray-400 text-xs tracking-widest block mb-2">PRICE (RS.)</label>
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="15000"
                className="w-full bg-black border border-yellow-600/30 text-white px-4 py-3 focus:outline-none focus:border-yellow-500 placeholder-gray-600" />
            </div>
            <div>
              <label className="text-gray-400 text-xs tracking-widest block mb-2">CATEGORY</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full bg-black border border-yellow-600/30 text-white px-4 py-3 focus:outline-none focus:border-yellow-500">
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div>
              <label className="text-gray-400 text-xs tracking-widest block mb-2">STOCK</label>
              <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} placeholder="10"
                className="w-full bg-black border border-yellow-600/30 text-white px-4 py-3 focus:outline-none focus:border-yellow-500 placeholder-gray-600" />
            </div>
            <div className="md:col-span-2">
              <label className="text-gray-400 text-xs tracking-widest block mb-2">IMAGE URL</label>
              <input type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://images.unsplash.com/..."
                className="w-full bg-black border border-yellow-600/30 text-white px-4 py-3 focus:outline-none focus:border-yellow-500 placeholder-gray-600" />
            </div>
            <div className="md:col-span-2">
              <label className="text-gray-400 text-xs tracking-widest block mb-2">DESCRIPTION</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Product description..." rows={3}
                className="w-full bg-black border border-yellow-600/30 text-white px-4 py-3 focus:outline-none focus:border-yellow-500 placeholder-gray-600 resize-none" />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={handleSubmit} disabled={loading}
              className="bg-yellow-500 text-black font-bold px-8 py-3 hover:bg-yellow-400 transition tracking-widest text-sm disabled:opacity-50">
              {loading ? 'SAVING...' : editId ? 'UPDATE PRODUCT' : 'ADD PRODUCT'}
            </button>
            {editId && (
              <button onClick={handleCancel}
                className="border border-yellow-600/30 text-gray-400 px-8 py-3 hover:border-yellow-500 hover:text-yellow-500 transition text-sm font-bold">
                CANCEL
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="border border-yellow-600/30 bg-gray-900">
          <div className="p-6 border-b border-yellow-600/20">
            <h2 className="text-xl font-bold">All Products <span className="text-yellow-500">({products.length})</span></h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-yellow-600/20">
                  <th className="text-left px-6 py-4 text-gray-400 text-xs tracking-widest">IMAGE</th>
                  <th className="text-left px-6 py-4 text-gray-400 text-xs tracking-widest">NAME</th>
                  <th className="text-left px-6 py-4 text-gray-400 text-xs tracking-widest">CATEGORY</th>
                  <th className="text-left px-6 py-4 text-gray-400 text-xs tracking-widest">PRICE</th>
                  <th className="text-left px-6 py-4 text-gray-400 text-xs tracking-widest">STOCK</th>
                  <th className="text-left px-6 py-4 text-gray-400 text-xs tracking-widest">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-b border-yellow-600/10 hover:bg-gray-800 transition">
                    <td className="px-6 py-4">
                      <img src={product.image} alt={product.name} className="w-12 h-12 object-cover" />
                    </td>
                    <td className="px-6 py-4 font-bold">{product.name}</td>
                    <td className="px-6 py-4 text-yellow-500 text-sm">{product.category}</td>
                    <td className="px-6 py-4 text-yellow-500 font-bold">Rs. {product.price.toLocaleString()}</td>
                    <td className="px-6 py-4 text-gray-400">{product.stock}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(product)}
                          className="bg-yellow-500 text-black text-xs font-bold px-3 py-2 hover:bg-yellow-400 transition">
                          EDIT
                        </button>
                        <button onClick={() => handleDelete(product._id)}
                          className="border border-red-500/30 text-red-400 text-xs font-bold px-3 py-2 hover:bg-red-500 hover:text-white transition">
                          DELETE
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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