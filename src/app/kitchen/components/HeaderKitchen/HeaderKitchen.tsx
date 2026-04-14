"use client";
import Image from "next/image";
import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";
import { SelectBase } from "@/shared/ui/SelectBase/SelectBase"
import { Text } from "@/shared/ui/Typography/Typography";
import { cafeOptions, cityOptions } from "../../data/kitchenOrders.mock";
import "./HeaderKitchen.style.css";
import { useKitchenStore } from "@/entities/Order/store/kitchen/kitchenStore";

export const HeaderKitchen = () => {
  const {
    city, cafe, orderNumber, openSelect, isSettingsOpen, foundRow, searched,
    setCity, setCafe, setOrderNumber, toggleSelect, toggleSettings, clearOrderNumber, search
  } = useKitchenStore();

  return (
    <div className="header-kitchen-container">
      <div className="header-kitchen-inputs-group">
        <SelectBase 
          options={cityOptions}
          value={city}
          isOpen={openSelect === 'cities'}
          onToggle={() => toggleSelect('cities')}
          onSelect={setCity}
          className="header-kitchen-select"
        />
        <SelectBase 
          options={cafeOptions}
          placeholder="Адрес кафе"
          value={cafe}
          isOpen={openSelect === 'cafes'}
          onToggle={() => toggleSelect('cafes')}
          onSelect={setCafe}
          className="header-kitchen-select"
        />
        <div className="relative">
          <Input 
            type="number"
            value={orderNumber} 
            onChange={(e) => {
              setOrderNumber(e.target.value);
            }} 
            placeholder="Номер заказа" 
            error={orderNumber && searched && foundRow === null ? "Заказ с таким номером не найден" : undefined}
            className="header-kitchen-input"/>
          <Image src="/icons/search.svg" alt="Поиск" width={16} height={16} className="absolute left-2 top-[14px]"/>
          {orderNumber && <ClearButton onClick={clearOrderNumber} className="right-1 top-[1px]"/>}
        </div>
        <Button variant="base" theme="primary" size="sm" onClick={search}>
          <Text variant="body-m-medium-16" className="text-bg-base-light">Найти</Text>
        </Button>
      </div>
      <div className="filters-buttons-group">
        <button type="button" className="filters-button filters-button-refresh" onClick={() => console.log('обновить')}>
          <Image src="/icons/download.svg" alt="Обновить" height={20} width={20}/>
        </button>
        <button type="button" className={`filters-button ${isSettingsOpen ? "filters-button-settings" : ""}`} onClick={toggleSettings}>
          <Image src="/icons/settings.svg" alt="Открыть настройки" height={20} width={20}/>
        </button>
      </div>
    </div>
  )
}

const ClearButton = ({ onClick, className="" }: { onClick: () => void; className?: string }) => (
  <button type="button" className={`flex items-center justify-center absolute cursor-pointer w-10 h-10 ${className}`} onClick={onClick}>
    <Image src="/icons/button-delete.svg" alt="Очистить" width={14} height={14}/>
  </button>
);