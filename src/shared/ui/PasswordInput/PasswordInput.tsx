import React, { forwardRef, useState } from 'react';
import { IPasswordInputUIProps } from './PasswordInput.types';
import { Input } from '../Input/Input';
import './PasswordInput.styles.css';
import Image from 'next/image';

export const PasswordInput = forwardRef<HTMLInputElement, IPasswordInputUIProps>(
  (
    {
      iconSrc,
      className,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = useState(false);

    const togglePassword = () => {
      setVisible((prev) => !prev);
    };

    return (
      <div className="password-root">
        <Input
          ref={ref}
          type={visible ? "text" : "password"}
          className={`password-input ${className}`}
          autoComplete="current-password"
          {...props}
        />

        <button
          type="button"
          className="password-toggle"
          onClick={togglePassword}
          aria-label={"Показать или скрыть пароль"}
        >
          <Image
            src='/icons/eye.svg'
            alt="Показать или скрыть пароль"
            width={20}
            height={20}
          />
        </button>
      </div>
    );
  }
);