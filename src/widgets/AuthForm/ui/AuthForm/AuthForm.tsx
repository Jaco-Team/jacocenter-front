'use client';
import './AuthForm.styles.css';
import { Input } from '@/shared/ui/Input/Input';
import { BaseForm } from '../BaseForm/BaseForm';
import { PasswordInput } from '@/shared/ui/PasswordInput/PasswordInput';
import { Typography } from '@/shared/ui/Typography/Typography';
import { useAuthStore } from '@/entities/auth/store/authStore/authStore';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ModalAccessDenied } from '@/features/auth/ui/ModalAccessDenied/ModalAccessDenied';

export const AuthForm = () => {
  const phone = useAuthStore((s) => s.phone);
  const password = useAuthStore((s) => s.password);
  const setPhone = useAuthStore((s) => s.setPhone);
  const setPassword = useAuthStore((s) => s.setPassword);
  const reset = useAuthStore((s) => s.reset);
  const [isAccessDeniedOpen, setIsAccessDeniedOpen] = useState(false);

  const inputs = () => {
    return (
      <>
        <Input 
          placeholder='Введите номер телефона'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className='input'
        />
        <PasswordInput
          placeholder='Пароль'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='password-input'
        />
      </>
    )
  };

  const link = () => {
    return (
      <Typography variant='body-m-regular-16' className='link'>
        <a href='/auth/phone'>Забыли пароль?</a>
      </Typography>
    )
  };

  const router = useRouter();

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!phone || !password) {
      setIsAccessDeniedOpen(true);
      return;
    }

    localStorage.setItem('auth', 'true');

    reset();

    router.push('/orders');
  };
  
  return (
    <>
      <BaseForm
        title='Авторизация'
        buttonText='Войти'
        inputs={inputs}
        link={link}
        onSubmit={handleSubmit}
      />
      <ModalAccessDenied
        isOpen={isAccessDeniedOpen}
        onClose={() => setIsAccessDeniedOpen(false)}
      />
    </>
  )
}