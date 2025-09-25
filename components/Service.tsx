'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiSettings } from 'react-icons/fi';
import * as Icons from 'react-icons/fi';

interface Layanan {
  id: string;
  nama: string;
  deskripsi: string;
  icon: string;
  link: string;
}

const Services = () => {
  const [layanan, setLayanan] = useState<Layanan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLayanan = async () => {
      try {
        const response = await fetch('/api/layanan');
        const data = await response.json();
        
        if (data.success) {
          setLayanan(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch layanan:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLayanan();
  }, []);

  const getIconComponent = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent className="w-6 h-6" /> : <FiSettings className="w-6 h-6" />;
  };

  if (loading) {
    return (
      <section id="layanan" className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Background Elements */}
        <motion.div
          className="absolute top-10 right-10 text-[#f8cb8b] opacity-10 text-6xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          ⚙️
        </motion.div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="h-8 bg-gray-300 rounded w-48 mx-auto mb-4 animate-pulse"></div>
            <div className="w-24 h-1 bg-gray-300 mx-auto mb-6 rounded-full animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-64 mx-auto animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 animate-pulse">
                <div className="w-16 h-16 bg-gray-300 rounded-2xl mx-auto mb-6 flex items-center justify-center"></div>
                <div className="h-6 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-3"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
                <div className="h-8 bg-gray-300 rounded mt-6 w-32 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="layanan" className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <motion.div
        className="absolute top-10 right-10 text-[#f8cb8b] opacity-10 text-6xl"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        ⚙️
      </motion.div>
      
      <motion.div
        className="absolute bottom-10 left-10 text-[#1c2c66] opacity-10 text-6xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        🔧
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
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
            Layanan
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
            Akses berbagai layanan publik yang tersedia untuk masyarakat dengan mudah dan cepat.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {layanan.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group cursor-pointer"
            >
              <motion.div
                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 text-center h-full flex flex-col"
                whileHover={{ 
                  borderColor: "#f8cb8b",
                  boxShadow: "0 20px 40px rgba(248, 203, 139, 0.1)"
                }}
              >
                {/* Icon Container */}
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-[#f8cb8b]/20 to-[#f8cb8b]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-[#f8cb8b]/30 group-hover:to-[#f8cb8b]/20 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="text-[#1c2c66]"
                    whileHover={{ scale: 1.2 }}
                  >
                    {getIconComponent(item.icon)}
                  </motion.div>
                </motion.div>
                
                {/* Title */}
                <motion.h3 
                  className="text-lg font-semibold text-[#1c2c66] mb-4 leading-tight group-hover:text-[#f8cb8b] transition-colors"
                  whileHover={{ x: 3 }}
                >
                  {item.nama}
                </motion.h3>
                
                {/* Description */}
                <motion.p 
                  className="text-gray-600 text-sm leading-relaxed mb-6 flex-1"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {item.deskripsi}
                </motion.p>
                
                {/* CTA Button */}
                <motion.a
                  href={item.link}
                  className="text-[#1c2c66] hover:text-[#1c2c66]/80 font-medium text-sm flex items-center justify-center transition-colors group-hover:underline mt-auto"
                  whileHover={{ x: 5 }}
                >
                  <span className="flex items-center gap-2">
                    Akses Layanan
                    <motion.span
                      initial={{ x: -5, opacity: 0 }}
                      whileHover={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiArrowRight className="text-lg" />
                    </motion.span>
                  </span>
                </motion.a>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Additional Background Elements */}
        <motion.div
          className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#f8cb8b] opacity-5 rounded-full"
          animate={{ 
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>
    </section>
  );
};

export default Services;