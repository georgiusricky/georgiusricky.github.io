"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLoadingStore } from '@/stores/loadingStore';

export default function LoadingStateManager() {
  const pathname = usePathname();
  const setLoading = useLoadingStore((state) => state.setLoading);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [pathname, setLoading]);

  return null;
}