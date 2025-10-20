"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FiHome,
  FiChevronRight,
  FiArrowRight,
  FiFileText,
} from "react-icons/fi";

const pdfSrc = "/prestasi.pdf"; // pastikan file ini ada di /public

const PrestasiPage = () => {
  const sidebarItems = [
    { title: "Sejarah Bapas Surakarta", href: "/tentang" },
    { title: "Kedudukan, Tugas dan Fungsi", href: "/tentang/tugas-fungsi" },
    { title: "Visi, Misi dan Tata Nilai", href: "/tentang/visi-misi" },
    { title: "Mars Pemasyarakatan", href: "/tentang/mars" },
    { title: "Corporate University", href: "/tentang/corporate-university" },
    { title: "Prestasi", href: "/tentang/prestasi" },
    { title: "Sarana dan Prasarana", href: "/tentang/sarana-prasarana" },
    { title: "Profil Pejabat", href: "/pimpinan/profil" },
    { title: "Sambutan Kapala Satuan Kerja", href: "/pimpinan/sambutan" },
  ];

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  // ---- FIX: paksa remount & render setelah mount ----
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // URL final PDF (tambahkan query kecil agar browser memuat ulang saat route berubah)
  const pdfUrl = useMemo(() => {
    const hash = "zoom=100&toolbar=0&navpanes=0&scrollbar=0&view=Fit";
    return `${pdfSrc}?v=${encodeURIComponent(pathname)}#${hash}`;
  }, [pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-[#1c2c66] to-[#2a3b7a] text-white pt-24 pb-8"
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="flex items-center mb-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="w-12 h-12 bg-[#f8cb8b]/20 rounded-lg flex items-center justify-center mr-4"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FiFileText className="text-2xl text-[#f8cb8b]" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold">Tentang Satuan Kerja</h1>
              <p className="text-gray-300 mt-1">
                Sistem Informasi Bapas Surakarta
              </p>
            </div>
          </motion.div>

          <motion.nav
            className="text-sm text-gray-300 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              href="/"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <FiHome size={14} />
              Beranda
            </Link>
            <FiChevronRight className="mx-2" size={12} />
            <Link
              href="/tentang"
              className="hover:text-white transition-colors"
            >
              Tentang Satuan Kerja
            </Link>
            <FiChevronRight className="mx-2" size={12} />
            <span className="text-white">Prestasi</span>
          </motion.nav>
        </div>
      </motion.header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.aside
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24"
            >
              <motion.h2
                className="text-lg font-semibold text-[#1c2c66] mb-4 pb-2 border-b border-gray-200"
                whileHover={{ x: 3 }}
              >
                Tentang Satuan Kerja
              </motion.h2>

              <motion.ul
                className="space-y-2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {sidebarItems.map((item, index) => (
                  <motion.li key={index} variants={itemVariants}>
                    <Link
                      href={item.href}
                      className={`block py-2 px-3 rounded-md transition-all duration-300 text-sm group ${
                        item.href === "/tentang/prestasi"
                          ? "bg-[#f8cb8b]/20 text-[#1c2c66] font-medium border-l-4 border-[#1c2c66] shadow-sm"
                          : "text-gray-600 hover:bg-[#f8cb8b]/10 hover:text-[#1c2c66] hover:shadow-md"
                      }`}
                    >
                      <motion.span
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2"
                      >
                        {item.title}
                        {item.href === "/tentang/prestasi" && (
                          <motion.span
                            animate={{ rotate: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <FiArrowRight size={14} />
                          </motion.span>
                        )}
                      </motion.span>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.aside>

          {/* Main Content */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.div
              whileHover={{ scale: 1.005 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* Hero Bar */}
              <div className="bg-gradient-to-r from-[#1c2c66] to-[#2a3b7a] p-6 text-white">
                <motion.h2
                  className="text-2xl font-bold mb-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Prestasi & Penghargaan
                </motion.h2>
                <motion.p
                  className="text-gray-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                >
                  Dokumentasi capaian dan apresiasi yang telah diraih.
                </motion.p>
              </div>

              {/* PDF Frame */}
              <div className="p-0">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="relative w-full h-[calc(100vh-12rem)] bg-white"
                >
                  {/* Gunakan <iframe> saja untuk stabilitas muatan PDF */}
                  {mounted ? (
                    <iframe
                      key={pdfUrl} // paksa remount saat route/path berubah
                      src={pdfUrl}
                      title="Prestasi PDF"
                      className="absolute inset-0 w-full h-full m-0 p-0 border-0 overflow-hidden"
                    />
                  ) : (
                    // Skeleton kecil saat belum mounted
                    <div className="absolute inset-0 grid place-items-center text-gray-400 text-sm">
                      Memuat dokumen…
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default PrestasiPage;
