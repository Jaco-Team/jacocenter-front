import './AuthForm.styles.css';
import { Input } from '@/shared/ui/Input/Input';
import { BaseForm } from '../BaseForm/BaseForm';
import { PasswordInput } from '@/shared/ui/PasswordInput/PasswordInput';
import { Typography } from '@/shared/ui/Typography/Typography';

export const AuthForm = () => {
  const inputs = () => {
    return (
      <>
        <Input 
          placeholder='Введите номер телефона'
          value=''
          onChange={() => {}}
          className='input'
        />
        <PasswordInput
          placeholder='Пароль'
          value=''
          onChange={() => {}}
          className='password-input'
        />
      </>
    )
  };

  const link = () => {
    return (
      <Typography variant='body-m-regular-16' className='link'>
        <a href='\'>Забыли пароль?</a>
      </Typography>
    )
  };
  
  return (
    <BaseForm
      title='Авторизация'
      buttonText='Войти'
      inputs={inputs}
      link={link}
    />
  )
}