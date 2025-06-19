'use client';

import { useState, useEffect, Fragment } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LockClosedIcon } from '@heroicons/react/24/solid';
import { ArrowPathIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { Menu, Transition } from '@headlessui/react';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import { unparse } from 'papaparse';

interface PayoutRates {
  articleRate: number;
  blogRate: number;
}

const generateRandomRates = () => {
  return {
    articleRate: Number((Math.random() * (7000 - 3000) + 3000).toFixed(2)),
    blogRate: Number((Math.random() * (15000 - 5000) + 5000).toFixed(2)),
  };
};

export default function PayoutCalculator() {
  const { user, isAdmin } = useAuth();
  
  const [rates, setRates] = useState<PayoutRates>(() => {
    if (typeof window !== 'undefined') {
      const savedRates = localStorage.getItem('payoutRates');
      return savedRates ? JSON.parse(savedRates) : generateRandomRates();
    }
    return generateRandomRates();
  });

  const [counts, setCounts] = useState({
    articles: 0,
    blogs: 0,
  });

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      localStorage.setItem('payoutRates', JSON.stringify(rates));
    }
  }, [rates, isAdmin]);

  const handleRandomize = () => {
    setIsAnimating(true);
    const newRates = generateRandomRates();
    setRates(newRates);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const totalPayout = (counts.articles * rates.articleRate) + (counts.blogs * rates.blogRate);

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Payout Report', 20, 20);
    
    doc.setFontSize(12);
    doc.text(['Articles', 'Blogs', 'Total Payout'], 20, 40);
    
    doc.text([
      `${counts.articles} × ₹${rates.articleRate.toFixed(2)} = ₹${(counts.articles * rates.articleRate).toFixed(2)}`,
      `${counts.blogs} × ₹${rates.blogRate.toFixed(2)} = ₹${(counts.blogs * rates.blogRate).toFixed(2)}`,
      `Total: ₹${totalPayout.toFixed(2)}`
    ], 20, 50);
    
    doc.save('payout-report.pdf');
  };

  const exportToExcel = () => {
    const data = [{
      Articles: counts.articles,
      'Article Rate': rates.articleRate,
      'Article Total': counts.articles * rates.articleRate,
      Blogs: counts.blogs,
      'Blog Rate': rates.blogRate,
      'Blog Total': counts.blogs * rates.blogRate,
      'Total Payout': totalPayout
    }];
    
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Payouts');
    XLSX.writeFile(workbook, 'payout-report.xlsx');
  };

  const exportToCSV = () => {
    const data = [{
      Articles: counts.articles,
      'Article Rate': rates.articleRate,
      'Article Total': counts.articles * rates.articleRate,
      Blogs: counts.blogs,
      'Blog Rate': rates.blogRate,
      'Blog Total': counts.blogs * rates.blogRate,
      'Total Payout': totalPayout
    }];
    
    const csv = unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'payout-report.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!user) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center gap-2 text-gray-600 justify-center p-8">
          <LockClosedIcon className="h-5 w-5" />
          <span>Please log in to use the calculator</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Payout Calculator</h2>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:visible:outline focus:visible:outline-2 focus:visible:outline-offset-2 focus:visible:outline-indigo-600">
              <ArrowDownTrayIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              Export
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={exportToPDF}
                      className={`${
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } block w-full px-4 py-2 text-left text-sm`}
                    >
                      Export as PDF
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={exportToExcel}
                      className={`${
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } block w-full px-4 py-2 text-left text-sm`}
                    >
                      Export as Excel
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={exportToCSV}
                      className={`${
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } block w-full px-4 py-2 text-left text-sm`}
                    >
                      Export as CSV
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      
      {/* Admin Section - Rate Setting */}
      <div className="mb-8 p-4 border rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Payout Rates</h3>
          {isAdmin && (
            <button
              onClick={handleRandomize}
              className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ArrowPathIcon className={`h-4 w-4 ${isAnimating ? 'animate-spin' : ''}`} />
              Randomize Rates
            </button>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Article Rate (₹)
            <input
              type="number"
              min="0"
              step="0.01"
              value={rates.articleRate}
              onChange={(e) => setRates(prev => ({
                ...prev,
                articleRate: parseFloat(e.target.value) || 0
              }))}
              disabled={!isAdmin}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 
                ${!isAdmin ? 'bg-gray-100' : ''} 
                ${isAnimating ? 'animate-pulse' : ''}`}
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Blog Rate (₹)
            <input
              type="number"
              min="0"
              step="0.01"
              value={rates.blogRate}
              onChange={(e) => setRates(prev => ({
                ...prev,
                blogRate: parseFloat(e.target.value) || 0
              }))}
              disabled={!isAdmin}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 
                ${!isAdmin ? 'bg-gray-100' : ''} 
                ${isAnimating ? 'animate-pulse' : ''}`}
            />
          </label>
        </div>
      </div>

      {/* Calculator Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Calculate Payout</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Number of Articles
              <input
                type="number"
                min="0"
                value={counts.articles}
                onChange={(e) => setCounts(prev => ({
                  ...prev,
                  articles: parseInt(e.target.value) || 0
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Number of Blogs
              <input
                type="number"
                min="0"
                value={counts.blogs}
                onChange={(e) => setCounts(prev => ({
                  ...prev,
                  blogs: parseInt(e.target.value) || 0
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Total Payout</h3>
        <div className="text-3xl font-bold text-blue-600">
          ₹{totalPayout.toFixed(2)}
        </div>
        <div className="mt-2 text-sm text-gray-600">
          <div>Articles: {counts.articles} × ₹{rates.articleRate.toFixed(2)} = ₹{(counts.articles * rates.articleRate).toFixed(2)}</div>
          <div>Blogs: {counts.blogs} × ₹{rates.blogRate.toFixed(2)} = ₹{(counts.blogs * rates.blogRate).toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
} 