// informasi/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

interface Informasi {
  id: string;
  judul: string;
  isi: string;
  kategori?: string;
  tanggal?: Date;
  gambar?: string;
}

export default function DetailInformasiPage() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState<Informasi | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'informasi', id as string);
        const snap = await getDoc(docRef);
        if (!snap.exists()) {
          router.push('/#informasi');
          return;
        }
        const d = snap.data() as any;
        const gambarUrl =
          d?.gambar?.secure_url ?? d?.gambar?.url ?? d?.gambar ?? undefined;

        setData({
          id: snap.id,
          judul: d.judul,
          isi: d.isi,
          kategori: d.kategori,
          gambar: gambarUrl,
          tanggal: d.tanggal?.toDate?.() ?? undefined,
        });
      } catch (err) {
        console.error('fetch detail error:', err);
        router.push('/#informasi');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, router]);

  if (loading) return <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">Memuat...</div>;
  if (!data) return <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">Informasi tidak ditemukan</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen">
      {/* Tombol kembali */}
      <Link
        href="/#informasi"
        className="inline-flex items-center text-[#1c2c66] mb-6 hover:text-[#1c2c66]/80 hover:underline font-medium"
      >
        <FiArrowLeft className="mr-2" /> Kembali ke Informasi
      </Link>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        {/* Gambar Full */}
        {data.gambar && (
          <div className="w-full rounded-lg overflow-hidden shadow-sm border border-gray-200 mb-8">
            <img
              src={data.gambar}
              alt={data.judul}
              className="w-full h-auto object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          </div>
        )}

        {/* Header */}
        <div className="mb-6">
          {data.kategori && (
            <span className="inline-block px-3 py-1 bg-[#f8cb8b]/20 text-[#1c2c66] text-sm rounded-full mb-4">
              {data.kategori}
            </span>
          )}
          
          <h1 className="text-3xl font-bold text-[#1c2c66] mb-3">{data.judul}</h1>

          {/* Info meta */}
          <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4">
            <span>
              {data.tanggal
                ? data.tanggal.toLocaleString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : '-'}
            </span>
          </div>
        </div>

        {/* Garis pembatas */}
        <div className="w-24 h-1 bg-[#f8cb8b] mb-6 rounded-full"></div>

        {/* Isi konten */}
        <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
          {data.isi}
        </div>
      </div>
    </div>
  );
}
