'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSessionStore } from '@/entities/auth/store/sessionStore/sessionStore';

export function GuestOnly({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const status = useSessionStore((s) => s.status);
  const token = useSessionStore((s) => s.token);

  useEffect(() => {
    if (status === 'ready' && token) {
      router.replace('/orders');
    }
  }, [status, token, router]);

  if (status !== 'ready' || token) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center text-[var(--color-text-secondary)]">
        Загрузка...
      </div>
    );
  }

  return children;
}
