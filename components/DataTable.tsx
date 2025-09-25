import { ReactNode } from 'react';

export interface Column {
  header: string;
  accessor: string;
  type?: 'text' | 'date' | 'image';
  render?: (value: any, row: any) => ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
}

const DataTable = ({ columns, data }: DataTableProps) => {
  const formatValue = (value: any, type?: 'text' | 'date' | 'image') => {
    if (type === 'date' && value instanceof Date) {
      return value.toLocaleDateString('id-ID');
    }
    if (type === 'image' && typeof value === 'string') {
      return <img src={value} alt="Preview" className="w-16 h-16 object-cover rounded" />;
    }
    return value;
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#f8cb8b]/20">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-4 text-left text-sm font-medium text-[#1c2c66] uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-[#f8cb8b]/10 transition-colors">
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {column.render
                      ? column.render(row[column.accessor], row)
                      : formatValue(row[column.accessor], column.type)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500 bg-gray-50">
          Tidak ada data yang ditemukan
        </div>
      )}
    </div>
  );
};

export default DataTable;