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

  // ====== DATA TUGAS & FUNGSI (6 poin baru) ======
  const tugasFungsiItems = [
    {
      icon: <FiClipboard className="text-2xl text-[#1c2c66]" />,
      title: "Penelitian Kemasyarakatan (Litmas)",
      description:
        "Membuat penelitian kemasyarakatan (litmas) untuk bahan sidang peradilan anak, litmas bimbingan, dan litmas integrasi.",
    },
    {
      icon: <FiUsers className="text-2xl text-[#1c2c66]" />,
      title: "Pendampingan Pemasyarakatan",
      description:
        "Melakukan pendampingan kepada klien pemasyarakatan, terutama anak yang berkonflik dengan hukum selama proses peradilan pidana dan setelahnya.",
    },
    {
      icon: <FiBook className="text-2xl text-[#1c2c66]" />,
      title: "Pembimbingan Kemasyarakatan",
      description:
        "Serangkaian kegiatan yang dilakukan oleh pembimbing kemasyarakatan agar klien menjadi pribadi mandiri dan terampil sehingga dapat kembali ke masyarakat dengan baik.",
    },
    {
      icon: <FiCheckCircle className="text-2xl text-[#1c2c66]" />,
      title: "Pengawasan",
      description:
        "Kegiatan untuk memantau dan memastikan klien pemasyarakatan menjalankan kewajiban serta program yang telah direkomendasikan.",
    },
    {
      icon: <FiFileText className="text-2xl text-[#1c2c66]" />,
      title: "Sidang TPP (Tim Pengamat Pemasyarakatan)",
      description:
        "Forum pengambilan keputusan yang melibatkan pembimbing pemasyarakatan terkait program yang direkomendasikan bagi klien pemasyarakatan.",
    },
    {
      icon: <FiHelpCircle className="text-2xl text-[#1c2c66]" />,
      title: "Koordinasi Stakeholder Lain",
      description:
        "Melakukan koordinasi dengan pemangku kepentingan lain guna mendukung efektivitas pelaksanaan program pemasyarakatan.",
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
            Kedudukan, Tugas dan Fungsi
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
                  KEDUDUKAN, TUGAS & FUNGSI
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
                  {/* ===== Struktur Organisasi (dengan frame PDF) ===== */}
                  <motion.div
                    id="struktur"
                    variants={itemVariants}
                    className="mb-10"
                  >
                    <h2 className="text-2xl font-bold text-[#1c2c66] mb-4">
                      Struktur Organisasi
                    </h2>

                    {/* Frame PDF responsif */}
                    <motion.div
                      className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                      whileHover={{ y: -2 }}
                    >
                      <div className="w-full aspect-[4/3] md:aspect-[16/9] bg-white border border-gray-200 rounded-md overflow-hidden">
                        <iframe
                          src="/struktur-organisasi.pdf"
                          title="Struktur Organisasi - PDF"
                          className="w-full h-full"
                        />
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* ===== Tugas & Fungsi (6 poin) ===== */}
                  <motion.div
                    id="tugas-fungsi"
                    variants={itemVariants}
                    className="mb-8"
                  >
                    <h2 className="text-2xl font-bold text-[#1c2c66] mb-4">
                      Tugas dan Fungsi
                    </h2>

                    <motion.div
                      className="bg-[#f8cb8b]/20 border-l-4 border-[#1c2c66] p-6 mb-6"
                      whileHover={{ x: 3 }}
                    >
                      <p className="text-gray-700">
                        Berikut rincian tugas dan fungsi utama Bapas Surakarta:
                      </p>
                    </motion.div>

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

                  {/* Dasar Hukum (opsional, tetap dipertahankan) */}
                  <motion.div
                    variants={itemVariants}
                    className="bg-[#f8cb8b]/20 border-l-4 border-[#1c2c66] p-6"
                    whileHover={{ x: 3 }}
                  >
                    <h3 className="text-lg font-semibold text-[#1c2c66] mb-2">
                      Dasar Hukum
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Pelaksanaan kedudukan, tugas, dan fungsi mengacu pada
                      peraturan perundang-undangan yang berlaku, termasuk
                      Undang-Undang Nomor 12 Tahun 1995 tentang Pemasyarakatan
                      beserta peraturan pelaksanaannya.
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
