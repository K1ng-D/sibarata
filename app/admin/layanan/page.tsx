'use client';

import { useEffect, useState } from 'react';

export default function AdminLayanan() {
  const [layanan, setLayanan] = useState<any[]>([]);
  const [form, setForm] = useState({ nama: '', deskripsi: '', icon: '', link: '', featured: false });
  const [editId, setEditId] = useState<string | null>(null);

  const fetchData = async () => {
    const res = await fetch('/api/layanan');
    const data = await res.json();
    if (data.success) setLayanan(data.data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editId) {
      // UPDATE
      await fetch('/api/layanan', {
        method: 'PUT',
        body: JSON.stringify({ id: editId, ...form }),
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      // CREATE
      await fetch('/api/layanan', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: { 'Content-Type': 'application/json' },
      });
    }

    setForm({ nama: '', deskripsi: '', icon: '', link: '', featured: false });
    setEditId(null);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    await fetch('/api/layanan', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' },
    });
    fetchData();
  };

  const handleEdit = (item: any) => {
    setForm({
      nama: item.nama,
      deskripsi: item.deskripsi,
      icon: item.icon,
      link: item.link,
      featured: item.featured || false,
    });
    setEditId(item.id);
  };

  const handleCancelEdit = () => {
    setForm({ nama: '', deskripsi: '', icon: '', link: '', featured: false });
    setEditId(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1c2c66] mb-2">Manajemen Layanan</h1>
          <div className="w-24 h-1 bg-[#f8cb8b] mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-2">Kelola layanan untuk website</p>
        </div>

        {/* Form tambah / edit layanan */}
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold text-[#1c2c66] mb-4">
            {editId ? 'Edit Layanan' : 'Tambah Layanan Baru'}
          </h2>
          
          <div>
            <label className="block text-sm font-medium text-[#1c2c66] mb-2">Nama Layanan</label>
            <input
              placeholder="Nama layanan"
              value={form.nama}
              onChange={e => setForm({ ...form, nama: e.target.value })}
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-[#1c2c66] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1c2c66] mb-2">Deskripsi</label>
            <textarea
              placeholder="Deskripsi layanan"
              value={form.deskripsi}
              onChange={e => setForm({ ...form, deskripsi: e.target.value })}
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-[#1c2c66] focus:border-transparent"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1c2c66] mb-2">Icon (React Icons)</label>
            <input
              placeholder="Contoh: FiHome, FiUser, FiSettings"
              value={form.icon}
              onChange={e => setForm({ ...form, icon: e.target.value })}
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-[#1c2c66] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1c2c66] mb-2">Link</label>
            <input
              placeholder="URL link layanan"
              value={form.link}
              onChange={e => setForm({ ...form, link: e.target.value })}
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-[#1c2c66] focus:border-transparent"
              required
            />
          </div>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={e => setForm({ ...form, featured: e.target.checked })}
              className="w-4 h-4 text-[#1c2c66] focus:ring-[#1c2c66] border-gray-300 rounded"
            />
            <span className="text-gray-700">Tampilkan sebagai layanan unggulan</span>
          </label>

          <div className="flex gap-3 pt-4">
            <button 
              type="submit" 
              className="px-6 py-2 bg-[#1c2c66] text-white rounded-lg hover:bg-[#1c2c66]/90 transition-colors font-medium"
            >
              {editId ? 'Update Layanan' : 'Tambah Layanan'}
            </button>
            
            {editId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
              >
                Batal
              </button>
            )}
          </div>
        </form>

        {/* Tabel layanan */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-[#1c2c66] mb-4">Daftar Layanan</h2>
          
          {layanan.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              Belum ada layanan yang ditambahkan
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#f8cb8b]/20">
                    <th className="border border-gray-200 p-3 text-left font-semibold text-[#1c2c66]">Nama</th>
                    <th className="border border-gray-200 p-3 text-left font-semibold text-[#1c2c66]">Deskripsi</th>
                    <th className="border border-gray-200 p-3 text-left font-semibold text-[#1c2c66]">Icon</th>
                    <th className="border border-gray-200 p-3 text-left font-semibold text-[#1c2c66]">Link</th>
                    <th className="border border-gray-200 p-3 text-left font-semibold text-[#1c2c66]">Unggulan</th>
                    <th className="border border-gray-200 p-3 text-left font-semibold text-[#1c2c66]">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {layanan.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="border border-gray-200 p-3">{item.nama}</td>
                      <td className="border border-gray-200 p-3">{item.deskripsi}</td>
                      <td className="border border-gray-200 p-3 font-mono text-sm">{item.icon}</td>
                      <td className="border border-gray-200 p-3">
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-[#1c2c66] hover:underline">
                          {item.link}
                        </a>
                      </td>
                      <td className="border border-gray-200 p-3 text-center">
                        {item.featured ? (
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Ya</span>
                        ) : (
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">Tidak</span>
                        )}
                      </td>
                      <td className="border border-gray-200 p-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="px-3 py-1 bg-[#f8cb8b] text-[#1c2c66] rounded text-sm font-medium hover:bg-[#f8cb8b]/90 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded text-sm font-medium hover:bg-red-600 transition-colors"
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}