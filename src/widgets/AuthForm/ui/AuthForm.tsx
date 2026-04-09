import React from 'react';
import './AuthForm.styles.css';
import { IAuthFormProps } from './AuthForm.types';
import Image from 'next/image';
import { Button } from '@/shared/ui/Button/Button';
import { Typography } from '@/shared/ui/Typography/Typography';

export const AuthForm: React.FC<IAuthFormProps> = ({
  title,
  subTitle,
  inputs,
  text,
  link,
  buttonText,
  onSubmit,
  className,
}) => {
  return (
    <div className='auth-wrapper'>
      <form 
        className={`auth-form ${className}`} 
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit?.(e)}
        }
      >
        <header className='auth-header'>
          <Image
            src='/icons/logo.svg'
            alt='Лого'
            width={154}
            height={62}
            className='auth-logo'
          />
          <Typography
            variant='heading-l-regular-20'
            className='auth-title'
          >
            {title}
          </Typography>
        </header>

        <div className='auth-body'>
          {subTitle && <div className='auth-subtitle'>{subTitle()}</div>}
          {inputs && <div className='auth-input'>{inputs()}</div>}
          {text && <div className='auth-text'>{text()}</div>}
          {link && <div className='auth-link'>{link()}</div>}
          <Button 
            variant='base'
            theme='error'
            type='submit'
          >
            <Typography variant='body-l-medium-20'>
              {buttonText}
            </Typography>
          </Button>
        </div>
      </form>
    </div>
  );
};
