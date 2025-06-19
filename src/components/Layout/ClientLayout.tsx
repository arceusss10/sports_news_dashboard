'use client';

import React from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import MobileNav from '@/components/Navigation/MobileNav';
import DesktopNav from '@/components/Navigation/DesktopNav';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen transition-colors duration-200 bg-white dark:bg-gray-900">
          {/* Navigation */}
          <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow transition-colors duration-200">
            <div className="sm:hidden">
              <MobileNav />
            </div>
            <div className="hidden sm:block">
              <DesktopNav />
            </div>
          </header>
          
          {/* Main Content */}
          <main className="container mx-auto px-4 py-8">
            <div className="text-gray-900 dark:text-gray-100 transition-colors duration-200">
              {children}
            </div>
          </main>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
} 