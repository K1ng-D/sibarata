"use client";

import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProdukHukumLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Konten utama */}
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-12">{children}</div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
