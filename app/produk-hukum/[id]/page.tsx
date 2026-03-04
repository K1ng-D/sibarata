"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  FiCalendar,
  FiDownload,
  FiFileText,
  FiArrowLeft,
  FiExternalLink,
} from "react-icons/fi";
import Link from "next/link";

/** ==============================
 *  TF-IDF + Cosine Similarity Utils
 *  ============================== */
type Vec = Map<string, number>;

const STOPWORDS = new Set([
  "dan",
  "atau",
  "yang",
  "di",
  "ke",
  "dari",
  "pada",
  "untuk",
  "dengan",
  "dalam",
  "atas",
  "bagi",
  "tentang",
  "nomor",
  "tahun",
  "republik",
  "indonesia",
  "pasal",
  "ayat",
  "bab",
  "bagian",
  "paragraf",
  "ketentuan",
  "peraturan",
  "undang",
  "undangundang",
]);

function tokenize(text: string): string[] {
  return (text ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/gi, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => t.trim())
    .filter((t) => t.length > 2)
    .filter((t) => !STOPWORDS.has(t));
}

function tf(tokens: string[]): Map<string, number> {
  const m = new Map<string, number>();
  for (const t of tokens) m.set(t, (m.get(t) ?? 0) + 1);
  const len = tokens.length || 1;
  for (const [k, v] of m) m.set(k, v / len);
  return m;
}

function idf(allDocsTokens: string[][]): Map<string, number> {
  const df = new Map<string, number>();
  const N = allDocsTokens.length || 1;

  for (const tokens of allDocsTokens) {
    const uniq = new Set(tokens);
    for (const t of uniq) df.set(t, (df.get(t) ?? 0) + 1);
  }

  const out = new Map<string, number>();
  for (const [t, dft] of df) out.set(t, Math.log((N + 1) / (dft + 1)) + 1);
  return out;
}

function tfidf(tfMap: Map<string, number>, idfMap: Map<string, number>): Vec {
  const v = new Map<string, number>();
  for (const [t, tv] of tfMap) {
    const iv = idfMap.get(t) ?? 0;
    if (iv > 0) v.set(t, tv * iv);
  }
  return v;
}

function cosine(a: Vec, b: Vec): number {
  let dot = 0;
  let na = 0;
  let nb = 0;

  for (const [, va] of a) na += va * va;
  for (const [, vb] of b) nb += vb * vb;

  const [small, large] = a.size < b.size ? [a, b] : [b, a];
  for (const [t, vs] of small) {
    const vl = large.get(t);
    if (vl != null) dot += vs * vl;
  }

  const den = Math.sqrt(na) * Math.sqrt(nb);
  return den === 0 ? 0 : dot / den;
}

/** ==============================
 *  Types
 *  ============================== */
interface ProdukHukum {
  id: string;
  judul: string;
  tahun: number;
  linkDownload: string; // untuk unduh
  linkViewer: string; // untuk iframe
  konten?: string; // disarankan ada untuk rekomendasi akurat
}

const DetailProdukHukumPage = () => {
  const { id } = useParams();

  const [data, setData] = useState<ProdukHukum | null>(null);
  const [allDocs, setAllDocs] = useState<ProdukHukum[]>([]);
  const [rekomendasi, setRekomendasi] = useState<
    Array<ProdukHukum & { score: number }>
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchAll = async () => {
      try {
        // detail
        const docRef = doc(db, "produkHukum", id as string);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setData({ id: snap.id, ...snap.data() } as ProdukHukum);
        }

        // semua dokumen
        const snapshot = await getDocs(collection(db, "produkHukum"));
        const list: ProdukHukum[] = [];
        snapshot.forEach((d) =>
          list.push({ id: d.id, ...d.data() } as ProdukHukum),
        );
        setAllDocs(list);
      } catch (error) {
        console.error("Error ambil detail / list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [id]);

  // hitung rekomendasi dokumen terkait
  useEffect(() => {
    if (!data) return;
    if (allDocs.length === 0) return;

    // build corpus: pakai konten jika ada, fallback ke judul
    const docsText = allDocs.map((d) =>
      d.konten?.trim() ? d.konten! : d.judul,
    );
    const docsTokens = docsText.map(tokenize);
    const idfMap = idf(docsTokens);

    const vecs = docsTokens.map((tks) => tfidf(tf(tks), idfMap));

    const targetIndex = allDocs.findIndex((d) => d.id === data.id);
    if (targetIndex === -1) return;

    const targetVec = vecs[targetIndex];

    const scored = allDocs
      .map((d, i) => ({
        ...d,
        score: d.id === data.id ? -1 : cosine(targetVec, vecs[i]),
      }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);

    setRekomendasi(scored);
  }, [data, allDocs]);

  const hasKonten = useMemo(
    () => allDocs.some((d) => (d.konten?.trim()?.length ?? 0) > 50),
    [allDocs],
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1c2c66]"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-20 bg-gray-50 min-h-screen">
        <h1 className="text-xl font-semibold text-gray-700">
          ❌ Data tidak ditemukan
        </h1>
      </div>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 min-h-screen">
      {/* Back */}
      <div className="mb-6">
        <Link
          href="/produk-hukum"
          className="inline-flex items-center gap-2 text-[#1c2c66] hover:text-[#1c2c66]/80 font-medium"
        >
          <FiArrowLeft className="w-4 h-4" />
          Kembali ke Produk Hukum
        </Link>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-[#1c2c66] mb-2">
          Detail Produk Hukum
        </h1>
        <div className="w-24 h-1 bg-[#f8cb8b] mx-auto rounded-full"></div>
      </motion.div>

      {/* Info */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-[#1c2c66] mb-4">
          {data.judul}
        </h2>
        <p className="flex items-center text-gray-600">
          <FiCalendar className="mr-2 text-[#1c2c66]" /> Tahun: {data.tahun}
        </p>
      </div>

      {/* PDF Viewer */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-[#1c2c66] mb-4 flex items-center">
          <FiFileText className="mr-2 text-[#1c2c66]" /> Dokumen PDF
        </h3>
        <div className="w-full h-[600px] border border-gray-300 rounded-lg overflow-hidden">
          <iframe
            src={data.linkViewer}
            className="w-full h-full"
            title="Dokumen Produk Hukum"
          />
        </div>
      </div>

      {/* Rekomendasi */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
        <div className="flex items-center justify-between gap-3 mb-4">
          <h3 className="text-lg font-semibold text-[#1c2c66]">
            Produk Hukum Terkait (Rekomendasi)
          </h3>
          {!hasKonten && (
            <span className="text-xs text-gray-500">
              (Rekomendasi dihitung dari judul karena konten belum tersedia)
            </span>
          )}
        </div>

        {rekomendasi.length === 0 ? (
          <p className="text-gray-500">
            Belum ada rekomendasi yang cukup mirip untuk ditampilkan.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rekomendasi.map((r, idx) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-[#f8cb8b]/20 p-2 rounded-lg flex-shrink-0">
                    <FiFileText className="w-5 h-5 text-[#1c2c66]" />
                  </div>

                  <div className="min-w-0 w-full">
                    <p className="font-semibold text-[#1c2c66] line-clamp-2">
                      {r.judul}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Tahun: {r.tahun}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <Link
                        href={`/produk-hukum/${r.id}`}
                        className="text-[#1c2c66] hover:text-[#1c2c66]/80 font-medium inline-flex items-center gap-1"
                      >
                        <FiExternalLink /> Lihat Detail
                      </Link>

                      <span className="text-xs text-gray-500">
                        Similarity: {(r.score * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Download */}
      <div className="flex justify-end">
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={data.linkDownload}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#1c2c66] text-white py-3 px-8 rounded-lg hover:bg-[#1c2c66]/90 transition-all duration-300 font-medium"
        >
          <FiDownload className="w-5 h-5" />
          Unduh Dokumen
        </motion.a>
      </div>
    </section>
  );
};

export default DetailProdukHukumPage;
