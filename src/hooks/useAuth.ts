'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useAuth(requireAdmin = false) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isAdmin = session?.user?.role === 'admin';
  const isAuthenticated = status === 'authenticated';
  const isLoading = status === 'loading';

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/auth/signin');
      } else if (requireAdmin && !isAdmin) {
        router.push('/');
      }
    }
  }, [isAuthenticated, isAdmin, isLoading, requireAdmin, router]);

  return {
    session,
    isAdmin,
    isAuthenticated,
    isLoading,
  };
} 