'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiCalendar, FiArrowRight, FiEye, FiClock } from 'react-icons/fi';

const News = () => {
  // 🔥 Prototype data berita - FUNGSI TETAP SAMA
  const newsData = [
    {
      id: 1,
      title: "Kegiatan Sosialisasi Pemasyarakatan",
      date: "20 September 2025",
      excerpt:
        "Balai Pemasyarakatan Surakarta mengadakan sosialisasi pemasyarakatan kepada masyarakat...",
      image: "/sosialisasi.jpg",
    },
    {
      id: 2,
      title: "Peringatan Hari Kemerdekaan",
      date: "17 Agustus 2025",
      excerpt:
        "Upacara bendera dalam rangka memperingati HUT RI ke-80 berlangsung khidmat di halaman kantor...",
      image: "/kemerdekaan.jpg",
    },
    {
      id: 3,
      title: "Kunjungan Direktur Jenderal",
      date: "5 September 2025",
      excerpt:
        "Direktur Jenderal Pemasyarakatan berkunjung untuk melihat langsung pelayanan di Bapas Surakarta...",
      image: "/kunjungan.jpg",
    },
  ];

  return (
    <section id="berita" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#1c2c66] mb-4">
            Berita Terbaru
          </h2>
          
          <motion.div
            className="w-24 h-1 bg-[#f8cb8b] mx-auto mb-6 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
          
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Dapatkan informasi terkini seputar kegiatan dan perkembangan terbaru di lingkungan Barata.
          </p>
        </motion.div>

        {/* 🔥 Grid Berita - CARD YANG LEBIH RAPI */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {newsData.map((news, index) => (
            <motion.article
              key={news.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link href={'https://faktra.sibarata.com'}>
                <motion.div
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 h-full flex flex-col"
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Image Container */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                    
                    {/* Date Badge */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <div className="flex items-center gap-2 text-xs font-medium text-gray-700">
                        <FiCalendar className="text-[#f8cb8b]" size={12} />
                        {news.date}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-[#1c2c66] mb-3 line-clamp-2 leading-tight group-hover:text-[#f8cb8b] transition-colors">
                      {news.title}
                    </h3>
                    
                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                      {news.excerpt}
                    </p>

                    {/* Read More Link */}
                    <motion.div
                      className="flex items-center text-[#1c2c66] font-medium text-sm mt-auto pt-4 border-t border-gray-100"
                      whileHover={{ x: 5 }}
                    >
                      <span className="flex items-center gap-2">
                        Baca Selengkapnya
                        <FiArrowRight size={16} />
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* 🔘 Tombol Selengkapnya */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="https://faktra.sibarata.com">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 20px rgba(248, 203, 139, 0.25)",
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-3 bg-[#f8cb8b] text-[#1c2c66] font-semibold rounded-full border border-[#f8cb8b] hover:bg-[#f8cb8b]/90 transition-all duration-300"
            >
              Lihat Semua Berita
              <FiArrowRight className="ml-2" size={18} />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default News;