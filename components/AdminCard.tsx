import Link from 'next/link';
import { ReactNode } from 'react';

interface AdminCardProps {
  title: string;
  count: number;
  icon: ReactNode;
  color: string;
  href?: string; // jadikan opsional
}

const AdminCard = ({ title, count, icon, color, href }: AdminCardProps) => {
  const CardContent = () => (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{count}</p>
        </div>
        <div className={`p-3 rounded-full ${color} text-white`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return href ? (
    <Link href={href}>
      <CardContent />
    </Link>
  ) : (
    <CardContent />
  );
};

export default AdminCard;
