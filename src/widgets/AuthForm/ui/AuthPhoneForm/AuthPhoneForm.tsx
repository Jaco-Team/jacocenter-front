import './AuthPhoneForm.styles.css';
import { Input } from '@/shared/ui/Input/Input';
import { BaseForm } from '../BaseForm/BaseForm';
import { Typography } from '@/shared/ui/Typography/Typography';

export const AuthPhoneForm = () => {
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
        value=''
        type="password" 
        onChange={() => {}}
        className='input'
      />
    )
  };
  
  return (
    <BaseForm
      title='Авторизация'
      buttonText='Далее'
      subTitle={subTitle}
      inputs={inputs}
    />
  )
}