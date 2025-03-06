'use client';

import { ReactNode } from 'react';
import { store } from '@/store';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        {children}
      </Provider>
    </SessionProvider>
  );
}