'use client'
import React, { useEffect, useRef, useState } from 'react';
import { ISelectBaseProps } from './SelectBase.types';
import './SelectBase.styles.css';
import Image from 'next/image';


export const SelectBase: React.FC<ISelectBaseProps> = ({
  value,
  placeholder = 'Город',
  isOpen = false,
  className = '',
  options = [],
  onToggle,
  onSelect
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);
  const visibleOptions = showAll ? options : options.slice(0, 4);

  const handleClick = () => {
    onToggle?.();
  };

  const handleSelect = (option: string) => {
    onSelect?.(option);
    onToggle?.();
  };

  useEffect(() => {
    if (!isOpen) {
      setShowAll(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onToggle?.();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        rootRef.current &&
        !rootRef.current.contains(event.target as Node)
      ) {
        if (isOpen) {
          onToggle?.();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onToggle]);

  return (
    <div ref={rootRef} className={`select-base ${className}`}>
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

      {isOpen && (
        <ul className='select-base__dropdown'>
          {visibleOptions.map((option) => (
            <li
              key={option}
              className='select-base__option'
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
          {options.length > 4 && (
            <li
              className='select-base__option select-base__option--all'
              onClick={() => setShowAll(prev => !prev)}
            >
              {showAll ? 'Свернуть тут' : 'Все кафе'}
            </li>
          )}
        </ul>
      )}
    </div>
  );
};