'use client';

import { useOffline } from '@/contexts/OfflineContext';
import { SignalSlashIcon } from '@heroicons/react/24/solid';

export default function OfflineIndicator() {
  const { isOffline, lastUpdated } = useOffline();

  if (!isOffline) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 z-50">
      <SignalSlashIcon className="h-5 w-5" />
      <div>
        <p className="font-medium">You're offline</p>
        <p className="text-sm">
          Last updated: {lastUpdated?.toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
} 