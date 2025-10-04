"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiMusic, FiHome, FiChevronRight, FiArrowRight } from "react-icons/fi";

const YT_ID = "8hMcY0A9GIY"; // dari link: https://youtu.be/8hMcY0A9GIY?si=...

const MarsPage = () => {
  const sidebarItems = [
    { title: "Sejarah Pemasyarakatan", href: "/tentang" },
    { title: "Kedudukan, Tugas dan Fungsi", href: "/tentang/tugas-fungsi" },
    { title: "Visi, Misi dan Tata Nilai", href: "/tentang/visi-misi" },
    { title: "Mars Pemasyarakatan", href: "/tentang/mars" },
    { title: "Corporate University", href: "/tentang/corporate-university" },
    { title: "Sarana dan Prasarana", href: "/tentang/sarana-prasarana" },
  ];

  const lirikMars = [
    {
      bait: 1,
      lirik: `Kami petugas pemasyarakatan
Sebagai penegak hukum
Mengayom sesama insan
Tegakkan Hak Asasi Manusia`,
    },
    {
      bait: 2,
      lirik: `Ikhlas mengabdi pada masyarakat
Mengemban tugas mulia
Membina pelanggar hukum
Dengan berlandaskan pancasila`,
    },
    {
      bait: 3,
      lirik: `Kobarkan semangatmu tuk melawan tantangan
Pantang mundur hadapi cobaan
Jadikan teladan
Pancarkan wibawa
Dibawah panji pengayoman`,
    },
    {
      bait: 4,
      lirik: `Berlandaskan etos kerja tri darma
Turut bangun negara
Mewujudkan cita-cita
Masyarakat yang adil dan makmur`,
    },
  ];

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
            <span className="text-white">Mars Pemasyarakatan</span>
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
                        item.href === "/tentang/mars"
                          ? "bg-[#f8cb8b]/20 text-[#1c2c66] font-medium shadow-sm"
                          : "text-gray-700 hover:bg-[#f8cb8b]/10 hover:text-[#1c2c66] hover:shadow-md"
                      }`}
                    >
                      <motion.span
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2"
                      >
                        {item.title}
                        {item.href === "/tentang/mars" && (
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
                <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <FiMusic className="text-3xl mr-4" />
                  </motion.div>
                  <div>
                    <h1 className="text-3xl font-bold mb-2">
                      Mars Pemasyarakatan
                    </h1>
                    <p className="text-gray-300">
                      Lagu Kebangsaan Petugas Pemasyarakatan Indonesia
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="p-8">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* ===== Tonton & Dengarkan (YouTube) ===== */}
                  <motion.div variants={itemVariants} className="mb-10">
                    <h2 className="text-2xl font-bold text-[#1c2c66] mb-4">
                      Tonton & Dengarkan
                    </h2>

                    <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                      {/* Responsive 16:9 */}
                      <div className="relative w-full aspect-video">
                        <iframe
                          className="absolute inset-0 h-full w-full"
                          src={`https://www.youtube-nocookie.com/embed/${YT_ID}?rel=0&modestbranding=1`}
                          title="Mars Pemasyarakatan"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="strict-origin-when-cross-origin"
                        />
                      </div>
                      <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
                        <span className="text-sm text-gray-600">
                          Sumber: YouTube
                        </span>
                        <Link
                          href={`https://youtu.be/${YT_ID}`}
                          target="_blank"
                          className="text-sm font-medium text-[#1c2c66] hover:underline"
                        >
                          Buka di YouTube →
                        </Link>
                      </div>
                    </div>
                  </motion.div>

                  {/* ===== Lirik Section ===== */}
                  <motion.div variants={itemVariants} className="mb-8">
                    <h2 className="text-2xl font-bold text-[#1c2c66] mb-6 border-b border-gray-200 pb-2">
                      Lirik Mars Pemasyarakatan
                    </h2>

                    <div className="space-y-8">
                      {lirikMars.map((bait, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ y: -3, scale: 1.01 }}
                          className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex items-start mb-4">
                            <motion.div
                              className="bg-[#1c2c66] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4"
                              whileHover={{ scale: 1.1 }}
                            >
                              {bait.bait}
                            </motion.div>
                            <div className="flex-1">
                              <pre className="text-gray-800 whitespace-pre-wrap font-sans text-lg leading-relaxed">
                                {bait.lirik}
                              </pre>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* ===== Makna & Penggunaan ===== */}
                  <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
                  >
                    <motion.div
                      whileHover={{ x: 3 }}
                      className="bg-[#f8cb8b]/20 border-l-4 border-[#1c2c66] p-6 rounded-r-lg"
                    >
                      <h3 className="text-lg font-semibold text-[#1c2c66] mb-3">
                        Makna Mars Pemasyarakatan
                      </h3>
                      <ul className="text-gray-600 space-y-2 text-sm">
                        {[
                          "Menggambarkan semangat pengabdian petugas pemasyarakatan",
                          "Menegaskan komitmen dalam penegakan hukum dan HAM",
                          "Mencerminkan nilai-nilai Pancasila dalam pembinaan",
                          "Menunjukkan tekad mewujudkan masyarakat adil dan makmur",
                        ].map((item, index) => (
                          <motion.li
                            key={index}
                            className="flex items-start"
                            whileHover={{ x: 3 }}
                          >
                            <motion.span
                              className="bg-[#1c2c66] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-1"
                              whileHover={{ scale: 1.1 }}
                            >
                              {index + 1}
                            </motion.span>
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>

                    <motion.div
                      whileHover={{ x: 3 }}
                      className="bg-[#f8cb8b]/20 border-l-4 border-[#1c2c66] p-6 rounded-r-lg"
                    >
                      <h3 className="text-lg font-semibold text-[#1c2c66] mb-3">
                        Penggunaan Mars
                      </h3>
                      <ul className="text-gray-600 space-y-2 text-sm">
                        {[
                          "Upacara bendera dan acara resmi pemasyarakatan",
                          "Pembukaan kegiatan pembinaan dan pelatihan",
                          "Acara kenegaraan dan hukum terkait",
                          "Peringatan hari-hari besar pemasyarakatan",
                        ].map((item, index) => (
                          <motion.li
                            key={index}
                            className="flex items-start"
                            whileHover={{ x: 3 }}
                          >
                            <motion.span
                              className="bg-[#1c2c66] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-1"
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: index * 0.5,
                              }}
                            >
                              •
                            </motion.span>
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
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

export default MarsPage;
