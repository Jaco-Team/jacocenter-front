'use client'
import { useState } from 'react';
import './HeaderOrders.styles.css';
import { SelectTown } from '@/shared/ui/SelectTown/SelectTown';
import { SelectDate } from '@/shared/ui/SelectDate/SelectDate';
import { InputPhone } from '@/features/Inputs/ui/InputPhone/InputPhone';
import { Button } from '@/shared/ui/Button/Button';
import { IHeaderOrdersProps } from './HeaderOrders.types';
import { Input } from '@/shared/ui/Input/Input';
import Image from 'next/image';

export const HeaderOrders = ({
  cities,
  phoneCheck,
  onSubmit
}: IHeaderOrdersProps) => {

  const [city, setCity] = useState<string>();
  const [date, setDate] = useState<Date | undefined>();
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    onSubmit?.({
      city,
      date,
      phone,
      address,
    });
  };

  const clearAddress = () => {
    setAddress('');
  };

  return (
    <header>
      <form className='header-orders__form' onSubmit={handleSubmit}>
        <SelectTown
          options={cities}
          value={city}
          onSelect={setCity}
          dropdownClassName='w-full left-0'
          className='w-[196px] shrink-0'
        />
        <SelectDate
          value={date}
          onSelect={setDate}
          dropdownClassName='w-auto right-0'
          className='w-[196px] shrink-0'
        />
        <InputPhone
          placeholder=''
          value={phone}
          onChange={setPhone}
          error={phoneCheck === 'error' ? 'Клиент с таким номером не найден': ''}
          withSearchIcon
          className='w-[263px] shrink-0'
        />
        <div className='header-orders__address w-[381px]'>
          <Image
            src='/icons/search.svg'
            alt='Поиск'
            width={16}
            height={16}
            className='icon-search'
          />
          <Input
            name='address'
            placeholder='Введите адрес клиента'
            value={address}
            onChange={(e)=>{
              setAddress(e.target.value);
            }}
            className='header-orders__address-input'
          />
          {address && (
            <button
              type='button'
              className='phone-clear'
              onClick={clearAddress}
              onMouseDown={(e) => e.preventDefault()}
              aria-label='Очистить'
            >
              <Image
                src='/icons/button-close.svg'
                alt='Очистить'
                width={14}
                height={14}
              />
            </button>
          )}
        </div>
        <Button
          type='submit'
          variant='base'
          theme='primary'
          size='sm'
          className='w-[76px] shrink-0'
        >
          Найти
        </Button>
      </form>
    </header>
  );
};