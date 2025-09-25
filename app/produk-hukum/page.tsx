"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiFileText, FiExternalLink, FiSearch, FiCalendar, FiFilter, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface ProdukHukum {
  id: string;
  judul: string;
  tahun: number;
  link: string;
}

const ProdukHukumPage = () => {
  const [produkHukum, setProdukHukum] = useState<ProdukHukum[]>([]);
  const [filteredProdukHukum, setFilteredProdukHukum] = useState<ProdukHukum[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9); // Default 9 items per page

  // 🔹 Ambil data sekali dari Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "produkHukum"));
        const data: ProdukHukum[] = [];
        snapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() } as ProdukHukum);
        });
        setProdukHukum(data);
        setFilteredProdukHukum(data);
      } catch (error) {
        console.error("Error ambil data produk hukum:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔹 Responsive items per page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(6); // Mobile: 6 items per page
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(9); // Tablet: 9 items per page
      } else {
        setItemsPerPage(12); // Desktop: 12 items per page
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 🔹 Filter otomatis setiap kali searchTerm / yearFilter berubah
  useEffect(() => {
    let result = produkHukum;

    if (searchTerm) {
      result = result.filter((item) =>
        item.judul.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (yearFilter) {
      result = result.filter((item) => item.tahun.toString() === yearFilter);
    }

    setFilteredProdukHukum(result);
    setCurrentPage(1); // Reset ke halaman pertama saat filter berubah
  }, [searchTerm, yearFilter, produkHukum]);

  // 🔹 Hitung pagination
  const totalPages = Math.ceil(filteredProdukHukum.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProdukHukum.slice(startIndex, startIndex + itemsPerPage);

  const clearFilters = () => {
    setSearchTerm("");
    setYearFilter("");
    setFilteredProdukHukum(produkHukum);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // 🔹 Tahun unik untuk dropdown filter
  const uniqueYears = [...new Set(produkHukum.map((item) => item.tahun))].sort((a, b) => b - a);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1c2c66]"></div>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold text-[#1c2c66] mb-2">Produk Hukum</h1>
        <div className="w-24 h-1 bg-[#f8cb8b] mx-auto mb-4 rounded-full"></div>
        <p className="text-gray-600">Kumpulan peraturan dan undang-undang yang berlaku</p>
      </motion.div>

      {/* Search & Filter */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari produk hukum..."
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1c2c66] focus:border-[#1c2c66]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#f8cb8b]/20 hover:bg-[#f8cb8b]/30 rounded-lg transition-colors text-[#1c2c66]"
          >
            <FiFilter className="h-5 w-5" />
            <span>Filter</span>
          </button>
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="pt-4 border-t border-gray-200"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <FiCalendar className="h-5 w-5 text-gray-400" />
                <select
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1c2c66] focus:border-[#1c2c66]"
                >
                  <option value="">Semua Tahun</option>
                  {uniqueYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {(searchTerm || yearFilter) && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700 ml-auto"
                >
                  <FiX className="h-4 w-4" />
                  Hapus Filter
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Info hasil */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 text-gray-700 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <p className="mb-2 sm:mb-0">
          Menampilkan <span className="font-bold text-[#1c2c66]">{startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredProdukHukum.length)}</span> dari{" "}
          <span className="font-bold text-[#1c2c66]">{filteredProdukHukum.length}</span> produk hukum
          {(searchTerm || yearFilter) && <span className="text-sm text-gray-500"> (difilter)</span>}
        </p>
        
        {filteredProdukHukum.length > itemsPerPage && (
          <div className="flex items-center gap-2 text-sm">
            <span>Halaman:</span>
            <select
              value={currentPage}
              onChange={(e) => goToPage(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-[#1c2c66] focus:border-[#1c2c66]"
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <option key={page} value={page}>
                  {page}
                </option>
              ))}
            </select>
            <span>dari {totalPages}</span>
          </div>
        )}
      </div>

      {/* Daftar Produk Hukum */}
      {currentItems.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="bg-[#f8cb8b]/20 p-3 rounded-lg mr-4 flex-shrink-0">
                      <FiFileText className="w-6 h-6 text-[#1c2c66]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#1c2c66] line-clamp-3">
                      {item.judul}
                    </h3>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-5">
                    <FiCalendar className="mr-1.5" />
                    <span>Tahun: {item.tahun}</span>
                  </div>
                  <a
                    href={`/produk-hukum/${item.id}`}
                    className="text-[#1c2c66] hover:text-[#1c2c66]/80 font-medium flex items-center"
                  >
                    <FiExternalLink className="mr-1" /> Lihat Detail
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg border transition-colors ${
                  currentPage === 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300' 
                    : 'bg-white text-[#1c2c66] hover:bg-[#f8cb8b]/20 border-gray-300'
                }`}
              >
                <FiChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Sebelumnya</span>
              </button>

              {/* Page numbers - show limited on mobile */}
              <div className="hidden sm:flex items-center gap-1">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => goToPage(pageNum)}
                      className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors ${
                        currentPage === pageNum
                          ? 'bg-[#1c2c66] text-white border-[#1c2c66]'
                          : 'bg-white text-[#1c2c66] hover:bg-[#f8cb8b]/20 border-gray-300'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {totalPages > 5 && (
                  <span className="px-2 text-gray-500">...</span>
                )}
              </div>

              {/* Mobile page indicator */}
              <div className="sm:hidden text-sm text-gray-600">
                Halaman {currentPage} dari {totalPages}
              </div>

              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg border transition-colors ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300'
                    : 'bg-white text-[#1c2c66] hover:bg-[#f8cb8b]/20 border-gray-300'
                }`}
              >
                <span className="hidden sm:inline">Selanjutnya</span>
                <FiChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
          <FiFileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-[#1c2c66] mb-2">Tidak ada produk hukum ditemukan</h3>
          <p className="text-gray-500">
            {searchTerm || yearFilter
              ? "Coba ubah kata kunci pencarian atau filter tahun yang digunakan"
              : "Belum ada produk hukum yang tersedia"}
          </p>
          {(searchTerm || yearFilter) && (
            <button
              onClick={clearFilters}
              className="mt-4 inline-flex items-center text-[#1c2c66] hover:text-[#1c2c66]/80 font-medium"
            >
              Hapus filter
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default ProdukHukumPage;