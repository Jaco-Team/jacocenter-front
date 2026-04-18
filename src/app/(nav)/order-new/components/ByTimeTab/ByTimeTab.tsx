import { IMask, useIMask, ReactMaskOpts } from "react-imask";
import "./ByTimeTab.style.css";
import { useState } from "react";
import { Input } from "@/shared/ui/Input/Input";
import Image from "next/image";
import { Button } from "@/shared/ui/Button/Button";
import { Text } from "@/shared/ui/Typography/Typography";
import { TimeState } from "../ByTimeTab/ByTimeTab.types";
import { ModalCalendar } from "@/features/order/ui/ModalCalendar/ModalCalendar";
import { useDateMask } from "@/shared/hooks/useDateMask";

export const ByTimeTab = ({ timeState }: { timeState: TimeState }) => {
  const { date, time, isTimeSaved, setDate, setTime, setIsTimeSaved } = timeState;

  const [isDateSelectOpen, setIsDateSelectOpen] = useState(false);

  const { ref: dateRef, setValue: setDateValue } = useDateMask((val) => {setDate(val); setIsTimeSaved(false)});
  const { ref: timeRef, setValue: setTimeValue } = useTimeMask(setTime, () => setIsTimeSaved(false));

  const handleClearDate = () => {
    setDate(""); 
    setDateValue(""); 
    setIsTimeSaved(false)
  };
  
  const handleClearTime = () => {
    setTime(""); 
    setTimeValue(""); 
    setIsTimeSaved(false)
  };

  return (
    <>
      <div className="by-time-container">
        <div className="input-date">
          <Input 
            ref={dateRef} 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
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

          <button type="button" className="flex items-center justify-center cursor-pointer absolute top-[26px] right-1 w-10 h-10">
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
          onClick={() => setIsTimeSaved(true)} 
          className="button-save-time">
          <Text>Сохранить время</Text>
        </Button>
      </div>
      <ModalCalendar isOpen={isDateSelectOpen} onClose={() => setIsDateSelectOpen(false)} onSelect={(value: string) => setDate(value)}/>
    </>
  );
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