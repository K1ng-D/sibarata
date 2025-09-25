// admin/informasi/page.tsx
"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { uploadImage } from "@/lib/cloudinary"; // pakai fungsi yang sudah ada

interface Informasi {
  id: string;
  judul: string;
  isi: string;
  gambar: string;
  kategori?: string;
  tanggal?: any;
}

export default function InformasiPage() {
  const [informasiList, setInformasiList] = useState<Informasi[]>([]);
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [gambar, setGambar] = useState<File | null>(null);
  const [kategori, setKategori] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  // ambil data dari firestore dan normalisasi field gambar
  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "informasi"));
    const data = querySnapshot.docs.map((docSnap) => {
      const d = docSnap.data() as any;
      // Normalisasi berbagai bentuk penyimpanan gambar:
      // - string URL
      // - object Cloudinary { secure_url }
      // - object { url }
      const gambarUrl =
        d?.gambar?.secure_url ?? d?.gambar?.url ?? d?.gambar ?? "";
      return {
        id: docSnap.id,
        judul: d.judul ?? "",
        isi: d.isi ?? "",
        kategori: d.kategori ?? "",
        gambar: gambarUrl,
        tanggal: d.tanggal ?? null,
      } as Informasi;
    });
    setInformasiList(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrl = "";

      if (gambar) {
        imageUrl = await uploadImage(gambar); // upload ke cloudinary atau firebase storage
      }

      if (editId) {
        const docRef = doc(db, "informasi", editId);
        await updateDoc(docRef, {
          judul,
          isi,
          kategori,
          ...(imageUrl && { gambar: imageUrl }),
          tanggal: serverTimestamp(), // update waktu
          updatedAt: serverTimestamp(),
        });
        setEditId(null);
      } else {
        await addDoc(collection(db, "informasi"), {
          judul,
          isi,
          kategori,
          gambar: imageUrl,
          tanggal: serverTimestamp(), // simpan waktu saat buat
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }

      setJudul("");
      setIsi("");
      setKategori("");
      setGambar(null);

      await fetchData();
    } catch (err) {
      console.error("Error menyimpan data:", err);
    }
  };

  const handleEdit = (item: Informasi) => {
    setJudul(item.judul);
    setIsi(item.isi);
    setKategori(item.kategori || "");
    setGambar(null); // reset gambar file input
    setEditId(item.id);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "informasi", id));
      setInformasiList((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error hapus data:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1c2c66] mb-2">Kelola Informasi</h1>
          <div className="w-24 h-1 bg-[#f8cb8b] mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-2">Kelola informasi untuk website</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold text-[#1c2c66] mb-4">
            {editId ? "Edit Informasi" : "Tambah Informasi Baru"}
          </h2>
          
          <div>
            <label className="block text-sm font-medium text-[#1c2c66] mb-2">Judul</label>
            <input
              type="text"
              placeholder="Judul informasi"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-[#1c2c66] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1c2c66] mb-2">Isi Informasi</label>
            <textarea
              placeholder="Isi informasi"
              value={isi}
              onChange={(e) => setIsi(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-[#1c2c66] focus:border-transparent"
              rows={4}
              required
            />
          </div>

          {/* Dropdown kategori */}
          <div>
            <label className="block text-sm font-medium text-[#1c2c66] mb-2">Kategori</label>
            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-[#1c2c66] focus:border-transparent"
              required
            >
              <option value="">Pilih Kategori</option>
              <option value="Umum">Umum</option>
              <option value="Pengumuman">Pengumuman</option>
              <option value="Penting">Penting</option>
              <option value="Kegiatan">Kegiatan</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1c2c66] mb-2">Gambar</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setGambar(e.target.files?.[0] || null)}
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-[#1c2c66] focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-[#1c2c66] text-white rounded-lg hover:bg-[#1c2c66]/90 transition-colors font-medium w-full"
          >
            {editId ? "Update Informasi" : "Tambah Informasi"}
          </button>

          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setJudul("");
                setIsi("");
                setKategori("");
                setGambar(null);
              }}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium w-full"
            >
              Batal Edit
            </button>
          )}
        </form>

        {/* List Informasi */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-[#1c2c66] mb-4">Daftar Informasi</h2>
          
          {informasiList.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-500">Belum ada informasi</p>
            </div>
          ) : (
            informasiList.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {item.gambar ? (
                    <img
                      src={item.gambar}
                      alt={item.judul}
                      className="w-full md:w-48 h-48 object-cover rounded-lg"
                    />
                  ) : (
                    /* tetap tidak merubah tampilan: kalau tidak ada gambar, tidak menampilkan element gambar */
                    null
                  )}
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-[#1c2c66] mb-2">{item.judul}</h3>
                    <p className="text-gray-700 mb-4 whitespace-pre-line">{item.isi}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      {item.kategori && (
                        <span className="px-3 py-1 bg-[#f8cb8b]/20 text-[#1c2c66] rounded-full text-sm">
                          {item.kategori}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(item)}
                        className="px-4 py-2 bg-[#f8cb8b] text-[#1c2c66] rounded-lg hover:bg-[#f8cb8b]/90 transition-colors font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
