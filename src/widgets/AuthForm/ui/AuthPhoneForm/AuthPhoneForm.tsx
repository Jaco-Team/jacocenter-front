import './AuthPhoneForm.styles.css';
import { Input } from '@/shared/ui/Input/Input';
import { BaseForm } from '../BaseForm/BaseForm';
import { Typography } from '@/shared/ui/Typography/Typography';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/entities/auth/store/authStore/authStore';

export const AuthPhoneForm = () => {
  const router = useRouter();
  const phone = useAuthStore((s) => s.phone);
  const setPhone = useAuthStore((s) => s.setPhone);

  const subTitle = () => {
    return (
      <Typography variant='body-l-medium-20'>
        Введите номер телефона
      </Typography>
    )
  }

  const inputs = () => {
    return (
      <Input
        placeholder="+7"
        value={phone}
        type="tel" 
        onChange={(e) => setPhone(e.target.value)}
        className='input'
      />
    )
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    router.push('/auth/code');
  };
  
  return (
    <BaseForm
      title='Авторизация'
      buttonText='Далее'
      subTitle={subTitle}
      inputs={inputs}
      onSubmit={handleSubmit}
    />
  )
}