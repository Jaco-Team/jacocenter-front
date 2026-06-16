import './ConfirmPhoneForm.styles.css';
import { Input } from '@/shared/ui/Input/Input';
import { BaseForm } from '../BaseForm/BaseForm';
import { Typography } from '@/shared/ui/Typography/Typography';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/entities/auth/store/authStore/authStore';

export const ConfirmPhoneForm = () => {
  const router = useRouter();
  const phone = useAuthStore((s) => s.phone);
  const code = useAuthStore((s) => s.code);
  const setCode = useAuthStore((s) => s.setCode);

  const subTitle = () => {
    return (
      <>
        <Typography variant='body-l-medium-20'>
            Введите код из смс
        </Typography>
        <Typography variant='body-m-regular-16'>
            Отправили код на&nbsp;
            <span>
            <Typography variant='heading-l-regular-20'>
              {phone}
            </Typography>
            </span>
        </Typography>
      </>
    )
  }

  const inputs = () => {
    return (
      <Input
        placeholder='Введите код'
        value={code}
        type='password'
        onChange={(e) => setCode(e.target.value)}
        className='input'
      />
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
    router.replace('/auth/new-password');
  };
  
  return (
    <BaseForm
      title='Авторизация'
      buttonText='Далее'
      subTitle={subTitle}
      inputs={inputs}
      text={text}
      onSubmit={handleSubmit}
    />
  )
}