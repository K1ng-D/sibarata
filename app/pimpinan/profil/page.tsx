import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Ketua from '@/public/unggul.png'

const PimpinanProfilPage = () => {
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
            <span className="text-white">Profil Pejabat</span>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4" style={{ color: '#1c2c66' }}>Pimpinan Satuan Kerja</h2>
              <ul className="space-y-2">
                {sidebarItems.map((item, index) => (
                  <li key={index}>
                    <Link 
                      href={item.href} 
                      className={`block py-2 px-4 rounded-md transition-colors ${
                        item.href === '/pimpinan/profil' 
                          ? 'font-medium shadow-sm' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      style={{
                        backgroundColor: item.href === '/pimpinan/profil' ? '#f8cb8b' : 'transparent',
                        color: item.href === '/pimpinan/profil' ? '#1c2c66' : 'inherit'
                      }}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Konten utama */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              <div className="p-8">
                {/* Header informasi */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-sm mb-8 pb-6 border-b border-gray-200">
                  <div className="flex items-center flex-wrap gap-2 mb-3 md:mb-0">
                    <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#f8cb8b', color: '#1c2c66' }}>
                      Pusdatin
                    </span>
                    <span className="text-gray-300">/</span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      Profil Pejabat
                    </span>
                    <span className="text-gray-300">/</span>
                    <span className="text-gray-500">17 January 2024</span>
                  </div>
                  <div className="flex items-center text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    <span>Hits: 238</span>
                  </div>
                </div>
                
                {/* Judul utama */}
                <div className="text-center mb-10">
                  <div className="inline-block px-6 py-2 rounded-full text-sm font-medium mb-4 shadow-md" style={{ backgroundColor: '#1c2c66', color: '#f8cb8b' }}>
                    PROFIL PEJABAT
                  </div>
                  <h2 className="text-3xl font-bold mb-4" style={{ color: '#1c2c66' }}>
                    KEPALA BALAI PEMASYARAKATAN KELAS I SURAKARTA
                  </h2>
                  <div className="w-20 h-1 mx-auto" style={{ backgroundColor: '#f8cb8b' }}></div>
                </div>
                
                {/* Konten profil */}
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
                  {/* Foto profil */}
                  <div className="flex-shrink-0">
                    <div className="relative w-60 h-72 rounded-xl overflow-hidden shadow-lg border-4 border-white" style={{ boxShadow: '0 4px 20px rgba(28, 44, 102, 0.15)' }}>
                      <Image
                        src={Ketua}
                        alt="Kepala Balai Pemasyarakatan Kelas I Surakarta"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                    </div>
                  </div>
                  
                  {/* Informasi nama dan NIP */}
                  <div className="flex-1 text-center lg:text-left">
                    <div className="rounded-lg p-6 shadow-sm mb-6" style={{ backgroundColor: '#f8cb8b' }}>
                      <h3 className="text-2xl font-bold mb-2" style={{ color: '#1c2c66' }}>
                        Dr. John Doe, S.H., M.H.
                      </h3>
                      <p className="font-semibold" style={{ color: '#1c2c66' }}>
                        Kepala Balai Pemasyarakatan Kelas I Surakarta
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                        <h4 className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: '#1c2c66' }}>
                          NIP
                        </h4>
                        <p className="text-gray-800 font-mono text-lg">
                          123456789012345678
                        </p>
                      </div>
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

export default PimpinanProfilPage;