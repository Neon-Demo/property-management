'use client';

import { useState, useEffect } from 'react';

export function useOfflineDetection() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Set up initial status
    setIsOffline(!navigator.onLine);

    // Set up event listeners
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Clean up event listeners
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOffline;
}