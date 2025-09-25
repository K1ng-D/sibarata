'use client';

import { useEffect, useState } from 'react';
import { collection, getCountFromServer, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import AdminCard from '@/components/AdminCard';
import { FiFileText, FiInfo, FiBook, FiSettings, FiClipboard, FiUsers, FiUserCheck } from 'react-icons/fi';

export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    layanan: 0,
    informasi: 0,
    produkHukum: 0,
    litmas: 0,
    bimbingan: 0,
    petugas: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // ambil jumlah koleksi berita, layanan, informasi, produkHukum
        const [beritaSnapshot, layananSnapshot, informasiSnapshot, produkHukumSnapshot] =
          await Promise.all([
            getCountFromServer(collection(db, 'berita')),
            getCountFromServer(collection(db, 'layanan')),
            getCountFromServer(collection(db, 'informasi')),
            getCountFromServer(collection(db, 'produkHukum')),
          ]);

        // ambil data statistik dari dokumen
        const statistikRef = doc(db, 'statistik', 'sibarata');
        const statistikSnap = await getDoc(statistikRef);

        let statistikData = { litmas: 0, bimbingan: 0, petugas: 0 };
        if (statistikSnap.exists()) {
          statistikData = statistikSnap.data() as typeof statistikData;
        }

        setCounts({
          layanan: layananSnapshot.data().count,
          informasi: informasiSnapshot.data().count,
          produkHukum: produkHukumSnapshot.data().count,
          ...statistikData,
        });
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
        <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full mb-4"></div>
        <p className="text-gray-600">Ringkasan data dan statistik sistem</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Data umum */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Layanan</p>
              <p className="text-2xl font-bold text-gray-800">{counts.layanan}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FiSettings className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Informasi Publik</p>
              <p className="text-2xl font-bold text-gray-800">{counts.informasi}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <FiInfo className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Produk Hukum</p>
              <p className="text-2xl font-bold text-gray-800">{counts.produkHukum}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <FiBook className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Data Statistik Sibarata */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Jumlah Litmas</p>
              <p className="text-2xl font-bold text-gray-800">{counts.litmas}</p>
            </div>
            <div className="p-3 bg-indigo-100 rounded-lg">
              <FiClipboard className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Bimbingan Klien</p>
              <p className="text-2xl font-bold text-gray-800">{counts.bimbingan}</p>
            </div>
            <div className="p-3 bg-teal-100 rounded-lg">
              <FiUsers className="w-6 h-6 text-teal-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Petugas Survey</p>
              <p className="text-2xl font-bold text-gray-800">{counts.petugas}</p>
            </div>
            <div className="p-3 bg-pink-100 rounded-lg">
              <FiUserCheck className="w-6 h-6 text-pink-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}