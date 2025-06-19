'use client'

import React, { useState, useEffect } from 'react'
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline'
import ArticleDetail from './ArticleDetail'
import { fetchSportsNews, searchSportsNews, fetchNewsByCategory, type NewsArticle } from '@/lib/newsApi'
import ErrorMessage from '@/components/Common/ErrorMessage'

interface Filters {
  category: string
  dateRange: {
    start: string
    end: string
  }
}

const categories = [
  'All',
  'Football',
  'Cricket',
  'Tennis',
  'Basketball',
  'Formula 1',
  'Golf',
  'Rugby'
]

export default function NewsSection() {
  const [searchQuery, setSearchQuery] = useState('')
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    category: 'All',
    dateRange: {
      start: '',
      end: new Date().toISOString().split('T')[0]
    }
  })
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null)

  const fetchNews = async () => {
    if (!process.env.NEXT_PUBLIC_NEWS_API_KEY) {
      setError('News API key is not configured')
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      // Construct search query with category if not 'All'
      const searchTerm = filters.category !== 'All' 
        ? `${searchQuery} ${filters.category} sports`
        : `${searchQuery || 'sports'}`

      // Add date range if specified
      let dateQuery = ''
      if (filters.dateRange.start) {
        dateQuery = `&from=${filters.dateRange.start}&to=${filters.dateRange.end || new Date().toISOString().split('T')[0]}`
      }
      
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchTerm)}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}&pageSize=12&language=en&sortBy=publishedAt${dateQuery}`
      )
      
      if (!response.ok) {
        throw new Error('Failed to fetch news')
      }
      
      const data = await response.json()
      
      if (data.status === 'error') {
        throw new Error(data.message)
      }
      
      setArticles(data.articles || [])
    } catch (err) {
      setError('Unable to load sports news. Please try again later.')
      console.error('Error fetching news:', err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch news on initial load and when filters change
  useEffect(() => {
    fetchNews()
  }, [filters.category])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchNews()
  }

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return <ErrorMessage message={error} retry={fetchNews} />
  }

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Sports News</h2>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="mt-3 inline-flex items-center text-sm font-medium text-gray-700 sm:mt-0 hover:text-indigo-600"
          >
            <FunnelIcon className="mr-2 h-5 w-5" />
            Filters
            {showFilters && <XMarkIcon className="ml-2 h-5 w-5" />}
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sports news..."
              className="flex-1 rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:w-auto w-full"
            >
              Search
            </button>
          </form>

          {/* Filters Section */}
          {showFilters && (
            <div className="rounded-md bg-gray-50 p-4 space-y-4">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setFilters(prev => ({ ...prev, category }))}
                    className={`px-3 py-1 rounded-full text-sm ${
                      filters.category === category
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Date Range Filter */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label htmlFor="start-date" className="block text-sm text-gray-600 mb-1">
                    From Date
                  </label>
                  <input
                    type="date"
                    id="start-date"
                    value={filters.dateRange.start}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      dateRange: { ...prev.dateRange, start: e.target.value }
                    }))}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="end-date" className="block text-sm text-gray-600 mb-1">
                    To Date
                  </label>
                  <input
                    type="date"
                    id="end-date"
                    value={filters.dateRange.end}
                    max={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      dateRange: { ...prev.dateRange, end: e.target.value }
                    }))}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={fetchNews}
                    className="w-full sm:w-auto px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Apply Dates
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* News Grid */}
        {!loading && !error && (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <a
                key={index}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-w-16 aspect-h-9">
                  {article.urlToImage ? (
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No image available</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-500 mb-2">
                    {article.source.name} • {new Date(article.publishedAt).toLocaleDateString()}
                  </p>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {article.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* No Results Message */}
        {!loading && !error && articles.length === 0 && (
          <div className="mt-8 text-center py-12">
            <p className="text-gray-600">No news articles found. Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <ArticleDetail
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  )
} 