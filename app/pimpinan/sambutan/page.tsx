import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

const SambutanPage = () => {
  const sidebarItems = [
    { title: 'Profil Pejabat', href: '/pimpinan/profil' },
    { title: 'Sambutan Kapala Satuan Kerja', href: '/pimpinan/sambutan' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <header className="pt-20 pb-12" style={{ backgroundColor: '#1c2c66' }}>
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-4">Pimpinan Satuan Kerja</h1>
          <nav className="text-sm" style={{ color: '#f8cb8b' }}>
            <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
            <span className="mx-2">/</span>
            <Link href="/pimpinan" className="hover:text-white transition-colors">Pimpinan Satuan Kerja</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Sambutan Kapala Satuan Kerja</span>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4" style={{ color: '#1c2c66' }}>Pimpinan Satuan Kerja</h2>
              <ul className="space-y-2">
                {sidebarItems.map((item, index) => (
                  <li key={index}>
                    <Link 
                      href={item.href} 
                      className={`block py-2 px-4 rounded-md transition-colors ${
                        item.href === '/pimpinan/sambutan' 
                          ? 'font-medium shadow-sm' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      style={{
                        backgroundColor: item.href === '/pimpinan/sambutan' ? '#f8cb8b' : 'transparent',
                        color: item.href === '/pimpinan/sambutan' ? '#1c2c66' : 'inherit'
                      }}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              {/* Header with Image */}
              <div className="relative h-64 w-full" style={{ backgroundColor: '#1c2c66' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h2 className="text-3xl font-bold text-white">Sambutan Kapala Satuan Kerja</h2>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent"></div>
              </div>

              <div className="p-8">
                <div className="prose max-w-none">
                  <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
                    <div className="flex-shrink-0">
                      {/* Placeholder for image if needed */}
                    </div>
                  </div>
                  
                  <div className="space-y-6 text-gray-700">
                    <p className="text-lg leading-relaxed">
                      Perkembangan teknologi informasi yang terus meningkat mengharuskan kita melakukan pengembangan sistem informasi secara menyeluruh, baik di tingkat pusat maupun di tingkat daerah yang meliputi Kantor Wilayah dan Satuan Kerja dibawahnya. Dukungan dari segi sumber daya manusia dan infrastruktur juga sangat mempengaruhi dalam menunjang kelancaran pengembangan teknologi informasi tersebut.
                    </p>

                    <p className="text-lg leading-relaxed">
                      Sejalan dengan pengembangan dan penguatan tata kelola teknologi informasi di Lingkungan Kementerian Hukum dan HAM, Pusat Data dan Teknologi Informasi Kementerian Hukum dan HAM R.I terus meningkatkan kinerja berbasis teknologi dengan pemanfaatan dan pengembangan Teknologi Informasi melalui pembuatan laman resmi satuan kerja di lingkungan Kementerian Hukum dan HAM.
                    </p>

                    <p className="text-lg leading-relaxed">
                      Kepada pihak yang telah terlibat dalam proses development laman resmi satuan kerja di lingkungan Kementerian Hukum dan HAM, saya ucapkan terima kasih yang sebesar-besarnya. Semoga laman ini dapat menjadi media publikasi bagi pejabat administrator, Pengawas, Pemangku Jabatan Fungsional dan seluruh pegawai satuan kerja di lingkungan Kementerian Hukum dan HAM pada umumnya dalam mendukung keterbukaan informasi publik dengan cara mempublikasikan seluruh informasi kepada masyarakat luas melalui laman ini.
                    </p>

                    <div className="border-t pt-6 mt-6" style={{ borderColor: '#f8cb8b' }}>
                      <p className="text-gray-600 italic">Wassalamualaikum, Wr, Wb.</p>
                      <p className="text-xl font-semibold mt-2" style={{ color: '#1c2c66' }}>Unggul Widiyo Saputro</p>
                      <p className="text-sm text-gray-500">Kepala Balai Pemasyarakatan Kelas I Surakarta</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SambutanPage;