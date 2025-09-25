"use client";

import { useState, useEffect } from "react";

interface Statistik {
  litmas: number;
  bimbingan: number;
  petugas: number;
}

export default function AdminPetugasPage() {
  const [form, setForm] = useState<Statistik>({
    litmas: 0,
    bimbingan: 0,
    petugas: 0,
  });
  const [data, setData] = useState<Statistik | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  const fetchData = async () => {
    const res = await fetch("/api/statistik");
    const d = await res.json();
    if (d) setData(d);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: Number(e.target.value) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = isEdit ? "PUT" : "POST";
    await fetch("/api/statistik", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert(isEdit ? "Data berhasil diperbarui!" : "Data berhasil disimpan!");
    fetchData();
    setIsEdit(false);
    setForm({ litmas: 0, bimbingan: 0, petugas: 0 });
  };

  const handleDelete = async () => {
    if (!confirm("Yakin ingin hapus data statistik?")) return;
    await fetch("/api/statistik", { method: "DELETE" });
    setData(null);
    alert("Data berhasil dihapus!");
  };

  const handleEdit = () => {
    if (data) {
      setForm(data);
      setIsEdit(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#1c2c66] mb-2">Kelola Statistik Sibarata</h2>
        <div className="w-24 h-1 bg-[#f8cb8b] mx-auto rounded-full"></div>
        <p className="text-gray-600 mt-2">Kelola data statistik untuk tampilan website</p>
      </div>

      {/* Form Input */}
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8">
        <h3 className="text-xl font-semibold text-[#1c2c66] mb-4">
          {isEdit ? "Edit Data Statistik" : "Tambah Data Statistik"}
        </h3>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2">Jumlah Litmas</label>
          <input 
            type="number" 
            name="litmas" 
            value={form.litmas} 
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#1c2c66] focus:border-transparent" 
          />
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2">Jumlah Bimbingan Klien</label>
          <input 
            type="number" 
            name="bimbingan" 
            value={form.bimbingan} 
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#1c2c66] focus:border-transparent" 
          />
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2">Jumlah Petugas Survey</label>
          <input 
            type="number" 
            name="petugas" 
            value={form.petugas} 
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#1c2c66] focus:border-transparent" 
          />
        </div>

        <div className="flex gap-3">
          <button 
            type="submit"
            className={`${
              isEdit 
                ? "bg-[#f8cb8b] text-[#1c2c66] hover:bg-[#f8cb8b]/90" 
                : "bg-[#1c2c66] text-white hover:bg-[#1c2c66]/90"
            } px-6 py-2 rounded-lg font-medium transition-colors`}
          >
            {isEdit ? "Update Data" : "Simpan Data"}
          </button>
          
          {isEdit && (
            <button 
              type="button" 
              onClick={() => { setIsEdit(false); setForm({ litmas: 0, bimbingan: 0, petugas: 0 }); }}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Batal
            </button>
          )}
        </div>
      </form>

      {/* Tabel Data */}
      {data && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h3 className="text-xl font-semibold text-[#1c2c66] mb-6">Data Statistik Saat Ini</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-[#f8cb8b]/20">
                <tr>
                  <th className="border border-gray-200 p-4 text-left font-semibold text-[#1c2c66]">Jumlah Litmas</th>
                  <th className="border border-gray-200 p-4 text-left font-semibold text-[#1c2c66]">Jumlah Bimbingan Klien</th>
                  <th className="border border-gray-200 p-4 text-left font-semibold text-[#1c2c66]">Jumlah Petugas Survey</th>
                  <th className="border border-gray-200 p-4 text-left font-semibold text-[#1c2c66]">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 p-4 text-center">{data.litmas}</td>
                  <td className="border border-gray-200 p-4 text-center">{data.bimbingan}</td>
                  <td className="border border-gray-200 p-4 text-center">{data.petugas}</td>
                  <td className="border border-gray-200 p-4 text-center">
                    <div className="flex gap-2 justify-center">
                      <button 
                        onClick={handleEdit}
                        className="bg-[#f8cb8b] text-[#1c2c66] px-4 py-2 rounded-lg font-medium hover:bg-[#f8cb8b]/90 transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={handleDelete}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}