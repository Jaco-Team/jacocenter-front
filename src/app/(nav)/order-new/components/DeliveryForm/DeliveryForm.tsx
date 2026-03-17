import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";
import { Text } from "@/shared/ui/Typography/Typography";
import { IMask, useIMask, ReactMaskOpts } from "react-imask";
import "./DeliveryForm.style.css";
import { DeliveryFormProps, DeliveryState, PaymentState, PickupState, TimeState } from "./DeliveryForm.types";

export function DeliveryForm({ deliveryState, pickupState, timeState, paymentState, cafeList }: DeliveryFormProps) {
  const [activeDeliveryTab, setActiveDeliveryTab] = useState<"delivery" | "pickup">("delivery");
  const [activeTimeTab, setActiveTimeTab] = useState<"nearest" | "by-time" | null>(null);

  return (
    <div className="delivery-form">
      <div className="delivery-form-main">
        <div className="delivery-form-column">
          <div className="tabs-container">
            <Button
              variant="text" 
              theme="primary"
              className={`tab tab-default
              ${activeDeliveryTab === "delivery" ? (activeTimeTab === null ? "tab-active" : "tab-active-muted") : ""}`} 
              onClick={() => setActiveDeliveryTab("delivery")}
            >
              <Text>Доставка</Text>
            </Button>
            <Button 
              variant="text" 
              theme="primary"
              className={`tab tab-default
              ${activeDeliveryTab === "pickup" ? (activeTimeTab === null ? "tab-active" : "tab-active-muted") : ""}`} 
              onClick={() => setActiveDeliveryTab("pickup")}
            >
              <Text>Самовывоз</Text>
            </Button>
          </div>

          {activeDeliveryTab==="delivery" && <DeliveryTab state={deliveryState} activeTimeTab={activeTimeTab} setActiveTimeTab={setActiveTimeTab}/>}

          {activeDeliveryTab==="pickup" && <PickupTab state={pickupState} options={cafeList} activeTimeTab={activeTimeTab} setActiveTimeTab={setActiveTimeTab}/>}
        </div>
        <div className="delivery-form-column">
          <div className="tabs-container">
            <Button 
              variant="text" 
              theme="primary"
              className={`tab tab-default ${activeTimeTab === "nearest" ? "tab-active" : ""}`} 
              onClick={() => setActiveTimeTab("nearest")}
            >
              <Text>Ближайшее</Text>
            </Button>
            <Button 
              variant="text" 
              theme="primary"
              className={`tab tab-default ${activeTimeTab === "by-time" ? "tab-active" : ""}`} 
              onClick={() => setActiveTimeTab("by-time")}
              >
              <Text>Ко времени</Text>
            </Button>
          </div>
          <div>
            {activeTimeTab!=="by-time" && <NearestTab activeTimeTab={activeTimeTab} activeDeliveryTab={activeDeliveryTab} />}

            {activeTimeTab==="by-time" && <ByTimeTab timeState={timeState}/>}
          </div>
        </div>
      </div>
      {activeDeliveryTab==="delivery" && <PaymentBlock state={paymentState} activeTimeTab={activeTimeTab} isTimeSaved={timeState.isTimeSaved}/>}
    </div>
  );
}

const DeliveryTab = ({ state, activeTimeTab, setActiveTimeTab }: { state: DeliveryState, activeTimeTab: "nearest" | "by-time" | null, setActiveTimeTab: (val: "nearest" | "by-time") => void} ) => {
  const { address, building, entrance, floor, apartment, intercom, addressCheckStatus, setAddress, setBuilding, setEntrance, setFloor, setApartment, setIntercom, setAddressCheckStatus} = state;

  const buildingRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
  if (addressCheckStatus === "success") {
      buildingRef.current?.focus();
    }
  }, [addressCheckStatus]);

  return (
    <div>
      <div className="delivery-container">
        <div className="delivery-address group">
          <Input 
            value={address} 
            onChange={(e) => {setAddress(e.target.value); setAddressCheckStatus(null);}} 
            label="Улица" 
            placeholder="Введите улицу, дом"
            helperText={addressCheckStatus === "success" ? "Адрес входит в зону доставки" : ""}
            error={addressCheckStatus === "error" ? "Адрес вне зоны доставки. Введите другой адрес" : ""}
            className="placeholder:ps-6"
          />
          {!address && <Image src="/icons/search.svg" alt="Поиск" width={20} height={20} className="icon-search"/>}
          {address && <ClearButton onClick={() => {setAddress(""); setAddressCheckStatus(null);}} className="right-1 top-[24px]"/>}
        </div>
        <div className="delivery-buttons-group">
          <Button 
            variant="base" 
            theme={address && !addressCheckStatus ? "primary" : "secondary"} 
            size="sm" 
            onClick={() => {
              // setAddressCheckStatus("error");
              setAddressCheckStatus("success");
            }}>
            <Text>Найти</Text>
          </Button>
          <Button variant="icon" theme="secondary" size="icon-sm">
            <Image src="/icons/map-primary.svg" alt="Карта" width={14} height={20} className="icon-map"/>
          </Button>
        </div>
      </div>
      <div className="delivery-address-details">
        <Input ref={buildingRef} value={building} onChange={(e) => setBuilding(e.target.value)} label="Корпус" placeholder="___" className="delivery-address-details-input"/>
        <Input value={entrance} onChange={(e) => setEntrance(e.target.value)}  label="Подъезд" placeholder="___"  className="delivery-address-details-input"/>
        <Input value={floor} onChange={(e) => setFloor(e.target.value)}  label="Этаж" placeholder="___"  className="delivery-address-details-input"/>
        <Input value={apartment} onChange={(e) => setApartment(e.target.value)}  label="Квартира" placeholder="___"  className="delivery-address-details-input"/>
      </div>
      <div>
        <Text variant="label-s-regular-12" className="intercom-label">Домофон</Text>
        <div className="intercom-buttons">
          <Button 
            variant="base" 
            theme={intercom === "working" ? "primary" : "secondary"} 
            size="md"
            onClick={() => {
              setIntercom("working");
              if (activeTimeTab === null) setActiveTimeTab("nearest");
            }}
            className={intercom === "working" ? "button-active" : "button-default"}
          >
            <Text>Работает</Text>
          </Button>
          <Button 
            variant="base" 
            theme={intercom === "not-working" ? "primary" : "secondary"} 
            size="md"
            onClick={() => {
              setIntercom("not-working");
              if (activeTimeTab === null) setActiveTimeTab("nearest");
            }}
            className={intercom === "not-working" ? "button-active" : "button-default"}
          >
            <Text>Не работает</Text>
          </Button>
        </div>
      </div>
    </div>
)}

const PickupTab = ({ state, options,  activeTimeTab, setActiveTimeTab  }: { state: PickupState, options: { id: number; name: string }[], activeTimeTab: "nearest" | "by-time" | null, setActiveTimeTab: (val: "nearest" | "by-time") => void }) => {
  const { cafe, cafeCheckStatus, setCafe, setCafeCheckStatus} = state;
  const [isOpen, setIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const visibleOptions = showAll ? options : options.slice(0, 4);
  const isMatch = (name: string) => cafe && name.toLowerCase().startsWith(cafe.toLowerCase());

  const handleCheckCafe = () => {
    // const newStatus = "success";
    const newStatus = "error";
    setCafeCheckStatus(newStatus);
    if ((newStatus as string) === "success" && activeTimeTab === null) {
      setActiveTimeTab("nearest");
    }
  };

  const openMap = () => {
    console.log("кнопка Посмотреть на карте")
  };

  return (
  <div className="pickup-container">
    <div className="select-cafe">
      <Input 
        value={cafe} 
        onChange={(e) => {
          setCafe(e.target.value);
          setIsOpen(true);
          if (cafe) {
            setShowAll(true);
          }
        }} 
        onFocus={() => setIsOpen(true)}
        label="Улица" 
        placeholder="Введите адрес кафе"
        helperText={cafeCheckStatus === "success" ? "Адрес подтверждён" : ""}
        error={cafeCheckStatus === "error" ? "Кафе на стопе! Зона №2. Попробуйте позже" : ""}
      />
      <button className="absolute w-10 h-10 flex items-center justify-center top-6 right-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <Image
            src="/icons/arrow-down.svg"
            alt="Стрелка"
            width={20}
            height={20}
            className={isOpen ? "rotate-180": ""}
          />      
      </button>


      {cafe && <ClearButton onClick={() => {setCafe(""); setCafeCheckStatus(null);}} className="top-6 right-14"/>}
      
      {isOpen && 
        (
          <ul 
            className={`pickup-cafe-list ${showAll ? "pickup-cafe-list-expanded" : ""}`}>
            {visibleOptions.map((item) => (
              <li
                key={item.id}
                onClick={() => {
                  setCafe(item.name);
                  setIsOpen(false);
                  setCafeCheckStatus(null);
                }}
                className={`pickup-cafe-item ${isMatch(item.name) ? "pickup-cafe-item-active" : ""}`}
              >
                <Text>{item.name}</Text>
              </li>
            ))}

            {!showAll && (
              <li
                onClick={() => setShowAll(true)}
                className="button-all-cafes"
              >
                <Text>Все кафе</Text>
              </li>
            )}
          </ul>
        )}
    </div>
    <div className="pickup-buttons-group">
      <Button 
        variant="base" 
        theme={cafe && cafeCheckStatus !== "success" ? "primary" : "secondary"} 
        size="sm"
        onClick={handleCheckCafe}
      >
        <Text>Найти</Text>
      </Button>
      <Button variant="base" theme="secondary" className="flex-1" onClick={openMap}>
        <Text>Посмотреть на карте</Text>
        <Image src="/icons/map-primary.svg" alt="Карта" width={14} height={20}/>
      </Button>
    </div>
  </div>
  )
}

const NearestTab = ({activeTimeTab, activeDeliveryTab}: {activeTimeTab: "nearest" | "by-time" | null, activeDeliveryTab:  "delivery" | "pickup"}) => {
  const averageTime = activeDeliveryTab === "delivery" ? "1 ч. 25 мин. - 1 ч. 55 мин." : "10 мин. - 15 мин.";

  return (
    <div className={`nearest-time-container ${activeTimeTab === "nearest" ? "nearest-time-active" : "nearest-time-disabled"}`}>
      <Text className="nearest-time-label">Среднее время:</Text>
      <Text variant="body-l-regular-20" className="nearest-time-value">{averageTime}</Text>
    </div>
  );
}

const ByTimeTab = ({ timeState }: { timeState: TimeState }) => {
  const { date, time, isTimeSaved, setDate, setTime, setIsTimeSaved } = timeState;

  const { ref: dateRef, setValue: setDateValue } = useDateMask(setDate, () => setIsTimeSaved(false));
  const { ref: timeRef, setValue: setTimeValue } = useTimeMask(setTime, () => setIsTimeSaved(false));

  const handleClearDate = () => {setDate(""); setDateValue(""); setIsTimeSaved(false)};
  const handleClearTime = () => {setTime(""); setTimeValue(""); setIsTimeSaved(false)};

  return (
    <div className="by-time-container">
      <div className="input-date">
        <Input ref={dateRef}  value={date} onChange={(e) => setDate(e.target.value)} label="Дата" placeholder="Выберите дату" className="placeholder:text-text-muted"/>
        <button type="button" className="icon-calendar">
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
      
      <Button variant="base" theme={time && date && !isTimeSaved ? "primary" : "secondary"} onClick={() => setIsTimeSaved(true)} className="button-save-time">
        <Text>Сохранить время</Text>
      </Button>
    </div>
  );
}

const PaymentBlock = ({ state, activeTimeTab, isTimeSaved }:{state: PaymentState; activeTimeTab: "nearest" | "by-time" | null;
  isTimeSaved: boolean}) => {
  const { method, cashAmount, comment, setMethod, setCashAmount, setComment } = state;

  return (
    <div className={`payment-block ${activeTimeTab==="nearest" || isTimeSaved ? "payment-block-active" : "payment-block-disabled"}`}>
      <div className="payment-method">
        <Input value={cashAmount} onChange={(e) => setCashAmount(e.target.value)} placeholder="Введите сумму" label="Сдача с" className="payment-input"/>
        <Button 
          variant="base" 
          theme={method === "card" ? "primary" : "secondary"} 
          onClick={() => setMethod("card")}
          className={method === "card" ? "button-active" : "button-default"}
        >
          <Text>Безналичный расчёт</Text>
        </Button>
      </div>

      <Input 
        value={comment}
        onChange={(e) => setComment(e.target.value)} 
        placeholder="Например, позвонить за час до доставки" 
        label="Комментарий курьеру"
        className="payment-input"  
      />
    </div>
  )
}

const ClearButton = ({ onClick, className="" }: { onClick: () => void; className?: string }) => (
  <button type="button" className={`clear-button ${className}`} onClick={onClick}>
    <Image src="/icons/button-delete.svg" alt="Очистить" width={14} height={14}/>
  </button>
);

export const useDateMask = (valueSetter: (val: string) => void, onChangeSaved?: () => void) => {
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

export const useTimeMask = (valueSetter: (val: string) => void, onChangeSaved?: () => void) => {
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