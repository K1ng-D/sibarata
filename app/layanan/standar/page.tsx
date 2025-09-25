"use client";

import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";

const LayananStandar = () => {
  // link PDF dari Google Drive → pakai /preview untuk embed, dan FILE_ID untuk download
  const pdfs = [
    {
      title: "SK_Standar_Pelayanan_Inovasi.pdf",
      preview: "https://drive.google.com/file/d/1VqA-X2OOSRA5xOXADwRoutZNrJtu_bq_/preview", // ganti FILE_ID
      download: "https://drive.google.com/uc?export=download&id=1VqA-X2OOSRA5xOXADwRoutZNrJtu_bq_",
    },
    {
      title: "SK_Penetapan_Standar_Pelayanan_Umum.pdf",
      preview: "https://drive.google.com/file/d/15lj-JEFsqBTmtzAZUanEre5hoktj4OQ-/preview", // ganti FILE_ID
      download: "https://drive.google.com/uc?export=download&id=15lj-JEFsqBTmtzAZUanEre5hoktj4OQ-",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 bg-gray-50 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-[#1c2c66] mb-4">
          Standar Pelayanan
        </h2>
        <div className="w-24 h-1 bg-[#f8cb8b] mx-auto rounded-full mb-4"></div>
        
        {/* Meta Info */}
        <div className="text-sm text-gray-500">
          <span>admin pas</span> / <span>SOP</span> /{" "}
          <span>29 August 2024</span> / <span>Hits: 80</span>
        </div>
      </motion.div>

      {/* Loop PDF List */}
      <div className="space-y-8">
        {pdfs.map((doc, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
          >
            {/* Link nama file dengan download button */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#1c2c66]">
                {doc.title}
              </h3>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={doc.download}
                className="flex items-center gap-2 bg-[#1c2c66] text-white px-4 py-2 rounded-lg hover:bg-[#1c2c66]/90 transition-colors text-sm font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiDownload className="w-4 h-4" />
                Unduh
              </motion.a>
            </div>

            {/* Embed PDF */}
            <div className="w-full h-[60vh] rounded-md border border-gray-300 shadow-sm overflow-hidden">
              <iframe
                src={doc.preview}
                className="w-full h-full"
                allow="autoplay"
                title={`PDF Viewer - ${doc.title}`}
              ></iframe>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LayananStandar;