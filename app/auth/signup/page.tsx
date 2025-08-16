'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        setLoading(false);
        return;
      }
      // success — token is set as httpOnly cookie by server
      router.push('/');
    } catch (err) {
      setError('Network error');
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border rounded-lg shadow-sm">
      <h1 className="text-2xl font-semibold mb-4">Create account</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full p-2 border rounded" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input className="w-full p-2 border rounded" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} type="email" required />
        <input className="w-full p-2 border rounded" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} type="password" required />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button disabled={loading} className="w-full p-2 bg-blue-600 text-white rounded">
          {loading ? 'Creating...' : 'Create account'}
        </button>
      </form>
    </div>
  );
}
