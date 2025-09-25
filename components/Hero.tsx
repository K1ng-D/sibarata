"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiChevronLeft, FiChevronRight, FiStar, FiUsers, FiShield } from "react-icons/fi";
import Image from "next/image";
import Logo from "@/public/logo.png";

// 🔥 Import gambar background
import bg1 from "@/public/bannerr-bapas-solo.png";
import bg2 from "@/public/mmt-mpp-bapas-340x130cm-111.png";

const Hero = () => {
  const slides = [bg1, bg2];
  const [current, setCurrent] = useState(0);

  // Auto slide setiap 4 detik - FUNGSI TETAP SAMA
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Next & Prev manual - FUNGSI TETAP SAMA
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Images - DIPERBAIKI DENGAN ANIMASI YANG LEBIH SMOOTH */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <Image
              src={slides[current]}
              alt={`slide-${current}`}
              fill
              priority={current === 0}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Decorative Elements */}
      <motion.div
        className="absolute top-20 left-10 text-[#f8cb8b] text-2xl"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <FiStar />
      </motion.div>

      <motion.div
        className="absolute top-40 right-20 text-[#f8cb8b] text-2xl"
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, -15, 0]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      >
        <FiUsers />
      </motion.div>

      <motion.div
        className="absolute bottom-40 left-20 text-[#f8cb8b] text-2xl"
        animate={{ 
          y: [0, -25, 0],
          rotate: [0, 20, 0]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <FiShield />
      </motion.div>

      {/* Content Hero - DIPERBAIKI DENGAN ANIMASI YANG LEBIH KAYA */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Logo dengan animasi */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image 
              src={Logo} 
              alt="Logo" 
              width={150} 
              height={150} 
              className="mx-auto mb-6 drop-shadow-2xl" 
            />
          </motion.div>
          
          {/* Title dengan animasi bertahap */}
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Selamat Datang di{" "}
            <motion.span 
              className="text-[#f8cb8b] relative"
              whileHover={{ scale: 1.05 }}
            >
              SIBARATA
              <motion.div
                className="absolute bottom-0 left-0 w-full h-1 bg-[#f8cb8b]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
            </motion.span>
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Sistem Informasi Bapas Surakarta
          </motion.p>

          {/* Button dengan animasi yang lebih kaya */}
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 15px 30px rgba(248, 203, 139, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = "/tentang"}
            className="bg-[#f8cb8b] text-[#1c2c66] px-8 py-3 rounded-full font-medium shadow-lg hover:bg-[#f8cb8b]/90 transition text-lg flex items-center mx-auto relative overflow-hidden group"
          >
            {/* Ripple effect */}
            <motion.span
              className="absolute inset-0 bg-white/20 rounded-full"
              initial={{ scale: 0 }}
              whileHover={{ scale: 2 }}
              transition={{ duration: 0.6 }}
            />
            
            <span className="relative z-10 flex items-center">
              Tentang Kami
              <motion.div
                initial={{ x: -5, opacity: 0 }}
                whileHover={{ x: 5, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <FiArrowRight className="ml-2 text-xl" />
              </motion.div>
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Navigation Buttons - DIPERBAIKI DENGAN ANIMASI */}
      <motion.button
        onClick={prevSlide}
        whileHover={{ scale: 1.2, backgroundColor: "rgba(248, 203, 139, 0.2)" }}
        whileTap={{ scale: 0.9 }}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-white text-3xl z-30 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm"
      >
        <FiChevronLeft />
      </motion.button>

      <motion.button
        onClick={nextSlide}
        whileHover={{ scale: 1.2, backgroundColor: "rgba(248, 203, 139, 0.2)" }}
        whileTap={{ scale: 0.9 }}
        className="absolute right-5 top-1/2 -translate-y-1/2 text-white text-3xl z-30 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm"
      >
        <FiChevronRight />
      </motion.button>

      {/* Dots - DIPERBAIKI DENGAN ANIMASI */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {slides.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => setCurrent(idx)}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.8 }}
            className="relative"
          >
            <div
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                current === idx ? "bg-[#f8cb8b]" : "bg-white/50"
              }`}
            />
            {/* Active dot indicator */}
            {current === idx && (
              <motion.div
                className="absolute inset-0 border-2 border-[#f8cb8b] rounded-full"
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-[#f8cb8b] rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="w-1 h-3 bg-[#f8cb8b] rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;