'use client'

import { useState } from 'react'
import { CalendarIcon, UserIcon, NewspaperIcon, LinkIcon } from '@heroicons/react/24/outline'
import type { NewsArticle } from '@/lib/newsApi'

type ArticleDetailProps = {
  article: NewsArticle
  onClose: () => void
}

export default function ArticleDetail({ article, onClose }: ArticleDetailProps) {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">{article.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="px-6 py-4">
          {article.urlToImage && (
            <div className="mb-6">
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}

          <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
            <div className="flex items-center">
              <UserIcon className="h-5 w-5 mr-2" />
              {article.author}
            </div>
            <div className="flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2" />
              {new Date(article.date).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <NewspaperIcon className="h-5 w-5 mr-2" />
              {article.source.name}
            </div>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-700 text-lg mb-4">{article.description}</p>
            <p className="text-gray-700">{article.content}</p>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <LinkIcon className="-ml-1 mr-2 h-5 w-5" />
                Read Full Article
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 