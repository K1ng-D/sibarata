'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiShoppingCart, FiArrowRight, FiTag, FiTruck, FiShield } from 'react-icons/fi';

const Ladunimart = () => {
  return (
    <section id="ladunimart" className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
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

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
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
            whileInView={{ width: 96 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
          
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Dapatkan informasi terkini seputar kegiatan dan perkembangan terbaru di lingkungan Barata.
          </motion.p>

          {/* Feature Icons Grid */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {[
              { icon: FiShoppingCart, text: "Belanja Mudah", color: "text-[#f8cb8b]" },
              { icon: FiTruck, text: "Pengiriman Cepat", color: "text-[#1c2c66]" },
              { icon: FiShield, text: "Aman Terpercaya", color: "text-[#f8cb8b]" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center p-4"
                whileHover={{ 
                  scale: 1.1, 
                  y: -5,
                  transition: { type: "spring", stiffness: 400 }
                }}
              >
                <motion.div
                  className={`p-3 rounded-full bg-white shadow-lg mb-2 ${item.color}`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <item.icon className="text-2xl" />
                </motion.div>
                <span className="text-sm font-medium text-gray-700">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* 🔘 Tombol Selengkapnya dengan animasi */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <Link href="https://ladunimart.sibarata.com">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(248, 203, 139, 0.3)",
                  backgroundColor: "#f8cb8b",
                }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-3 bg-[#f8cb8b] text-[#1c2c66] font-semibold rounded-full shadow-lg hover:bg-[#f8cb8b]/90 transition-all duration-300 relative overflow-hidden group"
              >
                {/* Ripple Effect */}
                <motion.span
                  className="absolute inset-0 bg-white/20 rounded-full"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 2 }}
                  transition={{ duration: 0.6 }}
                />
                
                <span className="relative z-10 flex items-center">
                  Selengkapnya
                  <motion.div
                    initial={{ x: -5, opacity: 0 }}
                    whileHover={{ x: 5, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiArrowRight className="ml-2 text-lg" />
                  </motion.div>
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Additional Decorative Elements */}
        <motion.div
          className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#f8cb8b] opacity-5 rounded-full"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 bg-[#1c2c66] opacity-5 rounded-full"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.08, 0.05]
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
      </div>
    </section>
  );
};

export default Ladunimart;