import './ChangePasswordForm.styles.css';
import { BaseForm } from '../BaseForm/BaseForm';
import { Typography } from '@/shared/ui/Typography/Typography';
import { PasswordInput } from '@/shared/ui/PasswordInput/PasswordInput';

export const ChangePasswordForm = () => {
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
          value=''
          onChange={() => {}}
          className='input'
        />
        <PasswordInput
          placeholder='Повторите пароль'
          value=''
          onChange={() => {}}
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
  
  return (
    <BaseForm
      title='Авторизация'
      buttonText='Создать пароль'
      subTitle={subTitle}
      inputs={inputs}
      text={text}
    />
  )
}