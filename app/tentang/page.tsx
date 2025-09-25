'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiHome, FiChevronRight, FiInfo, FiCalendar, FiTarget, FiMusic, FiArrowRight } from 'react-icons/fi';
import Gedung from '@/public/image.png';

const TentangPage = () => {
  const sidebarItems = [
    { title: 'Sejarah Pemasyarakatan', href: '/tentang' },
    { title: 'Kedudukan, Tugas dan Fungsi', href: '/tentang/tugas-fungsi' },
    { title: 'Visi, Misi dan Tata Nilai', href: '/tentang/visi-misi' },
    { title: 'Mars Pemasyarakatan', href: '/tentang/mars' },
    { title: 'Corporate University', href: '/tentang/corporate-university' },
    { title: 'Sarana dan Prasarana', href: '/tentang/sarana-prasarana' },
  ];

  // Variants untuk animasi
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

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
              <span className="text-xl font-bold text-[#f8cb8b]">S</span>
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold">Tentang Satuan Kerja</h1>
              <p className="text-gray-300 mt-1">Sistem Informasi Bapas Surakarta</p>
            </div>
          </motion.div>
          
          <motion.nav 
            className="text-sm text-gray-300 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
              <FiHome size={14} />
              Beranda
            </Link>
            <FiChevronRight className="mx-2" size={12} />
            <Link href="/tentang" className="hover:text-white transition-colors">Tentang Satuan Kerja</Link>
            <FiChevronRight className="mx-2" size={12} />
            <span className="text-white">Sejarah Pemasyarakatan</span>
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
                        item.href === '/tentang' 
                          ? 'bg-[#f8cb8b]/20 text-[#1c2c66] font-medium border-l-4 border-[#1c2c66] shadow-sm' 
                          : 'text-gray-600 hover:bg-[#f8cb8b]/10 hover:text-[#1c2c66] hover:shadow-md'
                      }`}
                    >
                      <motion.span
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2"
                      >
                        {item.title}
                        {item.href === '/tentang' && (
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
              
              {/* Hero Image */}
              <div className="relative h-64 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#1c2c66]/90 to-[#2a3b7a]/90 flex items-center justify-center">
                  <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <h2 className="text-3xl font-bold text-white mb-2">Sejarah Pemasyarakatan</h2>
                    <p className="text-gray-300">Perjalanan panjang sistem pemasyarakatan di Indonesia</p>
                  </motion.div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <motion.div 
                  className="prose max-w-none"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.p 
                    variants={itemVariants}
                    className="text-gray-700 mb-6 leading-relaxed"
                  >
                    Bapas merupakan Unit Pelaksana Teknis (UPT) di bidang Pemasyarakatan luar lembaga yang merupakan pranata atau satuan kerja dalam lingkungan Kementerian Hukum dan HAM Republik Indonesia yang bertugas melakukan pembimbingan terhadap klien sampai seorang klien dapat memikul beban/masalah dan dapat membuat pola sendiri dalam menanggulangi beban permasalahan hidup. Pembimbingan yang dimaksud dilakukan di luar Lapas ataupun Rutan.
                  </motion.p>

                  <motion.p 
                    variants={itemVariants}
                    className="text-gray-700 mb-6 leading-relaxed"
                  >
                    Bapas dahulu dikenal dengan istilah Balai Bispa yang kepanjangannya adalah Balai Bimbingan Kemasyarakatan dan Pengentasan Anak. Balai Bispa didirikan berdasarkan Keputusan Menteri Kehakiman RI Nomor : M.02-PR.07.03 tahun 1987 tentang Organisasi dan Tata Kerja Balai Bimbingan Kemasyarakatan dan Pengentasan Anak yang bertugas melakukan pembinaan luar lembaga pemasyarakatan yang berada dibawah dan bertanggung jawab langsung kepada Kepala Kantor Wilayah.
                  </motion.p>

                  {/* Image */}
                  <motion.div 
                    variants={itemVariants}
                    className="flex justify-center my-8"
                  >
                    <motion.div 
                      className="relative w-full max-w-2xl h-64 overflow-hidden rounded-lg shadow-sm border border-gray-200"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Image
                        src={Gedung}
                        alt="Gedung Bapas Lama"
                        fill
                        className="object-cover hover:scale-110 transition duration-700"
                      />
                    </motion.div>
                  </motion.div>

                  <motion.p 
                    variants={itemVariants}
                    className="text-gray-700 mb-6 leading-relaxed"
                  >
                    Namun sesuai perkembangan kondisi, tugas dan fungsi berdasarkan Undang-Undang Nomor: 12 tahun 1995 tentang Pemasyarakatan, istilah Bispa diganti menjadi Bapas.
                  </motion.p>

                  <motion.h3 
                    variants={itemVariants}
                    className="text-xl font-semibold text-[#1c2c66] mt-8 mb-4 border-b border-gray-200 pb-2"
                  >
                    Bapas Kelas I Surakarta
                  </motion.h3>

                  <motion.p 
                    variants={itemVariants}
                    className="text-gray-700 mb-6 leading-relaxed"
                  >
                    Bapas Kelas I Surakarta (Bapas Surakarta) adalah satu dari 90 UPT Bapas yang ada di Indonesia. UPT ini berada di bawah Kantor Wilayah Kementerian Hukum dan Hak Asasi Manusia Jawa Tengah dan berkedudukan di JL. Rm. Said No. 259 Manahan, Banjarsari, Surakarta.
                  </motion.p>

                  <motion.p 
                    variants={itemVariants}
                    className="text-gray-700 mb-6 leading-relaxed"
                  >
                    Bapas Surakarta adalah pranata untuk melaksanakan bimbingan dan Pendampingan terhadap Klien Pemasyarakatan di Kementrian Hukum dan Hak Asasi Manusia yang berada di Wilayah kerja Kantor Wilayah Kementerian Hukum dan HAM Jawa Tengah. Wilayah kerja Bapas Surakarta meliputi: Solo, Boyolali, Karanganyar dan Sragen.
                  </motion.p>

                  {/* Info Box */}
                  <motion.div
                    variants={itemVariants}
                    className="bg-[#f8cb8b]/20 p-6 rounded-lg mt-8 border border-[#f8cb8b]/30"
                  >
                    <motion.h4 
                      className="text-lg font-semibold text-[#1c2c66] mb-3 flex items-center"
                      whileHover={{ x: 3 }}
                    >
                      <motion.span 
                        className="w-2 h-2 bg-[#1c2c66] rounded-full mr-2"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      ></motion.span>
                      Informasi Penting
                    </motion.h4>
                    <motion.ul 
                      className="list-disc list-inside text-gray-700 space-y-2 text-sm"
                      variants={containerVariants}
                    >
                      {[
                        "Didirikan berdasarkan Keputusan Menteri Kehakiman RI Tahun 1987",
                        "Berubah nama menjadi Bapas berdasarkan UU No. 12 Tahun 1995",
                        "Merupakan satu dari 90 UPT Bapas di Indonesia",
                        "Wilayah kerja: Solo, Boyolali, Karanganyar, dan Sragen"
                      ].map((item, index) => (
                        <motion.li key={index} variants={itemVariants}>
                          {item}
                        </motion.li>
                      ))}
                    </motion.ul>
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

export default TentangPage;