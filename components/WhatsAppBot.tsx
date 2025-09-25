// components/WhatsAppBot.tsx
'use client';

import { useEffect, useState } from 'react';
import { FiMessageCircle, FiX } from 'react-icons/fi';

const WhatsAppBot = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAdminPage, setIsAdminPage] = useState(false);

  useEffect(() => {
    // Cek jika sedang di halaman admin
    const checkAdminPage = () => {
      const path = window.location.pathname;
      setIsAdminPage(path.startsWith('/admin'));
    };

    checkAdminPage();
  }, []);

  const phoneNumber = '628123456789'; // Ganti dengan nomor WhatsApp yang sesuai
  const message = 'Halo, saya ingin bertanya tentang layanan Bapas Surakarta.';

  const openWhatsApp = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const toggleChat = () => {
    setIsVisible(!isVisible);
  };

  // Jangan render komponen jika di halaman admin
  if (isAdminPage) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Bubble */}
      {isVisible && (
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4 w-80 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800">Chat WhatsApp</h3>
            <button
              onClick={toggleChat}
              className="text-gray-400 hover:text-gray-600"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-gray-600 text-sm mb-4">
            Hubungi kami melalui WhatsApp untuk informasi lebih lanjut.
          </p>
          
          <button
            onClick={openWhatsApp}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            <FiMessageCircle className="w-5 h-5 mr-2" />
            Buka WhatsApp
          </button>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
      >
        {isVisible ? (
          <FiX className="w-6 h-6" />
        ) : (
          <FiMessageCircle className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};

export default WhatsAppBot;