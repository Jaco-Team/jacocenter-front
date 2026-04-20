import { IMask, useIMask, ReactMaskOpts } from "react-imask";
import "./ByTimeTab.style.css";
import { useState } from "react";
import { Input } from "@/shared/ui/Input/Input";
import Image from "next/image";
import { Button } from "@/shared/ui/Button/Button";
import { Text } from "@/shared/ui/Typography/Typography";
import { ModalCalendar } from "@/features/order/ui/ModalCalendar/ModalCalendar";
import { ModalTimeSelect } from "@/features/order/ui/ModalTimeSelect/ModalTimeSelect";
import { useOrderStore } from "@/entities/Order/store/new-order/orderStore";

export const ByTimeTab = () => {
  const { date, time, isTimeSaved } = useOrderStore((s) => s.time);
  const setTime = useOrderStore((s) => s.setTime);

  const [isDateSelectOpen, setIsDateSelectOpen] = useState(false);
  const [isTimeSelectOpen, setIsTimeSelectOpen] = useState(false);

  const { ref: dateRef, setValue: setDateValue } = useDateMask((val) => setTime({ date: val, isTimeSaved: false }));
  const { ref: timeRef, setValue: setTimeValue } = useTimeMask((val) => setTime({ time: val, isTimeSaved: false }));

  const handleClearDate = () => {
    setTime({ date: "", isTimeSaved: false });
    setDateValue(""); 
  };
  
  const handleClearTime = () => {
    setTime({ time: "", isTimeSaved: false }); 
    setTimeValue(""); 
  };

  return (
    <>
      <div className="by-time-container">
        <div className="input-date">
          <Input 
            ref={dateRef} 
            value={date} 
            onChange={(e) => setTime({ date: e.target.value })}
            label="Дата" 
            placeholder="Выберите дату" 
            className="placeholder:text-text-muted"
          />

          <button type="button" className="icon-calendar" onClick={() => setIsDateSelectOpen(true)}>
            <Image
              src="/icons/calendar.svg"
              alt="Календарь"
              width={20}
              height={20}
            />
          </button>

          {date && (<ClearButton onClick={handleClearDate} className="top-[24px] right-[52px]"/>)}
          
        </div>
        <div className="input-time">
          <Input 
            ref={timeRef} 
            value={time} 
            onChange={() => {}} 
            label="Время" 
            placeholder="Выберите время"
            helperText={isTimeSaved ? "Время доставки сохранено" : ""}
            className="placeholder:text-text-muted"
          />

          <button 
            type="button" className="flex items-center justify-center cursor-pointer absolute top-[26px] right-1 w-10 h-10" 
            onClick={() => setIsTimeSelectOpen(true)}
          >
            <Image
              src="/icons/arrow-down.svg"
              alt="Стрелка"
              width={20}
              height={20}
            />    
          </button> 

          {time && (<ClearButton onClick={handleClearTime} className="top-[24px] right-[52px]"/>)}
        </div>

        <Button 
          variant="base" 
          theme={time && date && !isTimeSaved ? "primary" : "secondary"} 
          onClick={() => setTime({ isTimeSaved: true })}
          className="button-save-time">
          <Text>Сохранить время</Text>
        </Button>
      </div>
      <ModalCalendar isOpen={isDateSelectOpen} onClose={() => setIsDateSelectOpen(false)} onSelect={(value: string) => setTime({ date: value })}/>
      <ModalTimeSelect isOpen={isTimeSelectOpen} onClose={() => setIsTimeSelectOpen(false)} onTimeSelect={(value: string) => setTime({ time: value })}/>
    </>
  );
};


const useDateMask = (valueSetter: (val: string) => void, onChangeSaved?: () => void) => {
  const { ref, setValue } = useIMask<HTMLInputElement, ReactMaskOpts>(
    {
      mask: "d.`m.`Y",
      lazy: true,
      eager: true,
      blocks: {
        d: { mask: IMask.MaskedRange, from: 1, to: 31, maxLength: 2 },
        m: { mask: IMask.MaskedRange, from: 1, to: 12, maxLength: 2 },
        Y: { mask: IMask.MaskedRange, from: 0, to: 9999, maxLength: 4 },
      },
    },
    {
      onAccept: (val) => {
        valueSetter(val);
        onChangeSaved?.();
      },
    }
  );

  return { ref, setValue };
};

const useTimeMask = (valueSetter: (val: string) => void, onChangeSaved?: () => void) => {
  const { ref, setValue } = useIMask<HTMLInputElement, ReactMaskOpts>(
    {
      mask: "HH:mm - HH:mm",
      lazy: true,
      eager: true,
      overwrite: true,
      blocks: {
        HH: { mask: IMask.MaskedRange, from: 0, to: 23 },
        mm: { mask: IMask.MaskedRange, from: 0, to: 59 },
      },
    },
    {
      onAccept: (val) => {
        valueSetter(val);
        onChangeSaved?.();
      },
    }
  );

  return { ref, setValue };
};

const ClearButton = ({ onClick, className="" }: { onClick: () => void; className?: string }) => (
  <button type="button" className={`clear-button ${className}`} onClick={onClick}>
    <Image src="/icons/button-delete.svg" alt="Очистить" width={14} height={14}/>
  </button>
);