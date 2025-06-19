'use client';

import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';

interface NewsItem {
  title: string;
  description: string;
  source: string;
  date: string;
  image?: string;
  url: string;
}

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <FaFilter className="text-gray-500 dark:text-gray-400" />
              <span>Filters</span>
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              {/* Add your filter options here */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option value="">All Categories</option>
                  <option value="football">Football</option>
                  <option value="cricket">Cricket</option>
                  <option value="tennis">Tennis</option>
                </select>
                <select className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option value="">All Sources</option>
                  <option value="espn">ESPN</option>
                  <option value="sky">Sky Sports</option>
                  <option value="bbc">BBC Sport</option>
                </select>
                <select className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option value="">Date Range</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sample News Cards - Replace with actual data */}
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <article key={item} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={`https://source.unsplash.com/random/800x450?sports&${item}`}
                  alt="News thumbnail"
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  Sample Sports News Headline {item}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  This is a sample news description. Replace this with actual news content from your API or data source.
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>Sports Source</span>
                  <span>2 hours ago</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
} 