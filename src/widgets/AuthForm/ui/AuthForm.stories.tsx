import type { Meta, StoryObj } from '@storybook/nextjs';
import { AuthForm } from './AuthForm';
import { Input } from '@/shared/ui/Input/Input';
import { Typography } from '../../../shared/ui/Typography/Typography';
import { PasswordInput } from '@/shared/ui/PasswordInput/PasswordInput';

const meta = {
  title: 'Widgets/AuthForm',
  component: AuthForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AuthForm>;

export default meta;

type Story = StoryObj<typeof AuthForm>;


export const Login: Story = {
  args: {
    title: 'Авторизация',
    buttonText: 'Войти',

    inputs: () => (
      <>
        <Input 
          placeholder="Введите номер телефона"
          value=''
          onChange={() => {}}
          className='h-13 border border-none !rounded-xl bg-gray-100 focus:bg-white'
        />
        <PasswordInput
          placeholder='Пароль'
          value=''
          onChange={() => {}}
          className='border border-none'
        />
      </>
    ),

    link: () => (
      <Typography variant="body-m-regular-16" className='w-full text-right'>
        <a href='\'>Забыли пароль?</a>
      </Typography>
    ),
  },
};

export const WithValue: Story = {
  args: {
    title: 'Авторизация',
    buttonText: 'Войти',

    inputs: () => (
      <>
        <Input 
          placeholder="Введите номер телефона"
          value=''
          onChange={() => {}}
          className='h-13 border border-none !rounded-xl bg-gray-100 focus:bg-white'
        />
        <PasswordInput
          placeholder='Пароль'
          value='zxcvbn'
          onChange={() => {}}
          className='border border-none outline active:outline-gray-100'
        />
      </>
    ),

    link: () => (
      <Typography variant="body-m-regular-16" className='w-full text-right'>
        <a href='\'>Забыли пароль?</a>
      </Typography>
    ),
  },
};

export const InputPhone: Story = {
  args: {
    title: 'Авторизация',
    buttonText: 'Войти',

    subTitle: () => (
      <Typography variant='body-l-medium-20'>
        Введите номер телефона
      </Typography>
    ),

    inputs: () => (
      <>
        <Input
          placeholder="+7"
          value='' type="password" 
          onChange={() => {}}
          className='h-13 border border-none !rounded-xl bg-gray-100 focus:bg-white'/>
      </>
    ),
  },
};

export const InputCode: Story = {
  args: {
    title: 'Авторизация',
    buttonText: 'Далее',

    subTitle: () => (
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
    ),

    inputs: () => (
      <>
        <Input
          placeholder="Введите код"
          value=''
          type="password"
          onChange={() => {}}
          className='h-13 border border-none !rounded-xl bg-gray-100 focus:bg-white'/>
      </>
    ),

    text: () => (
      <Typography variant='body-m-regular-16'>
        Получить новый можно через 00:59
      </Typography>
    ),
  },
};

export const NewPassword: Story = {
  args: {
    title: 'Авторизация',
    buttonText: 'Создать пароль',

    subTitle: () => (
      <>
      <Typography variant='body-l-medium-20'>
        Придумайте новый пароль
      </Typography>
      <Typography variant='body-m-regular-16'>
        Пароль должен быть не короче 8 символов, содержать заглавные буквы и цифры
      </Typography>
      </>
    ),

    inputs: () => (
      <>
        <PasswordInput
          placeholder='Введите пароль'
          value=''
          onChange={() => {}}
          className='border border-none'
        />
        <PasswordInput
          placeholder='Повторите пароль'
          value=''
          onChange={() => {}}
          className='border border-none'
        />
      </>
    ),

    text: () => (
      <Typography variant='body-m-regular-16'>
        Получить новый можно через 00:59
      </Typography>
    ),
  },
};