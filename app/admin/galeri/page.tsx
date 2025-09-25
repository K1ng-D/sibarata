"use client";

import { useState, useEffect } from "react";
import { uploadImage } from "@/lib/cloudinary";

type GaleriItem = {
  id: string;
  title: string;
  url: string;
};

export default function AdminGaleriPage() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [galeri, setGaleri] = useState<GaleriItem[]>([]);
  const [editId, setEditId] = useState<string | null>(null);

  // Ambil data galeri
  const fetchGaleri = async () => {
    try {
      const res = await fetch("/api/galeri");
      const data = await res.json();
      // asumsi API return { success: true, data: [...] }
      setGaleri(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      console.error("Gagal fetch galeri:", err);
      setGaleri([]);
    }
  };

  useEffect(() => {
    fetchGaleri();
  }, []);

  // Upload baru
  const handleUpload = async () => {
    if (!file || !title) return alert("Lengkapi data!");

    try {
      setLoading(true);
      const res = await uploadImage(file);

      await fetch("/api/galeri", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, url: res.secure_url }),
      });

      alert("Gambar berhasil ditambahkan!");
      setFile(null);
      setTitle("");
      fetchGaleri();
    } catch (err) {
      console.error(err);
      alert("Upload gagal");
    } finally {
      setLoading(false);
    }
  };

  // Update data
  const handleUpdate = async () => {
    if (!editId) return;

    let imageUrl = "";
    if (file) {
      const res = await uploadImage(file);
      imageUrl = res.secure_url;
    }

    await fetch(`/api/galeri/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        ...(imageUrl && { url: imageUrl }),
      }),
    });

    alert("Data berhasil diupdate!");
    setEditId(null);
    setFile(null);
    setTitle("");
    fetchGaleri();
  };

  // Hapus data
  const handleDelete = async (id: string) => {
    await fetch(`/api/galeri/${id}`, { method: "DELETE" });
    alert("Data berhasil dihapus!");
    fetchGaleri();
  };

  // Isi form ketika klik Edit
  const startEdit = (item: GaleriItem) => {
    setEditId(item.id);
    setTitle(item.title);
    setFile(null);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1c2c66] mb-2">Admin Galeri</h1>
          <div className="w-24 h-1 bg-[#f8cb8b] mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-2">Kelola galeri gambar untuk website</p>
        </div>

        {/* Form Upload / Edit */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold text-[#1c2c66] mb-4">
            {editId ? "Edit Gambar" : "Tambah Gambar Baru"}
          </h2>
          
          <input
            type="text"
            placeholder="Judul gambar"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:ring-2 focus:ring-[#1c2c66] focus:border-transparent"
          />

          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:ring-2 focus:ring-[#1c2c66] focus:border-transparent"
          />

          <div className="flex gap-3">
            {editId ? (
              <>
                <button
                  onClick={handleUpdate}
                  disabled={loading}
                  className="px-6 py-2 bg-[#f8cb8b] text-[#1c2c66] rounded-lg font-medium hover:bg-[#f8cb8b]/90 transition-colors disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Update Gambar"}
                </button>
                <button
                  onClick={() => {
                    setEditId(null);
                    setTitle("");
                    setFile(null);
                  }}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
                >
                  Batal
                </button>
              </>
            ) : (
              <button
                onClick={handleUpload}
                disabled={loading || !file || !title}
                className="px-6 py-2 bg-[#1c2c66] text-white rounded-lg font-medium hover:bg-[#1c2c66]/90 transition-colors disabled:opacity-50"
              >
                {loading ? "Uploading..." : "Upload Gambar"}
              </button>
            )}
          </div>
        </div>

        {/* List Data */}
        <div>
          <h2 className="text-xl font-semibold text-[#1c2c66] mb-4">Daftar Galeri</h2>
          
          {galeri.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-500">Belum ada data galeri.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {galeri.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col gap-4">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-[#1c2c66]">{item.title}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(item)}
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}