'use client'
import { useState } from 'react';
import './HeaderOrders.styles.css';
import { SelectTown } from '@/shared/ui/SelectTown/SelectTown';
import { InputPhone } from '@/features/Inputs/ui/InputPhone/InputPhone';
import { Button } from '@/shared/ui/Button/Button';
import { IHeaderOrdersProps } from './HeaderOrders.types';
import { Input } from '@/shared/ui/Input/Input';
import Image from 'next/image';
import { Calendar } from '@/shared/ui/Calendar/Calendar';
import { format } from 'date-fns';
import { useDateMask } from '@/shared/hooks/useDateMask';
import { useOrdersStore } from '@/entities/Order/store/orders/ordersStore';

export const HeaderOrders = ({
  cities,
  phoneCheck,
  onSubmit
}: IHeaderOrdersProps) => {

  const { date, setDate } = useOrdersStore();

  const [city, setCity] = useState<string>();
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  const { ref: dateRef, setValue: setDateValue } = useDateMask(
    (val) => setDate(val),
    date,
  );

  const calendarDate = (() => {
    const [d, m, y] = date.split('.').map(Number);
    if (!d || !m || !y || y < 1000) return undefined;
    const parsed = new Date(y, m - 1, d);
    return isNaN(parsed.getTime()) ? undefined : parsed;
  })();

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
        <div className='header-orders__date-container'>
          <Input
            ref={dateRef}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder='Выберите дату'
            className='header-orders__date-input'
          />
          <button 
            type="button" 
            className="header-orders__calendar-icon"
            popoverTarget="date-calendar"
            style={{ anchorName: '--date-calendar' }}
          >
            <Image src="/icons/calendar.svg" alt="Календарь" width={20} height={20}/>
          </button>
          <div 
            id="date-calendar" 
            popover="auto"
            className="header-orders__calendar-dropdown"
            style={{ positionAnchor: '--date-calendar' }}
          >
            <Calendar 
              key={date}
              value={calendarDate} 
              defaultMonth={calendarDate ?? new Date()}
              onChange={(day) => {
                if (!day) return;
                setDate(format(day, "dd.MM.yyyy"));
                setDateValue(format(day, "dd.MM.yyyy"));
                document.getElementById('date-calendar')?.hidePopover();
              }}
            />
          </div>
        </div>
        <InputPhone
          placeholder=''
          value={phone}
          onChange={setPhone}
          error={phoneCheck === 'error' ? 'Клиент с таким номером не найден': ''}
          withSearchIcon
          className='w-[263px] shrink-0 border-none'
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