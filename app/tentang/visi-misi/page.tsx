'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiTarget, FiList, FiStar, FiCheckCircle, FiUsers, FiEye, FiShield, FiHome, FiChevronRight, FiArrowRight } from 'react-icons/fi';
import { GiDeadlyStrike } from "react-icons/gi";

const VisiMisiPage = () => {
  const sidebarItems = [
    { title: 'Sejarah Pemasyarakatan', href: '/tentang' },
    { title: 'Kedudukan, Tugas dan Fungsi', href: '/tentang/tugas-fungsi' },
    { title: 'Visi, Misi dan Tata Nilai', href: '/tentang/visi-misi' },
    { title: 'Mars Pemasyarakatan', href: '/tentang/mars' },
    { title: 'Corporate University', href: '/tentang/corporate-university' },
    { title: 'Sarana dan Prasarana', href: '/tentang/sarana-prasarana' },
  ];

  const misiItems = [
    "Mewujudkan peraturan Perundang-Undangan yang berkualitas",
    "Mewujudkan pelayanan hukum yang berkualitas",
    "Mewujudkan penegakan hukum yang berkualitas",
    "Mewujudkan penghormatan, pemenuhan, dan perlindungan HAM",
    "Mewujudkan layanan manajemen administrasi Kementerian Hukum dan HAM",
    "Mewujudkan aparatur Kementerian Hukum dan HAM yang profesional dan berintegritas"
  ];

  const tataNilaiItems = [
    {
      icon: <FiShield className="text-2xl text-[#1c2c66]" />,
      initial: "P",
      title: "Profesional",
      description: "Aparatur Kementerian Hukum dan HAM adalah aparat yang bekerja keras untuk mencapai tujuan organisasi melalui penguasaan bidang tugasnya, menjunjung tinggi etika dan integritas profesi"
    },
    {
      icon: <FiCheckCircle className="text-2xl text-[#1c2c66]" />,
      initial: "A",
      title: "Akuntabel",
      description: "Setiap kegiatan dalam rangka penyelenggaraan pemerintah dapat dipertanggungjawabkan kepada masyarakat sesuai dengan ketentuan atau peraturan yang berlaku"
    },
    {
      icon: <FiUsers className="text-2xl text-[#1c2c66]" />,
      initial: "S",
      title: "Sinergi",
      description: "Komitmen untuk membangun dan memastikan hubungan kerjasama yang produktif serta kemitraan yang harmonis dengan para pemangku kepentingan untuk menemukan dan melaksanakan solusi terbaik, bermanfaat, dan berkualitas"
    },
    {
      icon: <FiEye className="text-2xl text-[#1c2c66]" />,
      initial: "T",
      title: "Transparan",
      description: "Kementerian Hukum dan HAM menjamin akses atau kebebasan bagi setiap orang untuk memperoleh informasi tentang penyelenggaraan pemerintahan, yakni informasi tentang kebijakan, proses pembuatan dan pelaksanaannya, serta hasil-hasil yang dicapai"
    },
    {
      icon: <GiDeadlyStrike className="text-2xl text-[#1c2c66]" />,
      initial: "I",
      title: "Inovatif",
      description: "Kementerian Hukum dan HAM mendukung kreatifitas dan mengembangkan inisiatif untuk selalu melakukan pembaharuan dalam penyelenggaraan tugas dan fungsinya"
    }
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
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
              <FiHome size={14} />
              Beranda
            </Link>
            <FiChevronRight className="mx-2" size={12} />
            <Link href="/tentang" className="hover:text-white transition-colors">Tentang Satuan Kerja</Link>
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
                        item.href === '/tentang/visi-misi' 
                          ? 'bg-[#f8cb8b]/20 text-[#1c2c66] font-medium shadow-sm' 
                          : 'text-gray-700 hover:bg-[#f8cb8b]/10 hover:text-[#1c2c66] hover:shadow-md'
                      }`}
                    >
                      <motion.span
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2"
                      >
                        {item.title}
                        {item.href === '/tentang/visi-misi' && (
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
                  Visi, Misi dan Tata Nilai
                </motion.h1>
                <motion.p 
                  className="text-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  Kementerian Hukum dan Hak Asasi Manusia Republik Indonesia
                </motion.p>
              </div>

              <div className="p-8">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Visi Section */}
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
                      <h2 className="text-2xl font-bold text-[#1c2c66]">VISI</h2>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-[#f8cb8b]/20 border-l-4 border-[#1c2c66] p-6 rounded-r-lg"
                      whileHover={{ scale: 1.02 }}
                    >
                      <p className="text-2xl font-semibold text-[#1c2c66] italic text-center">
                        "Masyarakat memperoleh kepastian hukum"
                      </p>
                    </motion.div>
                    
                    <motion.p 
                      className="text-gray-600 mt-4 text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      Visi ini menjadi pedoman dan arah bagi seluruh jajaran Kementerian Hukum dan HAM 
                      dalam melaksanakan tugas dan fungsi untuk memberikan kepastian hukum bagi masyarakat.
                    </motion.p>
                  </motion.div>

                  {/* Misi Section */}
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
                      <h2 className="text-2xl font-bold text-[#1c2c66]">MISI</h2>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {misiItems.map((misi, index) => (
                        <motion.div 
                          key={index}
                          whileHover={{ y: -3, scale: 1.02 }}
                          className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex items-start">
                            <motion.div 
                              className="bg-[#1c2c66] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-1"
                              whileHover={{ scale: 1.2 }}
                            >
                              {index + 1}
                            </motion.div>
                            <p className="text-gray-700">{misi}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Tata Nilai Section */}
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
                      <h2 className="text-2xl font-bold text-[#1c2c66]">TATA NILAI</h2>
                    </motion.div>
                    
                    <motion.div 
                      className="text-center mb-8"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="bg-gradient-to-r from-[#1c2c66] to-[#2a3b7a] inline-block text-white text-4xl font-bold py-4 px-8 rounded-lg shadow-sm">
                        P-A-S-T-I
                      </div>
                      <p className="text-gray-600 mt-2">Kementerian Hukum dan HAM menjunjung tinggi tata nilai kami "P-A-S-T-I"</p>
                    </motion.div>

                    <div className="space-y-6">
                      {tataNilaiItems.map((item, index) => (
                        <motion.div 
                          key={index}
                          whileHover={{ y: -3, scale: 1.01 }}
                          className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex items-start mb-4">
                            <motion.div 
                              className="bg-[#1c2c66] text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold mr-4"
                              whileHover={{ scale: 1.1 }}
                            >
                              {item.initial}
                            </motion.div>
                            <div>
                              <h3 className="text-xl font-semibold text-[#1c2c66]">{item.title}</h3>
                              <p className="text-gray-600">{item.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Implementasi Section */}
                  <motion.div 
                    variants={itemVariants}
                    className="mt-12 bg-[#f8cb8b]/20 border-l-4 border-[#1c2c66] p-6 rounded-r-lg"
                    whileHover={{ x: 3 }}
                  >
                    <h3 className="text-lg font-semibold text-[#1c2c66] mb-2">Implementasi dalam Pelayanan</h3>
                    <p className="text-gray-600">
                      Visi, Misi, dan Tata Nilai Kementerian Hukum dan HAM ini diimplementasikan 
                      dalam setiap layanan yang diberikan oleh Bapas Kelas I Surakarta kepada masyarakat, 
                      ensuring professional, accountable, synergistic, transparent, and innovative services.
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