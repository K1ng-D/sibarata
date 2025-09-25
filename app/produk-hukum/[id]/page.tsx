"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { FiCalendar, FiDownload, FiFileText, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

interface ProdukHukum {
  id: string;
  judul: string;
  tahun: number;
  linkDownload: string; // untuk unduh
  linkViewer: string;   // untuk iframe
}

const DetailProdukHukumPage = () => {
  const { id } = useParams();
  const [data, setData] = useState<ProdukHukum | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const docRef = doc(db, "produkHukum", id as string);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          setData({ id: snapshot.id, ...snapshot.data() } as ProdukHukum);
        }
      } catch (error) {
        console.error("Error ambil detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1c2c66]"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-20 bg-gray-50 min-h-screen">
        <h1 className="text-xl font-semibold text-gray-700">
          ❌ Data tidak ditemukan
        </h1>
      </div>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 min-h-screen">
      {/* Tombol Kembali */}
      <div className="mb-6">
        <Link
          href="/produk-hukum"
          className="inline-flex items-center gap-2 text-[#1c2c66] hover:text-[#1c2c66]/80 font-medium"
        >
          <FiArrowLeft className="w-4 h-4" />
          Kembali ke Produk Hukum
        </Link>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-[#1c2c66] mb-2">
          Detail Produk Hukum
        </h1>
        <div className="w-24 h-1 bg-[#f8cb8b] mx-auto rounded-full"></div>
      </motion.div>

      {/* Info Undang-Undang */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-[#1c2c66] mb-4">
          {data.judul}
        </h2>
        <p className="flex items-center text-gray-600">
          <FiCalendar className="mr-2 text-[#1c2c66]" /> Tahun: {data.tahun}
        </p>
      </div>

      {/* PDF Viewer */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-[#1c2c66] mb-4 flex items-center">
          <FiFileText className="mr-2 text-[#1c2c66]" /> Dokumen PDF
        </h3>
        <div className="w-full h-[600px] border border-gray-300 rounded-lg overflow-hidden">
          <iframe
            src={data.linkViewer}
            className="w-full h-full"
            title="Dokumen Produk Hukum"
          ></iframe>
        </div>
      </div>

      {/* Tombol Unduh */}
      <div className="flex justify-end">
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={data.linkDownload}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#1c2c66] text-white py-3 px-8 rounded-lg hover:bg-[#1c2c66]/90 transition-all duration-300 font-medium"
        >
          <FiDownload className="w-5 h-5" />
          Unduh Dokumen
        </motion.a>
      </div>
    </section>
  );
};

export default DetailProdukHukumPage;