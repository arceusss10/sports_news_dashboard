'use client';

import NewsSection from '@/components/Dashboard/NewsSection'
import PayoutCalculator from '@/components/Dashboard/PayoutCalculator'
import LoginForm from '@/components/Auth/LoginForm'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* News Section - Takes up 2/3 of the space on large screens */}
          <div className="lg:col-span-2">
            <NewsSection />
          </div>
          
          {/* Right Column - Takes up 1/3 of the space on large screens */}
          <div className="lg:col-span-1 space-y-8">
            {/* Login Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">Account Access</h2>
              <LoginForm />
            </div>
            
            {/* Payout Calculator */}
            <PayoutCalculator />
          </div>
        </div>
      </main>
    </div>
  )
}
