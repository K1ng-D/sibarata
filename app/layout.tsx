// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WhatsAppBot from "@/components/WhatsAppBot";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sibarata.com"), // ganti ke domainmu
  applicationName: "SIBARATA",
  title: {
    default: "Sistem Informasi Bapas Surakarta (SIBARATA)",
    template: "%s | Bapas Surakarta",
  },
  description:
    "Portal informasi terpadu Bapas Surakarta: layanan, berita, dan informasi terkait pembimbingan kemasyarakatan. Cari: SIBARATA, BAPAS, Bapas Solo.",
  keywords: [
    "SIBARATA",
    "BAPAS",
    "Bapas Surakarta",
    "Bapas Solo",
    "Balai Pemasyarakatan Surakarta",
    "Layanan pemasyarakatan",
  ],
  authors: [{ name: "Bapas Surakarta" }],
  creator: "Bapas Surakarta",
  publisher: "Bapas Surakarta",
  alternates: {
    canonical: "/",
    languages: {
      "id-ID": "/",
      "en-US": "/en", // opsional bila ada versi Inggris
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.sibarata.com/",
    siteName: "SIBARATA - Bapas Surakarta",
    title: "Sistem Informasi Bapas Surakarta (SIBARATA)",
    description:
      "Portal informasi terpadu Bapas Surakarta. Temukan layanan, syarat, dan berita terbaru.",
    images: [
      {
        url: "/public/logo.png", // sediakan di /public/og/
        width: 1200,
        height: 630,
        alt: "SIBARATA - Bapas Surakarta",
      },
    ],
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sistem Informasi Bapas Surakarta (SIBARATA)",
    description:
      "Portal informasi terpadu Bapas Surakarta. Temukan layanan, syarat, dan berita terbaru.",
    images: ["/public/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  // (Opsional) verifikasi Search Console / layanan lain:
  // verification: { google: "kode-verifikasi" },
  category: "government",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Bapas Surakarta",
    name: "Bapas Surakarta",
    alternateName: ["BAPAS", "Bapas Solo", "SIBARATA"],
    url: "https://www.sibarata.com",
    logo: "https://www.sibarata.com/logo.png",
    sameAs: [
      // isi bila ada profil resmi
      // "https://www.instagram.com/....",
      // "https://www.facebook.com/...."
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SIBARATA - Bapas Surakarta",
    url: "https://www.sibarata.com",
    potentialAction: {
      "@type": "SearchAction",
      target:
        "https://www.sibarata.com/layanan",
      "query-input": "required name=layanan",
    },
  };

  return (
    <html lang="id">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <WhatsAppBot />

        {/* JSON-LD: Organization + Website + Sitelinks SearchBox */}
        <Script
          id="org-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Script
          id="website-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  );
}
