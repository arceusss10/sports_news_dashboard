'use client';

import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from '@/components/Common/LoadingSpinner';

export default function AdminDashboard() {
  const { session, isLoading } = useAuth(true);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Users
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Manage user accounts and permissions
          </p>
        </div>
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Content
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Manage news articles and live scores
          </p>
        </div>
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Settings
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Configure website settings and preferences
          </p>
        </div>
      </div>
    </div>
  );
} 