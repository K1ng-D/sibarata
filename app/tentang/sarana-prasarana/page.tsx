"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome,
  FiCpu,
  FiPrinter,
  FiBook,
  FiShield,
  FiX,
  FiArrowRight,
  FiChevronRight,
} from "react-icons/fi";
import { FaCar } from "react-icons/fa";
import { useEffect, useState } from "react";

interface GaleriItem {
  title: string;
  url: string;
}

const SaranaPrasaranaPage = () => {
  const [galeri, setGaleri] = useState<GaleriItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<GaleriItem | null>(null);

  useEffect(() => {
    fetch("/api/galeri")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setGaleri(data.data);
      });
  }, []);

  const sidebarItems = [
    { title: "Sejarah Pemasyarakatan", href: "/tentang" },
    { title: "Kedudukan, Tugas dan Fungsi", href: "/tentang/tugas-fungsi" },
    { title: "Visi, Misi dan Tata Nilai", href: "/tentang/visi-misi" },
    { title: "Mars Pemasyarakatan", href: "/tentang/mars" },
    { title: "Corporate University", href: "/tentang/corporate-university" },
    { title: "Sarana dan Prasarana", href: "/tentang/sarana-prasarana" },
  ];

  const facilities = [
    {
      category: "Gedung dan Ruangan",
      icon: <FiHome className="text-2xl text-[#1c2c66]" />,
      items: [
        {
          name: "Gedung Utama",
          description: "Gedung 3 lantai dengan area kerja modern",
        },
        {
          name: "Ruang Kepala Bapas",
          description: "Ruang kerja pimpinan yang representatif",
        },
        { name: "Mushola", description: "Tempat ibadah yang nyaman" },
      ],
    },
    {
      category: "Teknologi Informasi",
      icon: <FiCpu className="text-2xl text-[#1c2c66]" />,
      items: [
        {
          name: "Jaringan Internet",
          description: "Koneksi fiber optic 100 Mbps",
        },
        { name: "Server Lokal", description: "Data center dengan redundansi" },
      ],
    },
    {
      category: "Kendaraan Operasional",
      icon: <FaCar className="text-2xl text-[#1c2c66]" />,
      items: [
        { name: "Mobil Dinas", description: "Kendaraan operasional lapangan" },
        {
          name: "Sepeda Motor Dinas",
          description: "Kendaraan operasional petugas",
        },
      ],
    },
    {
      category: "Peralatan Kantor",
      icon: <FiPrinter className="text-2xl text-[#1c2c66]" />,
      items: [
        { name: "Printer & Scanner", description: "Multifunction devices" },
      ],
    },
    {
      category: "Fasilitas Pendukung",
      icon: <FiShield className="text-2xl text-[#1c2c66]" />,
      items: [{ name: "Sistem CCTV", description: "Pengawasan 24 jam" }],
    },
    {
      category: "Fasilitas Kesejahteraan",
      icon: <FiBook className="text-2xl text-[#1c2c66]" />,
      items: [{ name: "Musholla", description: "Tempat ibadah yang nyaman" }],
    },
  ];

  const stats = [
    { number: "2,500", label: "M² Total Area" },
    { number: "45", label: "Ruangan" },
    { number: "80+", label: "Unit Komputer" },
    { number: "12", label: "Kendaraan" },
    { number: "24/7", label: "Security" },
    { number: "100%", label: "Internet Coverage" },
  ];

  // Variants untuk animasi
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const openModal = (item: GaleriItem) => {
    setSelectedImage(item);
  };

  const closeModal = () => {
    setSelectedImage(null);
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
            <span className="text-white">Sarana dan Prasarana</span>
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
                        item.href === "/tentang/sarana-prasarana"
                          ? "bg-[#f8cb8b]/20 text-[#1c2c66] font-medium shadow-sm"
                          : "text-gray-700 hover:bg-[#f8cb8b]/10 hover:text-[#1c2c66] hover:shadow-md"
                      }`}
                    >
                      <motion.span
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2"
                      >
                        {item.title}
                        {item.href === "/tentang/sarana-prasarana" && (
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
                    <FiHome className="text-3xl mr-4" />
                  </motion.div>
                  <div>
                    <h1 className="text-3xl font-bold mb-2">
                      Sarana dan Prasarana
                    </h1>
                    <p className="text-gray-300">
                      Fasilitas Penunjang Pelayanan Bapas Kelas I Surakarta
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
                  {/* Introduction */}
                  <motion.div
                    variants={itemVariants}
                    className="prose max-w-none mb-8"
                  >
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                      Bapas Kelas I Surakarta dilengkapi dengan sarana dan
                      prasarana modern yang mendukung pelaksanaan tugas dan
                      fungsi dalam memberikan pelayanan terbaik kepada
                      masyarakat. Semua fasilitas didesain untuk menunjang
                      efisiensi, kenyamanan, dan keamanan.
                    </p>
                  </motion.div>

                  {/* Statistics */}
                  <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
                  >
                    {stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ y: -5, scale: 1.05 }}
                        className="bg-[#f8cb8b]/20 rounded-lg p-4 text-center border border-[#f8cb8b]/30 hover:shadow-md transition-all duration-300"
                      >
                        <motion.div
                          className="text-2xl font-bold text-[#1c2c66] mb-1"
                          whileHover={{ scale: 1.1 }}
                        >
                          {stat.number}
                        </motion.div>
                        <div className="text-sm text-gray-600">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Facilities Grid */}
                  <motion.div variants={itemVariants} className="space-y-8">
                    {facilities.map((facility, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ y: -3 }}
                        className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
                      >
                        <div className="bg-[#f8cb8b]/20 px-6 py-4 border-b border-[#f8cb8b]/30">
                          <div className="flex items-center">
                            <motion.div
                              className="bg-white p-2 rounded-full mr-3"
                              whileHover={{ scale: 1.1 }}
                            >
                              {facility.icon}
                            </motion.div>
                            <h2 className="text-xl font-semibold text-[#1c2c66]">
                              {facility.category}
                            </h2>
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {facility.items.map((item, itemIndex) => (
                              <motion.div
                                key={itemIndex}
                                whileHover={{ x: 3, scale: 1.02 }}
                                className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-[#f8cb8b]/10 transition-all duration-300 border border-gray-200 hover:shadow-md"
                              >
                                <motion.div
                                  className="bg-[#1c2c66] p-2 rounded-full mr-4"
                                  whileHover={{ scale: 1.2 }}
                                >
                                  <div className="w-2 h-2 bg-white rounded-full"></div>
                                </motion.div>
                                <div>
                                  <h3 className="font-semibold text-[#1c2c66] mb-1">
                                    {item.name}
                                  </h3>
                                  <p className="text-sm text-gray-600">
                                    {item.description}
                                  </p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Gallery Section */}
                  <motion.div variants={itemVariants} className="mt-12">
                    <h2 className="text-2xl font-bold text-[#1c2c66] mb-6">
                      Galeri Fasilitas
                    </h2>
                    {galeri.length === 0 ? (
                      <p className="text-gray-500">Belum ada gambar.</p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {galeri.map((item, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="relative h-48 rounded-lg overflow-hidden border border-gray-200 cursor-pointer group"
                            onClick={() => openModal(item)}
                          >
                            <motion.img
                              src={item.url}
                              alt={item.title}
                              className="w-full h-full object-cover"
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.3 }}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                              <span className="text-white font-semibold text-center px-2">
                                {item.title}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Modal untuk gambar besar */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                onClick={closeModal}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiX className="w-8 h-8 mt-5 mb-5" />
              </motion.button>

              <div className="bg-white rounded-lg overflow-hidden">
                <motion.img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[80vh] object-contain"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="p-4 bg-white">
                  <h3 className="text-lg font-semibold text-[#1c2c66] text-center">
                    {selectedImage.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SaranaPrasaranaPage;
