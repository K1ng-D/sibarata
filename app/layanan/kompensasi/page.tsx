"use client";

import { motion } from "framer-motion";
import { FiFacebook, FiX, FiLinkedin, FiArrowLeft } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import Kopensasi from '@/public/kopensasi_pelayanan.jpeg';

const KompensasiPelayananPage = () => {
  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4">
        {/* Tombol Back */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-[#f8cb8b]/20 hover:bg-[#f8cb8b]/30 rounded-lg text-[#1c2c66] font-medium transition-colors"
          >
            <FiArrowLeft className="mr-2" /> Kembali ke Home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#1c2c66] mb-4">
            KOMPENSASI PELAYANAN
          </h1>
          <div className="w-24 h-1 bg-[#f8cb8b] mx-auto rounded-full"></div>
        </motion.div>

        {/* Breadcrumb & share */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm text-gray-600 border-b border-gray-200 pb-4 mb-6">
          <p>
            Pusdatin / Berita Utama /{" "}
            <span className="text-gray-500">10 Februari 2025</span> / Hits: 63
          </p>
          <div className="flex space-x-3 mt-3 md:mt-0">
            <a
              href="#"
              className="p-2 bg-[#f8cb8b]/20 rounded-full hover:bg-[#f8cb8b]/30 transition-colors"
            >
              <FiFacebook className="w-5 h-5 text-[#1c2c66]" />
            </a>
            <a
              href="#"
              className="p-2 bg-[#f8cb8b]/20 rounded-full hover:bg-[#f8cb8b]/30 transition-colors"
            >
              <FiX className="w-5 h-5 text-[#1c2c66]" />
            </a>
            <a
              href="#"
              className="p-2 bg-[#f8cb8b]/20 rounded-full hover:bg-[#f8cb8b]/30 transition-colors"
            >
              <FiLinkedin className="w-5 h-5 text-[#1c2c66]" />
            </a>
          </div>
        </div>

        {/* Gambar konten */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full rounded-lg overflow-hidden shadow-sm border border-gray-200"
        >
          <Image
            src={Kopensasi}
            alt="Kompensasi Pelayanan"
            width={1200}
            height={800}
            className="w-full h-auto"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default KompensasiPelayananPage;