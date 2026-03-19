import { Button } from "@/shared/ui/Button/Button";
import { Text } from "@/shared/ui/Typography/Typography";
import Image from "next/image";
import { Input } from "@/shared/ui/Input/Input";
import { useState } from "react";
import { PickupState } from "../PickupTab/PickupTab.types";
import "./PickupTab.style.css";

export const PickupTab = ({ 
  state, 
  options,  
  activeTimeTab, 
  setActiveTimeTab  
}: { 
  state: PickupState, 
  options: { id: number; name: string }[], 
  activeTimeTab: "nearest" | "by-time" | null, 
  setActiveTimeTab: (val: "nearest" | "by-time") => void 
}) => {
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
};

const ClearButton = ({ onClick, className="" }: { onClick: () => void; className?: string }) => (
  <button type="button" className={`clear-button ${className}`} onClick={onClick}>
    <Image src="/icons/button-delete.svg" alt="Очистить" width={14} height={14}/>
  </button>
);