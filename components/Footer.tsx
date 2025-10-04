"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Logo from "@/public/logo.png"; // logo sibarata
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiYoutube,
  FiMapPin,
  FiPhone,
  FiMail,
  FiArrowRight,
} from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { title: "Beranda", href: "/" },
    { title: "Berita", href: "https://faktra.sibarata.com" },

    { title: "Produk Hukum", href: "/produk-hukum" },
  ];

  const services = [
    { title: "Maklumat Pelayanan", href: "/layanan/maklumat" },
    { title: "Standar Pelayanan", href: "/layanan/standar" },
    {
      title: "Tralis",
      href: "https://sites.google.com/view/tralisbapassolo/home",
    },
    { title: "Kompensasi Pelayanan", href: "/layanan/kompensasi" },
    { title: "Jangkauan Pelayanan", href: "/layanan/jangkauan" },
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center">
              <Image
                src={Logo}
                alt="Sibarata Logo"
                width={120}
                height={120}
                className="h-12 w-auto"
                priority
              />
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Sistem Informasi Bapas Surakarta - Portal terpadu untuk layanan
              masyarakat dan informasi publik.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="text-gray-400 hover:text-[#1c2c66] transition-colors p-2 hover:bg-[#f8cb8b]/20 rounded-lg"
              >
                <FiFacebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#1c2c66] transition-colors p-2 hover:bg-[#f8cb8b]/20 rounded-lg"
              >
                <FiTwitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#1c2c66] transition-colors p-2 hover:bg-[#f8cb8b]/20 rounded-lg"
              >
                <FiInstagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#1c2c66] transition-colors p-2 hover:bg-[#f8cb8b]/20 rounded-lg"
              >
                <FiYoutube className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold text-[#1c2c66] mb-6 pb-2 border-b border-gray-200">
              Tautan Cepat
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-[#1c2c66] transition-colors text-sm flex items-center group"
                  >
                    <FiArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-[#f8cb8b]" />
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-[#1c2c66] mb-6 pb-2 border-b border-gray-200">
              Layanan
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.title}>
                  <Link
                    href={service.href}
                    className="text-gray-600 hover:text-[#1c2c66] transition-colors text-sm"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold text-[#1c2c66] mb-6 pb-2 border-b border-gray-200">
              Kontak Kami
            </h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <FiMapPin className="w-5 h-5 text-[#1c2c66] mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 text-sm">
                  Jl. RM.Said No.259, Manahan, Kec. Banjarsari, Kota Surakarta,
                  Jawa Tengah 57139
                </span>
              </div>
              <div className="flex items-center">
                <FiPhone className="w-5 h-5 text-[#1c2c66] mr-3 flex-shrink-0" />
                <span className="text-gray-600 text-sm">0858-6799-8553</span>
              </div>
              <div className="flex items-center">
                <FiMail className="w-5 h-5 text-[#1c2c66] mr-3 flex-shrink-0" />
                <span className="text-gray-600 text-sm">
                  bapassolo@gmail.com
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-200 mt-8 pt-8 text-center"
        >
          <p className="text-gray-500 text-sm">
            © {currentYear} Sistem Informasi Bapas Surakarta. All rights
            reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
