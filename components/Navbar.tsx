"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.png";
import Logo1 from "@/public/logo1.png";
import Logo2 from "@/public/logo2.png";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiInfo,
  FiPhone,
  FiMail,
  FiClock,
  FiMapPin,
} from "react-icons/fi";
import { FaInstagram, FaFacebookF, FaYoutube, FaTwitter } from "react-icons/fa";

interface SubMenu {
  title: string;
  href: string;
  icon?: React.ReactNode;
}

interface MenuItem {
  title: string;
  href?: string;
  submenu?: SubMenu[];
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [timeString, setTimeString] = useState("");
  const [dateString, setDateString] = useState("");
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [wrapperH, setWrapperH] = useState(0);

  // jam & tanggal (Zona Indonesia)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const optionsDate: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const optionsTime: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
      };
      setDateString(now.toLocaleDateString("id-ID", optionsDate));
      setTimeString(now.toLocaleTimeString("id-ID", optionsTime));
    };
    updateTime();
    const t = setInterval(updateTime, 60_000);
    return () => clearInterval(t);
  }, []);

  // ukur tinggi wrapper (contact bar + navbar) biar konten gak ketutup
  useEffect(() => {
    const measure = () => {
      if (wrapperRef.current) setWrapperH(wrapperRef.current.offsetHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const menuItems: MenuItem[] = [
    { title: "Beranda", href: "/" },
    {
      title: "Profile",
      submenu: [
        { title: "Sejarah Pemasyarakatan", href: "/tentang" },
        { title: "Kedudukan, Tugas dan Fungsi", href: "/tentang/tugas-fungsi" },
        { title: "Visi, Misi dan Tata Nilai", href: "/tentang/visi-misi" },
        { title: "Mars Pemasyarakatan", href: "/tentang/mars" },
        {
          title: "Corporate University",
          href: "/tentang/corporate-university",
        },
        { title: "Prestasi", href: "/tentang/prestasi" },
        { title: "Sarana dan Prasarana", href: "/tentang/sarana-prasarana" },
        { title: "Profil Pejabat", href: "/pimpinan/profil" },
        { title: "Sambutan Kapala Satuan Kerja", href: "/pimpinan/sambutan" },
      ],
    },
    { title: "Berita", href: "https://faktra.sibarata.com" },
    {
      title: "Layanan",
      submenu: [
        { title: "Maklumat Pelayanan", href: "/layanan/maklumat" },
        { title: "Standar Pelayanan", href: "/layanan/standar" },
        {
          title: "Tralis",
          href: "https://sites.google.com/view/tralisbapassolo/home",
        },
        { title: "Kompensasi Pelayanan", href: "/layanan/kompensasi" },
        { title: "Jangkauan Layanan", href: "/layanan/jangkauan" },
      ],
    },
    { title: "Produk Hukum", href: "/produk-hukum" },
  ];

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  return (
    <>
      {/* ===== FIXED WRAPPER: contact bar + navbar (nempel) ===== */}
      <div ref={wrapperRef} className="fixed top-0 left-0 right-0 z-50">
        {/* Contact bar */}
        <div className="bg-[#1c2c66] text-white text-sm py-2 border-b border-[#f8cb8b]/30">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
            {/* Kontak kiri */}
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-xs md:text-sm">
              <span className="flex items-center gap-1">
                <FiMapPin className="text-[#f8cb8b]" />
                Jl. RM.Said No.259, Manahan, Kota Surakarta
              </span>
              <span className="flex items-center gap-1">
                <FiPhone className="text-[#f8cb8b]" />
                0858-6799-8553
              </span>
              <span className="flex items-center gap-1">
                <FiMail className="text-[#f8cb8b]" />
                bapassolo@gmail.com
              </span>
            </div>

            {/* Tanggal & Sosmed kanan */}
            <div className="flex items-center gap-4 text-xs md:text-sm mt-1 md:mt-0">
              <span className="flex items-center gap-1">
                <FiClock className="text-[#f8cb8b]" />
                {dateString}, {timeString}
              </span>
              <div className="flex items-center gap-2 text-[#f8cb8b] text-lg">
                {/* ganti ke akunmu */}
                <Link
                  href="https://www.instagram.com/kemenimipas/"
                  target="_blank"
                  className="hover:text-white transition"
                >
                  <FaInstagram />
                </Link>
                <Link
                  href="https://www.facebook.com/kemenimipas/"
                  target="_blank"
                  className="hover:text-white transition"
                >
                  <FaFacebookF />
                </Link>
                <Link
                  href="https://www.youtube.com/@kemenimipas"
                  target="_blank"
                  className="hover:text-white transition"
                >
                  <FaYoutube />
                </Link>
                <Link
                  href="https://x.com/kemenimipas_ri"
                  target="_blank"
                  className="hover:text-white transition"
                >
                  <FaTwitter />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Navbar (TANPA top offset) */}
        <nav className="bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="flex-shrink-0 flex items-center">
                  <div className="p-1 gap-2 rounded-lg flex">
                    <Image
                      src={Logo}
                      alt="Sibarata Logo"
                      width={1200}
                      height={1200}
                      className="h-10 w-auto"
                      priority
                    />
                    <Image
                      src={Logo1}
                      alt="Sibarata Logo"
                      width={1200}
                      height={1200}
                      className="h-10 w-auto"
                      priority
                    />
                    <Image
                      src={Logo2}
                      alt="Sibarata Logo"
                      width={1200}
                      height={1200}
                      className="h-10 w-auto"
                      priority
                    />
                  </div>
                </Link>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-0">
                {menuItems.map((item) => (
                  <div key={item.title} className="relative group">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="px-3 py-2 text-gray-700 hover:text-[#1c2c66] transition-colors flex items-center font-medium text-sm rounded-md mx-1 hover:bg-[#f8cb8b]/20"
                      >
                        {item.title}
                      </Link>
                    ) : (
                      <button
                        onClick={() => toggleSubmenu(item.title)}
                        className="px-3 py-2 text-gray-700 hover:text-[#1c2c66] transition-colors flex items-center font-medium text-sm rounded-md mx-1 hover:bg-[#f8cb8b]/20"
                      >
                        {item.title}
                        <motion.div
                          animate={{
                            rotate: openSubmenu === item.title ? 180 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <FiChevronDown className="ml-1 text-xs" />
                        </motion.div>
                      </button>
                    )}

                    {item.submenu && openSubmenu === item.title && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-1 w-60 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100 overflow-hidden"
                      >
                        {item.submenu.map((subItem) => (
                          <div
                            key={subItem.title}
                            className="border-b border-gray-100 last:border-b-0"
                          >
                            <Link
                              href={subItem.href}
                              className="flex items-center px-4 py-2 text-gray-700 hover:bg-[#f8cb8b]/30 hover:text-[#1c2c66] transition-all duration-200 text-sm"
                              onClick={() => setOpenSubmenu(null)}
                            >
                              {subItem.icon || (
                                <FiInfo className="mr-2 text-[#1c2c66] text-xs" />
                              )}
                              <span>{subItem.title}</span>
                            </Link>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>

              {/* Tombol mobile */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-[#1c2c66] p-2 rounded-lg hover:bg-[#f8cb8b]/30 focus:outline-none transition-colors"
                >
                  {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden bg-white shadow-xl border-t border-gray-100"
              >
                <div className="px-3 py-3 space-y-1">
                  {menuItems.map((item) => (
                    <div
                      key={item.title}
                      className="border-b border-gray-100 last:border-b-0 pb-1 last:pb-0"
                    >
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="block py-2 px-3 text-gray-700 hover:text-[#1c2c66] hover:bg-[#f8cb8b]/20 rounded-md transition-colors font-medium text-sm"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.title}
                        </Link>
                      ) : (
                        <div>
                          <button
                            onClick={() => toggleSubmenu(item.title)}
                            className="w-full flex justify-between items-center py-2 px-3 text-gray-700 hover:text-[#1c2c66] hover:bg-[#f8cb8b]/20 rounded-md transition-colors font-medium text-sm"
                          >
                            <span>{item.title}</span>
                            <motion.div
                              animate={{
                                rotate: openSubmenu === item.title ? 180 : 0,
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              <FiChevronDown className="text-xs" />
                            </motion.div>
                          </button>

                          {item.submenu && openSubmenu === item.title && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pl-5 space-y-1 border-l-2 border-[#f8cb8b] ml-3 mt-1"
                            >
                              {item.submenu.map((subItem) => (
                                <div key={subItem.title}>
                                  <Link
                                    href={subItem.href}
                                    className="block py-2 px-3 text-gray-600 hover:text-[#1c2c66] hover:bg-[#f8cb8b]/20 rounded-md transition-colors text-xs"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    <div className="flex items-center">
                                      {subItem.icon || (
                                        <FiInfo className="mr-2 text-xs" />
                                      )}
                                      {subItem.title}
                                    </div>
                                  </Link>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>

      {/* Spacer supaya konten tidak tertutup header fixed */}
      <div style={{ height: wrapperH }} aria-hidden />
    </>
  );
};

export default Navbar;
