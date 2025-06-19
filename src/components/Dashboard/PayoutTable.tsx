'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

// Sample data - replace with actual data from your backend
const initialAuthors = [
  { id: 1, name: 'John Doe', articles: 5, blogs: 3, totalPayout: 0 },
  { id: 2, name: 'Jane Smith', articles: 3, blogs: 2, totalPayout: 0 },
  { id: 3, name: 'Mike Johnson', articles: 7, blogs: 4, totalPayout: 0 },
];

export default function PayoutTable() {
  const { user } = useAuth();
  const [authors, setAuthors] = useState(initialAuthors);
  const [rates, setRates] = useState({
    articleRate: 5264.03,
    blogRate: 8638.28
  });
  const [isEditing, setIsEditing] = useState(false);

  // Calculate total payout for each author
  const calculatePayouts = (articleRate: number, blogRate: number) => {
    return authors.map(author => ({
      ...author,
      totalPayout: (author.articles * articleRate) + (author.blogs * blogRate)
    }));
  };

  // Handle rate changes
  const handleRateChange = (field: 'articleRate' | 'blogRate', value: string) => {
    const numValue = parseFloat(value) || 0;
    setRates(prev => ({
      ...prev,
      [field]: numValue
    }));
    setAuthors(calculatePayouts(
      field === 'articleRate' ? numValue : rates.articleRate,
      field === 'blogRate' ? numValue : rates.blogRate
    ));
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Payout Details</h2>
        {user?.role === 'admin' && (
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            {isEditing ? 'Save Rates' : 'Edit Rates'}
          </button>
        )}
      </div>

      {/* Rates Section */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Article Rate (₹)
          </label>
          {isEditing && user?.role === 'admin' ? (
            <input
              type="number"
              value={rates.articleRate}
              onChange={(e) => handleRateChange('articleRate', e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <p className="text-lg font-semibold">{formatCurrency(rates.articleRate)}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Blog Rate (₹)
          </label>
          {isEditing && user?.role === 'admin' ? (
            <input
              type="number"
              value={rates.blogRate}
              onChange={(e) => handleRateChange('blogRate', e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <p className="text-lg font-semibold">{formatCurrency(rates.blogRate)}</p>
          )}
        </div>
      </div>

      {/* Authors Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Articles
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Blogs
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Payout
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {authors.map((author) => (
              <tr key={author.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{author.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{author.articles}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{author.blogs}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatCurrency(author.totalPayout)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 