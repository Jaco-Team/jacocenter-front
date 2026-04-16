'use client'

import { useState } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import './SelectDate.styles.css';
import Image from 'next/image';
import { SelectBase } from '../SelectBase/SelectBase';
import { Calendar } from '@/shared/ui/Calendar/Calendar';
import { ISelectDateProps } from './SelectDate.types';

export const SelectDate = ({
  value,
  onSelect,
  placeholder = 'Выберите дату',
  ...rest
}: ISelectDateProps) => {

  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<Date | undefined>();

  const currentValue = value ?? internalValue;

  const handleSelect = (date: Date | undefined) => {
    setInternalValue(date);
    onSelect?.(date);
    setIsOpen(false);
  };

  return (
    
    <SelectBase
      value={currentValue 
        ? format(currentValue, 'dd.MM.yyyy', { locale: ru })
        : undefined
      }
      placeholder={placeholder}
      isOpen={isOpen}
      onToggle={() => setIsOpen(prev => !prev)}
      dropdownClassName='w-auto right-0'
      icon={
        <Image
          src='/icons/calendar.svg'
          width={20}
          height={20}
          alt='Календарь'
        />
      }
      {...rest}
    >
      <div className='select-date__dropdown'>
        <Calendar
          value={currentValue}
          onChange={handleSelect}
        />
      </div>
    </SelectBase>
    
  );
};