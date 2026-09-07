'use client';

import { useEffect } from 'react';
import { useSessionStore } from '@/entities/auth/store/sessionStore/sessionStore';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const bootstrap = useSessionStore((s) => s.bootstrap);

  useEffect(() => {
    void bootstrap();
  }, [bootstrap]);

  return children;
}
