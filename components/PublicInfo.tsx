'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { FiCalendar, FiArrowRight, FiFilter } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface Info {
  id: string;
  judul: string;
  isi: string;
  tanggal?: string; // ISO string
  gambar?: string;
  kategori?: string;
}

export default function PublicInfo() {
  const [infoList, setInfoList] = useState<Info[]>([]);
  const [selectedKategori, setSelectedKategori] = useState<string>(''); // 👉 kategori filter

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'informasi'),
      (snap) => {
        const data = snap.docs.map((d) => {
          const dd = d.data() as any;
          let tanggalIso: string | undefined;

          if (dd.tanggal?.toDate) {
            tanggalIso = dd.tanggal.toDate().toISOString();
          } else if (typeof dd.tanggal === 'string') {
            tanggalIso = dd.tanggal;
          }

          // Normalisasi gambar
          const gambarUrl =
            dd?.gambar?.secure_url ?? dd?.gambar?.url ?? dd?.gambar ?? '';

          return {
            id: d.id,
            judul: dd.judul ?? '',
            isi: dd.isi ?? '',
            gambar: gambarUrl,
            kategori: dd.kategori ?? '',
            tanggal: tanggalIso,
          } as Info;
        });

        data.sort((a, b) => {
          if (!a.tanggal) return 1;
          if (!b.tanggal) return -1;
          return new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime();
        });

        setInfoList(data);
      },
      (err) => {
        console.error('PublicInfo onSnapshot error:', err);
      }
    );

    return () => unsub();
  }, []);

  // 👉 filter berdasarkan kategori
  const filteredList =
    selectedKategori === ''
      ? infoList
      : infoList.filter((item) => item.kategori === selectedKategori);

  const kategoriList = ['Umum', 'Pengumuman', 'Penting', 'Kegiatan']; // kategori yang tersedia

  return (
    <section id="informasi" className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <motion.div
        className="absolute top-5 left-5 text-[#f8cb8b] opacity-10 text-5xl"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        📢
      </motion.div>
      
      <motion.div
        className="absolute bottom-5 right-5 text-[#1c2c66] opacity-10 text-5xl"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      >
        ℹ️
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-[#1c2c66] mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Informasi
          </motion.h2>
          
          <motion.div
            className="w-24 h-1 bg-[#f8cb8b] mx-auto mb-6 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
          
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Temukan berbagai informasi penting dan pengumuman resmi.
          </motion.p>
        </motion.div>

        {/* 👉 tombol filter kategori dengan animasi */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          <motion.button
            onClick={() => setSelectedKategori('')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-5 py-2.5 rounded-full border-2 font-medium transition-all duration-300 flex items-center gap-2 ${
              selectedKategori === ''
                ? 'bg-[#1c2c66] text-white border-[#1c2c66] shadow-lg'
                : 'bg-white text-gray-600 border-gray-300 hover:border-[#1c2c66]'
            }`}
          >
            <FiFilter size={16} />
            Semua
          </motion.button>
          
          {kategoriList.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setSelectedKategori(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2.5 rounded-full border-2 font-medium transition-all duration-300 ${
                selectedKategori === cat
                  ? 'bg-[#1c2c66] text-white border-[#1c2c66] shadow-lg'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-[#1c2c66]'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {filteredList.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4 opacity-20">📭</div>
            <p className="text-gray-500 text-lg">Belum ada informasi.</p>
          </motion.div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredList.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
              >
                <motion.div
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 h-full"
                  whileHover={{ scale: 1.02 }}
                >
                  {item.gambar ? (
                    <div className="relative h-48 w-full overflow-hidden">
                      <motion.img
                        src={item.gambar}
                        alt={item.judul}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
                    </div>
                  ) : null}
                  
                  <div className="p-6 flex flex-col flex-grow">
                    {item.kategori && (
                      <motion.span 
                        className="inline-block px-3 py-1 bg-[#f8cb8b]/20 text-[#1c2c66] text-sm rounded-full mb-3 font-medium w-fit"
                        whileHover={{ scale: 1.05 }}
                      >
                        {item.kategori}
                      </motion.span>
                    )}
                    
                    <motion.h3 
                      className="text-xl font-semibold text-[#1c2c66] mb-3 leading-tight group-hover:text-[#f8cb8b] transition-colors"
                      whileHover={{ x: 3 }}
                    >
                      {item.judul}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed flex-1"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: idx * 0.1 + 0.3 }}
                    >
                      {item.isi}
                    </motion.p>
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                      <div className="flex items-center text-sm text-gray-500">
                        <FiCalendar className="mr-2 text-[#f8cb8b]" />
                        {item.tanggal
                          ? new Date(item.tanggal).toLocaleString('id-ID')
                          : '-'}
                      </div>
                      
                      <motion.div whileHover={{ x: 3 }}>
                        <Link
                          href={`/informasi/${item.id}`}
                          className="text-[#1c2c66] hover:text-[#1c2c66]/80 flex items-center text-sm font-medium group/link"
                        >
                          Selengkapnya 
                          <motion.span
                            initial={{ x: -5, opacity: 0 }}
                            whileHover={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <FiArrowRight className="ml-2" />
                          </motion.span>
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Additional Background Elements */}
        <motion.div
          className="absolute -bottom-10 -left-10 w-20 h-20 bg-[#f8cb8b] opacity-5 rounded-full"
          animate={{ 
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>
    </section>
  );
}