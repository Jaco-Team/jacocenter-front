'use client'
import { useEffect, useRef, useState } from 'react';
import { ISelectBaseProps } from './SelectBase.types';
import './SelectBase.styles.css';


export const SelectBase = ({
  value,
  placeholder = '',
  isOpen = false,
  className = '',
  icon,
  rotateIcon = false,
  dropdownClassName,
  onToggle,
  children
}: ISelectBaseProps) => {
  const rootRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    onToggle?.();
  };

  useEffect(() => {

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
        type='button'
        className={`select-base__trigger ${isOpen ? 'select-base--open' : ''}`}
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
          {icon && (
          <span
            className={`
              select-base__icon
              ${rotateIcon && isOpen ? 'select-base__icon--rotated' : ''}
            `}
          >
            {icon}
          </span>
        )}
      </button>

      {isOpen && (
        <div className={`select-base__dropdown ${dropdownClassName ?? ''}`}>
          {children}
        </div>
      )}
    </div>
  );
};