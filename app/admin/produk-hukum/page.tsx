"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { FiSave, FiEdit2, FiTrash2, FiExternalLink } from "react-icons/fi";

interface ProdukHukum {
  id: string;
  judul: string;
  tahun: number;
  linkDownload: string;
  linkViewer: string;
}

const AdminProdukHukumPage = () => {
  const [judul, setJudul] = useState("");
  const [tahun, setTahun] = useState<number | string>("");
  const [linkDownload, setLinkDownload] = useState("");
  const [linkViewer, setLinkViewer] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [produkHukum, setProdukHukum] = useState<ProdukHukum[]>([]);
  const [editId, setEditId] = useState<string | null>(null);

  // Ambil data dari Firestore
  const fetchData = async () => {
    const snapshot = await getDocs(collection(db, "produkHukum"));
    const data: ProdukHukum[] = [];
    snapshot.forEach((d) => {
      data.push({ id: d.id, ...d.data() } as ProdukHukum);
    });
    setProdukHukum(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Tambah atau Update data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (editId) {
        // Update
        const docRef = doc(db, "produkHukum", editId);
        await updateDoc(docRef, {
          judul,
          tahun: Number(tahun),
          linkDownload,
          linkViewer,
        });
        setMessage("✅ Data berhasil diperbarui!");
      } else {
        // Tambah
        await addDoc(collection(db, "produkHukum"), {
          judul,
          tahun: Number(tahun),
          linkDownload,
          linkViewer,
          createdAt: new Date(),
        });
        setMessage("✅ Data berhasil disimpan!");
      }

      setJudul("");
      setTahun("");
      setLinkDownload("");
      setLinkViewer("");
      setEditId(null);
      fetchData();
    } catch (error) {
      console.error("Error simpan data:", error);
      setMessage("❌ Gagal menyimpan data!");
    } finally {
      setLoading(false);
    }
  };

  // Edit data
  const handleEdit = (item: ProdukHukum) => {
    setEditId(item.id);
    setJudul(item.judul);
    setTahun(item.tahun);
    setLinkDownload(item.linkDownload);
    setLinkViewer(item.linkViewer);
  };

  // Hapus data
  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    try {
      await deleteDoc(doc(db, "produkHukum", id));
      setMessage("✅ Data berhasil dihapus!");
      fetchData();
    } catch (error) {
      console.error("Error hapus data:", error);
      setMessage("❌ Gagal menghapus data!");
    }
  };

  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-[#1c2c66] mb-2">
            Admin - Produk Hukum
          </h1>
          <div className="w-24 h-1 bg-[#f8cb8b] mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-2">Kelola produk hukum untuk website</p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          onSubmit={handleSubmit}
          className="bg-white shadow-sm rounded-lg p-6 space-y-4 mb-8 border border-gray-200"
        >
          <div>
            <label className="block text-sm font-medium text-[#1c2c66] mb-2">
              Judul Undang-Undang
            </label>
            <input
              type="text"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              required
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#1c2c66] focus:border-transparent"
              placeholder="Contoh: Undang-Undang Nomor 1 Tahun 2025"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1c2c66] mb-2">
              Tahun
            </label>
            <input
              type="number"
              value={tahun}
              onChange={(e) => setTahun(e.target.value)}
              required
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#1c2c66] focus:border-transparent"
              placeholder="2025"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1c2c66] mb-2">
              Link Download Dokumen (Google Drive)
            </label>
            <input
              type="url"
              value={linkDownload}
              onChange={(e) => setLinkDownload(e.target.value)}
              required
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#1c2c66] focus:border-transparent"
              placeholder="https://drive.google.com/uc?export=download&id=..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1c2c66] mb-2">
              Link Viewer Dokumen (Google Drive)
            </label>
            <input
              type="url"
              value={linkViewer}
              onChange={(e) => setLinkViewer(e.target.value)}
              required
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#1c2c66] focus:border-transparent"
              placeholder="https://drive.google.com/file/d/FILE_ID/preview"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center bg-[#1c2c66] text-white py-3 rounded-lg hover:bg-[#1c2c66]/90 transition-colors font-medium"
          >
            {loading ? "Menyimpan..." : (
              <>
                <FiSave className="mr-2" /> {editId ? "Update Data" : "Simpan Data"}
              </>
            )}
          </button>

          {message && (
            <p className="text-center mt-4 font-medium text-gray-700 bg-gray-100 p-3 rounded-lg">
              {message}
            </p>
          )}
        </motion.form>

        {/* List Data */}
        <div className="space-y-4">
          {produkHukum.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-[#1c2c66]">{item.judul}</h3>
                  <p className="text-sm text-gray-600">Tahun: {item.tahun}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={item.linkViewer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-3 py-2 bg-[#f8cb8b]/20 text-[#1c2c66] rounded-lg hover:bg-[#f8cb8b]/30 transition-colors text-sm font-medium"
                  >
                    <FiExternalLink className="mr-1" /> Lihat
                  </a>
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex items-center px-3 py-2 bg-[#f8cb8b] text-[#1c2c66] rounded-lg hover:bg-[#f8cb8b]/90 transition-colors text-sm font-medium"
                  >
                    <FiEdit2 className="mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex items-center px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                  >
                    <FiTrash2 className="mr-1" /> Hapus
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminProdukHukumPage;