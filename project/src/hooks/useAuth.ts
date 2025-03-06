'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, logout } from '@/store/slices/authSlice';

export function useAuth() {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (session?.user) {
      dispatch(setUser(session.user));
    } else if (status === 'unauthenticated') {
      dispatch(logout());
    }
  }, [session, status, dispatch]);

  return {
    user: session?.user,
    status,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    signIn,
    signOut,
  };
}