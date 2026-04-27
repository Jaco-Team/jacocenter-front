import './AuthForm.styles.css';
import { Input } from '@/shared/ui/Input/Input';
import { BaseForm } from '../BaseForm/BaseForm';
import { PasswordInput } from '@/shared/ui/PasswordInput/PasswordInput';
import { Typography } from '@/shared/ui/Typography/Typography';
import { useAuthStore } from '@/entities/auth/store/authStore/authStore';

export const AuthForm = () => {
  const phone = useAuthStore((s) => s.phone);
  const password = useAuthStore((s) => s.password);
  const setPhone = useAuthStore((s) => s.setPhone);
  const setPassword = useAuthStore((s) => s.setPassword);
  const reset = useAuthStore((s) => s.reset);

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

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    reset();
  };
  
  return (
    <BaseForm
      title='Авторизация'
      buttonText='Войти'
      inputs={inputs}
      link={link}
      onSubmit={handleSubmit}
    />
  )
}