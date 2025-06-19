'use client';

import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import Image from 'next/image';

export default function ProfilePage() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  const user = session?.user;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center space-x-4">
              {user?.image && (
                <div className="relative h-16 w-16 rounded-full overflow-hidden">
                  <Image
                    src={user.image}
                    alt={user.name || 'Profile picture'}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user?.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">{user?.email}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Role: {user?.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 