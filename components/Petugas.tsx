"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiUsers, FiClipboard, FiUserCheck, FiArrowRight, FiTrendingUp } from "react-icons/fi";
import Link from "next/link";

interface StatistikData {
  litmas: number;
  bimbingan: number;
  petugas: number;
}

const StatistikCard = ({ title, value, icon, delay = 0 }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ y: -5, scale: 1.02 }}
    className="group cursor-pointer"
  >
    <motion.div
      className="bg-white shadow-lg rounded-2xl p-8 flex items-center gap-6 border border-gray-100 hover:shadow-xl transition-all duration-300 h-full"
      whileHover={{ 
        borderColor: "#f8cb8b",
        boxShadow: "0 20px 40px rgba(248, 203, 139, 0.15)"
      }}
    >
      <motion.div
        className="p-5 rounded-2xl bg-gradient-to-br from-[#f8cb8b]/20 to-[#f8cb8b]/10 flex items-center justify-center group-hover:from-[#f8cb8b]/30 group-hover:to-[#f8cb8b]/20 transition-all duration-300"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.div
          className="text-4xl text-[#1c2c66]"
          whileHover={{ scale: 1.2 }}
        >
          {icon}
        </motion.div>
      </motion.div>
      <div className="flex-1">
        <h3 className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">{title}</h3>
        <motion.p 
          className="text-4xl font-bold text-[#1c2c66]"
          key={value}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {value}
        </motion.p>
      </div>
    </motion.div>
  </motion.div>
);

export default function StatistikSection() {
  const [data, setData] = useState<StatistikData>({
    litmas: 0,
    bimbingan: 0,
    petugas: 0,
  });

  const fetchData = async () => {
    try {
      const res = await fetch("/api/statistik");
      const d = await res.json();
      setData(d);
    } catch (err) {
      console.error("Gagal ambil data:", err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // refresh tiap 5 detik
    return () => clearInterval(interval);
  }, []);

  const cards = [
    { title: "Jumlah Litmas", value: data.litmas, icon: <FiClipboard /> },
    { title: "Jumlah Bimbingan Klien", value: data.bimbingan, icon: <FiUsers /> },
    { title: "Jumlah Petugas Survey", value: data.petugas, icon: <FiUserCheck /> },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <motion.div
        className="absolute top-10 left-10 text-[#f8cb8b] opacity-10 text-6xl"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        📊
      </motion.div>
      
      <motion.div
        className="absolute bottom-10 right-10 text-[#1c2c66] opacity-10 text-6xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      >
        📈
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Judul */}
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
            Statistik Sibarata
          </motion.h2>
          
          <motion.div
            className="w-28 h-1 bg-[#f8cb8b] mx-auto mb-6 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 112 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
          
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Data terkini mengenai layanan dan aktivitas Bapas Surakarta.
          </motion.p>
        </motion.div>

        {/* Kartu Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {cards.map((item, idx) => (
            <StatistikCard key={idx} {...item} delay={idx * 0.1} />
          ))}
        </div>
      </div>

      {/* Additional Background Elements */}
      <motion.div
        className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#f8cb8b] opacity-5 rounded-full"
        animate={{ 
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      
      <motion.div
        className="absolute -top-20 -right-20 w-40 h-40 bg-[#1c2c66] opacity-5 rounded-full"
        animate={{ 
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
      />
    </section>
  );
}