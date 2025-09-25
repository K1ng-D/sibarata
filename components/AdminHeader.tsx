'use client';

import { FiBell, FiUser, FiLogOut } from 'react-icons/fi';

interface AdminHeaderProps {
  user: any;
  onLogout: () => void;
}

const AdminHeader = ({ user, onLogout }: AdminHeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Admin Panel</h1>
          <p className="text-sm text-gray-600 mt-1">Sistem Informasi Bapas Surakarta</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title="Notifikasi"
          >
            <FiBell className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="flex items-center space-x-3 bg-gray-50 rounded-lg px-4 py-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <FiUser className="w-4 h-4 text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-800">{user?.name || 'Admin'}</p>
              <p className="text-xs text-gray-600">{user?.email}</p>
            </div>
          </div>
          
          <button
            onClick={onLogout}
            className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
            title="Logout"
          >
            <FiLogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;