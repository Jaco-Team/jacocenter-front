import type { Meta, StoryObj } from '@storybook/nextjs';
import { BaseForm } from './BaseForm';
import { Input } from '@/shared/ui/Input/Input';
import { Typography } from '../../../../shared/ui/Typography/Typography';
import { PasswordInput } from '@/shared/ui/PasswordInput/PasswordInput';

const meta = {
  title: 'Widgets/AuthForm/ui/BaseForm',
  component: BaseForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BaseForm>;

export default meta;

type Story = StoryObj<typeof BaseForm>;


export const Login: Story = {
  args: {
    title: 'Авторизация',
    buttonText: 'Войти',

    inputs: () => (
      <>
        <Input 
          placeholder='Введите номер телефона'
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
      <Typography variant='body-m-regular-16' className='w-full text-right'>
        <a href='\'>Забыли пароль?</a>
      </Typography>
    ),
  },
};
