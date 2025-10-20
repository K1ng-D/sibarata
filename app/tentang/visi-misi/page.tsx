"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiTarget,
  FiList,
  FiStar,
  FiCheckCircle,
  FiUsers,
  FiEye,
  FiShield,
  FiHome,
  FiChevronRight,
  FiArrowRight,
} from "react-icons/fi";

const VisiMisiPage = () => {
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

  // ====== Misi & Tujuan (2 pasang) ======
  const misiTujuan = [
    {
      misi: "Mewujudkan Penegakan Hukum dan pelayanan serta jaminan pelindungan Imigrasi dan Pemasyarakatan yang transparan dan berkeadilan.",
      tujuan:
        "Menciptakan penegakan dan pelayanan hukum untuk mendukung kedaulatan negara serta reintegrasi sosial secara transparan dan berkeadilan.",
    },
    {
      misi: "Meningkatkan kapasitas kelembagaan Imigrasi dan Pemasyarakatan yang modern, profesional, dan berintegritas.",
      tujuan:
        "Menciptakan sistem keimigrasian dan pemasyarakatan yang modern, terintegrasi, dan akuntabel melalui peningkatan kompetensi serta profesionalisme sumber daya manusia yang berintegritas, responsif, dan adaptif di bidang Imigrasi dan Pemasyarakatan.",
    },
  ];

  // ====== Tata Nilai PRIMA ======
  const primaValues = [
    {
      icon: <FiShield className="text-2xl text-[#1c2c66]" />,
      initial: "P",
      title: "Profesional",
      description:
        "Menjalankan tugas dan fungsi sesuai keahlian/kompetensi dengan pendekatan humanis, menjunjung tinggi nilai kemanusiaan.",
    },
    {
      icon: <FiUsers className="text-2xl text-[#1c2c66]" />,
      initial: "R",
      title: "Responsif",
      description:
        "Memberikan layanan cepat, tepat, dan tanggap; berkolaborasi dengan pemangku kepentingan untuk meningkatkan kualitas layanan.",
    },
    {
      icon: <FiCheckCircle className="text-2xl text-[#1c2c66]" />,
      initial: "I",
      title: "Integritas",
      description:
        "Jujur, adil, menolak intervensi; mengedepankan kebenaran dalam penegakan hukum dan pelayanan.",
    },
    {
      icon: <FiEye className="text-2xl text-[#1c2c66]" />,
      initial: "M",
      title: "Modern",
      description:
        "Menggunakan sistem & teknologi informasi modern secara transparan untuk pengawasan dan pelayanan yang efektif/efisien, termasuk peningkatan kualitas pembinaan dan pengawasan dalam pemasyarakatan.",
    },
    {
      icon: <FiStar className="text-2xl text-[#1c2c66]" />,
      initial: "A",
      title: "Akuntabel",
      description:
        "Tugas/fungsi dijalankan secara dapat dipertanggungjawabkan kepada publik; menciptakan kepastian hukum dan keadilan.",
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
            <span className="text-white">Visi, Misi dan Tata Nilai</span>
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
                        item.href === "/tentang/visi-misi"
                          ? "bg-[#f8cb8b]/20 text-[#1c2c66] font-medium shadow-sm"
                          : "text-gray-700 hover:bg-[#f8cb8b]/10 hover:text-[#1c2c66] hover:shadow-md"
                      }`}
                    >
                      <motion.span
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2"
                      >
                        {item.title}
                        {item.href === "/tentang/visi-misi" && (
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
                  Visi, Misi, Tujuan & Tata Nilai
                </motion.h1>
                <motion.p
                  className="text-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  Kementerian Imigrasi dan Pemasyarakatan Republik Indonesia
                </motion.p>
              </div>

              <div className="p-8">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Visi */}
                  <motion.div variants={itemVariants} className="mb-12">
                    <motion.div
                      className="flex items-center mb-6"
                      whileHover={{ x: 3 }}
                    >
                      <motion.div
                        className="bg-[#f8cb8b]/20 p-3 rounded-full mr-4"
                        whileHover={{ scale: 1.1 }}
                      >
                        <FiTarget className="text-2xl text-[#1c2c66]" />
                      </motion.div>
                      <h2 className="text-2xl font-bold text-[#1c2c66]">
                        VISI 2025–2029
                      </h2>
                    </motion.div>

                    <motion.div
                      className="bg-[#f8cb8b]/20 border-l-4 border-[#1c2c66] p-6 rounded-r-lg"
                      whileHover={{ scale: 1.02 }}
                    >
                      <p className="text-xl md:text-2xl font-semibold text-[#1c2c66] italic text-center">
                        “Terwujudnya Penegakan Hukum dan Pelayanan Keimigrasian
                        dan Pemasyarakatan untuk Stabilitas Keamanan yang
                        Tangguh menuju Indonesia Emas 2045”.
                      </p>
                    </motion.div>
                  </motion.div>

                  {/* Misi & Tujuan */}
                  <motion.div variants={itemVariants} className="mb-12">
                    <motion.div
                      className="flex items-center mb-6"
                      whileHover={{ x: 3 }}
                    >
                      <motion.div
                        className="bg-[#f8cb8b]/20 p-3 rounded-full mr-4"
                        whileHover={{ scale: 1.1 }}
                      >
                        <FiList className="text-2xl text-[#1c2c66]" />
                      </motion.div>
                      <h2 className="text-2xl font-bold text-[#1c2c66]">
                        MISI & TUJUAN
                      </h2>
                    </motion.div>

                    <div className="space-y-6">
                      {misiTujuan.map((pair, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ y: -3, scale: 1.01 }}
                          className="bg-gray-50 border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex items-start gap-3 mb-3">
                            <div>
                              <p className="font-semibold text-[#1c2c66]">
                                MISI {idx + 1}
                              </p>
                              <p className="text-gray-700">{pair.misi}</p>
                            </div>
                          </div>
                          <div>
                            <p className="font-semibold text-[#1c2c66]">
                              TUJUAN {idx + 1}
                            </p>
                            <p className="text-gray-700">{pair.tujuan}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Tata Nilai PRIMA */}
                  <motion.div variants={itemVariants}>
                    <motion.div
                      className="flex items-center mb-6"
                      whileHover={{ x: 3 }}
                    >
                      <motion.div
                        className="bg-[#f8cb8b]/20 p-3 rounded-full mr-4"
                        whileHover={{ scale: 1.1 }}
                      >
                        <FiStar className="text-2xl text-[#1c2c66]" />
                      </motion.div>
                      <h2 className="text-2xl font-bold text-[#1c2c66]">
                        TATA NILAI — “PRIMA”
                      </h2>
                    </motion.div>

                    {/* Banner PRIMA */}
                    <motion.div
                      className="text-center mb-8"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="bg-gradient-to-r from-[#1c2c66] to-[#2a3b7a] inline-block text-white text-4xl font-bold py-4 px-8 rounded-lg shadow-sm">
                        P • R • I • M • A
                      </div>
                      <p className="text-gray-600 mt-2 max-w-3xl mx-auto">
                        “PRIMA” merupakan core values Kementerian Imigrasi dan
                        Pemasyarakatan (KEMENIMIPAS) sebagai panduan ASN dalam
                        bertugas dan memberi pelayanan kepada masyarakat.
                      </p>
                    </motion.div>

                    {/* Kartu nilai PRIMA */}
                    <div className="space-y-6">
                      {primaValues.map((item, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ y: -3, scale: 1.01 }}
                          className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex items-start mb-4">
                            <motion.div
                              className="bg-[#1c2c66] text-white rounded-full p-4 w-10 h-10 flex items-center justify-center text-lg font-bold mr-4"
                              whileHover={{ scale: 1.1 }}
                            >
                              {item.initial}
                            </motion.div>
                            <div>
                              <h3 className="text-xl font-semibold text-[#1c2c66] flex items-center gap-2">
                                {item.icon}
                                {item.title}
                              </h3>
                              <p className="text-gray-600">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Footer penjelasan singkat */}
                  <motion.div
                    variants={itemVariants}
                    className="mt-12 bg-[#f8cb8b]/20 border-l-4 border-[#1c2c66] p-6 rounded-r-lg"
                    whileHover={{ x: 3 }}
                  >
                    <h3 className="text-lg font-semibold text-[#1c2c66] mb-2">
                      Implementasi dalam Pelayanan
                    </h3>
                    <p className="text-gray-600">
                      Seluruh nilai PRIMA diinternalisasikan pada layanan
                      Imigrasi dan Pemasyarakatan—dari penegakan hukum yang
                      berkeadilan, transparansi proses, pemanfaatan teknologi
                      modern, hingga akuntabilitas kinerja—demi stabilitas
                      keamanan nasional dan kepastian hukum bagi masyarakat.
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

export default VisiMisiPage;
