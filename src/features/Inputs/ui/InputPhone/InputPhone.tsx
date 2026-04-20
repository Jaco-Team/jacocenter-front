import React, { forwardRef, useEffect, useState } from 'react';
import { Input } from '@/shared/ui/Input/Input';
import { IInputPhoneUIProps } from './InputPhone.types';
import './InputPhone.styles.css';
import Image from 'next/image';

const formatPhone = (digits: string) => {
  const part1 = digits.slice(0, 3);
  const part2 = digits.slice(3, 6);
  const part3 = digits.slice(6, 8);
  const part4 = digits.slice(8, 10);

  let formatted = '';

  if (part1) formatted += part1;
  if (part2) formatted += ` ${part2}`;
  if (part3) formatted += `-${part3}`;
  if (part4) formatted += `-${part4}`;

  return formatted;
};

export const InputPhone = forwardRef<HTMLInputElement, IInputPhoneUIProps>(
  (
    {
      onChange,
      value,
      withSearchIcon = false,
      searchIconSrc,
      className,
      ...props
    },
    ref
  ) => {
    const [digits, setDigits] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const onlyDigits = e.target.value.replace(/\D/g, '').slice(0, 10);

      setDigits(onlyDigits);
      onChange?.(`7${onlyDigits}`);
    };

    const clearInput = () => {
      setDigits('');
      onChange?.('7');
    }

    const formatted = formatPhone(digits);
    const clear = digits.length > 0;

    useEffect(() => {
      if (value !== undefined) {
        const cleaned = value.replace(/^7/, '')
        setDigits(cleaned);
      }
    }, [value]);

    return (
      <div className='phone-root'>
        {withSearchIcon && (
          <div className='phone-icon'>
            <Image
              src='/icons/search.svg'
              alt='Поиск'
              width={16}
              height={16} />
          </div>
        )}

        <span className={`phone-prefix ${withSearchIcon ? 'with-icon' : ''}`}>
          +7
        </span>

        <Input
          ref={ref}
          type='tel'
          value={formatted}
          onChange={handleChange}
          className={`phone-input ${withSearchIcon ? 'with-icon' : ''} ${className}`}
          placeholder='999 999-99-99'
          {...props}
        />

        {clear && (
          <button
            type='button'
            className='phone-clear'
            onClick={clearInput}
            onMouseDown={(e) => e.preventDefault()}
            aria-label='Очистить'
          >
            <Image
              src='/icons/button-close.svg'
              alt='Очистить'
              width={14}
              height={14} />
          </button>
        )}
      </div>
    );
  }
);