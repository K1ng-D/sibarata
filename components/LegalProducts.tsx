'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiFileText, FiDownload, FiCalendar } from 'react-icons/fi';

interface ProdukHukum {
  id: string;
  judul: string;
  nomor: string;
  tahun: number;
  file: string;
  tanggal: string;
}

const LegalProducts = () => {
  const [produkHukum, setProdukHukum] = useState<ProdukHukum[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState('semua');

  useEffect(() => {
    const fetchProdukHukum = async () => {
      try {
        const url = selectedYear === 'semua' 
          ? '/api/produk-hukum?limit=6' 
          : `/api/produk-hukum?tahun=${selectedYear}&limit=6`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.success) {
          setProdukHukum(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch produk hukum:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProdukHukum();
  }, [selectedYear]);

  // Generate tahun options (5 tahun terakhir + semua)
  const currentYear = new Date().getFullYear();
  const years = [
    { value: 'semua', label: 'Semua Tahun' },
    ...Array.from({ length: 5 }, (_, i) => ({
      value: (currentYear - i).toString(),
      label: (currentYear - i).toString(),
    })),
  ];

  if (loading) {
    return (
      <section id="produk-hukum" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1c2c66] mb-4">Produk Hukum</h2>
            <div className="w-24 h-1 bg-[#f8cb8b] mx-auto mb-6 rounded-full"></div>
            <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {years.map((year) => (
              <div key={year.value} className="px-4 py-2 bg-gray-300 rounded-lg animate-pulse w-24 h-10"></div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-sm p-6 animate-pulse border border-gray-200">
                <div className="h-6 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="produk-hukum" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-[#1c2c66] mb-4">Produk Hukum</h2>
          <div className="w-24 h-1 bg-[#f8cb8b] mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Akses berbagai peraturan dan produk hukum yang berlaku di lingkungan Bapas Surakarta.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {years.map((year) => (
            <button
              key={year.value}
              onClick={() => setSelectedYear(year.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedYear === year.value
                  ? 'bg-[#1c2c66] text-white'
                  : 'bg-white text-gray-700 hover:bg-[#f8cb8b]/20 border border-gray-300'
              }`}
            >
              {year.label}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {produkHukum.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all duration-300 border border-gray-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-[#f8cb8b]/20 rounded-lg flex items-center justify-center">
                  <FiFileText className="w-6 h-6 text-[#1c2c66]" />
                </div>
                {item.file && (
                  <a
                    href={item.file}
                    download
                    className="p-2 bg-[#f8cb8b]/20 text-[#1c2c66] rounded-lg hover:bg-[#f8cb8b]/30 transition-colors"
                  >
                    <FiDownload className="w-5 h-5" />
                  </a>
                )}
              </div>

              <h3 className="text-xl font-semibold text-[#1c2c66] mb-2">
                {item.judul}
              </h3>
              
              <div className="space-y-2 mb-4">
                <p className="text-gray-600">
                  <span className="font-medium">Nomor:</span> {item.nomor}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Tahun:</span> {item.tahun}
                </p>
              </div>

              <div className="flex items-center text-sm text-gray-500">
                <FiCalendar className="mr-2" />
                {new Date(item.tanggal).toLocaleDateString('id-ID')}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-12"
        >
          <button className="bg-[#1c2c66] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#1c2c66]/90 transition-colors">
            Lihat Semua Produk Hukum
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default LegalProducts;