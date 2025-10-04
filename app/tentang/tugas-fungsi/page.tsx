"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiClipboard,
  FiUsers,
  FiBook,
  FiFileText,
  FiHelpCircle,
  FiHome,
  FiChevronRight,
  FiArrowRight,
} from "react-icons/fi";

const TugasFungsiPage = () => {
  const sidebarItems = [
    { title: "Sejarah Pemasyarakatan", href: "/tentang" },
    { title: "Kedudukan, Tugas dan Fungsi", href: "/tentang/tugas-fungsi" },
    { title: "Visi, Misi dan Tata Nilai", href: "/tentang/visi-misi" },
    { title: "Mars Pemasyarakatan", href: "/tentang/mars" },
    { title: "Corporate University", href: "/tentang/corporate-university" },
    { title: "Sarana dan Prasarana", href: "/tentang/sarana-prasarana" },
  ];

  const tugasFungsiItems = [
    {
      icon: <FiClipboard className="text-2xl text-[#1c2c66]" />,
      title: "Penelitian Kemasyarakatan (Litmas)",
      description:
        "Membuat penelitian kemasyarakatan (litmas) untuk bahan sidang peradilan anak, litmas bimbingan dan litmas integrasi",
    },
    {
      icon: <FiBook className="text-2xl text-[#1c2c66]" />,
      title: "Registrasi Klien Pemasyarakatan",
      description: "Melakukan registrasi klien pemasyarakatan",
    },
    {
      icon: <FiUsers className="text-2xl text-[#1c2c66]" />,
      title: "Bimbingan Kemasyarakatan",
      description: "Melakukan bimbingan kemasyarakatan dan pengentasan anak",
    },
    {
      icon: <FiFileText className="text-2xl text-[#1c2c66]" />,
      title: "Kehadiran di Sidang Pengadilan",
      description:
        "Mengikuti sidang pengadilan di Pengadilan Negeri dan sidang Tim Pengamat Pemasyarakatan di Lembaga Pemasyarakatan sesuai dengan peraturan perundang-undangan yang berlaku",
    },
    {
      icon: <FiHelpCircle className="text-2xl text-[#1c2c66]" />,
      title: "Bimbingan dan Bantuan",
      description:
        "Memberi bantuan bimbingan kepada bekas narapidana, anak Negara dan Klien pemasyarakatan yang memerlukan",
    },
    {
      icon: <FiCheckCircle className="text-2xl text-[#1c2c66]" />,
      title: "Tata Usaha",
      description: "Melakukan urusan tata usaha Bapas Surakarta",
    },
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-[#1c2c66] to-[#2a3b7a] text-white pt-20 pb-12"
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.h1
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            Tentang Satuan Kerja
          </motion.h1>
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
            <span className="text-white">Kedudukan, Tugas dan Fungsi</span>
          </motion.nav>
        </div>
      </motion.header>

      <main className="max-w-6xl mx-auto px-4 py-12">
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
                className="text-xl font-semibold text-[#1c2c66] mb-4"
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
                      className={`block py-2 px-4 rounded-md transition-all duration-300 group ${
                        item.href === "/tentang/tugas-fungsi"
                          ? "bg-[#f8cb8b]/20 text-[#1c2c66] font-medium shadow-sm"
                          : "text-gray-700 hover:bg-[#f8cb8b]/10 hover:text-[#1c2c66] hover:shadow-md"
                      }`}
                    >
                      <motion.span
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2"
                      >
                        {item.title}
                        {item.href === "/tentang/tugas-fungsi" && (
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

              {/* Quick anchors */}
              <div className="mt-6 border-t pt-4">
                <p className="text-xs text-gray-500 mb-2">Navigasi cepat</p>
                <div className="space-y-2">
                  <a
                    href="#struktur"
                    className="block text-sm text-[#1c2c66] hover:underline"
                  >
                    Struktur Organisasi
                  </a>
                  <a
                    href="#tugas-fungsi"
                    className="block text-sm text-[#1c2c66] hover:underline"
                  >
                    Tugas & Fungsi
                  </a>
                </div>
              </div>
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
              {/* Hero Section */}
              <div className="bg-gradient-to-r from-[#1c2c66] to-[#2a3b7a] p-8 text-white">
                <motion.h1
                  className="text-3xl font-bold mb-2"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  STRUKTUR ORGANISASI & TUGAS-FUNGSI
                </motion.h1>
                <motion.p
                  className="text-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  Bapas Kelas I Surakarta
                </motion.p>
              </div>

              <div className="p-8">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* ===== Struktur Organisasi (DULUAN) ===== */}
                  <motion.div
                    id="struktur"
                    variants={itemVariants}
                    className="mb-10"
                  >
                    <h2 className="text-2xl font-bold text-[#1c2c66] mb-4">
                      Struktur Organisasi Bapas Surakarta
                    </h2>
                    <motion.div
                      className="bg-gray-50 rounded-lg p-6 border border-gray-200"
                      whileHover={{ y: -2 }}
                    >
                      <div className="text-center mb-6">
                        <motion.div
                          className="bg-[#1c2c66] text-white py-3 px-6 rounded-t-lg"
                          whileHover={{ scale: 1.02 }}
                        >
                          <h3 className="font-semibold">Kepala Bapas</h3>
                        </motion.div>
                        <div className="border border-gray-200 border-t-0 rounded-b-lg p-4">
                          <p className="text-gray-700">
                            Membawahi seluruh unit kerja
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Sub Bagian Tata Usaha */}
                        <motion.div
                          className="text-center"
                          whileHover={{ y: -3 }}
                        >
                          <div className="bg-[#1c2c66]/90 text-white py-2 px-4 rounded-t-lg">
                            <h4 className="font-semibold text-sm">
                              Sub Bagian Tata Usaha
                            </h4>
                          </div>
                          <div className="border border-gray-200 border-t-0 rounded-b-lg p-3">
                            <ul className="text-xs text-gray-600 space-y-1">
                              {[
                                "Urusan Kepegawaian",
                                "Urusan Keuangan",
                                "Urusan Umum & BMN",
                              ].map((item, index) => (
                                <motion.li key={index} whileHover={{ x: 3 }}>
                                  {item}
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>

                        {/* Seksi Bimbingan Klien Pemasyarakatan */}
                        <motion.div
                          className="text-center"
                          whileHover={{ y: -3 }}
                        >
                          <div className="bg-[#1c2c66]/90 text-white py-2 px-4 rounded-t-lg">
                            <h4 className="font-semibold text-sm">
                              Seksi Bimbingan Klien Pemasyarakatan
                            </h4>
                          </div>
                          <div className="border border-gray-200 border-t-0 rounded-b-lg p-3">
                            <ul className="text-xs text-gray-600 space-y-1">
                              {[
                                "Bimbingan Narapidana",
                                "Bimbingan Klien Anak",
                                "Bimbingan Klien Dewasa",
                              ].map((item, index) => (
                                <motion.li key={index} whileHover={{ x: 3 }}>
                                  {item}
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>

                        {/* Seksi Pengamatan dan Penelitian Kemasyarakatan */}
                        <motion.div
                          className="text-center"
                          whileHover={{ y: -3 }}
                        >
                          <div className="bg-[#1c2c66]/90 text-white py-2 px-4 rounded-t-lg">
                            <h4 className="font-semibold text-sm">
                              Seksi Pengamatan dan Penelitian Kemasyarakatan
                            </h4>
                          </div>
                          <div className="border border-gray-200 border-t-0 rounded-b-lg p-3">
                            <ul className="text-xs text-gray-600 space-y-1">
                              {[
                                "Penelitian Kemasyarakatan",
                                "Pengamatan Klien",
                                "Assesmen dan Evaluasi",
                              ].map((item, index) => (
                                <motion.li key={index} whileHover={{ x: 3 }}>
                                  {item}
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* ===== Tugas & Fungsi (SESUDAHNYA) ===== */}
                  <motion.div
                    id="tugas-fungsi"
                    variants={itemVariants}
                    className="mb-8"
                  >
                    <h2 className="text-2xl font-bold text-[#1c2c66] mb-4">
                      Tugas dan Fungsi
                    </h2>

                    {/* Intro */}
                    <motion.div
                      className="bg-[#f8cb8b]/20 border-l-4 border-[#1c2c66] p-6 mb-6"
                      whileHover={{ x: 3 }}
                    >
                      <p className="text-gray-700">
                        Berikut rincian tugas dan fungsi utama pada unit-unit di
                        Bapas Surakarta:
                      </p>
                    </motion.div>

                    {/* Grid of Tugas & Fungsi */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {tugasFungsiItems.map((item, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ y: -5, scale: 1.02 }}
                          className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex items-start mb-4">
                            <motion.div
                              className="bg-[#f8cb8b]/20 p-3 rounded-full mr-4"
                              whileHover={{ scale: 1.1 }}
                            >
                              {item.icon}
                            </motion.div>
                            <h3 className="text-lg font-semibold text-[#1c2c66]">
                              {item.title}
                            </h3>
                          </div>
                          <p className="text-gray-600 text-sm">
                            {item.description}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Dasar Hukum */}
                  <motion.div
                    variants={itemVariants}
                    className="bg-[#f8cb8b]/20 border-l-4 border-[#1c2c66] p-6"
                    whileHover={{ x: 3 }}
                  >
                    <h3 className="text-lg font-semibold text-[#1c2c66] mb-2">
                      Dasar Hukum
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Seluruh tugas dan fungsi Bapas Surakarta dilaksanakan
                      berdasarkan peraturan perundang-undangan yang berlaku,
                      termasuk Undang-Undang Nomor 12 Tahun 1995 tentang
                      Pemasyarakatan dan peraturan pelaksanaannya.
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default TugasFungsiPage;
