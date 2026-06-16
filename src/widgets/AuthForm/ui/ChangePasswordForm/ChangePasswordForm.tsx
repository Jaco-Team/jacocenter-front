import './ChangePasswordForm.styles.css';
import { BaseForm } from '../BaseForm/BaseForm';
import { Typography } from '@/shared/ui/Typography/Typography';
import { PasswordInput } from '@/shared/ui/PasswordInput/PasswordInput';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/entities/auth/store/authStore/authStore';

export const ChangePasswordForm = () => {
  const router = useRouter();
  const newPassword = useAuthStore((s) => s.newPassword);
  const repeatNewPassword = useAuthStore((s) => s.repeatNewPassword);
  const setNewPassword = useAuthStore((s) => s.setNewPassword);
  const setRepeatNewPassword = useAuthStore((s) => s.setRepeatNewPassword);
  const reset = useAuthStore((s) => s.reset);

  const subTitle = () => {
    return (
      <>
        <Typography variant='body-l-medium-20'>
          Придумайте новый пароль
        </Typography>
        <Typography variant='body-m-regular-16'>
          Пароль должен быть не короче 8 символов, содержать заглавные буквы и цифры
        </Typography>
      </>
    )
  }

  const inputs = () => {
    return (
      <>
        <PasswordInput
          placeholder='Введите пароль'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className='input'
        />
        <PasswordInput
          placeholder='Повторите пароль'
          value={repeatNewPassword}
          onChange={(e) => setRepeatNewPassword(e.target.value)}
          className='input'
        />
      </>
    )
  };

  const text = () => {
    return (
      <Typography variant='body-m-regular-16'>
        Получить новый можно через 00:59
      </Typography>
    )
  }

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    reset();
    router.replace('/auth/sign-in');
  };
  
  return (
    <BaseForm
      title='Авторизация'
      buttonText='Создать пароль'
      subTitle={subTitle}
      inputs={inputs}
      text={text}
      onSubmit={handleSubmit}
    />
  )
}