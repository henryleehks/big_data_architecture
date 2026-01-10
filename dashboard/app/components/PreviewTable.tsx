'use client'

import { useState, useMemo } from 'react'

interface PreviewTableProps {
  title: string
  data: Record<string, any>[]
  columns: { key: string; label: string; format?: (value: any) => string }[]
}

export default function PreviewTable({ title, data, columns }: PreviewTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const ROWS_PER_PAGE = 10

  // Calculate pagination
  const totalPages = useMemo(() => Math.ceil((data?.length || 0) / ROWS_PER_PAGE), [data])

  // Get current page data
  const paginatedData = useMemo(() => {
    if (!data || data.length === 0) return []
    const startIndex = (currentPage - 1) * ROWS_PER_PAGE
    const endIndex = startIndex + ROWS_PER_PAGE
    return data.slice(startIndex, endIndex)
  }, [data, currentPage])

  // Reset to page 1 if current page exceeds total pages after data update
  useMemo(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1)
    }
  }, [currentPage, totalPages])

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <p className="text-gray-500">No data available</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="text-sm text-gray-500">{data.length} total records</span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                    {col.format ? col.format(row[col.key]) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {data.length > ROWS_PER_PAGE && (
        <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
          {/* Left: Records info */}
          <div className="text-sm text-gray-700">
            Showing{' '}
            <span className="font-medium">
              {(currentPage - 1) * ROWS_PER_PAGE + 1}
            </span>{' '}
            to{' '}
            <span className="font-medium">
              {Math.min(currentPage * ROWS_PER_PAGE, data.length)}
            </span>{' '}
            of <span className="font-medium">{data.length}</span> records
          </div>

          {/* Right: Navigation buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
            >
              Previous
            </button>

            <span className="text-sm text-gray-700">
              Page <span className="font-medium">{currentPage}</span> of{' '}
              <span className="font-medium">{totalPages}</span>
            </span>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
