'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface OfflineContextType {
  isOffline: boolean;
  lastUpdated: Date | null;
}

const OfflineContext = createContext<OfflineContextType>({
  isOffline: false,
  lastUpdated: null,
});

export const useOffline = () => useContext(OfflineContext);

export function OfflineProvider({ children }: { children: React.ReactNode }) {
  const [isOffline, setIsOffline] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    // Check initial online status
    setIsOffline(!navigator.onLine);
    setLastUpdated(new Date());

    // Add event listeners for online/offline status
    const handleOnline = () => {
      setIsOffline(false);
      setLastUpdated(new Date());
    };

    const handleOffline = () => {
      setIsOffline(true);
      setLastUpdated(new Date());
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <OfflineContext.Provider value={{ isOffline, lastUpdated }}>
      {children}
    </OfflineContext.Provider>
  );
} 