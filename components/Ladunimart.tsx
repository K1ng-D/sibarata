"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  FiShoppingCart,
  FiArrowRight,
  FiTag,
  FiTruck,
  FiShield,
} from "react-icons/fi";

const products = [
  {
    id: "p1",
    name: "BLANGKON BATIK",
    price: "Rp25.000",
    image: "/blangkon.jpg",
    url: "https://ladunimart.sibarata.com",
    badge: "Best Seller",
  },
  {
    id: "p2",
    name: "CARIPOP",
    price: "Rp28.000",
    image: "/caripop.jpg",
    url: "https://ladunimart.sibarata.com",
    badge: "Best Seller",
  },
  {
    id: "p3",
    name: "Tas Canvas Motif Bunga",
    price: "Rp50.000",
    image: "/tas.jpg",
    url: "https://ladunimart.sibarata.com",
    badge: "Best Seller",
  },
];

const Ladunimart = () => {
  return (
    <section
      id="ladunimart"
      className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <motion.div
        className="absolute top-10 left-10 text-[#f8cb8b] opacity-20 text-6xl"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <FiShoppingCart />
      </motion.div>

      <motion.div
        className="absolute bottom-10 right-10 text-[#1c2c66] opacity-10 text-8xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        <FiTag />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Judul & deskripsi */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 z-10 relative"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-[#1c2c66] mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            LADUNIMART
          </motion.h2>

          <motion.div
            className="w-24 h-1 bg-[#f8cb8b] mx-auto mb-6 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.3 }}
          />

          <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg leading-relaxed">
            Dapatkan produk pilihan dan kebutuhan harianmu di Ladunimart.
            Belanja mudah, pengiriman cepat, dan aman terpercaya.
          </p>

          {/* Feature Icons Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-10">
            {[
              {
                icon: FiShoppingCart,
                text: "Belanja Mudah",
                color: "text-[#f8cb8b]",
              },
              {
                icon: FiTruck,
                text: "Pengiriman Cepat",
                color: "text-[#1c2c66]",
              },
              {
                icon: FiShield,
                text: "Aman Terpercaya",
                color: "text-[#f8cb8b]",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center p-4"
                whileHover={{ scale: 1.08, y: -4 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <motion.div
                  className={`p-3 rounded-full bg-white shadow-lg mb-2 ${item.color}`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <item.icon className="text-2xl" />
                </motion.div>
                <span className="text-sm font-medium text-gray-700">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
          >
            {products.map((p) => (
              <Link
                key={p.id}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-52 w-full overflow-hidden">
                  {/* Fallback warna polos kalau gambar belum ada */}
                  <div className="absolute inset-0 bg-gray-100" />
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    onError={(e) => {
                      // kalau gambar gagal, sembunyikan Image sehingga background gray tetap terlihat
                      (e.currentTarget as any).style.display = "none";
                    }}
                  />
                  {p.badge && (
                    <span className="absolute top-3 left-3 bg-[#1c2c66] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                      {p.badge}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold flex text-[#1c2c66] line-clamp-2 group-hover:underline">
                    {p.name}
                  </h3>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[#1c2c66] font-bold">{p.price}</span>
                    <span className="inline-flex items-center gap-1 text-sm text-[#1c2c66]/80 group-hover:gap-2 transition-all">
                      Lihat Produk <FiArrowRight />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>

          {/* Tombol Selengkapnya */}
          <div className="mt-10">
            <Link href="https://ladunimart.sibarata.com" target="_blank">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(248, 203, 139, 0.3)",
                  backgroundColor: "#f8cb8b",
                }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-3 bg-[#f8cb8b] text-[#1c2c66] font-semibold rounded-full shadow-lg hover:bg-[#f8cb8b]/90 transition-all duration-300 relative overflow-hidden group"
              >
                <motion.span
                  className="absolute inset-0 bg-white/20 rounded-full"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 2 }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  Selengkapnya
                  <FiArrowRight className="text-lg" />
                </span>
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* ===== PRODUCT GRID ===== */}

        {/* Decorative bubbles */}
        <motion.div
          className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#f8cb8b] opacity-5 rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 bg-[#1c2c66] opacity-5 rounded-full"
          animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.08, 0.05] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
      </div>
    </section>
  );
};

export default Ladunimart;
