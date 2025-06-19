'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import NewsSection from './NewsSection'
import PayoutSection from './PayoutSection'
import Sidebar from './Sidebar'
import { RootState } from '@/lib/store'

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isLoading = useSelector((state: RootState) => state.news.loading)

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <div className="py-4">
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <NewsSection />
                  <PayoutSection />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 