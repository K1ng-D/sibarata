"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getCountFromServer,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  FiInfo,
  FiBook,
  FiSettings,
  FiClipboard,
  FiUsers,
  FiUserCheck,
  FiAlertCircle,
  FiLifeBuoy,
} from "react-icons/fi";

type CountState = {
  layanan: number;
  informasi: number;
  produkHukum: number;
  litmas: number;
  bimbingan: number;
  petugas: number;
  pengaduan: number; // ✅ baru
  pendampingan: number; // ✅ baru
};

type StatistikDoc = {
  litmas?: number;
  bimbingan?: number;
  petugas?: number;
  pengaduan?: number;
  pendampingan?: number;
};

export default function AdminDashboard() {
  const [counts, setCounts] = useState<CountState>({
    layanan: 0,
    informasi: 0,
    produkHukum: 0,
    litmas: 0,
    bimbingan: 0,
    petugas: 0,
    pengaduan: 0, // ✅
    pendampingan: 0, // ✅
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // koleksi umum
        const [layananSnapshot, informasiSnapshot, produkHukumSnapshot] =
          await Promise.all([
            getCountFromServer(collection(db, "layanan")),
            getCountFromServer(collection(db, "informasi")),
            getCountFromServer(collection(db, "produkHukum")),
          ]);

        // dokumen statistik/sibarata
        const statistikRef = doc(db, "statistik", "sibarata");
        const statistikSnap = await getDoc(statistikRef);

        const s = (
          statistikSnap.exists() ? statistikSnap.data() : {}
        ) as StatistikDoc;

        setCounts({
          layanan: layananSnapshot.data().count,
          informasi: informasiSnapshot.data().count,
          produkHukum: produkHukumSnapshot.data().count,
          litmas: s.litmas ?? 0,
          bimbingan: s.bimbingan ?? 0,
          petugas: s.petugas ?? 0,
          pengaduan: s.pengaduan ?? 0, // ✅
          pendampingan: s.pendampingan ?? 0, // ✅
        });
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  const fmt = (n: number) => n.toLocaleString("id-ID");

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Admin Dashboard
        </h1>
        <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full mb-4"></div>
        <p className="text-gray-600">Ringkasan data dan statistik sistem</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Data umum */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Layanan</p>
              <p className="text-2xl font-bold text-gray-800">
                {fmt(counts.layanan)}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FiSettings className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Informasi Publik
              </p>
              <p className="text-2xl font-bold text-gray-800">
                {fmt(counts.informasi)}
              </p>
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
              <p className="text-2xl font-bold text-gray-800">
                {fmt(counts.produkHukum)}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <FiBook className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Statistik Sibarata */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Jumlah Litmas</p>
              <p className="text-2xl font-bold text-gray-800">
                {fmt(counts.litmas)}
              </p>
            </div>
            <div className="p-3 bg-indigo-100 rounded-lg">
              <FiClipboard className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Bimbingan Klien
              </p>
              <p className="text-2xl font-bold text-gray-800">
                {fmt(counts.bimbingan)}
              </p>
            </div>
            <div className="p-3 bg-teal-100 rounded-lg">
              <FiUsers className="w-6 h-6 text-teal-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Petugas Survey
              </p>
              <p className="text-2xl font-bold text-gray-800">
                {fmt(counts.petugas)}
              </p>
            </div>
            <div className="p-3 bg-pink-100 rounded-lg">
              <FiUserCheck className="w-6 h-6 text-pink-600" />
            </div>
          </div>
        </div>

        {/* ✅ Baru: Pengaduan */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pengaduan</p>
              <p className="text-2xl font-bold text-gray-800">
                {fmt(counts.pengaduan)}
              </p>
            </div>
            <div className="p-3 bg-rose-100 rounded-lg">
              <FiAlertCircle className="w-6 h-6 text-rose-600" />
            </div>
          </div>
        </div>

        {/* ✅ Baru: Pendampingan */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pendampingan</p>
              <p className="text-2xl font-bold text-gray-800">
                {fmt(counts.pendampingan)}
              </p>
            </div>
            <div className="p-3 bg-amber-100 rounded-lg">
              <FiLifeBuoy className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
