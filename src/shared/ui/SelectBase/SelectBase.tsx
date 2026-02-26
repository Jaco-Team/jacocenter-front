import React from 'react';
import { ISelectBaseProps } from './SelectBase.types';
import './SelectBase.styles.css';
import Image from 'next/image';


export const SelectBase: React.FC<ISelectBaseProps> = ({
  value,
  placeholder = 'Город',
  isOpen = false,
  className = '',
  onToggle,
}) => {
  const handleClick = () => {
    if (onToggle) {
      onToggle();
    };
  }

  return (
    <div className={`select-base ${className}`}>
      <button
        type="button"
        className={`
          select-base__trigger
          ${isOpen ? 'select-base--open' : ''}
        `}
        onClick={handleClick}
        aria-expanded={isOpen}
      >

        <span
          className={
            value
              ? 'select-base__value'
              : 'select-base__placeholder'
          }
        >
          {value || placeholder}
        </span>

          <Image
            src='/icons/arrow-down.svg'
            alt='Стрелка расскрытия списка'
            width={20}
            height={20}
            className={`
                select-base__chevron
                ${isOpen ? 'select-base__chevron--open' : ''}
            `}
          />
      </button>
    </div>
  );
};