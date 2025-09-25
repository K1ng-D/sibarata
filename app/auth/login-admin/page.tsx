'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowLeft, FiLock, FiMail, FiClock } from 'react-icons/fi';

// Key untuk localStorage
const LOGIN_ATTEMPTS_KEY = 'admin_login_attempts';
const LOCKOUT_UNTIL_KEY = 'admin_lockout_until';

export default function LoginAdminPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLockedOut, setIsLockedOut] = useState(false);
  const [lockoutTimeLeft, setLockoutTimeLeft] = useState(0);
  const router = useRouter();

  // Cek status lockout saat komponen dimuat
  useEffect(() => {
    checkLockoutStatus();
  }, []);

  const checkLockoutStatus = () => {
    const lockoutUntil = localStorage.getItem(LOCKOUT_UNTIL_KEY);
    if (lockoutUntil) {
      const lockoutTime = parseInt(lockoutUntil, 10);
      const currentTime = Date.now();
      
      if (currentTime < lockoutTime) {
        setIsLockedOut(true);
        const timeLeft = Math.ceil((lockoutTime - currentTime) / 1000 / 60);
        setLockoutTimeLeft(timeLeft);
        
        // Update countdown setiap menit
        const interval = setInterval(() => {
          const newTimeLeft = Math.ceil((lockoutTime - Date.now()) / 1000 / 60);
          if (newTimeLeft <= 0) {
            clearInterval(interval);
            setIsLockedOut(false);
            localStorage.removeItem(LOCKOUT_UNTIL_KEY);
            localStorage.removeItem(LOGIN_ATTEMPTS_KEY);
          } else {
            setLockoutTimeLeft(newTimeLeft);
          }
        }, 60000);
        
        return () => clearInterval(interval);
      } else {
        // Lockout sudah berakhir
        localStorage.removeItem(LOCKOUT_UNTIL_KEY);
        localStorage.removeItem(LOGIN_ATTEMPTS_KEY);
        setIsLockedOut(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Cek jika sedang dalam status lockout
    if (isLockedOut) {
      setError(`Akun terkunci. Coba lagi dalam ${lockoutTimeLeft} menit.`);
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      
      // Reset percobaan login yang gagal setelah berhasil login
      localStorage.removeItem(LOGIN_ATTEMPTS_KEY);
      localStorage.removeItem(LOCKOUT_UNTIL_KEY);
      
      router.push('/admin');
    } catch (error: any) {
      // Handle error dan hitung percobaan gagal
      handleFailedLogin();
      
      if (error.code === 'auth/invalid-email') {
        setError('Format email tidak valid');
      } else if (error.code === 'auth/user-not-found') {
        setError('Email tidak ditemukan');
      } else if (error.code === 'auth/wrong-password') {
        setError('Password salah');
      } else {
        setError('Terjadi kesalahan saat login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFailedLogin = () => {
    // Ambil data percobaan login dari localStorage
    const attemptsData = localStorage.getItem(LOGIN_ATTEMPTS_KEY);
    let attempts = attemptsData ? JSON.parse(attemptsData) : { count: 0, lastAttempt: 0 };
    
    const currentTime = Date.now();
    const oneHourAgo = currentTime - (60 * 60 * 1000);
    
    // Reset counter jika percobaan terakhir lebih dari 1 jam yang lalu
    if (attempts.lastAttempt < oneHourAgo) {
      attempts = { count: 0, lastAttempt: currentTime };
    }
    
    // Tambahkan percobaan gagal
    attempts.count += 1;
    attempts.lastAttempt = currentTime;
    
    // Simpan ke localStorage
    localStorage.setItem(LOGIN_ATTEMPTS_KEY, JSON.stringify(attempts));
    
    // Jika sudah 3 kali gagal, set lockout untuk 5 menit
    if (attempts.count >= 3) {
      const lockoutUntil = currentTime + (5 * 60 * 1000); // 5 menit dari sekarang
      localStorage.setItem(LOCKOUT_UNTIL_KEY, lockoutUntil.toString());
      setIsLockedOut(true);
      setLockoutTimeLeft(5);
      setError('Terlalu banyak percobaan login. Akun terkunci selama 5 menit.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      {/* Tombol kembali */}
      <div className="absolute top-4 left-4">
        <Link
          href="/"
          className="flex items-center text-gray-500 hover:text-blue-600 transition-colors text-sm font-medium"
        >
          <FiArrowLeft className="mr-1" />
          Kembali
        </Link>
      </div>

      {/* Card login */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <FiLock className="w-7 h-7 text-blue-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Login Admin</h1>
          <p className="text-gray-500 text-sm mt-1">
            Masuk untuk mengelola dashboard Sibarata
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className={`${isLockedOut ? 'bg-yellow-50 border-yellow-200 text-yellow-700' : 'bg-red-50 border-red-200 text-red-600'} border px-4 py-2 rounded-lg text-sm text-center flex items-center justify-center`}>
              {isLockedOut && <FiClock className="mr-2" />}
              {error}
            </div>
          )}

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="email"
                type="email"
                required
                disabled={isLockedOut || loading}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                type="password"
                required
                disabled={isLockedOut || loading}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Tombol Login */}
          <button
            type="submit"
            disabled={loading || isLockedOut}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Memproses...
              </>
            ) : isLockedOut ? (
              `Terkunci (${lockoutTimeLeft} menit)`
            ) : (
              'Masuk'
            )}
          </button>
        </form>

        {/* Footer kecil */}
        <p className="text-xs text-gray-500 text-center mt-6">
          Lupa password? Hubungi administrator sistem.
        </p>
      </motion.div>
    </div>
  );
}