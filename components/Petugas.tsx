"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiUsers,
  FiClipboard,
  FiUserCheck,
  FiAlertCircle,
  FiLifeBuoy,
} from "react-icons/fi";

interface StatistikData {
  litmas: number;
  bimbingan: number;
  petugas: number;
  pengaduan: number;
  pendampingan: number;
}

const StatistikCard = ({ title, value, icon, delay = 0 }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="h-full"
  >
    <div
      className="group h-full cursor-default rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 will-change-transform overflow-hidden
                 hover:shadow-lg hover:border-[#f8cb8b]"
    >
      <div className="flex items-start gap-4">
        <div className="p-4 rounded-xl bg-gradient-to-br from-[#f8cb8b]/20 to-[#f8cb8b]/10">
          <div className="text-3xl text-[#1c2c66]">{icon}</div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-1 line-clamp-1">
            {title}
          </h3>
          <motion.p
            key={value}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="font-bold text-[#1c2c66]"
            style={{ fontSize: "clamp(22px, 2.5vw, 36px)" }}
          >
            {value?.toLocaleString?.("id-ID") ?? value}
          </motion.p>
        </div>
      </div>
    </div>
  </motion.div>
);

export default function StatistikSection() {
  const [data, setData] = useState<StatistikData>({
    litmas: 0,
    bimbingan: 0,
    petugas: 0,
    pengaduan: 0,
    pendampingan: 0,
  });

  const fetchData = async () => {
    try {
      const res = await fetch("/api/statistik");
      const d = await res.json();
      setData({
        litmas: d.litmas ?? 0,
        bimbingan: d.bimbingan ?? 0,
        petugas: d.petugas ?? 0,
        pengaduan: d.pengaduan ?? 0,
        pendampingan: d.pendampingan ?? 0,
      });
    } catch (err) {
      console.error("Gagal ambil data:", err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    { title: "Jumlah Litmas", value: data.litmas, icon: <FiClipboard /> },
    {
      title: "Jumlah Bimbingan Klien",
      value: data.bimbingan,
      icon: <FiUsers />,
    },
    {
      title: "Jumlah Petugas Survey",
      value: data.petugas,
      icon: <FiUserCheck />,
    },
    {
      title: "Jumlah Pengaduan",
      value: data.pengaduan,
      icon: <FiAlertCircle />,
    },
    {
      title: "Jumlah Pendampingan",
      value: data.pendampingan,
      icon: <FiLifeBuoy />,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white py-16">
      {/* BG emoji: disembunyikan di mobile agar tidak tumpang tindih */}
      <motion.div
        className="pointer-events-none absolute left-8 top-8 hidden text-6xl opacity-10 md:block text-[#f8cb8b]"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        📊
      </motion.div>
      <motion.div
        className="pointer-events-none absolute bottom-8 right-8 hidden text-6xl opacity-10 md:block text-[#1c2c66]"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      >
        📈
      </motion.div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <h2 className="mb-3 text-3xl font-bold text-[#1c2c66] md:text-4xl">
            Statistik Sibarata
          </h2>
          <div className="mx-auto mb-4 h-1 w-24 rounded-full bg-[#f8cb8b]" />
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600">
            Data terkini mengenai layanan dan aktivitas Bapas Surakarta.
          </p>
        </motion.div>

        {/* Grid auto-fit + cell stretch */}
        <div
          className="
            grid items-stretch
            [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]
            gap-6 md:gap-8
          "
        >
          {cards.map((item, idx) => (
            <StatistikCard key={item.title} {...item} delay={idx * 0.07} />
          ))}
        </div>
      </div>

      {/* BG dekorasi aman */}
      <motion.div
        className="absolute -left-16 -bottom-16 h-40 w-40 rounded-full bg-[#f8cb8b] opacity-5"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#1c2c66] opacity-5"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
    </section>
  );
}
