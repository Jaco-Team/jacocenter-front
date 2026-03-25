import './ConfirmPhoneForm.styles.css';
import { Input } from '@/shared/ui/Input/Input';
import { BaseForm } from '../BaseForm/BaseForm';
import { Typography } from '@/shared/ui/Typography/Typography';

export const ConfirmPhoneForm = () => {
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
              +79111234567
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
        value=''
        type='password'
        onChange={() => {}}
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
  
  return (
    <BaseForm
      title='Авторизация'
      buttonText='Далее'
      subTitle={subTitle}
      inputs={inputs}
      text={text}
    />
  )
}