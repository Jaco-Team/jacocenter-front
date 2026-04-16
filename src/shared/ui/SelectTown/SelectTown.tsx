import React, { useEffect, useState } from 'react';
import { ISelectTownProps } from './SelectTown.types';
import { SelectBase } from '../SelectBase/SelectBase';
import Image from 'next/image';
import './SelectTown.styles.css';

export const SelectTown = ({
  onSelect,
  value,
  placeholder='Город',
  options = [],
  ...rest
}: ISelectTownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [internalValue, setInternalValue] = useState<string | undefined>();

  const visibleOptions = showAll ? options : options.slice(0, 4);
  const currentValue = value ?? internalValue;

  const handleSelect = (option: string) => {
    setInternalValue(option);
    onSelect?.(option);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      setShowAll(false);
    };
  }, [isOpen]);

  return (
    <SelectBase
      placeholder={placeholder}
      value={currentValue}
      icon={
        <Image
          src={'/icons/arrow-down.svg'}
          width={20}
          height={20}
          alt='Стрелка расскрытия списка'
        />
      }
      rotateIcon
      dropdownClassName='w-full left-0'
      isOpen={isOpen}
      onToggle={() => setIsOpen(prev => !prev)}
      {...rest}
    >
      <ul className='select-town__dropdown'>
        {visibleOptions.map((option:string) => (
          <li
            key={option}
            className='select-town__option'
            onClick={() => handleSelect(option)}
          >
            {option}
          </li>
        ))}
        {options.length > 4 && (
          <li
            className='select-town__option select-town__option--all'
            onClick={() => setShowAll(prev => !prev)}
          >
            {showAll ? 'Свернуть тут' : 'Все кафе'}
          </li>
        )}
      </ul>
    </SelectBase>
  )
}