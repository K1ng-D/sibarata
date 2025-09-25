'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiBookOpen, FiUsers, FiTarget, FiArrowRight, FiBook, FiTrendingUp, FiShield, FiGlobe, FiHome, FiChevronRight, FiInfo } from 'react-icons/fi';

const CorporateUniversityPage = () => {
  const sidebarItems = [
    { title: 'Sejarah Pemasyarakatan', href: '/tentang' },
    { title: 'Kedudukan, Tugas dan Fungsi', href: '/tentang/tugas-fungsi' },
    { title: 'Visi, Misi dan Tata Nilai', href: '/tentang/visi-misi' },
    { title: 'Mars Pemasyarakatan', href: '/tentang/mars' },
    { title: 'Corporate University', href: '/tentang/corporate-university' },
    { title: 'Sarana dan Prasarana', href: '/tentang/sarana-prasarana' },
  ];

  const features = [
    {
      icon: <FiTarget className="text-2xl text-[#1c2c66]" />,
      title: "Fokus Strategis",
      description: "Berfokus pada program strategis Kementerian Hukum dan HAM"
    },
    {
      icon: <FiUsers className="text-2xl text-[#1c2c66]" />,
      title: "Ekosistem Pembelajar",
      description: "Mengelola individu pegawai dalam organisasi pembelajar"
    },
    {
      icon: <FiBook className="text-2xl text-[#1c2c66]" />,
      title: "Pengelolaan Pengetahuan",
      description: "Manajemen pengetahuan untuk pencapaian karakter unggul"
    },
    {
      icon: <FiTrendingUp className="text-2xl text-[#1c2c66]" />,
      title: "Spesialisasi Pelatihan",
      description: "Pengembangan berbasis kebutuhan nyata organisasi"
    }
  ];

  const changes = [
    {
      title: "Desain Pengembangan SDM",
      description: "Perubahan mendasar dalam perencanaan pengembangan sumber daya manusia"
    },
    {
      title: "Analisis Kebutuhan Pembelajaran",
      description: "Pendekatan berbasis isu strategis organisasi"
    },
    {
      title: "Sinergi Organisasi",
      description: "Keterlibatan semua pihak dalam perumusan program"
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Learning Council Meeting",
      description: "Rapat pimpinan tertinggi mengidentifikasi kebutuhan pengembangan"
    },
    {
      step: "2",
      title: "Analisis Kebutuhan",
      description: "Berdasarkan isu strategis organisasi yang diputuskan manajemen"
    },
    {
      step: "3",
      title: "Cetak Biru Pengembangan",
      description: "Perencanaan program pengembangan untuk tahun berikutnya"
    },
    {
      step: "4",
      title: "Implementasi & Evaluasi",
      description: "Pelaksanaan program dan reformulasi melalui evaluasi"
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
            <span className="text-white">Corporate University</span>
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
                        item.href === '/tentang/corporate-university' 
                          ? 'bg-[#f8cb8b]/20 text-[#1c2c66] font-medium shadow-sm' 
                          : 'text-gray-700 hover:bg-[#f8cb8b]/10 hover:text-[#1c2c66] hover:shadow-md'
                      }`}
                    >
                      <motion.span
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2"
                      >
                        {item.title}
                        {item.href === '/tentang/corporate-university' && (
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
                    <FiBookOpen className="text-3xl mr-4" />
                  </motion.div>
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Corporate University</h1>
                    <p className="text-gray-300">Kumham CorpU - Strategi Pengembangan SDM Kementerian Hukum dan HAM</p>
                  </div>
                </motion.div>
              </div>

              <div className="p-8">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Introduction Section */}
                  <motion.div variants={itemVariants} className="prose max-w-none mb-8">
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                      <strong>Kumham CorpU</strong> merupakan manajemen strategis pengembangan SDM yang fokus pada program strategis Kementerian, dengan mengelola individu pegawai dalam ekosistem organisasi pembelajar, serta pengelolaan pengetahuan untuk pencapaian karakter unggul di bidang Hukum dan HAM.
                    </p>
                    
                    <motion.div 
                      variants={itemVariants}
                      className="bg-[#f8cb8b]/20 border-l-4 border-[#1c2c66] p-6 rounded-r-lg mb-6"
                      whileHover={{ x: 3 }}
                    >
                      <p className="text-gray-700 italic">
                        Corporate University bukan lembaga atau institusi pendidikan dan pelatihan yang menempel (embedded), melainkan strategi manajemen agar terjadi pembelajaran individu dan pembelajaran dalam organisasi, serta pengelolaan pengetahuan individu dan pengetahuan strategis organisasi.
                      </p>
                    </motion.div>
                  </motion.div>

                  {/* Features Grid */}
                  <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {features.map((feature, index) => (
                      <motion.div 
                        key={index}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex items-center mb-4">
                          <motion.div 
                            className="bg-[#f8cb8b]/20 p-3 rounded-full mr-4"
                            whileHover={{ scale: 1.1 }}
                          >
                            {feature.icon}
                          </motion.div>
                          <h3 className="text-lg font-semibold text-[#1c2c66]">{feature.title}</h3>
                        </div>
                        <p className="text-gray-600">{feature.description}</p>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Ecosystem Section */}
                  <motion.div 
                    variants={itemVariants}
                    className="bg-[#f8cb8b]/20 border-l-4 border-[#1c2c66] p-6 rounded-r-lg mb-8"
                    whileHover={{ x: 3 }}
                  >
                    <h3 className="text-xl font-semibold text-[#1c2c66] mb-3">Ekosistem Organisasi Pembelajar</h3>
                    <p className="text-gray-700 mb-4">
                      Pembentukan ekosistem organisasi pembelajar memberikan kesempatan bagi seluruh komponen untuk belajar setiap saat dan mengembangkan diri untuk memenuhi standarisasi potensi atau talenta.
                    </p>
                    <motion.div 
                      className="flex items-center text-[#1c2c66]"
                      whileHover={{ x: 5 }}
                    >
                      <FiArrowRight className="mr-2" />
                      <span className="font-medium">Transformasi menuju learning organization</span>
                    </motion.div>
                  </motion.div>

                  {/* Paradigm Changes */}
                  <motion.div variants={itemVariants} className="mb-12">
                    <h2 className="text-2xl font-bold text-[#1c2c66] mb-6">Paradigma Baru CorpU</h2>
                    <p className="text-gray-700 mb-6">
                      Paradigma CorpU berdampak pada 3(tiga) perubahan yang menonjol:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {changes.map((change, index) => (
                        <motion.div 
                          key={index}
                          whileHover={{ y: -5, scale: 1.02 }}
                          className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-all duration-300"
                        >
                          <motion.div 
                            className="bg-[#1c2c66] text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold mx-auto mb-4"
                            whileHover={{ scale: 1.1 }}
                          >
                            {index + 1}
                          </motion.div>
                          <h3 className="text-lg font-semibold text-[#1c2c66] mb-2">{change.title}</h3>
                          <p className="text-gray-600 text-sm">{change.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Comparison Section */}
                  <motion.div 
                    variants={itemVariants}
                    className="bg-[#f8cb8b]/20 border-l-4 border-[#1c2c66] p-6 rounded-r-lg mb-8"
                    whileHover={{ x: 3 }}
                  >
                    <h3 className="text-xl font-semibold text-[#1c2c66] mb-3">Perbedaan Pendekatan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-[#1c2c66] mb-2">Lembaga Pendidikan Tradisional</h4>
                        <ul className="text-gray-600 space-y-1 text-sm">
                          {[
                            "Fokus pada pemenuhan kesenjangan kompetensi individu",
                            "Pendekatan top-down",
                            "Posisi sebagai pelaksana kegiatan"
                          ].map((item, index) => (
                            <motion.li 
                              key={index}
                              className="flex items-start"
                              whileHover={{ x: 3 }}
                            >
                              <span className="bg-[#1c2c66] text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold mr-2 mt-1">-</span>
                              <span>{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1c2c66] mb-2">Corporate University</h4>
                        <ul className="text-gray-600 space-y-1 text-sm">
                          {[
                            "Fokus pada pencapaian strategis organisasi",
                            "Berdasarkan analisis kebutuhan strategis",
                            "Semua pihak terlibat dalam perumusan program"
                          ].map((item, index) => (
                            <motion.li 
                              key={index}
                              className="flex items-start"
                              whileHover={{ x: 3 }}
                            >
                              <span className="bg-[#1c2c66] text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold mr-2 mt-1">+</span>
                              <span>{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>

                  {/* Process Steps */}
                  <motion.div variants={itemVariants} className="mb-8">
                    <h2 className="text-2xl font-bold text-[#1c2c66] mb-6">Proses Pengembangan CorpU</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {processSteps.map((step, index) => (
                        <motion.div 
                          key={index}
                          whileHover={{ y: -3, scale: 1.02 }}
                          className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-all duration-300"
                        >
                          <motion.div 
                            className="bg-[#f8cb8b]/20 text-[#1c2c66] rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mx-auto mb-3"
                            whileHover={{ scale: 1.1 }}
                          >
                            {step.step}
                          </motion.div>
                          <h3 className="text-sm font-semibold text-[#1c2c66] mb-2">{step.title}</h3>
                          <p className="text-gray-600 text-xs">{step.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Responsibility Section */}
                  <motion.div 
                    variants={itemVariants}
                    className="bg-[#f8cb8b]/20 border-l-4 border-[#1c2c66] p-6 rounded-r-lg"
                    whileHover={{ x: 3 }}
                  >
                    <h3 className="text-xl font-semibold text-[#1c2c66] mb-3">Tanggung Jawab CorpU</h3>
                    <p className="text-gray-700 mb-4">
                      Corporate University bertanggungjawab untuk dapat memastikan semua pegawai belajar dan mempelajari hal-hal secara benar, dengan cara penyampaian pembelajaran yang benar.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      {[
                        { icon: <FiGlobe />, text: "Memperoleh Sumber Pengetahuan" },
                        { icon: <FiBook />, text: "Mendokumentasikan Pengetahuan" },
                        { icon: <FiShield />, text: "Mendistribusikan & Menerapkan" }
                      ].map((item, index) => (
                        <motion.div 
                          key={index}
                          whileHover={{ y: -2 }}
                          className="bg-white p-3 rounded-lg border border-gray-200"
                        >
                          <div className="flex items-center mb-2">
                            {item.icon}
                            <span className="font-semibold text-[#1c2c66] ml-2">{item.text}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
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

export default CorporateUniversityPage;