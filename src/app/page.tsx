'use client';
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useSessionStore } from '@/entities/auth/store/sessionStore/sessionStore';

export default function Home() {
  const router = useRouter();
  const status = useSessionStore((s) => s.status);
  const token = useSessionStore((s) => s.token);

  useEffect(() => {
    if (status !== 'ready') {
      return;
    }

    router.replace(token ? '/orders' : '/auth/sign-in');
  }, [router, status, token]);

  return (
    <div className="flex min-h-screen items-center justify-center text-[var(--color-text-secondary)]">
      Загрузка...
    </div>
  );
}