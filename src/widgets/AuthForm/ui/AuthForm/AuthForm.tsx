'use client';
import './AuthForm.styles.css';
import { Input } from '@/shared/ui/Input/Input';
import { BaseForm } from '../BaseForm/BaseForm';
import { PasswordInput } from '@/shared/ui/PasswordInput/PasswordInput';
import { Typography } from '@/shared/ui/Typography/Typography';
import { useAuthStore } from '@/entities/auth/store/authStore/authStore';
import { useSessionStore } from '@/entities/auth/store/sessionStore/sessionStore';
import { ApiError } from '@/shared/api/http';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ModalAccessDenied } from '@/features/auth/ui/ModalAccessDenied/ModalAccessDenied';

export const AuthForm = () => {
  const login = useAuthStore((s) => s.login);
  const password = useAuthStore((s) => s.password);
  const setLogin = useAuthStore((s) => s.setLogin);
  const setPassword = useAuthStore((s) => s.setPassword);
  const reset = useAuthStore((s) => s.reset);
  const signIn = useSessionStore((s) => s.login);
  const [isAccessDeniedOpen, setIsAccessDeniedOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');

  const inputs = () => {
    return (
      <>
        <Input 
          placeholder='Логин'
          value={login}
          autoComplete='username'
          onChange={(e) => {
            setLogin(e.target.value);
            setLoginError('');
            setFormError('');
          }}
          error={loginError}
          className='input'
        />
        <PasswordInput
          placeholder='Пароль'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError('');
            setFormError('');
          }}
          error={passwordError}
          className='password-input'
        />
        {formError && (
          <Typography variant='body-m-regular-16' className='text-[var(--color-error)]'>
            {formError}
          </Typography>
        )}
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

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const nextLoginError = login.trim() ? '' : 'Введите логин';
    const nextPasswordError = password ? '' : 'Введите пароль';

    setLoginError(nextLoginError);
    setPasswordError(nextPasswordError);
    setFormError('');

    if (nextLoginError || nextPasswordError) {
      return;
    }

    setIsSubmitting(true);

    try {
      await signIn(login.trim(), password);
      reset();
      router.push('/orders');
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 429) {
          setFormError(error.message);
          return;
        }

        if (error.status === 403) {
          setIsAccessDeniedOpen(true);
          return;
        }

        if (error.status === 401) {
          setFormError(error.message);
          return;
        }

        setFormError(error.message);
        return;
      }

      setFormError('Не удалось войти. Проверьте соединение с сервером.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
      <BaseForm
        title='Авторизация'
        buttonText='Войти'
        inputs={inputs}
        link={link}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
      <ModalAccessDenied
        isOpen={isAccessDeniedOpen}
        onClose={() => setIsAccessDeniedOpen(false)}
      />
    </>
  )
}
