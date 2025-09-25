// components/SidebarAdmin.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiHome, 
  FiFileText, 
  FiSettings, 
  FiInfo, 
  FiBook, 
  FiUsers
} from 'react-icons/fi';
import { LuFolderOpen } from "react-icons/lu";

const SidebarAdmin = () => {
  const pathname = usePathname();

  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: <FiHome className="w-5 h-5" /> },
    { href: '/admin/layanan', label: 'Layanan', icon: <FiSettings className="w-5 h-5" /> },
    { href: '/admin/informasi', label: 'Informasi Publik', icon: <FiInfo className="w-5 h-5" /> },
    { href: '/admin/produk-hukum', label: 'Produk Hukum', icon: <FiBook className="w-5 h-5" /> },
    { href: '/admin/petugas', label: 'Petugas', icon: <FiUsers className="w-5 h-5" /> },
    { href: '/admin/galeri', label: 'Galeri', icon: <LuFolderOpen className="w-5 h-5" /> },
  ];

  return (
    <div className="bg-gray-800 text-white w-64 space-y-2 py-6 px-3 absolute inset-y-0 left-0 transform -translate-x-full md:translate-x-0 transition duration-200 ease-in-out md:relative">
      {/* Header */}
      <div className="px-4 py-3 mb-4 border-b border-gray-700">
        <h1 className="text-lg font-semibold text-white">Admin Panel</h1>
        <p className="text-sm text-gray-400 mt-1">Sistem Informasi Bapas</p>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-3 py-3 px-4 rounded-lg transition duration-200 ${
              pathname === item.href
                ? 'bg-gray-700 text-white shadow-sm'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <div className={`${pathname === item.href ? 'text-blue-400' : 'text-gray-400'}`}>
              {item.icon}
            </div>
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 px-4">
        <div className="text-xs text-gray-400 text-center">
          <p>v1.0.0</p>
          <p className="mt-1">© 2025 Bapas Surakarta</p>
        </div>
      </div>
    </div>
  );
};

export default SidebarAdmin;