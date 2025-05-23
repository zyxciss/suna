import React from 'react';

interface CsvRendererProps {
  content: string;
  maxHeight?: string;
}

export function CsvRenderer({ content, maxHeight = '300px' }: CsvRendererProps) {
  // Parse CSV content
  const rows = content
    .split('\n')
    .filter(line => line.trim() !== '')
    .map(line => line.split(',').map(cell => cell.trim()));

  if (rows.length === 0) {
    return <div className="text-sm text-muted-foreground">No data to display</div>;
  }

  const headers = rows[0];
  const dataRows = rows.slice(1);

  return (
    <div className="overflow-auto" style={{ maxHeight }}>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                scope="col"
                className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
          {dataRows.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
